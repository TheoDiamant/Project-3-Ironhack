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
    
    const colStyle = {
     
            flex: "0 0 auto",
            width: "55"
        
    }


    const cardColor = {
        backgroundColor: "#f7f7f7"
    }
    return (

        // <div className="newCard">
        //     <Link to={`/products/${product._id}`}>
        //         <div className="cardImageDiv">
        //             <img className="cardImage" src={product.img[0]} alt="" />
        //         </div>
        //     </Link>

        //     <div className="cardButtonsDiv">
        //         <button className="cardButton addCardButton">Add to cart</button>
        //         <button className="cardButton makeOfferButton">Make an offer</button>
        //     </div>
        //     <div className="titleDiv">
        //         <p>{title}</p>
        //     </div>
        //     <div className="priceDiv">
        //         <p>€{product.price}</p>
        //     </div>
        //     <p className="cardDescription">{description}</p>
        // </div>



      <div class="container py-5">
    <div class="row">
      <div style={colStyle} >
        <div class="product_card">
          <div class="card border-0">
            <div class="card-header bg-transparent border-0 p-0">
              <img class="card-img-top" src={product.img[0]} alt=""/>
              <div class="details-btn">
                <a href="#" class="btn btn-dark">View Details <i class="fas fa-long-arrow-alt-right"></i></a>
              </div>
            </div>
            <div style={cardColor}>
              <small>
                <a href="#" class="text-muted">Foundation</a>
              </small>
              <strong>
                <a href="#" class="text-body">{product.title}</a>
              </strong>
              <div class="price">
                <span class="text-warning">${product.price} </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</div>


    )
}

export default ProductCard