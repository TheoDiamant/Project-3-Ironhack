import React, { useEffect } from 'react'
import axios from "axios"

import "./LatestProducts.css"
import ProductCard from "../ProductCard/ProductCard"
import { useState } from 'react';
import { Link } from "react-router-dom"
const API_URL = "http://localhost:5005";

function LatestProducts() {

  const [latestProducts, setLatestProducts] = useState([])

  useEffect(() => {
    axios.get(`${API_URL}/api/products`)
      .then(response => {
        console.log(response.data[0].user)
        setLatestProducts(response.data)
      })
      .catch(err => console.log(err))
      
  }, [])

  return (
    <main className="wrapper">
          {latestProducts.slice(0, 4).map(product => {
    return (
      <ProductCard key={product._id} product={product} />
    );
  })}
  {latestProducts.length > 4 && <Link to="/products" className='buttonSeeMore'><button>See more</button> </Link>}
        </main>
  )
}

export default LatestProducts;