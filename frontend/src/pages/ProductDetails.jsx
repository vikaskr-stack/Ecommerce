import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  ShoppingCart,
  Plus,
  Minus,
  Heart,
  ShieldCheck,
  Truck,
  RotateCcw,
  Check,
  Package,
} from "lucide-react";

import {
  getProductById,
  addToCart,
  addToWishlist,
  removeFromWishlist,
} from "../services/api";

import { useAuth } from "../context/useAuth";

function ProductDetails() {
  const { id } = useParams();

  const { token, refreshCart, wishlistItems, refreshWishlist } = useAuth();

  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  const [wishlistLoading, setWishlistLoading] = useState(false);

  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const loadProduct = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getProductById(id);
        setProduct(data);
      } catch (error) {
        console.error(error);
        setError("Unable to load product.");
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [id]);

  const isWishlisted = wishlistItems.some((item) => item._id === product?._id);

  const handleIncrease = () => {
    if (!product) return;

    setQuantity((current) => Math.min(current + 1, product.stock));
  };

  const handleDecrease = () => {
    setQuantity((current) => Math.max(current - 1, 1));
  };

  const handleAddToCart = async () => {
    if (!token) {
      setMessage("Please login first.");
      return;
    }

    try {
      setAdding(true);
      setMessage("");

      await addToCart(product._id, quantity, token);
      await refreshCart();

      setMessage("Product added to cart!");
    } catch (error) {
      console.error(error);
      setMessage(error.message || "Failed to add product.");
    } finally {
      setAdding(false);
    }
  };

  const handleWishlist = async () => {
    if (!token) {
      setMessage("Please login first.");
      return;
    }

    try {
      setWishlistLoading(true);
      setMessage("");

      if (isWishlisted) {
        await removeFromWishlist(product._id, token);
        setMessage("Removed from wishlist.");
      } else {
        await addToWishlist(product._id, token);
        setMessage("Added to wishlist!");
      }

      await refreshWishlist();
    } catch (error) {
      console.error("Wishlist error:", error);
      setMessage(error.message || "Wishlist action failed.");
    } finally {
      setWishlistLoading(false);
    }
  };

  const messageIsSuccess =
    message.includes("added") ||
    message.includes("Added") ||
    message.includes("Saved");

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f6f8ff]">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="h-5 w-32 animate-pulse rounded bg-slate-200" />

          <div className="mt-8 grid gap-8 lg:grid-cols-2">
            <div className="h-/[520px] animate-pulse linear-[2rem] bg-white border border-slate-200" />

            <div className="space-y-5">
              <div className="h-5 w-28 animate-pulse rounded bg-slate-200" />
              <div className="h-12 w-3/4 animate-pulse rounded-xl bg-slate-200" />
              <div className="h-8 w-32 animate-pulse rounded bg-slate-200" />
              <div className="h-24 w-full animate-pulse rounded-xl bg-slate-200" />
              <div className="h-14 w-full animate-pulse rounded-xl bg-slate-200" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-[#f6f8ff] flex items-center justify-center px-6">
        <div className="w-full max-w-md rounded-/[2rem] border border-slate-200 bg-white p-8 text-center shadow-sm">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50">
            <Package className="text-red-500" size={25} />
          </div>

          <h2 className="mt-5 text-xl font-black text-slate-950">
            Product unavailable
          </h2>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            {error || "Product not found."}
          </p>

          <Link
            to="/"
            className="mt-6 inline-flex items-center justify-center gap-2 rounded-xl bg-slate-950 px-5 py-3 text-sm font-bold text-white transition hover:bg-indigo-600"
          >
            <ArrowLeft size={17} />
            Back to Store
          </Link>
        </div>
      </div>
    );
  }

  const outOfStock = product.stock === 0;

  return (
    <div className="min-h-screen bg-[#f6f8ff]">
      {/* Header */}
      <header className="border-b border-slate-200/80 bg-white/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-linear-to-br from-indigo-500 to-violet-600 shadow-sm transition group-hover:scale-105">
              <ShoppingCart size={17} className="text-white" />
            </div>

            <span className="font-black tracking-tight text-slate-950 transition group-hover:text-indigo-600">
              AURA
            </span>
          </Link>

          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-600 transition hover:border-indigo-200 hover:text-indigo-600"
          >
            <ArrowLeft size={16} />
            <span className="hidden sm:inline">Back to Store</span>
            <span className="sm:hidden">Back</span>
          </Link>
        </div>
      </header>

      {/* Main */}
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
        {/* Breadcrumb */}
        <div className="mb-7 flex items-center gap-2 text-sm">
          <Link
            to="/"
            className="text-slate-500 transition hover:text-indigo-600"
          >
            Store
          </Link>

          <span className="text-slate-300">/</span>

          <span className="max-w-/[220px] truncate font-medium text-slate-700">
            {product.title}
          </span>
        </div>

        {/* Product section */}
        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          {/* Product Image */}
          <div className="relative overflow-hidden rounded-/[2rem] border border-slate-200 bg-white p-5 shadow-sm sm:p-8">
            {/* Decorative glow */}
            <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-indigo-100/60 blur-3xl" />

            <div className="relative flex min-h-/[420px] items-center justify-center rounded-/[1.5rem] bg-linear-to-br from-slate-50 to-indigo-50/50 p-8 sm:min-h-/[540px]">
              <img
                src={product.thumbnail}
                alt={product.title}
                className="max-h-/[460px] w-full object-contain drop-shadow-xl transition duration-500 hover:scale-[1.03]"
              />

              {outOfStock && (
                <div className="absolute left-5 top-5 rounded-full bg-red-500 px-3 py-1.5 text-xs font-bold text-white shadow-sm">
                  Out of Stock
                </div>
              )}

              {!outOfStock && product.stock <= 5 && (
                <div className="absolute left-5 top-5 rounded-full bg-amber-100 px-3 py-1.5 text-xs font-bold text-amber-700">
                  Only {product.stock} left
                </div>
              )}
            </div>
          </div>

          {/* Product Information */}
          <div className="flex flex-col">
            {/* Category */}
            <div className="flex items-center gap-3">
              <span className="rounded-full bg-indigo-50 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-indigo-600">
                {product.category}
              </span>

              {product.rating !== undefined && (
                <span className="flex items-center gap-1 text-sm font-semibold text-slate-600">
                  <span className="text-amber-500">★</span>
                  {product.rating}
                </span>
              )}
            </div>

            {/* Title */}
            <h1 className="mt-4 text-3xl font-black leading-tight tracking-tight text-slate-950 sm:text-4xl">
              {product.title}
            </h1>

            {/* Brand */}
            {product.brand && (
              <p className="mt-3 text-sm text-slate-500">
                by{" "}
                <span className="font-semibold text-slate-700">
                  {product.brand}
                </span>
              </p>
            )}

            {/* Price */}
            <div className="mt-7">
              <span className="text-4xl font-black tracking-tight text-slate-950">
                ₹{product.price.toLocaleString("en-IN")}
              </span>
            </div>

            {/* Description */}
            <div className="mt-7 border-t border-slate-200 pt-6">
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900">
                About this product
              </h2>

              <p className="mt-3 text-[15px] leading-7 text-slate-600">
                {product.description}
              </p>
            </div>

            {/* Stock */}
            <div className="mt-6 flex items-center gap-2">
              <div
                className={`h-2 w-2 rounded-full ${
                  outOfStock
                    ? "bg-red-500"
                    : product.stock <= 5
                      ? "bg-amber-500"
                      : "bg-emerald-500"
                }`}
              />

              <span
                className={`text-sm font-semibold ${
                  outOfStock
                    ? "text-red-600"
                    : product.stock <= 5
                      ? "text-amber-600"
                      : "text-emerald-600"
                }`}
              >
                {outOfStock
                  ? "Currently unavailable"
                  : product.stock <= 5
                    ? `Only ${product.stock} left in stock`
                    : "In stock and ready to ship"}
              </span>
            </div>

            {/* Quantity + Cart */}
            {!outOfStock && (
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                {/* Quantity */}
                <div className="flex h-12 items-center justify-between rounded-xl border border-slate-200 bg-white px-2 sm:w-36">
                  <button
                    onClick={handleDecrease}
                    disabled={quantity <= 1}
                    className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 transition hover:bg-slate-100 hover:text-slate-950 disabled:cursor-not-allowed disabled:opacity-30"
                  >
                    <Minus size={17} />
                  </button>

                  <span className="min-w-8 text-center text-sm font-bold text-slate-950">
                    {quantity}
                  </span>

                  <button
                    onClick={handleIncrease}
                    disabled={quantity >= product.stock}
                    className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 transition hover:bg-slate-100 hover:text-slate-950 disabled:cursor-not-allowed disabled:opacity-30"
                  >
                    <Plus size={17} />
                  </button>
                </div>

                {/* Add to cart */}
                <button
                  onClick={handleAddToCart}
                  disabled={adding}
                  className="flex h-12 flex-1 items-center justify-center gap-2 rounded-xl bg-slate-950 px-6 text-sm font-bold text-white shadow-lg shadow-slate-950/10 transition hover:bg-indigo-600 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <ShoppingCart size={18} />

                  {adding ? "Adding..." : "Add to Cart"}
                </button>
              </div>
            )}

            {/* Wishlist */}
            <button
              onClick={handleWishlist}
              disabled={wishlistLoading}
              className={`mt-3 flex h-12 w-full items-center justify-center gap-2 rounded-xl border text-sm font-bold transition disabled:cursor-not-allowed disabled:opacity-60 ${
                isWishlisted
                  ? "border-red-200 bg-red-50 text-red-600 hover:bg-red-100"
                  : "border-slate-200 bg-white text-slate-700 hover:border-red-200 hover:bg-red-50 hover:text-red-600"
              }`}
            >
              <Heart size={18} fill={isWishlisted ? "currentColor" : "none"} />

              {wishlistLoading
                ? "Updating..."
                : isWishlisted
                  ? "Saved to Wishlist"
                  : "Save to Wishlist"}
            </button>

            {/* Message */}
            {message && (
              <div
                className={`mt-4 flex items-center gap-2 rounded-xl border px-4 py-3 text-sm font-semibold ${
                  messageIsSuccess
                    ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                    : "border-red-200 bg-red-50 text-red-600"
                }`}
              >
                {messageIsSuccess ? <Check size={17} /> : <span>!</span>}

                {message}
              </div>
            )}

            {/* Benefits */}
            <div className="mt-7 grid gap-3 border-t border-slate-200 pt-6 sm:grid-cols-3">
              <div className="rounded-xl bg-white p-3.5">
                <Truck size={19} className="text-indigo-600" />
                <p className="mt-2 text-xs font-bold text-slate-900">
                  Fast Delivery
                </p>
                <p className="mt-1 text-[11px] leading-4 text-slate-500">
                  Reliable doorstep delivery
                </p>
              </div>

              <div className="rounded-xl bg-white p-3.5">
                <ShieldCheck size={19} className="text-indigo-600" />
                <p className="mt-2 text-xs font-bold text-slate-900">
                  Secure Checkout
                </p>
                <p className="mt-1 text-[11px] leading-4 text-slate-500">
                  Your data stays protected
                </p>
              </div>

              <div className="rounded-xl bg-white p-3.5">
                <RotateCcw size={19} className="text-indigo-600" />
                <p className="mt-2 text-xs font-bold text-slate-900">
                  Easy Support
                </p>
                <p className="mt-1 text-[11px] leading-4 text-slate-500">
                  Simple order assistance
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom information */}
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50">
                <Package size={19} className="text-indigo-600" />
              </div>

              <div>
                <p className="text-sm font-bold text-slate-950">
                  Product Information
                </p>
                <p className="mt-0.5 text-xs text-slate-500">
                  Genuine product details
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-50">
                <Truck size={19} className="text-violet-600" />
              </div>

              <div>
                <p className="text-sm font-bold text-slate-950">Delivery</p>
                <p className="mt-0.5 text-xs text-slate-500">
                  Delivered to your doorstep
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50">
                <ShieldCheck size={19} className="text-emerald-600" />
              </div>

              <div>
                <p className="text-sm font-bold text-slate-950">
                  Secure Shopping
                </p>
                <p className="mt-0.5 text-xs text-slate-500">
                  Safe and protected checkout
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default ProductDetails;
