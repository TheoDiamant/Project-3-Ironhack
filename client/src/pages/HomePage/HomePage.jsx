import "./HomePage.css";

import LatestProducts from "../../components/LatestProducts/LatestProducts"

function HomePage() {
  return (
    <div>
      <div className="firstSection"> 
      </div>
      <div className="secondSection">
        <h1 className="latestProductsText">Latest Products</h1>
        <LatestProducts />
      </div>
    </div>
  );
}

export default HomePage;
