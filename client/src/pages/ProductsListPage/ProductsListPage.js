 
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
 
import ProductCard from "../../components/ProductCard/ProductCard";

const API_URL = "http://localhost:5005";

function ProductsListPage() {

    const [products, setProducts] = useState([])

    const storedToken = localStorage.getItem("authToken");

    useEffect(() => {
        axios.get(`${API_URL}/api/products`, { headers: { Authorization: `Bearer ${storedToken}` } })
            .then(response => setProducts(response.data))
            .catch(err => console.log(err))
    }, [])


    return (
        <div> 
        
        {products.map(product => (

            <div key={product._id}> 
            
                <Link to={`/products/${product._id}`}>

                    <img src={product.img} alt=""/>
                    <h3>{product.title}</h3>
                    <p>{product.description}</p>
                    <p>{product.price}</p>

                </Link>
                <ProductCard product={product}/>
            </div>

        ))}
        
        </div>
    )
}

export default ProductsListPage