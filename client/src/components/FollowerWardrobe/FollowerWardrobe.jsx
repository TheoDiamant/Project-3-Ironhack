import "./FollowerWardrobe.css";

import axios from "axios";

import React, { useEffect, useContext, useState } from 'react';
import { AuthContext } from "../../context/auth.context";
import { Link } from "react-router-dom"


import ProductCard from "../ProductCard/ProductCard";
import ProductCardFollowersWardrobe from "../ProductCardFollowersWardrobe/ProductCardFollowersWardrobe";

const API_URL = "http://localhost:5005";

function FollowerWardrobe() {
  const storedToken = localStorage.getItem("authToken");
  const [followerWardrobe, setFollowerWardrobe] = useState([]);

  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (user) {
      axios
        .get(`${API_URL}/api/member/${user._id}`, {
          headers: { Authorization: `Bearer ${storedToken}` },
        })
        .then((response) => {
          const following = response.data.following;
          console.log(following[0])
          const userFollows = following.flatMap((follow) => follow.userFollows);
          console.log(userFollows)
          const products = userFollows.flatMap((follow) => follow.product);
          console.log(products)
          setFollowerWardrobe(products);
          console.log("HEYEYYEYEY", userFollows);
        })
        .catch((err) => console.log(err));
    }
  }, [user, storedToken]);

  return (
    <div>
      {followerWardrobe.length > 0 && (
        <h1 className="latestProductsText">
          Wardrobe of Followers
        </h1>
      )}
      <main className="wrapper">
        {followerWardrobe.slice(0, 4).map((product) => (
          <ProductCardFollowersWardrobe
            key={product._id}
            product={product}
          />
        ))}
        {followerWardrobe.length > 0 && (
          <Link
            to={`/member/${followerWardrobe[0].user[0]._id}`}
            className="buttonSeeMore"
          >
            <button>See more</button>{" "}
          </Link>
        )}
      </main>
    </div>
  );
}

export default FollowerWardrobe;