import "./CartSideBar.css"

import { useContext } from "react"
import { CartContext } from "../../context/cart.context"

function CartSideBar() {
    
    const { cart, removeFromCart } = useContext(CartContext)

    let cartTotal = 0
    cart.forEach(item => {
        cartTotal += item.price
    });

    return(
        <div className="cartMainDiv">
            <div className="cartTop">
                <h5 className="cartName">Your Shopping Cart</h5>
                <h5>Your total is: {cartTotal}€</h5>
            </div>
            {cart.map(item => {
                return(
                    <div key={item._id} className="cartItemDiv">
                        <img className="cartImage" src={item.img[0]} alt="" />
                        <div className="cartInfo">
                            <div className="cartTitleAndPrice">
                                <div className="hackyDivider"></div>
                                <h6>{item.title}</h6>
                                <hr />
                                <h6>{item.price}€</h6>
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