import { ShoppingCart } from "lucide-react";
import { addToCart } from "../services/api";
import { useAuth } from "../context/useAuth";
import { useState } from "react";
import { Link } from "react-router-dom";

function ProductCard({ product }) {
  const { token, refreshCart } = useAuth();

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAddToCart = async () => {
    if (!token) {
      setMessage("Please login first");
      return;
    }

    try {
      setLoading(true);
      setMessage("");

      // Add product to backend
      await addToCart(product._id, 1, token);

      // Get latest cart immediately
      await refreshCart();

      setMessage("Added to cart!");
    } catch (error) {
      console.error("Add to cart error:", error);

      setMessage(error.message || "Failed to add to cart");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow">
      {/* Image */}
      <div className="h-56 bg-gray-100 flex items-center justify-center">
        <Link to={`/products/${product._id}`}>
          <img
            src={product.thumbnail}
            alt={product.title}
            className="w-full h-full object-cover"
          />
        </Link>
      </div>

      {/* Details */}
      <div className="p-5">
        <p className="text-xs text-gray-500 uppercase tracking-wide">
          {product.category}
        </p>

        <Link to={`/products/${product._id}`}>
          <h3 className="text-lg font-semibold text-gray-900 mt-1 hover:text-blue-600">
            {product.title}
          </h3>
        </Link>

        {product.brand && (
          <p className="text-sm text-gray-500 mt-1">{product.brand}</p>
        )}

        <div className="flex items-center justify-between mt-4">
          <p className="text-xl font-bold text-gray-900">
            ₹{product.price.toLocaleString("en-IN")}
          </p>

          <button
            onClick={handleAddToCart}
            disabled={loading}
            className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
          >
            <ShoppingCart size={17} />

            {loading ? "Adding..." : "Add to Cart"}
          </button>
        </div>

        {message && (
          <p
            className={`text-sm mt-3 ${
              message === "Added to cart!" ? "text-green-600" : "text-red-500"
            }`}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
}

export default ProductCard;
