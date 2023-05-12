import "./ProductDetailPage.css"

import { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";

import Carousel from "../../components/Carousel/Carousel";
import DetailsSidebar from "../../components/DetailsSidebar/DetailsSidebar";
import Loading from "../../components/Loading/Loading"
import YouMightAlsoLike from "../../components/YouMightAlsoLike/YouMightAlsoLike"
import Like from "../../components/Like/Like.js"
import axios from "axios";

const API_URL = "http://localhost:5005";     

function ProductDetailPage() {

    const storedToken = localStorage.getItem("authToken");
    const { user } = useContext(AuthContext)

    const [product, setProduct] = useState(null)
    // const [offer, setOffer] = useState(null)
  

    const { productId } = useParams(); 

    useEffect(() => {
        getProduct();
        // getOffer();
    }, []);

    function getProduct () {
        axios.get(`${API_URL}/api/products/${productId}`, { headers: { Authorization: `Bearer ${storedToken}` } })
        .then((response) => {
            setProduct(response.data)
        })
        .catch(err => console.log(err))
    }

   

    // function getOffer() {
    //     axios.get(`${API_URL}/api/products/${productId}/offer`)
    //     .then(response => {
    //         const offers = response.data
    //         setOffer(offers)
    //     })
    //     .catch(err => console.log(err))
    // }

    return (
        <div className="productDetailsDiv">
            <div className="productDetailsWrapper">
                {product && user
                
                ?

                <>
                    <div className="productDetailsMainDiv">
                        <Carousel images={product.img} />
                        {user._id === product.user[0]._id
                        
                        ?

                        <Link to={`/products/${product._id}/edit`}>
                            <button className="editProductButton">EDIT PRODUCT</button>
                        </Link>

                        :

                        <></>
                        }
                    </div>
                    
                    <DetailsSidebar product={product}/>
                </>

                :

                <Loading />

                }

                <Like />
                
            </div>
        </div>
    )
}

export default ProductDetailPage