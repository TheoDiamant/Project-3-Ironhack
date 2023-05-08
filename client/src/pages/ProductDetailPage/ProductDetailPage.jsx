import "./ProductDetailPage.css"

import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";


import Offer from "../../components/Offer/Offer";
import Review from "../../components/Review/Review";
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

                <div className="carousel">
                    {product === null ? <p> Loading Images </p> : product.img.map(image => {
                        return (
                            <img src={image} alt=""/>
                        )
                    })}
                </div>
                
                <div className="offer-page-details">
                    {product === null ? <p>Loading price</p> : <p className="offer-price">{product.price}€</p> }
                    <hr className="hr-design"></hr>
                    {product === null ? <p>Loading title</p> :<p className="text-title">{product.title}</p>  }
                    <div class="bloc-1">
                        <div>
                            <p className="description-details">
                                <span>Brand :</span>
                                <span><strong>Zara</strong></span>
                            </p>
                            <p className="description-details">
                                <span>Size :</span>
                                <span><strong>L</strong></span>
                            </p>
                            <p className="description-details">
                                <span>State :</span>
                                <span><strong>New</strong></span>
                            </p>
                            <p className="description-details">
                                <span>Color :</span>
                                <span><strong>Blue</strong></span>
                            </p> 
                            <p className="description-details">
                                <span>Country :</span>
                                <span><strong>France</strong></span>
                            </p>
                        </div>
                    </div>
                    <div className="bloc-2">
                        <hr className="hr-design"></hr>
                        <h4>Product details :</h4>
                        {product === null ? <p>Loading description</p> :<p className="description-general">Quarto et exilium pater non non locum est cruribus pater exilium per cum quarto in nulla lapide et exilium pater actitata in et nulla cum nomine multiplices Antiochia ut ut nulla et locum pervenissent ambo in quaedam cum pater quaedam et igitur clades lapide scilicet in Antiochia vicensimo clades lapide.</p>}  
                        <hr className="hr-design"></hr>

                        <div>
                            {/* put here the original picture of the user */}
                            <img src="https://pbs.twimg.com/media/FjU2lkcWYAgNG6d.jpg" alt=""/>
                            <div className="name-review">  
                                {user === null ? <p>Loading name</p> : <h1 className="username-details-page">{user.name}</h1>}
                                <p> Reviews : {user && user.review ? (user.review.length === 0 ? <p> No reviews yet</p> : user.review.length) : ( <p> Loading Reviews..</p>)} ⭐️</p>                     
                            </div>
                        </div>
                    </div>
                    <div className="bloc-1">
                        <div>
                            <p>Country : France</p>
                            <p>Last seen: 45 min ago..</p>
                        </div>
                    </div>
                    <button className="btn-green">Message</button>
                    <button className="btn-border-green">Make an Offer</button>
                    <button className="btn-border-green">Payment</button>
                    <button className="btn-border-green">Add to WishList ❤️ </button>
                </div>
                {/* <div>
                    <YouMightAlsoLike /> 
                </div> */}
            </div>
        </div>
    )
}

export default ProductDetailPage