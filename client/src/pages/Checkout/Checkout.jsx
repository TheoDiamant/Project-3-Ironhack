import "./Checkout.css"

import CheckoutInfo from "../../components/CheckoutInfo/CheckoutInfo"

function Checkout() {

    return(
        <div className="checkoutPageDiv">
            <div className="checkoutWrapper">

                <div className="checkoutDetails">

                    <CheckoutInfo />

                    <div className="shippingDetails">

                    </div>

                </div>

                <div className="summaryAndPayment">

                    <div className="cartSummary">

                    </div>
                    <div className="paymentTerminal">

                    </div>

                </div>

            </div>
        </div>
    )
}

export default Checkout

