import "./ProfilePage.css";

import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link } from 'react-router-dom';

import { useNavigate } from "react-router-dom";

import ProductsTab from "../../components/ProductsTab/ProductsTab";
import ReviewsTab from "../../components/ReviewsTab/ReviewsTab";

const API_URL = "http://localhost:5005"; 

function ProfilePage() {

  const storedToken = localStorage.getItem("authToken");

  const currentUserID = JSON.parse(atob(storedToken.split('.')[1]))._id;

  const navigate = useNavigate()
  const { userId } = useParams()

  const [user, setUser] = useState(null)
  const [activeTab, setActiveTab] = useState("products")
  const [loaded, setLoaded] = useState(false)
  const [newfollow, setNewFollow] = useState({
    follow: 0,
  })
  
  useEffect(() => {
    getUser();
  }, []);

  function getUser() {
    axios.get(`${API_URL}/api/member/${userId}`, { headers: { Authorization: `Bearer ${storedToken}` } })
    .then(response => {
      const uniqueUser = response.data
      setUser(uniqueUser)
      setLoaded(true)
    })
  }

  function handleSubmit(e) {
    e.preventDefault();
    axios.post(`${API_URL}/api/member/${userId}`, newfollow, { headers: { Authorization: `Bearer ${storedToken}` } })
        .then(response => {
            navigate(`${API_URL}/api/member/${userId}`)
        })
        .catch(err => console.log(err))
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
    <div className="profilePageDiv">
      <div className="profilePageWrapper">
        
          <div className="userDiv">
            <div className="userPictureDiv">
              <img className="profilePic" src="https://www.vinted.es/assets/no-photo/user-empty-state.svg" alt="" />
            </div>
            <div className="userInfoDiv">

            </div>
            {/* <div className="informationDiv">

              { userId === currentUserID &&
              <Link to={`/member/${userId}/edit`} >
                <button>Edit profile</button>
              </Link>
              }

              <Link to={`/member/${userId}`} >

              <form onSubmit={handleSubmit}>  
                <button onChange={e => setNewFollow(e + 1)}>Follow</button>
              </form>
              </Link>

              <div className="infoTextDiv">
                  <h1>{user.name}</h1>
                <p>Number of reviews : {user.review ? (user.review.length === 0 ? <p>No reviews yet</p> : user.review.length) : <p>Loading Reviews..</p>} ⭐️</p> 
              </div>
            </div> */}
            
          </div>

          <div className="tabButtonsDiv">
            <button className="tabButton" onClick={() => handleTabChange("products")}>Products</button>
            <button className="tabButton" onClick={() => handleTabChange("reviews")}>Reviews</button>
          </div>

          <hr className="profilePageDivider"/>
  
          <div className="reviewsAndProductsDiv">
            {/* {activeTab === "products" 
            
            ? 
            
            <ProductsTab products={user.product}/>
            
            :
  
            <ReviewsTab />
            
            } */}
          </div>
  
        </div>
    </div>
  );
}

export default ProfilePage;
