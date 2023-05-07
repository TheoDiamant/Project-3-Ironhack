import "./NewProductCard.css"

import { Link } from "react-router-dom"

function NewProductCard({product}) {
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
            <div className="titlePriceDiv">
                <p>{product.title}</p>
                <p>{product.price}</p>
            </div>
            <p className="cardDescription">{product.description}</p>
        </div>
    )
}

export default NewProductCard

//https://www.cityoftaylor.org/wp-content/uploads/2014/02/500X50032.gif