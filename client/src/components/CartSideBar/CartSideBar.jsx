import "./CartSideBar.css"

import { useState } from "react"

import cart from "../../services/cart.service"

function CartSideBar() {

    const [cartContents, setCartContents] = useState(cart.getCart)

    return(
        <div className="cartMainDiv">
        </div>
    )
}

export default CartSideBar