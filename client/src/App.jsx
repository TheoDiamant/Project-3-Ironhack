import "./App.css";

import { Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage/HomePage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import SignupPage from "./pages/SignupPage/SignupPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import EditProfilePage from "./pages/EditProfilePage/EditProfilePage";

import Navbar from "./components/Navbar/Navbar";
import IsPrivate from "./components/IsPrivate/IsPrivate";
import IsAnon from "./components/IsAnon/IsAnon";

import ProductsListPage from "./pages/ProductsListPage/ProductsListPage";
import AddProduct from "./pages/AddProduct/AddProduct"
import ProductDetailPage from "./pages/ProductDetailPage/ProductDetailPage"
import EditProductPage from "./pages/EditProductPage/EditProductPage"
import UnderNavBar from "./components/UnderNavbar/UnderNavbar";

import WomanProducts from "./pages/WomanProducts/WomanProducts";
import MenProducts from "./pages/MenProducts/MenProducts";

import FavoriteProducts from "./pages/FavoriteProducts/FavoriteProducts";

/// IMPORT for New routes for chat 


function App() {
  return (
    <div className="App">
    
      <Navbar />
      <UnderNavBar />

      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route
          path="/member/:userId"
          element={
            <IsPrivate>
              <ProfilePage />
            </IsPrivate>
          }
        />
        <Route
          path="/member/:userId/edit"
          element={
            <IsPrivate>
              <EditProfilePage />
            </IsPrivate>
          }
        />

        <Route
          path="/signup"
          element={
            <IsAnon>
              <SignupPage />
            </IsAnon>
          }
        />
        <Route
          path="/login"
          element={
            <IsAnon>
              <LoginPage />
            </IsAnon>
          }
        />

        <Route path="/products" element={<ProductsListPage />}/>

        <Route path="/new-product" element={<AddProduct />} />

        <Route path="/products/:productId" element={<ProductDetailPage />} />

        <Route path="/products/:productId/edit" element={<EditProductPage />} />

        <Route path="/products/women" element={<WomanProducts />} />
        <Route path="/products/men" element={<MenProducts />} />


        <Route path="/favorite" element={<FavoriteProducts />} />

      

      </Routes>
    </div>
  );
}

export default App;
