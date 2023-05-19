import "./WomanProducts.css" 

import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import ProductCard from "../../components/ProductCard/ProductCard";
const API_URL = "http://localhost:5005";


function WomanProducts() {




    const [products, setProducts] = useState([])

    const storedToken = localStorage.getItem("authToken");

    useEffect(() => {
        axios.get(`${API_URL}/api/products`, { headers: { Authorization: `Bearer ${storedToken}` } })
            .then(response => {              
                 
                const womenProducts = response.data.filter(product => product.category === "Women");
             console.log(womenProducts)
                 setProducts(womenProducts)
            
            })
            .catch(err => console.log(err))
    }, [])


    return (
        <div className="">

       <h2 className="allProductsTitle">Women products</h2>
       <hr className="hrDesign"></hr>
       <main className="wrapper"> 
           {products.map(product => {
                console.log(product)
                const user = product.user[0]; 
                return <ProductCard key={product._id} product={product} user={user}/>
                
            })}  

           


        </main>
        </div>
    )
}

export default WomanProducts