import "./HomePage.css";

import LatestProducts from "../../components/LatestProducts/LatestProducts"
import FollowerWardrobe from "../../components/FollowerWardrobe/FollowerWardrobe";


function HomePage() {
  return (
    <div>
      <div className="firstSection"> 
      </div>
      <div className="secondSection">
        <h1 className="latestProductsText">Latest Products</h1>
        <LatestProducts />
        <h1 className="latestProductsText">Wardrobe of Brea</h1>
        <FollowerWardrobe />
      </div>
    </div>
  );
}

export default HomePage;
