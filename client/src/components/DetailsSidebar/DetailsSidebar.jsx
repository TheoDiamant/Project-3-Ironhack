import "./DetailsSidebar.css"

import { useParams } from "react-router-dom"
import { useContext, useEffect, useState } from "react"
import { CartContext } from "../../context/cart.context"
import Offer from "../Offer/Offer"
import axios from "axios";
const API_URL = "http://localhost:5005";



function DetailsSidebar({product, user}) {

    const storedToken = localStorage.getItem("authToken");

    const { productId } = useParams()
    const { addToCart } = useContext(CartContext)

    const [isLike, setIsLike] = useState()
    const [showOfferPopup, setShowOfferPopup] = useState(false);



    const handleLike = (e) => {
        e.preventDefault()

        axios.post(`${API_URL}/api/products/${productId}/like`, {}, { headers: { Authorization: `Bearer ${storedToken}` } })
        .then(response => {
            setIsLike(true)
        })
        
    }



  
    const handleDislike = (e) => {
        e.preventDefault()

        axios.delete(`${API_URL}/api/products/${productId}/like`, { headers: { Authorization: `Bearer ${storedToken}` } })
        .then(response => {
            setIsLike(false)
        })
        
    }




    return(
        <div className="detailsSidebarDiv">

            <h3 className="sidebarPrice">€{product.price}</h3>

            <hr />

            <div className="detailsDiv">

                <p className="details">
                    <span>Brand :</span>
                    <span><strong>{product.brand}</strong></span>
                </p>
                <p className="details">
                    <span>Size :</span>
                    <span><strong>{product.size}</strong></span>
                </p>
                <p className="details">
                    <span>State :</span>
                    <span><strong>{product.state}</strong></span>
                </p>
                <p className="details">
                    <span>Color :</span>
                    <span><strong>{product.color}</strong></span>
                </p>
                <p className="details">
                    <span>Country :</span>
                    <span><strong>{product.country}</strong></span>
                </p>
                <p className="details">
                    <span>Category :</span>
                    <span><strong>{product.category}</strong></span>
                </p>
            </div>

            <hr />

            <div className="sidebarDescriptionDiv">
                <p className="sidebarDescription">{product.description}</p>
            </div>

            <hr />

            <div className="creatorUserDiv">
                    <div className="sidebarProfilePicDiv">
                        <img className="sidebarProfilePic" src={user.profilePicture} alt=""/>
                    </div>
                    <div className="nameReviewDiv"> 
                        <h1 className="sidebarName">{user.name}</h1>
                        <p className="sidebarReviews">{user.review.length === 0 ? "No reviews yet" : user.review.length.toString() + + " reviews" } ⭐️</p>
                    </div>
            </div>

            <hr />

            <div className="locationLastSeenDiv">
                <p>Country : France</p>
                <p>Last seen: 45 min ago..</p>
            </div>

            <hr className="lastDivider"/>

            <div className="sidebarButtonsDiv">
                <button className="sidebarButton">Message</button>
                <button className="sidebarButtonGreen" onClick={() => setShowOfferPopup(true)}>Make an Offer</button>
                <button className="sidebarButtonGreen" onClick={() => addToCart(productId)}>Add to cart</button>
                <button className="sidebarButtonGreen" onClick={isLike ? handleLike : handleDislike}>{ isLike ? "Add to WishList ❤️"  : "Remove from WishList ❤️" }</button>
            </div>

            {showOfferPopup && (
                
                <Offer productOwner={product.user[0]} />
                
            )}
        </div>
    )
}

export default DetailsSidebar