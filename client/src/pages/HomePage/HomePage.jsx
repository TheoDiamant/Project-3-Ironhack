import "./HomePage.css";
import { Link, useLocation } from "react-router-dom";
import LatestProducts from "../../components/LatestProducts/LatestProducts"
import FollowerWardrobe from "../../components/FollowerWardrobe/FollowerWardrobe";


function HomePage() {
  return (
    <div>
      <div className="firstSection"> 
      </div>
       
  


        <h1 className="latestProductsText">Latest Products</h1>
        <LatestProducts />



      <div className="secondSection">
        <h1 className="latestProductsText">Wardrobe of Brea</h1>
        <FollowerWardrobe />
      </div>
    </div>
  );
}

export default HomePage;
