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