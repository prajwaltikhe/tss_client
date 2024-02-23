import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './assets/css/index.css';
import HomePage from './pages/HomePage';
import CartPage from './pages/CartPage';
import ProductPage from './pages/ProductsPage';
import ProductDetailsPage from './pages/ProductDetailsPage';
import CatalogPage from './pages/CatalogPage';
import LooksPage from './pages/LooksPage';
import ProfilePage from './pages/ProfilePage';
import ChangePassword from './pages/ChangePassword';
import WishlistPage from './pages/WishlistPage';
import ErrorPage from './pages/ErrorPage';
import Header from './components/common/Header';
import Footer from './components/common/Footer';

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/cart/carts" element={<CartPage />} />
        <Route path="/products" element={<ProductPage />} />
        <Route path="/productDetails/:pid" element={<ProductDetailsPage />} />
        <Route path="/catalog/looks/:catalogId" element={<LooksPage />} />
        <Route path="/catalog" element={<CatalogPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/changePassword" element={<ChangePassword />}></Route>
        <Route path="/wishlist" element={<WishlistPage />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
