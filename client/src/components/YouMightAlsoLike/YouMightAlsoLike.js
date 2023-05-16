import React, { useEffect } from 'react'
import axios from "axios"

import "../LatestProducts/LatestProducts.css"
import ProductCard from "../ProductCard/ProductCard"
import { useState } from 'react';

const API_URL = "http://localhost:5005";

function YouMightAlsoLike() {

  const [youMightAlsoLike, setYouMightAlsoLike] = useState([])

  useEffect(() => {
    console.log("this is the useEffect requests")
    axios.get(`${API_URL}/api/products`)
      .then(response => {setYouMightAlsoLike(response.data)})
      .catch(err => console.log(err))
      
  }, [])


  return (
    <>
        
        <div className="wrapper">
          {youMightAlsoLike.map(product => {
            return(
              <ProductCard product={product} />

            )
          })}
        </div>
    </>
  )
}

export default YouMightAlsoLike;