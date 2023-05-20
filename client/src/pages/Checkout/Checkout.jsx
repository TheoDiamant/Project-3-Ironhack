import "./Checkout.css"

import CheckoutInfo from "../../components/CheckoutInfo/CheckoutInfo"
import { useRef, useState } from "react"
import { Link, useParams } from "react-router-dom";
import axios from "axios"

const API_URL = "http://localhost:5005";     
function Checkout() {
    
    const { productId } = useParams();
    const storedToken = localStorage.getItem("authToken");
    const [product, setProduct] = useState(null)

    const getProducts = () => {
        axios.get(`/api/checkout/${productId}`,  { headers: { Authorization: `Bearer ${storedToken}` } })
        .then((response) => {
            setProduct(response.data)
        })
    }

    const buttonRef = useRef(null)
    const wiperRef = useRef(null)
    const billingWipe = useRef(null)
    const paymentTerminalRef = useRef(null)

    const [billingInfo, setBillingInfo] = useState({
        firstName: "",
        lastName: "",
        address1: "",
        address2: "",
        country: "",
        city: "",
        state: "",
    })

    const [shippingInfo, setShippingInfo] = useState({
        firstName: "",
        lastName: "",
        address1: "",
        address2: "",
        country: "",
        city: "",
        state: "",
    })

    function cloneAndSlide() {
        setShippingInfo(billingInfo)
        buttonRef.current.classList.add("rotate")
        setTimeout(() => {
            wiperRef.current.classList.add("wipe-away")
            setTimeout(() => {
                paymentTerminalRef.current.style.zIndex = "1"
                billingWipe.current.classList.add("wipe-away")
            }, 500);
        }, 800);
    }

    return(
        <div className="checkoutPageDiv">

            <div className="checkoutWrapper">

                <div className="checkoutDetails">

                    <div ref={billingWipe} className="checkoutDetailsWrapper">
                        <h3>Billing information</h3>
                        <CheckoutInfo info={billingInfo} setInfo={setBillingInfo}/>


                    </div>
                    
                    <div ref={paymentTerminalRef} className="paymentTerminal">

                        <h3>Payment details</h3>
                        <div className="paymentTerminalWrapper">

                            <div className="checkoutGrouper">
                                <div className="checkoutInfoDiv">
                                    <label className="checkoutLabel">Name on card</label>
                                    <input className="checkoutInput" type="text" name="nameOnCard" placeholder="JOHN DOE"/>
                                </div>
                            </div>

                            <div className="checkoutGrouper">
                                <div className="checkoutInfoDiv">
                                    <label className="checkoutLabel">Card number</label>
                                    <input className="checkoutInput" type="number" name="nameOnCard" placeholder="XXXX - XXXX - XXXX - XXXX"/>
                                </div>
                            </div>

                            <div className="checkoutGrouper">
                                <div className="checkoutInfoDiv">
                                    <label className="checkoutLabel">Expiration date</label>
                                    <input className="checkoutInput" type="number" name="nameOnCard" placeholder="XX / XX"/>
                                </div>

                                <div className="checkoutInfoDiv">
                                    <label className="checkoutLabel">Security code</label>
                                    <input className="checkoutInput" type="number" name="nameOnCard" placeholder="XXX"/>
                                </div>
                            </div>

                            <button className="placeOrderButton">Place Order</button>

                        </div>
                    </div>

                    <div ref={wiperRef} className="wiperDiv"></div>

                    <div className="interactiveCheckoutButtonDiv">
                        <button className="interactiveCheckoutButton">
                            <svg ref={buttonRef} className="arrowCheckout" viewBox="0 0 16 16" onClick={cloneAndSlide}>
                                <path d="M8 12L2 6h12z" transform="rotate(-90 8 8)"></path>
                            </svg>
                        </button>
                    </div>


                    <div className="checkoutDetailsWrapper shippingWrapper">
                        <h3>Shipping information</h3>
                        <CheckoutInfo info={shippingInfo} setInfo={setShippingInfo}/>
                    </div>


                </div>

            </div>


        </div>
    )
}

export default Checkout

