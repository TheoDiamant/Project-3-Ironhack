import "./DetailsSidebar.css"

function DetailsSidebar({product, user}) {
    
    return(
        <div className="sidebarWrapper">
            <div className="detailsSidebarDiv">

                <h3 className="sidebarPrice">€{product.price}</h3>

                <hr />

                <div className="detailsDiv">

                    <p className="details">
                        <span>Brand :</span>
                        <span><strong>Zara</strong></span>
                    </p>
                    <p className="details">
                        <span>Size :</span>
                        <span><strong>L</strong></span>
                    </p>
                    <p className="details">
                        <span>State :</span>
                        <span><strong>New</strong></span>
                    </p>
                    <p className="details">
                        <span>Color :</span>
                        <span><strong>Blue</strong></span>
                    </p>
                    <p className="details">
                        <span>Country :</span>
                        <span><strong>France</strong></span>
                    </p>
                </div>

                <hr />

                <div className="sidebarDescriptionDiv">
                    <p className="sidebarDescription">Quarto et exilium pater non non locum est cruribus pater exilium per cum quarto in nulla lapide et exilium pater actitata in et nulla cum nomine multiplices Antiochia ut ut nulla et locum pervenissent ambo in quaedam cum pater quaedam et igitur clades lapide scilicet in Antiochia vicensimo clades lapide.</p>
                </div>

                <hr />

                <div className="creatorUserDiv">
                        <div className="sidebarProfilePicDiv">
                            <img className="sidebarProfilePic" src="https://pbs.twimg.com/media/FjU2lkcWYAgNG6d.jpg" alt=""/>
                        </div>
                        <div className="nameReviewDiv"> 
                            <h1 className="sidebarName">Username</h1>
                            <p className="sidebarReviews">No reviews yet</p>
                            {/* <p> Reviews : {user.review.length === 0 ? <p> No reviews yet</p> : user.review.length} ⭐️</p>                      */}
                        </div>
                </div>

                <hr />

                <div className="locationLastSeenDiv">
                    <p>Country : France</p>
                    <p>Last seen: 45 min ago..</p>
                </div>

                <hr className="lastDivider"/>

                <div className="sidebarButtonsDiv">
                    <button className="sidebarButton">Message</button>
                    <button className="sidebarButtonGreen">Make an Offer</button>
                    <button className="sidebarButtonGreen">Payment</button>
                    <button className="sidebarButtonGreen">Add to WishList ❤️ </button>
                </div>
            </div>
        </div>
    )
}

export default DetailsSidebar