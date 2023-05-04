import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import Offer from "../../components/Offer/Offer";
import Review from "../../components/Review/Review";
 

const API_URL = "http://localhost:5005";     


function ProductDetailPage() {

    const [product, setProduct] = useState(null)

    const { productId } = useParams(); 

    const getProduct = () => {
        axios.get(`${API_URL}/api/products/${productId}`)
        .then((response) => {
            const singleProduct = response.data
            setProduct(singleProduct)
        })
        .catch(err => console.log(err))
    }


    useEffect(() => {                   // <== ADD AN EFFECT
        getProduct();
      }, [] );

    return (
        
        <div>
            {product &&  (
                <>
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
        </div>
    )
}

export default ProductDetailPage