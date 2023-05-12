import "./CartSideBar.css"

import { useContext } from "react"
import { CartContext } from "../../context/cart.context"

function CartSideBar() {
    
    const { cart, getCart, addToCart, removeFromCart } = useContext(CartContext)

    

    return(
        <div className="cartMainDiv">
            {cart.map(item => {
                return(
                    <div key={item._id} className="cartItem">
                        <p>{item.title}</p>
                    </div>
                )
            })}
        </div>
    )
}

export default CartSideBar