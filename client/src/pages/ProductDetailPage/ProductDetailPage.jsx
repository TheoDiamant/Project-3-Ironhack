import "./ProductDetailPage.css"

import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

import Carousel from "../../components/Carousel/Carousel";
import DetailsSidebar from "../../components/DetailsSidebar/DetailsSidebar";
import YouMightAlsoLike from "../../components/YouMightAlsoLike/YouMightAlsoLike"

import axios from "axios";

const API_URL = "http://localhost:5005";     

function ProductDetailPage() {

    const storedToken = localStorage.getItem("authToken");

    const [product, setProduct] = useState(null)
    const [offer, setOffer] = useState(null)

    const { productId } = useParams(); 

    useEffect(() => {
        getProduct();
        getOffer();
    }, []);

    const getProduct = () => {
        axios.get(`${API_URL}/api/products/${productId}`)
        .then((response) => {
            const singleProduct = response.data
            setProduct(singleProduct)
            console.log(singleProduct)
        })
        .catch(err => console.log(err))
    }

    const getOffer = () => {
        axios.get(`${API_URL}/api/products/${productId}/offer`)
        .then(response => {
            const offers = response.data
            setOffer(offers)
        })
        .catch(err => console.log(err))
    }

    return (
        <div className="productDetailsBodyDiv">
            <div className="productDetailsDiv">
                {product
                
                ?

                <>
                    <Carousel images={product.img} />
                    <DetailsSidebar product={product}/>
                </>

                :

                <p>Loading</p>
                }
                
                
            </div>
        </div>
    )
}

export default ProductDetailPage