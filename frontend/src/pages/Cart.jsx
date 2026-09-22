import { useState } from "react";
import { Link } from "react-router-dom";

import {
  ArrowLeft,
  Check,
  ChevronRight,
  Minus,
  Plus,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Trash2,
  Truck,
  X,
} from "lucide-react";

import { updateCart, removeFromCart } from "../services/api";
import { useAuth } from "../context/useAuth";

function Cart() {
  const { token, cartItems, refreshCart } = useAuth();

  const [error, setError] = useState("");
  const [updatingId, setUpdatingId] = useState(null);
  const [removingId, setRemovingId] = useState(null);

  const handleRemove = async (productId) => {
    try {
      setError("");
      setRemovingId(productId);

      await removeFromCart(productId, token);

      await refreshCart();
    } catch (error) {
      console.error("Remove cart item error:", error);
      setError(error.message || "Failed to remove item");
    } finally {
      setRemovingId(null);
    }
  };

  const handleQuantityChange = async (productId, newQuantity) => {
    if (newQuantity < 1) return;

    try {
      setError("");
      setUpdatingId(productId);

      await updateCart(productId, newQuantity, token);

      await refreshCart();
    } catch (error) {
      console.error("Quantity update error:", error);
      setError(error.message || "Failed to update quantity");
    } finally {
      setUpdatingId(null);
    }
  };

  const subtotal = cartItems.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0,
  );

  const totalItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0,
  );

  /*
    We are keeping the actual checkout total equal to subtotal
    because your current backend does not calculate shipping,
    discounts, or taxes separately.
  */
  const shipping = 0;
  const discount = 0;
  const total = subtotal + shipping - discount;

  // Free shipping progress UI only.
  const freeShippingTarget = 2000;
  const shippingProgress = Math.min((subtotal / freeShippingTarget) * 100, 100);

  const amountForFreeShipping = Math.max(freeShippingTarget - subtotal, 0);

  if (!token) {
    return (
      <div className="min-h-screen bg-linear-to-br from-slate-50 via-indigo-50/40 to-white px-4 py-16">
        <div className="mx-auto flex min-h-[70vh] max-w-md items-center justify-center">
          <div className="w-full rounded-/[32px] border border-slate-200 bg-white p-10 text-center shadow-[0_20px_70px_rgba(15,23,42,0.08)]">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-indigo-50 text-indigo-600">
              <ShoppingBag size={34} />
            </div>

            <h1 className="mt-6 text-2xl font-black tracking-tight text-slate-950">
              Your cart is waiting
            </h1>

            <p className="mt-3 text-sm leading-6 text-slate-500">
              Sign in to access your cart and continue shopping from where you
              left off.
            </p>

            <Link
              to="/login"
              className="mt-7 inline-flex w-full items-center justify-center rounded-2xl bg-slate-950 px-6 py-3.5 text-sm font-bold text-white transition hover:bg-indigo-600"
            >
              Login to Continue
            </Link>

            <Link
              to="/"
              className="mt-3 inline-flex w-full items-center justify-center rounded-2xl border border-slate-200 px-6 py-3.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-indigo-50/20 to-white px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-/[1400px]">
        {/* Back */}
        <Link
          to="/"
          className="mb-6 inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold text-slate-500 transition hover:bg-white hover:text-slate-900"
        >
          <ArrowLeft size={17} />
          Continue Shopping
        </Link>

        {/* Header */}
        <div className="relative overflow-hidden rounded-/[32px] border border-indigo-100 bg-white p-6 shadow-[0_18px_60px_rgba(79,70,229,0.07)] sm:p-8 lg:p-10">
          <div className="absolute -right-20 -top-24 h-64 w-64 rounded-full bg-indigo-100/60 blur-3xl" />

          <div className="absolute -bottom-28 left-1/3 h-64 w-64 rounded-full bg-blue-100/40 blur-3xl" />

          <div className="relative flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-indigo-50 px-3 py-1.5 text-xs font-bold text-indigo-600">
                <ShoppingBag size={14} />
                Shopping Bag
              </div>

              <h1 className="text-3xl font-black tracking-[-0.04em] text-slate-950 sm:text-4xl lg:text-5xl">
                Your Cart
              </h1>

              <p className="mt-3 max-w-xl text-sm leading-6 text-slate-500 sm:text-base">
                Review your selected products, adjust quantities, and continue
                to secure checkout.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <div className="rounded-2xl bg-slate-50 px-4 py-3">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Products
                  </p>

                  <p className="mt-1 text-lg font-black text-slate-900">
                    {cartItems.length}
                  </p>
                </div>

                <div className="rounded-2xl bg-slate-50 px-4 py-3">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Total Items
                  </p>

                  <p className="mt-1 text-lg font-black text-slate-900">
                    {totalItems}
                  </p>
                </div>

                <div className="rounded-2xl bg-slate-50 px-4 py-3">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Cart Value
                  </p>

                  <p className="mt-1 text-lg font-black text-slate-900">
                    ₹{subtotal.toLocaleString("en-IN")}
                  </p>
                </div>
              </div>
            </div>

            <div className="hidden h-28 w-28 items-center justify-center rounded-[28px] bg-linear-to-br from-indigo-500 to-violet-600 text-white shadow-xl shadow-indigo-200 sm:flex">
              <ShoppingBag size={48} strokeWidth={1.5} />
            </div>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="mt-5 flex items-center gap-3 rounded-2xl border border-red-100 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
            <X size={18} />
            <span>{error}</span>

            <button
              type="button"
              onClick={() => setError("")}
              className="ml-auto rounded-lg p-1 hover:bg-red-100"
            >
              <X size={15} />
            </button>
          </div>
        )}

        {/* Empty cart */}
        {cartItems.length === 0 ? (
          <div className="mt-6 rounded-/[32px] border border-slate-200 bg-white px-6 py-20 text-center shadow-sm">
            <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-[30px] bg-indigo-50 text-indigo-300">
              <ShoppingBag size={42} />
            </div>

            <h2 className="mt-6 text-2xl font-black text-slate-950">
              Your cart is empty
            </h2>

            <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-slate-500">
              Looks like you haven't added anything yet. Discover products and
              add your favorites to your cart.
            </p>

            <Link
              to="/"
              className="mt-7 inline-flex items-center gap-2 rounded-2xl bg-slate-950 px-7 py-3.5 text-sm font-bold text-white transition hover:bg-indigo-600"
            >
              <ShoppingBag size={17} />
              Start Shopping
            </Link>
          </div>
        ) : (
          <>
            {/* Free shipping progress */}
            <div className="mt-6 rounded-2xl border border-indigo-100 bg-white p-5 shadow-sm">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                    <Truck size={19} />
                  </div>

                  <div>
                    {amountForFreeShipping > 0 ? (
                      <>
                        <p className="text-sm font-bold text-slate-800">
                          Add ₹{amountForFreeShipping.toLocaleString("en-IN")}{" "}
                          more for free shipping
                        </p>

                        <p className="mt-0.5 text-xs text-slate-400">
                          Free shipping on orders above ₹2,000
                        </p>
                      </>
                    ) : (
                      <>
                        <p className="flex items-center gap-2 text-sm font-bold text-emerald-600">
                          <Check size={16} />
                          You've unlocked free shipping
                        </p>

                        <p className="mt-0.5 text-xs text-slate-400">
                          Your order qualifies for free delivery.
                        </p>
                      </>
                    )}
                  </div>
                </div>

                <span className="text-xs font-black text-indigo-600">
                  {Math.round(shippingProgress)}%
                </span>
              </div>

              <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-100">
                <div
                  className="h-full rounded-full bg-linear-to-r from-indigo-500 to-violet-500 transition-all duration-500"
                  style={{
                    width: `${shippingProgress}%`,
                  }}
                />
              </div>
            </div>

            {/* Main */}
            <div className="mt-6 grid gap-6 lg:grid-cols-3">
              {/* Cart items */}
              <div className="space-y-4 lg:col-span-2">
                <div className="flex items-center justify-between px-1">
                  <div>
                    <h2 className="text-lg font-black text-slate-950">
                      Cart Items
                    </h2>

                    <p className="mt-1 text-xs text-slate-400">
                      {cartItems.length} product
                      {cartItems.length !== 1 ? "s" : ""}
                    </p>
                  </div>

                  <Link
                    to="/"
                    className="hidden items-center gap-1 text-xs font-bold text-indigo-600 hover:text-indigo-700 sm:flex"
                  >
                    Browse More
                    <ChevronRight size={14} />
                  </Link>
                </div>

                {cartItems.map((item) => {
                  const product = item.product;

                  const itemSubtotal = product.price * item.quantity;

                  const isUpdating = updatingId === product._id;

                  const isRemoving = removingId === product._id;

                  const isOutOfStock =
                    product.stock !== undefined && product.stock <= 0;

                  return (
                    <div
                      key={product._id}
                      className="group relative overflow-hidden rounded-[26px] border border-slate-200 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_45px_rgba(15,23,42,0.08)] sm:p-5"
                    >
                      <div className="flex gap-4 sm:gap-5">
                        {/* Image */}
                        <Link
                          to={`/products/${product._id}`}
                          className="relative h-28 w-28 shrink-0 overflow-hidden rounded-2xl bg-slate-100 sm:h-36 sm:w-36"
                        >
                          <img
                            src={product.thumbnail}
                            alt={product.title}
                            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                          />

                          {product.category && (
                            <span className="absolute bottom-2 left-2 max-w-[80%] truncate rounded-full bg-white/90 px-2 py-1 text-[8px] font-black uppercase tracking-wider text-slate-700 shadow-sm backdrop-blur">
                              {product.category}
                            </span>
                          )}
                        </Link>

                        {/* Details */}
                        <div className="min-w-0 flex-1">
                          <div className="flex justify-between gap-3">
                            <div className="min-w-0">
                              {product.brand && (
                                <p className="text-[9px] font-black uppercase tracking-[0.15em] text-indigo-500">
                                  {product.brand}
                                </p>
                              )}

                              <Link to={`/products/${product._id}`}>
                                <h3 className="mt-1 line-clamp-2 text-sm font-black leading-5 text-slate-900 transition hover:text-indigo-600 sm:text-base">
                                  {product.title}
                                </h3>
                              </Link>
                            </div>

                            <button
                              type="button"
                              onClick={() => handleRemove(product._id)}
                              disabled={isRemoving}
                              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-slate-300 transition hover:bg-red-50 hover:text-red-500 disabled:opacity-50"
                              title="Remove item"
                            >
                              {isRemoving ? (
                                <X size={17} />
                              ) : (
                                <Trash2 size={17} />
                              )}
                            </button>
                          </div>

                          {/* Stock */}
                          <div className="mt-2">
                            {isOutOfStock ? (
                              <span className="text-[10px] font-bold text-red-500">
                                Currently unavailable
                              </span>
                            ) : product.stock !== undefined ? (
                              <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-600">
                                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                                In stock
                              </span>
                            ) : (
                              <span className="text-[10px] font-semibold text-slate-400">
                                Available
                              </span>
                            )}
                          </div>

                          <div className="mt-4 flex flex-wrap items-end justify-between gap-4">
                            {/* Price */}
                            <div>
                              <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">
                                Unit Price
                              </p>

                              <p className="mt-0.5 text-base font-black text-slate-950">
                                ₹{product.price.toLocaleString("en-IN")}
                              </p>
                            </div>

                            {/* Quantity */}
                            <div>
                              <p className="mb-1.5 text-[9px] font-bold uppercase tracking-wider text-slate-400">
                                Quantity
                              </p>

                              <div className="flex h-9 items-center rounded-xl border border-slate-200 bg-slate-50 p-1">
                                <button
                                  type="button"
                                  onClick={() =>
                                    handleQuantityChange(
                                      product._id,
                                      item.quantity - 1,
                                    )
                                  }
                                  disabled={item.quantity <= 1 || isUpdating}
                                  className="flex h-7 w-7 items-center justify-center rounded-lg text-slate-600 transition hover:bg-white hover:text-indigo-600 disabled:cursor-not-allowed disabled:opacity-30"
                                >
                                  <Minus size={14} />
                                </button>

                                <span className="w-8 text-center text-xs font-black text-slate-800">
                                  {isUpdating ? "..." : item.quantity}
                                </span>

                                <button
                                  type="button"
                                  onClick={() =>
                                    handleQuantityChange(
                                      product._id,
                                      item.quantity + 1,
                                    )
                                  }
                                  disabled={
                                    isUpdating ||
                                    (product.stock !== undefined &&
                                      item.quantity >= product.stock)
                                  }
                                  className="flex h-7 w-7 items-center justify-center rounded-lg text-slate-600 transition hover:bg-white hover:text-indigo-600 disabled:cursor-not-allowed disabled:opacity-30"
                                >
                                  <Plus size={14} />
                                </button>
                              </div>
                            </div>

                            {/* Item total */}
                            <div className="ml-auto text-right">
                              <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">
                                Item Total
                              </p>

                              <p className="mt-0.5 text-lg font-black text-slate-950">
                                ₹{itemSubtotal.toLocaleString("en-IN")}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Summary */}
              <div className="lg:col-span-1">
                <div className="sticky top-24 space-y-4">
                  <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_15px_50px_rgba(15,23,42,0.07)]">
                    {/* Summary heading */}
                    <div className="border-b border-slate-100 p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-[10px] font-black uppercase tracking-[0.16em] text-indigo-500">
                            Checkout
                          </p>

                          <h2 className="mt-1 text-xl font-black text-slate-950">
                            Order Summary
                          </h2>
                        </div>

                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                          <Sparkles size={18} />
                        </div>
                      </div>
                    </div>

                    {/* Amounts */}
                    <div className="p-6">
                      <div className="space-y-4">
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-500">Subtotal</span>

                          <span className="font-bold text-slate-800">
                            ₹{subtotal.toLocaleString("en-IN")}
                          </span>
                        </div>

                        <div className="flex justify-between text-sm">
                          <span className="text-slate-500">Shipping</span>

                          <span className="font-bold text-emerald-600">
                            Free
                          </span>
                        </div>

                        <div className="flex justify-between text-sm">
                          <span className="text-slate-500">Discount</span>

                          <span className="font-bold text-slate-400">₹0</span>
                        </div>
                      </div>

                      <div className="my-5 border-t border-dashed border-slate-200" />

                      <div className="flex items-end justify-between">
                        <div>
                          <p className="text-xs font-bold text-slate-400">
                            Total
                          </p>

                          <p className="mt-1 text-2xl font-black tracking-tight text-slate-950">
                            ₹{total.toLocaleString("en-IN")}
                          </p>
                        </div>

                        <span className="rounded-full bg-emerald-50 px-3 py-1 text-[9px] font-black uppercase tracking-wider text-emerald-600">
                          Free Delivery
                        </span>
                      </div>

                      <Link
                        to="/checkout"
                        className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-slate-950 py-3.5 text-sm font-bold text-white shadow-lg shadow-slate-200 transition-all duration-200 hover:bg-indigo-600 hover:shadow-indigo-200"
                      >
                        Proceed to Checkout
                        <ChevronRight size={17} />
                      </Link>

                      <Link
                        to="/"
                        className="mt-3 flex w-full items-center justify-center rounded-2xl border border-slate-200 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 hover:text-slate-950"
                      >
                        Continue Shopping
                      </Link>
                    </div>
                  </div>

                  {/* Trust */}
                  <div className="rounded-/[24px] border border-slate-200 bg-white p-5">
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                          <ShieldCheck size={17} />
                        </div>

                        <div>
                          <p className="text-xs font-bold text-slate-800">
                            Secure Checkout
                          </p>

                          <p className="text-[10px] text-slate-400">
                            Your order is protected
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                          <Truck size={17} />
                        </div>

                        <div>
                          <p className="text-xs font-bold text-slate-800">
                            Reliable Delivery
                          </p>

                          <p className="text-[10px] text-slate-400">
                            Track your order after checkout
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
                          <Check size={17} />
                        </div>

                        <div>
                          <p className="text-xs font-bold text-slate-800">
                            Easy Order Management
                          </p>

                          <p className="text-[10px] text-slate-400">
                            View and manage orders anytime
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Cart;
