import "./Checkout.css"

import CheckoutInfo from "../../components/CheckoutInfo/CheckoutInfo"
import { useRef, useState } from "react"

function Checkout() {

    const buttonsRef = useRef([null, null])

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
        buttonsRef.current.forEach(button => {
            button.classList.add("slideImgsRight")
        });
    }

    return(
        <div className="checkoutPageDiv">

            <div className="checkoutWrapper">

                <div className="checkoutDetails">

                    <div className="checkoutDetailsWrapper">
                        <h3>Billing information</h3>
                        <CheckoutInfo info={billingInfo} setInfo={setBillingInfo}/>

                        <div className="paymentTerminal">

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
                    </div>
                    
                    {/* this is a mess, trying to do a fancy animation thing here */}
                    <div className="checkoutButtonsDiv">
                        <button className="showPaymentButton">
                            <img ref={button => buttonsRef.current[0] = button} className="showPaymentImg" src="https://i.imgur.com/M57ugfv.png" alt=""/>
                        </button>

                        <button className="cloneButton">
                            <img ref={button => buttonsRef.current[1] = button} className="cloneInfoImg" onClick={cloneAndSlide} src="https://i.imgur.com/6boB5p3.png" alt="" />
                        </button>
                    </div>

                    <div className="checkoutDetailsWrapper">
                        <h3>Shipping information</h3>
                        <CheckoutInfo info={shippingInfo} setInfo={setShippingInfo}/>
                    </div>


                </div>

            </div>


        </div>
    )
}

export default Checkout

