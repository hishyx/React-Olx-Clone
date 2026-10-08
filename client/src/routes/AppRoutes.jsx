import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "../pages/Login/LoginPage.jsx";
import ProductsPage from "../pages/Products/ProductsPage.jsx";
import SellPage from "../pages/Sell/SellPage.jsx";
import CartPage from "../pages/Cart/CartPage.jsx";
import CheckoutPage from "../pages/Checkout/CheckoutPage.jsx";
import ProtectedRoutes from "../components/ProtectedRoutes.jsx";

function AppRoutes() {
  return (
    <Routes>
      {/* Login */}
      <Route path="/login" element={<LoginPage />} />

      {/* Marketplace Pages */}
      <Route element={<ProtectedRoutes />}>
        <Route path="/products" element={<ProductsPage />} />

        <Route path="/sell" element={<SellPage />} />

        <Route path="/cart" element={<CartPage />} />

        <Route path="/checkout" element={<CheckoutPage />} />
      </Route>

      {/* Redirects */}
      <Route path="/" element={<Navigate to="/products" replace />} />
      <Route path="*" element={<Navigate to="/products" replace />} />
    </Routes>
  );
}

export default AppRoutes;
