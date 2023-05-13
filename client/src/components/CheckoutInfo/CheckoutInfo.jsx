import "./CheckoutInfo.css"

function CheckoutInfo() {

    return(
        <div className="checkoutInfoWrapper">

            <div className="checkoutGrouper">
                    <div className="checkoutInfoDiv">
                        <label className="checkoutLabel">First Name</label>
                        <input className="checkoutInput" type="text" name="firstName" placeholder="John"/>
                    </div>

                    <div className="checkoutInfoDiv">
                        <label className="checkoutLabel">Last Name</label>
                        <input className="checkoutInput" type="text" name="lastName" placeholder="Doe"/>
                    </div>
            </div>

            <div className="checkoutGrouper">
                <div className="checkoutInfoDiv">
                    <label className="checkoutLabel">Address 1</label>
                    <input className="checkoutInput" type="text" name="address1" placeholder="Street"/>
                </div>
            </div>
            <div className="checkoutGrouper">
                <div className="checkoutInfoDiv">
                    <label className="checkoutLabel">Address 2</label>
                    <input className="checkoutInput" type="text" name="address2" placeholder="Number, Apartment, Stairs"/>
                </div>
            </div>
            <div className="checkoutGrouper">
                <div className="checkoutInfoDiv">
                    <label className="checkoutLabel">Country</label>
                    <input className="checkoutInput" type="text" name="country" placeholder="Worldwide"/>
                </div>
            </div>

            <div className="checkoutGrouper">
                <div className="checkoutInfoDiv">
                    <label className="checkoutLabel">City</label>
                    <input className="checkoutInput" type="text" name="city" placeholder="Athens"/>
                </div>

                <div className="checkoutInfoDiv">
                    <label className="checkoutLabel">State/Province</label>
                    <input className="checkoutInput" type="text" name="state" placeholder="Arkansas"/>
                </div>

                <div className="checkoutInfoDiv">
                    <label className="checkoutLabel">Zip Code</label>
                    <input className="checkoutInput" type="number" name="zipCode" placeholder="#####"/>
                </div>
            </div>

        </div>
    )
}

export default CheckoutInfo