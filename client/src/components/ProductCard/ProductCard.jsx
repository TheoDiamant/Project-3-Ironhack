import React from 'react'

import "./ProductCard.css"

import { Link } from "react-router-dom";

function ProductCard({product}) {

  return (
    <>
    <Link to={`/products/${product._id}`}>
      <div className="container page-wrapper">
        <div className="page-inner">
          <div className="row">
            <div className="el-wrapper">
              <div className="box-up">
                <img className="img" src={product.img[0]} alt=""/>
                <div className="img-info">
                  <div className="info-inner">

                    <span className="p-name">{product.title}</span>
                    <span className="p-company">{}</span>
                    <span className="p-company">{product.price}</span>

                  </div>
                  <div className="a-size">Description : <span className="size">{product.description}</span></div>
                </div>
              </div>
                <div className="box-down-container">
                  <div className="box-down">
                    <span className="add-to-cart">
                      {/* <a href="">Add in cart</a> */}
                    </span>
                  </div>
                  <div className="box-down">
                    <div className="h-bg">
                      <div className="h-bg-inner"></div>
                    </div>
                    
                    {/* <a href="">Make an offer</a> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </>
  )
}

export default ProductCard