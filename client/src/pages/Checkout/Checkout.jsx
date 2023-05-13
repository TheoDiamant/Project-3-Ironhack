import "./Checkout.css"

import CheckoutInfo from "../../components/CheckoutInfo/CheckoutInfo"
import { useState } from "react"

function Checkout() {

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

    function cloneInfo() {
        setShippingInfo(billingInfo)
    }

    return(
        <div className="checkoutPageDiv">
            <div className="checkoutWrapper">

                <div className="checkoutDetails">
                    <div className="checkoutDetailsWrapper">
                        <h3>Billing information</h3>
                        <CheckoutInfo info={billingInfo} setInfo={setBillingInfo}/>
                    </div>
                    <button className="sameInfoButton">
                        <img onClick={cloneInfo} src="https://i.imgur.com/DQBXyxE.png" alt="" />
                    </button>
                    <div className="checkoutDetailsWrapper">
                        <h3>Shipping information</h3>
                        <CheckoutInfo info={shippingInfo} setInfo={setShippingInfo}/>
                    </div>
                </div>

                {/* <div className="summaryAndPayment">

                    <div className="cartSummary">

                    </div>
                    <div className="paymentTerminal">

                    </div>

                </div> */}

            </div>
        </div>
    )
}

export default Checkout

