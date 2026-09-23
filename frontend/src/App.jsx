import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import StoreToolbar from "./components/StoreToolbar";
import Hero from "./components/Hero";
import ProductSection from "./components/ProductSection";

import ProductDetails from "./pages/ProductDetails";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Cart from "./pages/Cart";
import Wishlist from "./pages/Wishlist";
import Checkout from "./pages/Checkout";
import Orders from "./pages/Orders";
import OrderDetails from "./pages/OrderDetails";
import ModeSelection from "./pages/ModeSelection";
import SellerDashboard from "./pages/SellerDashboard";
import AddProduct from "./pages/AddProduct";
import EditProduct from "./pages/EditProduct";
import VerifyOTP from "./pages/VerifyOTP";

function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Gear");

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      <StoreToolbar
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      <Hero />

      <ProductSection
        searchQuery={searchQuery}
        selectedCategory={selectedCategory}
      />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify-otp" element={<VerifyOTP />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/orders/:orderId" element={<OrderDetails />} />

        <Route path="/choose-mode" element={<ModeSelection />} />
        <Route path="/seller" element={<SellerDashboard />} />
        <Route path="/seller/products/add" element={<AddProduct />} />
        <Route
          path="/seller/products/edit/:productId"
          element={<EditProduct />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
