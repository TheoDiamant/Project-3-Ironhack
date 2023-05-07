import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import Offer from "../../components/Offer/Offer";
import Review from "../../components/Review/Review";
import ProductCard from "../../components/ProductCard/ProductCard"
import YouMightAlsoLike from "../../components/YouMightAlsoLike/YouMightAlsoLike"


const API_URL = "http://localhost:5005";     


function ProductDetailPage() {

    const storedToken = localStorage.getItem("authToken");

    const [user, setUser] = useState(null)
    const [product, setProduct] = useState(null)
    const [review, setReview] = useState(null)
    const [offer, setOffer] = useState(null)



    const { productId } = useParams(); 

    const getProduct = () => {
        axios.get(`${API_URL}/api/products/${productId}`)
        .then((response) => {
            const singleProduct = response.data
            setProduct(singleProduct)
        })
        .catch(err => console.log(err))
    }

    const getReview = () => {
        axios.get(`${API_URL}/api/products/${productId}/review`)
        .then(response => {
            const reviews = response.data
            setReview(reviews)
            console.log(response.data)
        })
        .catch(err => console.log(err))
    }

    const getOffer = () => {
        axios.get(`${API_URL}/api/products/${productId}/offer`)
        .then(response => {
            const offers = response.data
            setOffer(offers)
            console.log(response.data)
        })
        .catch(err => console.log(err))
    }

    const getUser = () => {
        axios.get(`${API_URL}/api/member`, { headers: { Authorization: `Bearer ${storedToken}` } })
        .then(response => {
          const uniqueUser = response.data
          setUser(uniqueUser)
          console.log(user)
        })
      }

    useEffect(() => {
        getProduct();
        getReview();
        getOffer();
        getUser();
    }, []);

    return (
        
        <div>

        <main className="main-offer">

        <div className="wrapper offer-page">
            <div className="carousel">

            {/* {product === null ? <p>Loading images</p> : <img src={product.img}/> } */}

            {product === null ? <p> Loading Images </p> : product.img.map(image => {
                return (
                    <img src={image}/>
                )
       
            })}
        
            </div>
          


            <div className="offer-page-details">

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
            {product === null ? <p>Loading description</p> :<p className="description-general">Quarto et exilium pater non non locum est cruribus pater exilium per cum quarto in nulla lapide et exilium pater actitata in et nulla cum nomine multiplices Antiochia ut ut nulla et locum pervenissent ambo in quaedam cum pater quaedam et igitur clades lapide scilicet in Antiochia vicensimo clades lapide.</p>  }
                    
                      
              <hr className="hr-design"></hr>
                        <div>
                        {/* put here the original picture of the user */}
                            <img src="https://pbs.twimg.com/media/FjU2lkcWYAgNG6d.jpg"/>

                    <div className="name-review">  
                     {user === null ? <p>Loading name</p> : <h1 className="username-details-page">{user.name}</h1>}
                    <p> Reviews : 
                        {user && user.review ? (user.review.length === 0 ? <p> No reviews yet</p> : user.review.length) : ( <p> Loading Reviews..</p>)} ⭐️
                        </p>                     
                    </div>

                        </div>
                    </div>

                   

                <div className="bloc-1">
                    <div>
                        <p>Country : France</p>
                        <p>Last seen: 45 min ago..</p>
                    </div>
                </div>

                    <button class="btn-green">Message</button>
                    <button class="btn-border-green">Make an Offer</button>
                    <button class="btn-border-green">Payment</button>
                    <button class="btn-border-green">Add to WishList ❤️ </button>


            </div>
        </div>
        <div>

            <YouMightAlsoLike />
            
        </div>

        </main>

            {/* {product &&  (
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
            })} */}






        </div>
    )
}

export default ProductDetailPage