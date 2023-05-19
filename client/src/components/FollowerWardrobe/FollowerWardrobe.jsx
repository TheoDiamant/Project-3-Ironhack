import "./FollowerWardrobe.css";

import axios from "axios";

import React, { useEffect, useContext, useState } from 'react';
import { AuthContext } from "../../context/auth.context";

import ProductCard from "../ProductCard/ProductCard";
import ProductCardFollowersWardrobe from "../ProductCardFollowersWardrobe/ProductCardFollowersWardrobe";

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
        })
        .catch(err => console.log(err))
    }
  }, [user, storedToken]);

  return (
    <div>
    {followerWardrobe.length > 0 && (
        <h1 className="latestProductsText">Wardrobe of {followerWardrobe[0].user[0].name} </h1>
    )}
    <main className="wrapper">
        {followerWardrobe.map(products => (
            <ProductCardFollowersWardrobe key={products._id} product={products} />
        ))}
    </main>
</div>
  )
}

export default FollowerWardrobe;