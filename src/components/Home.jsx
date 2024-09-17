import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { collection,getDocs } from 'firebase/firestore';
import { db } from '../firebase/setup';
const Home = (props) => {

  const [products, setProducts] = useState([]);

  const searchTerm = (props.search || props.menu || '').toLowerCase();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'products')); 
        const dataList = querySnapshot.docs.map(doc => ({ id: doc.id,title:doc.productName, ...doc.data() }));
        setProducts(dataList);
      } catch (error) {
        console.error("Error fetching data from Firestore: ", error);
      }
    };

    fetchData();
  }, []);

  // console.log(products,'hello')

  const Products=[...products,...(props.products || [])]
  console.log(Products,'hii')
  return (
    <div className='grid grid-cols-4 p-5'>
      {Products?.filter((data) =>
        data?.title?.toLowerCase().includes(searchTerm)
      ).map((data) => (
        <Link key={data.id} to="/details" state={{ data: data }}>
          <div className='border border-spacing-1 p-2 ml-3 mt-3'>
            <img src={data?.image} className='w-60 h-48' alt={data?.title} />
            <h1 className='font-bold text-xl'>$ {data?.price}</h1>
            <h1>{data?.title}</h1>
            <h1>{data?.category}</h1>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Home;