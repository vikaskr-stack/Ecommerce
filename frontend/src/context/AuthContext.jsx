import { createContext, useEffect, useState } from "react";
import { getCart, getWishlist } from "../services/api";

export const AuthContext = createContext(null);

function AuthProvider({ children }) {
  const [token, setToken] = useState(() => {
    return localStorage.getItem("token");
  });

  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem("user");

      if (!savedUser) {
        return null;
      }

      return JSON.parse(savedUser);
    } catch (error) {
      console.error("Invalid user data in localStorage:", error);
      localStorage.removeItem("user");
      return null;
    }
  });

  const [cartItems, setCartItems] = useState([]);
  const [wishlistItems, setWishlistItems] = useState([]);

  const refreshCart = async () => {
    if (!token) {
      setCartItems([]);
      return;
    }

    try {
      const result = await getCart(token);
      setCartItems(result.data?.items || []);
    } catch (error) {
      console.error("Failed to refresh cart:", error);
      setCartItems([]);
    }
  };

  const refreshWishlist = async () => {
    if (!token) {
      setWishlistItems([]);
      return;
    }

    try {
      const result = await getWishlist(token);
      setWishlistItems(result.data?.products || []);
    } catch (error) {
      console.error("Failed to refresh wishlist:", error);
      setWishlistItems([]);
    }
  };

  useEffect(() => {
    if (!token) {
      setCartItems([]);
      setWishlistItems([]);
      return;
    }

    refreshCart();
    refreshWishlist();
  }, [token]);

  const login = (newToken, userData) => {
    localStorage.setItem("token", newToken);
    localStorage.setItem("user", JSON.stringify(userData));

    setToken(newToken);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setToken(null);
    setUser(null);
    setCartItems([]);
    setWishlistItems([]);
  };

  const isLoggedIn = Boolean(token);

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        login,
        logout,
        isLoggedIn,

        cartItems,
        setCartItems,
        refreshCart,

        wishlistItems,
        setWishlistItems,
        refreshWishlist,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
