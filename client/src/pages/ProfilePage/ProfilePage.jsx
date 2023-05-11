import "./ProfilePage.css";

import axios from "axios";

import { useState, useEffect, useContext } from "react";
import { useParams, Link } from 'react-router-dom';
import { AuthContext } from "../../context/auth.context";

import ProductsTab from "../../components/ProductsTab/ProductsTab";
import ReviewsTab from "../../components/ReviewsTab/ReviewsTab";
import Loading from "../../components/Loading/Loading";

const API_URL = "http://localhost:5005"; 

function ProfilePage() {

  const storedToken = localStorage.getItem("authToken");

  const { user } = useContext(AuthContext)
  const { userId } = useParams()

  const [userInfo, setUserInfo] = useState(null)
  const [activeTab, setActiveTab] = useState("products")

  // const [newfollow, setNewFollow] = useState({
  //   follow: 0,
  // })
  
  useEffect(() => {
    getUser();
  }, []);

  function getUser() {
    axios.get(`${API_URL}/api/member/${userId}`, { headers: { Authorization: `Bearer ${storedToken}` } })
    .then(response => {
      setUserInfo(response.data)
    })
  }

//   function handleSubmit(e) {
//     e.preventDefault();
//     axios.post(`${API_URL}/api/member/${userId}`, newfollow, { headers: { Authorization: `Bearer ${storedToken}` } })
//         .then(() => {
//             navigate(`${API_URL}/api/member/${userId}`)
//         })
//         .catch(err => console.log(err))
// }

  const productsButton = document.getElementById("productsTabButton")
  const reviewsButton = document.getElementById("reviewsTabButton")

  function handleTabChange(tab) {
    if(tab === "products") {
      setActiveTab("products")
      productsButton.classList.add("activeTabButton")
      reviewsButton.classList.remove("activeTabButton")
    }
    else {
      setActiveTab("reviews")
      reviewsButton.classList.add("activeTabButton")
      productsButton.classList.remove("activeTabButton")      
    }
  }

  return (
    <div className="profilePageDiv">
      <div className="profilePageWrapper">
        
          <div className="userDiv">
            <div className="userPictureDiv">
              <img className="profilePic" src="https://www.vinted.es/assets/no-photo/user-empty-state.svg" alt="" />
            </div>
            {userInfo ? 
            
            <div className="userInfoDiv">

              <div className="userInfoTextDiv">
                <h2>{userInfo.name}</h2>
                <p>{userInfo.review.length === 0 ? "No reviews yet" : userInfo.review.length}</p> 
              </div>
              
              <div className="userButtonsDiv">
                <div className="editProfileButtonDiv">
                  { user._id === userInfo._id

                  ?

                  <Link to={`/member/${userId}/edit`} >
                    <button className="profileButton">Edit profile</button>
                  </Link>

                  :

                  <></>
                  }
                </div>
                <div className="followButtonDiv">
                  <button className="profileButton">Follow</button>
                </div>
              </div>

            </div>

            :
            
            <Loading />
            }
            
          </div>

          <div className="tabButtonsDiv">
            <button id="productsTabButton" className="tabButton activeTabButton" onClick={() => handleTabChange("products")}>Products</button>
            <button id="reviewsTabButton" className="tabButton" onClick={() => handleTabChange("reviews")}>Reviews</button>
          </div>

          <hr className="profilePageDivider"/>

          {userInfo ? 
          
          <div className="reviewsAndProductsDiv">
            {activeTab === "products" 
            
            ? 
            
            <ProductsTab products={userInfo.product}/>
            
            :
  
            <ReviewsTab />
            
            }
          </div>
          
          :

          <Loading />
          
          }
        </div>
    </div>
  );
}

export default ProfilePage;
