import "./ProductCardFollowersWardrobe.css"

import { Link } from "react-router-dom"

function ProductCardFollowersWardrobe({product}) {

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
        <div className="offer-card">
       
        <div className="avatar-card">
         <Link to={`/member/${product.user[0]._id}`}>
        <img src={product.user[0].profilePicture} alt="Avatar" className="avatar-card" />
         <span>{product.user[0].name}</span> </Link>
        </div>
    
        <Link to={`/products/${product._id}`} className="wrap-card">
        <div>
          <img src={product.img[0]} alt="Product" className="product-card" />
        </div>
        <div>
          <p className="priceProduct">${product.price}</p>
          <p className="descriptionProduct">{product.title}</p>
          <p className="descriptionProduct">{product.size}</p>
          <p className="descriptionProduct">{product.brand}</p>
        </div>
        </Link>  
        </div>
        </div>
       
        


    )
}

export default ProductCardFollowersWardrobe