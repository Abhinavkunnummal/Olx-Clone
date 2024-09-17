import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getDownloadURL, ref,uploadBytes } from 'firebase/storage';
import { addDoc, collection } from 'firebase/firestore';
import { storage,db } from '../firebase/setup';

const Sell = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category,setCategory] = useState("")
  const [price, setPrice] = useState('');
  const [image, setImage] = useState([]);
  const [errorMessage,setErrormessage] = useState("")

  const navigate = useNavigate()

  const handleSubmit = async(e) => {
    e.preventDefault();
    if(title &&category&&image&&price&&description){
      try {
        const storageRef = ref(storage,`images/${image.name}`)

        await uploadBytes(storageRef,image)
        const imageUrl = await getDownloadURL(storageRef)
        const priceNumber = parseFloat(price);

        await addDoc(collection(db,"products"),{
          title,
          price:priceNumber,
          category,
          description,
          image:imageUrl
        })
        navigate("/")
      } catch (error) {
        setErrormessage(error.message)
      }
    }else{
      setErrormessage("every field is required")
    }
  };

  return (
    <div className="max-w-md mx-auto p-5 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-700">Sell Your Product</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
      <p className='text-red-900 text-center font-semibold text-lg'>*{errorMessage}</p>
      <div>
          <label className="block text-sm font-medium text-gray-600">Title</label>
          <input 
            type="text" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600">Category</label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600">Description</label>
          <textarea 
            value={description} 
            onChange={(e) => setDescription(e.target.value)} 
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600">Price</label>
          <input 
            type="number" 
            value={price} 
            onChange={(e) => setPrice(e.target.value)} 
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600">Image</label>
          <input 
            type="file" 
            onChange={(e) => setImage(e.target.files[0])} 
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            required
          />
        </div>
        <button 
          type="submit" 
          className="w-full bg-blue-500 text-white px-4 py-2 rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Sell;
