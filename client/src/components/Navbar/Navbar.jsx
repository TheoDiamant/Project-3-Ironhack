import "./Navbar.css";
import { Link, useParams } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../context/auth.context";
import { Users } from "../../user";
import Table from "../Table.js";

import axios from "axios";



const API_URL = "http://localhost:5005";     

function Navbar() {

  const storedToken = localStorage.getItem("authToken");

  const [query, setQuery] = useState("")
  const [products, setProducts] = useState([])

  console.log(query)


  useEffect(() => {
      axios.get(`${API_URL}/api/products?q=${query}`, { headers: { Authorization: `Bearer ${storedToken}` } })
          .then(response => {
            console.log(response.data)
            setProducts(response.data)})
          .catch(err => console.log(err))
  }, [query])
  
  const { isLoggedIn, logOutUser, user } = useContext(AuthContext)




  return (
    
    <nav className="projectNavbar">
      <div className="logoDiv">
        <img src="https://upload.wikimedia.org/wikipedia/commons/2/29/Vinted_logo.png" alt=""/>
      </div>

      <div className="searchBarDiv">
        <form className="searchBarForm">
          <img className="glass" src="https://uxwing.com/wp-content/themes/uxwing/download/user-interface/magnifying-glass-icon.png" alt=""/>


          <input 
            type="text" 
            className="searchBar" 
            placeholder="Search for products" 
            onChange={e => setQuery(e.target.value)} />
            {products && products.length > 0 ? (
            <Table data={products} />
          ) : (
            <p>No products found.</p>
          )}
       


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
