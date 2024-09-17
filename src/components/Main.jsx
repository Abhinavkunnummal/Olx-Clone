import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import Menubar from './Menubar'
import Home from './Home'
import Footer from './Footer'
import { useSearchParams } from 'react-router-dom'

const  Main= () => {

    const [prod,setProd] = useState([])

    const [search,setSearch] = useState("")

    const [menu,setMenu] = useState("")

    const getProducts = () =>{
        fetch('https://fakestoreapi.com/products')
            .then(res=>res.json())
            .then(json=>setProd(json))
    }

    useEffect(()=>{
        getProducts()
    },[])

  return (
    <div>
      <Navbar setSearch={setSearch}/>
      <Menubar setMenu={setMenu}/>
      <Home products={prod} search={search} menu={menu}/>
      <Footer/>
 
    </div>
  )
}

export default Main
