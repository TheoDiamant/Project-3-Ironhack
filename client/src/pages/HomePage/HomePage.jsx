import "./HomePage.css";

import LatestProducts from "../../components/LatestProducts/LatestProducts"

function HomePage() {
  return (
    <div>
      <div className="firstSection"> 
        <img class="banner" src="https://myvinted-lereacteur-2021.netlify.app/static/media/hero-banner.bebb87dd.jpg"/>
              </div>

      <LatestProducts />
    </div>
  );
}

export default HomePage;
