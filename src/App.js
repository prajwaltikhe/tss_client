import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./assets/css/index.css";
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductsPage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import ProfilePage from "./pages/ProfilePage";
import ChangePassword from "./pages/ChangePassword";
import WishlistPage from "./pages/WishlistPage";
import CartPage from "./pages/CartPage";
import CatalogPage from "./pages/CatalogPage";
import LooksPage from "./pages/LooksPage";
import ErrorPage from "./pages/ErrorPage";
// import SubCategoryPage from "./pages/SubcategoryPage";
import ShippingAndReturn from './pages/ShippingAndReturn';
import TermsAndCondition from './pages/TermsAndCondition';
import PaymentOptions from './pages/PaymentOptions';
import RewardPoints from './pages/RewardPoints';
import AboutUs from './pages/AboutUs';

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductPage />} />
        {/* <Route path="/products/:subCategory" element={<SubCategoryPage />} /> */}
        <Route path="/productDetails/:pid" element={<ProductDetailsPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/changePassword" element={<ChangePassword />} />
        <Route path="/wishlist" element={<WishlistPage />} />
        <Route path="/cart/carts" element={<CartPage />} />
        <Route path="/catalog" element={<CatalogPage />} />
        <Route path="/catalog/looks/:catalogId" element={<LooksPage />} />
        <Route path="*" element={<ErrorPage />} />
        <Route path="/aboutUs" element={<AboutUs />}></Route>
        <Route
          path="/TermsAndCondition"
          element={<TermsAndCondition />}
        ></Route>
        <Route
          path="/ShippingAndReturns"
          element={<ShippingAndReturn />}
        ></Route>
        <Route path="/PaymentOptions" element={<PaymentOptions />}></Route>
        <Route path="/RewardPoints" element={<RewardPoints />}></Route>
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
