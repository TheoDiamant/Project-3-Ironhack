import "./HomePage.css";

import LatestProducts from "../../components/LatestProducts/LatestProducts"

function HomePage() {
  return (
    <div>
      <div className="firstSection"> 
        <img class="banner" src="https://myvinted-lereacteur-2021.netlify.app/static/media/hero-banner.bebb87dd.jpg" alt=""/>
      </div>
      <div className="secondSection">
        <h1 className="latestProductsText">Latest Products</h1>
        <LatestProducts />
      </div>
    </div>
  );
}

export default HomePage;
