import "./Navbar.css";
import { Link, useLocation } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../context/auth.context";

import axios from "axios";

import SearchPreview from "../SearchPreview/SearchPreview"
import CartSideBar from "../CartSideBar/CartSideBar";

const API_URL = "http://localhost:5005";     

function Navbar() {
    
  const location = useLocation()
  const { isLoggedIn, logOutUser, user } = useContext(AuthContext)

  const [products, setProducts] = useState([])
  const [users, setUsers] = useState([])
  const [navSelection, setNavSelection] = useState("Products")
  const [showCart, setShowCart] = useState(false)

  // If the user changes location we set products/users to an empty array to remove the preview to avoid ugly overflows
  useEffect(() => {
    setProducts([])
    setUsers([])
  }, [location])

  function previewProducts(e) {
    if (e.target.value === "") {
      setTimeout(() => {
        setProducts([])
      }, 500);
    }
    else {
      axios.get(`${API_URL}/api/preview?q=${e.target.value}`)
        .then(response => {
          setProducts(response.data)
        })
        .catch(err => console.log(err))
    }
  }

  function previewUsers(e) {
    if (e.target.value === "") {
      setTimeout(() => {
        setUsers([])
      }, 500);
    }
    else {
      axios.get(`${API_URL}/api/member-preview?q=${e.target.value}`)
        .then(response => {
          setUsers(response.data)
        })
        .catch(err => console.log(err))
    }
  }

  function navSelect(e) {
    setProducts([])
    setUsers([])
    setNavSelection(e.target.value)
  }

  function showCartSideBar() {
    setShowCart(true)
  }

  function retractCart() {
    setShowCart(false)
  }

  return (
    <nav className="projectNavbar">

      <div className="logoDiv">
        <img src="https://upload.wikimedia.org/wikipedia/commons/2/29/Vinted_logo.png" alt=""/>
      </div>

      <div className="searchDiv">
        <div className="searchDivWrapper">
          <select className="navSelection" onChange={navSelect}>
            <option>Products</option>
            <option>Members</option>
          </select>
          <form className="searchBarForm">
            <div className="searchBar">

              <div className="glassDiv">
                <img className="glass" src="https://uxwing.com/wp-content/themes/uxwing/download/user-interface/magnifying-glass-icon.png" alt=""/>
              </div>
            
              {navSelection === "Products"
              
              ?
              
              <input type="text" className="searchBarInput" placeholder="Search for products" onChange={previewProducts} /> 

              :

              <input type="text" className="searchBarInput" placeholder="Search for users" onChange={previewUsers} />

              }

            </div>
              
            {products.length === 0 ? <></> :
            

            <>
              <hr className="previewDivider"/>
              <SearchPreview data={products}/>
            </>
            
            }

            {users.length === 0 ? <></> :
            

            <>
              <hr className="previewDivider"/>
              <SearchPreview data={users}/>
            </>
            
            }            

          </form>
        </div>
      </div>
     
      <div className="buttonsDiv">

       

        {isLoggedIn && (
          <>
            <Link to={`/`}>
             <button className="navbarButton normalColors">Home</button>
           </Link>
           
            <Link to="/new-product">
              <button className="navbarButton invertedColors">Sell</button>
            </Link>
         
            <Link to={`/member/${user._id}`}>
             <button className="navbarButton normalColors">Profile</button>
            </Link>

            <button className="navbarButton logOutButton invertedColors" onClick={logOutUser}>Logout</button>

            <button onClick={showCartSideBar} className="shoppingCartButton normalColors">
              <img className="shoppingCartIcon" src="https://i.imgur.com/yRpFRV5.png" alt="" />
            </button>
          </>
        )}

        {!isLoggedIn && (
          <>
            <Link to="/signup">
              <button className="navbarButton invertedColors">Sign Up</button>
            </Link>
            
            <Link to="/login">
              <button className="navbarButton normalColors">Login</button>
            </Link>
          </>
        )}


      </div>

      <div className={showCart ? "cartSideBarDiv slideCartIn" : "cartSideBarDiv"}>
        <CartSideBar />
        <div className="cartSideBarDivider"></div>
      </div>

      <div className={showCart ? "dimmerDiv dimming" : "dimmerDiv"}></div>

      {showCart && <button className="retractCartSideBarButton" onClick={retractCart}></button>}
    </nav>
  );
}

export default Navbar;
