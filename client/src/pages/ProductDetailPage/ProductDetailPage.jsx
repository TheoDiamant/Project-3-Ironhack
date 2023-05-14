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
    const { productId } = useParams(); 

    const [product, setProduct] = useState(null)
    const [userInfo, setUserInfo] = useState(null) //to fetch review numbers and profile picture img
  

    useEffect(() => {
        getProduct()
        getUser()
    }, []);

    function getProduct () {
        axios.get(`${API_URL}/api/products/${productId}`, { headers: { Authorization: `Bearer ${storedToken}` } })
        .then((response) => {
            setProduct(response.data)
        })
        .catch(err => console.log(err))
    }

    function getUser() {
        axios.get(`${API_URL}/api/member/${user._id}`, { headers: { Authorization: `Bearer ${storedToken}` } })
        .then(response => {
          setUserInfo(response.data)
        })
    }


    return (
        <div>
        <div className="productDetailsDiv">

            <div className="productDetailsWrapper">
                {product && userInfo
                
                ?

                <>
                    <div className="productDetailsMainDiv">
                        <Carousel images={product.img} />
                        {userInfo._id === product.user[0]._id
                        
                        ?

                        <Link to={`/products/${product._id}/edit`}>
                            <button className="editProductButton">EDIT PRODUCT</button>
                        </Link>

                        :

                        <></>
                        }
                    </div>
                    
                    <DetailsSidebar product={product} user={userInfo}/>
                </>

                :

                <Loading />

                }

           
                
            </div>
        </div>
        <div className="otherProductDiv">
                <div className="youMightAlsoLikeDiv">
                    <h3 className="youMightAlsoLike">Other products of</h3>
                </div>
    
                    <YouMightAlsoLike />
           </div>

        </div>
        
    )
}

export default ProductDetailPage