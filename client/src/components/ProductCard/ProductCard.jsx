import React from 'react'

import "./ProductCard.css"

function ProductCard({product}) {

  console.log(product)

  return (
    <div className="card">
      <div className="cardImageWrapper">
        <img className="cardImage" src={product.img[0]} alt="placeholderImage" />
      </div>
      <div className="cardText">
        <h1>{product.name}</h1>
        <h5>{product.price}</h5>
        <h6>{product.description}</h6>
      </div>  
    </div>
  )
}

export default ProductCard