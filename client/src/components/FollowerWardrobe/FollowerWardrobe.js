import React, { useEffect, useContext } from 'react';
import axios from "axios";
import "./FollowerWardrobe.css";
import ProductCard from "../ProductCard/ProductCard";
import { AuthContext } from "../../context/auth.context";
import { useState } from 'react';

const API_URL = "http://localhost:5005";

function FollowerWardrobe() {


    const storedToken = localStorage.getItem("authToken");

  const [followerWardrobe, setFollowerWardrobe] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (user) {
      axios.get(`${API_URL}/api/member/${user._id}`, { headers: { Authorization: `Bearer ${storedToken}` } })
        .then(response => {
          setFollowerWardrobe(response.data.following[0].userFollows[0].product);
          console.log(response.data.following[0].userFollows[0].product)
        })
        .catch(err => console.log(err))
    }
  }, [user, storedToken]);

  return (
        <div className="latestProductsDiv">
          {followerWardrobe.map(products => {
            return (
                <>
                <ProductCard key={products._id} product={products} />
                </>
            )
          })}
       
        </div>
  )
}

export default FollowerWardrobe;