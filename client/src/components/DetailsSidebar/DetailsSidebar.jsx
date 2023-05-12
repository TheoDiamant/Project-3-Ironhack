import "./DetailsSidebar.css"

import { useParams } from "react-router-dom"
import { useContext } from "react"
import { CartContext } from "../../context/cart.context"



function DetailsSidebar({product, user}) {

    const { productId } = useParams()
    const { addToCart } = useContext(CartContext)

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
                        <img className="sidebarProfilePic" src="https://pbs.twimg.com/media/FjU2lkcWYAgNG6d.jpg" alt=""/>
                    </div>
                    <div className="nameReviewDiv"> 
                        <h1 className="sidebarName">{product.user[0].name}</h1>
                        <p className="sidebarReviews">{product.user[0].review.length === 0 ? "No reviews yet" : product.user[0].review.length} ⭐️</p>
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
                <button className="sidebarButtonGreen">Make an Offer</button>
                <button className="sidebarButtonGreen" onClick={() => addToCart(productId)}>Add to cart</button>
                <button className="sidebarButtonGreen">Add to WishList ❤️ </button>
            </div>
        </div>
    )
}

export default DetailsSidebar