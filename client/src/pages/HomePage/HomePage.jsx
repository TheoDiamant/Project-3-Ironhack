import "./HomePage.css";
import { Link, useLocation } from "react-router-dom";
import LatestProducts from "../../components/LatestProducts/LatestProducts"
import FollowerWardrobe from "../../components/FollowerWardrobe/FollowerWardrobe";


const HomePage = () => {
  return (
    <div className="container">
      <div className="background-image">
        <div className="overlay">
          <div className="text"><i>Give a second lifes<br></br>to your clothes</i></div>
        </div>
      </div>

      <h1 className="latestProductsText">Recommended for you</h1>
      <LatestProducts />

      
      
      <FollowerWardrobe />
    </div>
  );
};

export default HomePage;