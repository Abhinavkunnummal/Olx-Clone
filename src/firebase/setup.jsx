import { initializeApp } from "firebase/app";
import {createUserWithEmailAndPassword, getAuth,GoogleAuthProvider, signInWithEmailAndPassword, signOut} from 'firebase/auth'
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyDCYd0DaIOuLEDDXoIHAqi-XB_v-eDtwIs",
  authDomain: "olx-clone-7c576.firebaseapp.com",
  projectId: "olx-clone-7c576",
  storageBucket: "olx-clone-7c576.appspot.com",
  messagingSenderId: "239567904317",
  appId: "1:239567904317:web:51eed1f1d39c1c69005454"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const googleProvider = new GoogleAuthProvider()
const db = getFirestore(app)
const storage = getStorage(app)
// const navigate = useNavigate()

// const signup = async (name,email,password) =>{
//   try {
//         const res = await createUserWithEmailAndPassword(auth,email,password)
//         const user= res.user;
//         await addDoc(collection(db,"user"),{
//           uid:user.uid,
//           name,
//           authprovider:"local",
//           email
//         })
//         navigate('/');
//   } catch (error) {
//       console.log(error)
//       toast.error(error.code.split('/')[1].split('-').join(" "))

//   }
// }

// const login = async (email,password) =>{
//   try {
//         await signInWithEmailAndPassword(auth,email,password)
//         console.log('hello')
//         navigate('/');
//   } catch (error) {
//       console.log(error)
//       toast.error(error.code.split('/')[1].split('-').join(" "))

//   }
// }

const logout = () =>{
  signOut(auth)
}

export {
  auth,
  db,
  // login,
  // signup,
  logout,
  googleProvider,
  storage
}