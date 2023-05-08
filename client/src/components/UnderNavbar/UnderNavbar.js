import "./UnderNavbar.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";

function UnderNavBar() {
  
  const { isLoggedIn, logOutUser } = useContext(AuthContext);

  return (
    <nav className="underNavbar">
      

     <div className="text-underNavbar">

        
        <p>Men</p>
        <p>Women</p>
        <p>Kids</p>
        <p>Home</p>
        <p>Accesories</p>
     </div>

     
    </nav>
  );
}

export default UnderNavBar ;
