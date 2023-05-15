import "./HomePage.css";
import { Link, useLocation } from "react-router-dom";
import LatestProducts from "../../components/LatestProducts/LatestProducts"
import FollowerWardrobe from "../../components/FollowerWardrobe/FollowerWardrobe";


function HomePage() {
  return (
    <div>
      <div className="firstSection"> 
      </div>
       
       
       {/* NEW PRODUCT CARD  !!!!!!!!!!! */}
      <main className="wrapper">
  <div className="offers">
  <Link to="" className="wrap-card">
      <div className="offer-card">
        <div className="avatar-card">
          <img src="https://picsum.photos/id/1/200/200" alt="Avatar" className="avatar-card" />
          <span>Username</span>
        </div>
        <div>
          <img src="https://picsum.photos/id/2/400/400" alt="Product" className="product-card" />
        </div>
        <div>
          <p>50 €</p>
          <p>TAILLE</p>
          <p>MARQUE</p>
        </div>
      </div>
</Link>
  </div>
</main>
{/* ////////////////////// */}


        {/* <h1 className="latestProductsText">Latest Products</h1>
        <LatestProducts /> */}



      <div className="secondSection">
        <h1 className="latestProductsText">Wardrobe of Brea</h1>
        <FollowerWardrobe />
      </div>
    </div>
  );
}

export default HomePage;
