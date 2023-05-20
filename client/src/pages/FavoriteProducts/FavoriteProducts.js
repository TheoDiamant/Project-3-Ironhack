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

      if (user) {
        axios.get(`${API_URL}/api/member/${user._id}`, { headers: { Authorization: `Bearer ${storedToken}` } })
          .then(response => {
            setUserInfo(response.data.like);
          })
          .catch(error => {
            console.log(error);
          })
      }
    
  }, [user]);


  return (
    <div>
      <h1>WishList ❤️ </h1>
      <div className="latestProductsDiv">
        {userInfo.map(likeObject => {
            return (
                <>
                  <ProductCard key={likeObject.product[0]._id} product={likeObject.product[0]} />
                </>
            )
          })}
      </div>
    </div>
  )
}

export default FavoriteProducts;