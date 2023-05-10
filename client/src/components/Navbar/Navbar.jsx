import "./Navbar.css";
import { Link, Location, useLocation } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../context/auth.context";

import axios from "axios";

import SearchPreview from "../SearchPreview/SearchPreview"

const API_URL = "http://localhost:5005";     

function Navbar() {

  const storedToken = localStorage.getItem("authToken");
  const { isLoggedIn, logOutUser, user } = useContext(AuthContext)
  const location = useLocation()

  const [products, setProducts] = useState([])

  // If the user changes location we set products to an empty array to remove the preview to avoid ugly overflows
  useEffect(() => {
    setProducts([])
  }, [location])

  function handleChange(e) {
    if (e.target.value === "") {
      setTimeout(() => {
        setProducts([])
      }, 500);
    }
    else {
      axios.get(`${API_URL}/api/preview?q=${e.target.value}`, { headers: { Authorization: `Bearer ${storedToken}` } })
        .then(response => {
          setProducts(response.data)
        })
        .catch(err => console.log(err))
    }
  }


  return (
    
    <nav className="projectNavbar">
      <div className="logoDiv">
        <img src="https://upload.wikimedia.org/wikipedia/commons/2/29/Vinted_logo.png" alt=""/>
      </div>

      <div className="searchBarDiv">
        <form className="searchBarForm">
          <div className="searchBar">
            <img className="glass" src="https://uxwing.com/wp-content/themes/uxwing/download/user-interface/magnifying-glass-icon.png" alt=""/>
            <input type="text" className="searchBarInput" placeholder="Search for products" onChange={handleChange} />
          </div>
            
          {products.length === 0 ? <></> :
          

          <>
            <hr className="previewDivider"/>
            <SearchPreview products={products}/>
          </>
           
          }


          

        </form>
      </div>
     
      <div className="buttonsDiv">

        <Link to="/">
          <button className="button normalColors">Home</button>
        </Link>

        {isLoggedIn && (
          <>
            <button className="button invertedColors" onClick={logOutUser}>Logout</button>

            <Link to={`/member/${user._id}`}>
             <button className="button normalColors">Profile</button>
           </Link>
          </>
        )}

        {!isLoggedIn && (
          <>
            <Link to="/signup">
              <button className="button invertedColors">Sign Up</button>
            </Link>
            
            <Link to="/login">
              <button className="button normalColors">Login</button>
            </Link>
          </>
        )}

        <Link to="/new-product">
          <button className="button invertedColors">Sell a product</button>
        </Link>

      </div>
    </nav>
  );
}

export default Navbar;
