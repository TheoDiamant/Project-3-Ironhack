import "./FavoriteProducts.css";
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { useParams, Link } from 'react-router-dom';
import { AuthContext } from "../../context/auth.context";
import ProductCard from "../../components/ProductCard/ProductCard";

const API_URL = "http://localhost:5005"; 

function FavoriteProducts() {
  const storedToken = localStorage.getItem("authToken");
  const { user } = useContext(AuthContext);
  const [userInfo, setUserInfo] = useState([]);
  console.log(userInfo)
  
  useEffect(() => {
    getUser();
  }, []);

  function getUser() {
    if (user) {
      axios.get(`${API_URL}/api/member/${user._id}`, { headers: { Authorization: `Bearer ${storedToken}` } })
        .then(response => {
          console.log(response.data.like[0].product);
          setUserInfo(response.data.like[0].product);
        })
        .catch(error => {
          console.log(error);
        })
    }
  }

  return (
    <div>
      <h1>WishList ❤️ </h1>
      <div className="latestProductsDiv">
      { userInfo.map(products => {
            return (
                <>
                <ProductCard key={products._id} product={products} />
                </>
            )
          })}
      </div>
    </div>
  )
}

export default FavoriteProducts;