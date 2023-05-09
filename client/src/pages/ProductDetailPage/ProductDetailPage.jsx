import "./ProductDetailPage.css"

import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";


import Offer from "../../components/Offer/Offer";
import Review from "../../components/Review/Review";
import Carousel from "../../components/Carousel/Carousel";
import YouMightAlsoLike from "../../components/YouMightAlsoLike/YouMightAlsoLike"

import axios from "axios";

const API_URL = "http://localhost:5005";     

function ProductDetailPage() {

    const storedToken = localStorage.getItem("authToken");

    const [user, setUser] = useState(null)
    const [product, setProduct] = useState(null)
    const [review, setReview] = useState(null)
    const [offer, setOffer] = useState(null)



    const { productId } = useParams(); 

    useEffect(() => {
        getProduct();
        getReview();
        getOffer();
        getUser();
    }, []);

    const getProduct = () => {
        axios.get(`${API_URL}/api/products/${productId}`)
        .then((response) => {
            const singleProduct = response.data
            setProduct(singleProduct)
        })
        .catch(err => console.log(err))
    }

    const getReview = () => {
        axios.get(`${API_URL}/api/products/${productId}/review`)
        .then(response => {
            const reviews = response.data
            setReview(reviews)
            console.log(response.data)
        })
        .catch(err => console.log(err))
    }

    const getOffer = () => {
        axios.get(`${API_URL}/api/products/${productId}/offer`)
        .then(response => {
            const offers = response.data
            setOffer(offers)
            console.log(response.data)
        })
        .catch(err => console.log(err))
    }

    const getUser = () => {
        axios.get(`${API_URL}/api/member`, { headers: { Authorization: `Bearer ${storedToken}` } })
        .then(response => {
          const uniqueUser = response.data
          setUser(uniqueUser)
          console.log(user)
        })
      }

    return (
        <div className="productDetailsBodyDiv">
            <div className="productDetailsDiv">
                {product 
                
                ?
                
                <Carousel images={product.img} />

                :

                <p>Loading</p>
                }
                
                
            </div>
        </div>
    )
}

export default ProductDetailPage