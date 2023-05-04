import React, { useEffect } from 'react'
import axios from "axios"

import "./LatestProducts.css"
import ProductCard from "../ProductCard/ProductCard"
import { useState } from 'react';

const API_URL = "http://localhost:5005";

function LatestProducts() {

  const [latestProducts, setLatestProducts] = useState([])

  useEffect(() => {
    axios.get(`${API_URL}/api/latest`)
      .then(response => setLatestProducts(response.data))
  })


  return (
    <>
        <h1>Latest Products</h1>
        <div className="latestProductsDiv">
          {latestProducts.map(product => {
            <ProductCard product={product} />
          })}
        </div>
    </>
  )
}

export default LatestProducts;