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
            width: "55",
    }


    const cardColor = {
        backgroundColor: "#f7f7f7",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
    }
    return (

       


        
        
        <div className="offers">
        <Link to={`/products/${product._id}`} className="wrap-card">
        <div className="offer-card">
        <div className="avatar-card">
          <img src="https://picsum.photos/id/1/200/200" alt="Avatar" className="avatar-card" />
          <span>Username</span>
        </div>
        <div>
          <img src={product.img[0]} alt="Product" className="product-card" />
        </div>
        <div>
          <p>${product.price}</p>
          <p>{product.title}</p>
          <p>{product.brand}</p>
        </div>
        </div>
        </Link>  
        </div>
       
        


    )
}

export default ProductCard