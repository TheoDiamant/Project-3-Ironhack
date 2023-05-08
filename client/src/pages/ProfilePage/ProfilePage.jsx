import "./ProfilePage.css";

import { useState, useEffect } from "react";
import axios from "axios";


import ProductsTab from "../../components/ProductsTab/ProductsTab";
import ReviewsTab from "../../components/ReviewsTab/ReviewsTab";

const API_URL = "http://localhost:5005"; 

function ProfilePage() {

  const storedToken = localStorage.getItem("authToken");

  const [user, setUser] = useState(null)
  const [activeTab, setActiveTab] = useState("products")
  const [loaded, setLoaded] = useState(false)
  
  useEffect(() => {
    getUser();
  }, []);

  const getUser = () => {
    axios.get(`${API_URL}/api/member`, { headers: { Authorization: `Bearer ${storedToken}` } })
    .then(response => {
      const uniqueUser = response.data
      setUser(uniqueUser)
      setLoaded(true)
      console.log(user)
    })
  }

  function handleTabChange(tab) {
    if(tab === "products") {
      setActiveTab("products")
    }
    else {
      setActiveTab("reviews")
    }
  }

  return (
          <>
            { loaded

              ?

              <div className="profilePageDiv">
              
                <div className="topDiv">

                  <div className="profilePictureDiv">
                    <img className="profilePic" src="https://www.vinted.es/assets/no-photo/user-empty-state.svg" alt="" />
                  </div>

                  <div className="informationDiv">

                    <div className="infoTextDiv">
                      <h1>{user.name}</h1>
                      <p>Number of reviews : {user.review ? (user.review.length === 0 ? <p>No reviews yet</p> : user.review.length) : <p>Loading Reviews..</p>} ⭐️</p>          
                    </div>
      
                  </div>

                </div>

                <div className="tabButtonDiv">
                  <button className="tabButton" onClick={() => handleTabChange("products")}>Products</button>
                  <button className="tabButton" onClick={() => handleTabChange("reviews")}>Reviews</button>
                </div>

                <hr className="divider"/>
        
                <div className="reviewsAndProductsDiv">
                  {activeTab === "products" 
                  
                  ? 
                  
                  <ProductsTab products={user.product}/>
                  
                  :
        
                  <ReviewsTab />
                  
                  }
                </div>
        
              </div>

              :

              <p></p>
            }
          </>
  );
}

export default ProfilePage;
