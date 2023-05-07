import "./HomePage.css";

import LatestProducts from "../../components/LatestProducts/LatestProducts"

function HomePage() {
  return (
    <div>
      <div className="firstSection"> 
        <h1>First Section</h1>
      </div>
      <div className="secondSection">
      <h1 className="latestProductsText">Latest Products</h1>
        <LatestProducts />
      </div>
    </div>
  );
}

export default HomePage;
