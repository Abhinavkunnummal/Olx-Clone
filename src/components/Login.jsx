import React, { useState } from 'react'
import google from '../assets/google.png'
import phone from '../assets/phone.png'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth'
import { auth, googleProvider } from '../firebase/setup'
import olx from '../assets/olx.png'

import guitar from '../assets/guitar.png'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'




function LoginModal(props) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [signState, setSignState] = useState("Sign In");

  const navigate = useNavigate()

  // State for validation errors
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    password: ''
  });

  const validate = () => {
    let isValid = true;
    const newErrors = { name: '', email: '', password: '' };

    if (signState === "Sign Up" && !name) {
      newErrors.name = 'Please enter your name';
      isValid = false;
    }
    if (!email) {
      newErrors.email = 'Please enter your email';
      isValid = false;
    }
    if (!password) {
      newErrors.password = 'Please enter your password';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const user_auth = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        if (signState === "Sign In") {
          await signInWithEmailAndPassword(auth, email, password)
            .then(() => {
              toast.success("Login Successfully")
              navigate("/")

            })
            .catch((error) => {
              toast.error(error.code.split('/')[1].split('-').join(" "))
            })
        } else {
          // await signup(name, email, password);
          if (name && email && password) {
            try {
              const res = await createUserWithEmailAndPassword(auth, email, password)
              const user = res.user;
              await addDoc(collection(db, "user"), {
                uid: user.uid,
                name,
                authprovider: "local",
                email
              })
            } catch (error) {
              console.log(error)
              toast.error(error.code.split('/')[1].split('-').join(" "))
            }
          }

        }
      } catch (error) {

        console.error(error);

      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold">{signState}</h1>
          <button onClick={() => setSignState(signState === "Sign In" ? "Sign Up" : "Sign In")} className="text-blue-500 hover:underline">
            {signState === "Sign In" ? "Sign Up" : "Sign In"}
          </button>
        </div>

        <form onSubmit={user_auth}>
          {signState === "Sign Up" && (
            <>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                type='text'
                placeholder='Enter your name'
                className='border border-gray-300 p-2 rounded-md w-full mb-4'
              />
              {errors.name && <p className='text-red-500 text-sm mb-4'>{errors.name}</p>}
            </>
          )}
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type='email'
            placeholder='Enter your email'
            className='border border-gray-300 p-2 rounded-md w-full mb-4'
          />
          {errors.email && <p className='text-red-500 text-sm mb-4'>{errors.email}</p>}
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type='password'
            placeholder='Enter your password'
            className='border border-gray-300 p-2 rounded-md w-full mb-4'
          />
          {errors.password && <p className='text-red-500 text-sm mb-4'>{errors.password}</p>}
          <button
            type="submit"
            className='bg-blue-500 text-white p-2 rounded-md w-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400'
          >
            {signState}
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginModal;
