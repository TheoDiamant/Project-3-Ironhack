import "./CartSideBar.css"

import { useContext } from "react"
import { CartContext } from "../../context/cart.context"

function CartSideBar() {
    
    const { cart, removeFromCart } = useContext(CartContext)

    

    return(
        <div className="cartMainDiv">
            <h5 className="cartName">Your Shopping Cart</h5>
            {cart.map(item => {
                return(
                    <div key={item._id} className="cartItemDiv">
                        <img className="cartImage" src={item.img[0]} alt="" />
                        <div className="cartInfo">
                            <div className="cartTitleAndPrice">
                                <h6>{item.title}</h6>
                                <hr />
                                <p>{item.price}€</p>
                            </div>
                            <div className="cartQuantity">
                                <span>x 1</span>
                            </div>
                            <div className="cartDelete">
                                <button className="cartDeleteButton" onClick={() => removeFromCart(item._id)}></button> 
                                {/* add X graphic later */}
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default CartSideBar