{product &&  (
    <>
    {product.img.map(image => {
        return(
            <img src={image} alt="" />
        )
    })}
        <h1>{product.title}</h1>
        <p>{product.description}</p>
        <p>{product.price}</p>
    </>
)}


<Link to="/products">
    <button>Back to products</button>
</Link>

<Link to={`/products/${productId}/edit`}>
    <button>Edit Product</button>
</Link>  

<Offer />

<Review />

{review === null ? <p>Loading reviews...</p> : review.map(reviews => {
    return (
        <div key={reviews._id}>
        <img src={reviews.img}/>
            <h1>{reviews.title}</h1>
            <p>{reviews.message}</p>
        </div>
    )
})}
{offer === null ? <p>Loading offers...</p> : offer.map(offers => {
    return (
        <div key={offers._id}>
            <h1>{offers.price}</h1>
            <p>{offers.message}</p>
        </div>
    )
})


//////////////////////

{/* <div className="offer-page-details">
                    {product === null ? <p>Loading price</p> : <p className="offer-price">{product.price}€</p> }
                    <hr className="hr-design"></hr>
                    {product === null ? <p>Loading title</p> :<p className="text-title">{product.title}</p>  }
                    <div class="bloc-1">
                        <div>
                            <p className="description-details">
                                <span>Brand :</span>
                                <span><strong>Zara</strong></span>
                            </p>
                            <p className="description-details">
                                <span>Size :</span>
                                <span><strong>L</strong></span>
                            </p>
                            <p className="description-details">
                                <span>State :</span>
                                <span><strong>New</strong></span>
                            </p>
                            <p className="description-details">
                                <span>Color :</span>
                                <span><strong>Blue</strong></span>
                            </p>
                            <p className="description-details">
                                <span>Country :</span>
                                <span><strong>France</strong></span>
                            </p>
                        </div>
                    </div>
                    <div className="bloc-2">
                        <hr className="hr-design"></hr>
                        <h4>Product details :</h4>
                        {product === null ? <p>Loading description</p> :<p className="description-general">Quarto et exilium pater non non locum est cruribus pater exilium per cum quarto in nulla lapide et exilium pater actitata in et nulla cum nomine multiplices Antiochia ut ut nulla et locum pervenissent ambo in quaedam cum pater quaedam et igitur clades lapide scilicet in Antiochia vicensimo clades lapide.</p>}  
                        <hr className="hr-design"></hr>

                        <div>
                            <img src="https://pbs.twimg.com/media/FjU2lkcWYAgNG6d.jpg" alt=""/>
                            <div className="name-review">  
                                {user === null ? <p>Loading name</p> : <h1 className="username-details-page">{user.name}</h1>}
                                <p> Reviews : {user && user.review ? (user.review.length === 0 ? <p> No reviews yet</p> : user.review.length) : ( <p> Loading Reviews..</p>)} ⭐️</p>                     
                            </div>
                        </div>
                    </div>
                    <div className="bloc-1">
                        <div>
                            <p>Country : France</p>
                            <p>Last seen: 45 min ago..</p>
                        </div>
                    </div>
                    <button className="btn-green">Message</button>
                    <button className="btn-border-green">Make an Offer</button>
                    <button className="btn-border-green">Payment</button>
                    <button className="btn-border-green">Add to WishList ❤️ </button>
                </div> */}
                {/* <div>
                    <YouMightAlsoLike /> 
                </div> */}