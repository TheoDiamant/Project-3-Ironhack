import "./ProductCard.css"

import { Link } from "react-router-dom"

function ProductCard({product}) {

    // shorterns description/title to avoid text overflow on the cards
    let title = product.title.split(" ")
    if(title.length > 5) {
        title = title.slice(0, 5).join(" ") + "..."
    }
    else {
        title = title.join(" ")
    }

    let description = product.description.split(" ")
    if(description.length > 10) {
        description = description.slice(0, 10).join(" ") + "..."
    }
    else {
        description = description.join(" ")
    }
    

    return(
        <div className="newCard">
            <Link to={`/products/${product._id}`}>
                <div className="cardImageDiv">
                    <img className="cardImage" src={product.img[0]} alt="" />
                </div>
            </Link>

            <div className="cardButtonsDiv">
                <button className="cardButton addCardButton">Add to cart</button>
                <button className="cardButton makeOfferButton">Make an offer</button>
            </div>
            <div className="titleDiv">
                <p>{title}</p>
            </div>
            <div className="priceDiv">
                <p>€{product.price}</p>
            </div>
            <p className="cardDescription">{description}</p>
        </div>
    )
}

export default ProductCard