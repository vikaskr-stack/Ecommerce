import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  ArrowLeft,
  Check,
  CheckCircle,
  ChevronRight,
  CreditCard,
  Home,
  Lock,
  MapPin,
  ShieldCheck,
  ShoppingBag,
  Truck,
  User,
} from "lucide-react";

import { createOrder } from "../services/api";
import { useAuth } from "../context/useAuth";

function Checkout() {
  const navigate = useNavigate();

  const { token, cartItems } = useAuth();

  const [formData, setFormData] = useState({
    fullName: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  const [paymentMethod, setPaymentMethod] = useState("COD");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const subtotal = cartItems.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0,
  );

  const shipping = 0;
  const total = subtotal + shipping;

  const totalItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0,
  );

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    if (!token) {
      navigate("/login");
      return;
    }

    if (cartItems.length === 0) {
      setError("Your cart is empty.");
      return;
    }

    if (!/^\d{6}$/.test(formData.pincode)) {
      setError("Please enter a valid 6-digit pincode.");
      return;
    }

    try {
      setLoading(true);

      const result = await createOrder(
        {
          shippingAddress: formData,
          paymentMethod,
        },
        token,
      );

      const orderId = result.data._id;

      navigate(`/orders/${orderId}`);
    } catch (error) {
      console.error("Create order error:", error);
      setError(error.message || "Failed to place order");
    } finally {
      setLoading(false);
    }
  };

  if (!token) {
    return (
      <div className="min-h-screen bg-linear-to-br from-slate-50 via-indigo-50/40 to-white px-4 py-16">
        <div className="mx-auto flex min-h-[70vh] max-w-md items-center justify-center">
          <div className="w-full rounded-/[32px] border border-slate-200 bg-white p-10 text-center shadow-[0_20px_70px_rgba(15,23,42,0.08)]">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-indigo-50 text-indigo-600">
              <Lock size={32} />
            </div>

            <h1 className="mt-6 text-2xl font-black tracking-tight text-slate-950">
              Login required
            </h1>

            <p className="mt-3 text-sm leading-6 text-slate-500">
              Please sign in before continuing to checkout.
            </p>

            <Link
              to="/login"
              className="mt-7 inline-flex w-full items-center justify-center rounded-2xl bg-slate-950 px-6 py-3.5 text-sm font-bold text-white transition hover:bg-indigo-600"
            >
              Login to Continue
            </Link>

            <Link
              to="/cart"
              className="mt-3 inline-flex w-full items-center justify-center rounded-2xl border border-slate-200 px-6 py-3.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              Back to Cart
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-linear-to-br from-slate-50 via-indigo-50/40 to-white px-4 py-16">
        <div className="mx-auto flex min-h-[70vh] max-w-md items-center justify-center">
          <div className="w-full rounded-/[32px] border border-slate-200 bg-white p-10 text-center shadow-sm">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-indigo-50 text-indigo-500">
              <ShoppingBag size={34} />
            </div>

            <h1 className="mt-6 text-2xl font-black text-slate-950">
              Your cart is empty
            </h1>

            <p className="mt-3 text-sm leading-6 text-slate-500">
              Add some products to your cart before proceeding to checkout.
            </p>

            <Link
              to="/"
              className="mt-7 inline-flex w-full items-center justify-center rounded-2xl bg-slate-950 px-6 py-3.5 text-sm font-bold text-white transition hover:bg-indigo-600"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-indigo-50/20 to-white">
      {/* Header */}
      <header className="border-b border-slate-200/70 bg-white/90 backdrop-blur-xl">
        <div className="mx-auto max-w-/[1400px] px-4 py-5 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Link
                to="/cart"
                className="flex h-10 w-10 items-center justify-center rounded-xl text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
              >
                <ArrowLeft size={19} />
              </Link>

              <div>
                <div className="flex items-center gap-2">
                  <ShoppingBag size={18} className="text-indigo-600" />

                  <h1 className="text-xl font-black tracking-tight text-slate-950 sm:text-2xl">
                    Checkout
                  </h1>
                </div>

                <p className="mt-0.5 text-xs text-slate-400">
                  Complete your order securely
                </p>
              </div>
            </div>

            <div className="hidden items-center gap-2 rounded-full bg-emerald-50 px-3 py-2 text-xs font-bold text-emerald-600 sm:flex">
              <ShieldCheck size={15} />
              Secure Checkout
            </div>
          </div>

          {/* Steps */}
          <div className="mx-auto mt-8 flex max-w-2xl items-center">
            {/* Step 1 */}
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-950 text-xs font-bold text-white shadow-lg shadow-slate-200">
                1
              </div>

              <span className="hidden text-xs font-bold text-slate-900 sm:block">
                Shipping
              </span>
            </div>

            <div className="mx-3 h-px flex-1 bg-slate-200 sm:mx-5">
              <div className="h-full w-1/2 bg-slate-950" />
            </div>

            {/* Step 2 */}
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-full border border-indigo-200 bg-indigo-50 text-indigo-600">
                2
              </div>

              <span className="hidden text-xs font-semibold text-slate-600 sm:block">
                Payment
              </span>
            </div>

            <div className="mx-3 h-px flex-1 bg-slate-200 sm:mx-5" />

            {/* Step 3 */}
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-xs font-semibold text-slate-400">
                3
              </div>

              <span className="hidden text-xs font-semibold text-slate-400 sm:block">
                Confirmation
              </span>
            </div>
          </div>
        </div>
      </header>

      <form onSubmit={handleSubmit}>
        <main className="mx-auto max-w-/[1400px] px-4 py-8 sm:px-6 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-3">
            {/* LEFT */}
            <div className="space-y-5 lg:col-span-2">
              {/* Shipping Address */}
              <section className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
                    <MapPin size={20} />
                  </div>

                  <div>
                    <h2 className="text-lg font-black text-slate-950">
                      Shipping Address
                    </h2>

                    <p className="mt-1 text-xs leading-5 text-slate-400">
                      Tell us where you'd like your order delivered.
                    </p>
                  </div>
                </div>

                <div className="mt-7 grid gap-5 md:grid-cols-2">
                  {/* Name */}
                  <div className="md:col-span-2">
                    <label className="mb-2 flex items-center gap-2 text-xs font-bold text-slate-700">
                      <User size={14} />
                      Full Name
                    </label>

                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="Enter your full name"
                      required
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-indigo-300 focus:bg-white focus:ring-4 focus:ring-indigo-50"
                    />
                  </div>

                  {/* Address */}
                  <div className="md:col-span-2">
                    <label className="mb-2 flex items-center gap-2 text-xs font-bold text-slate-700">
                      <Home size={14} />
                      Address
                    </label>

                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      placeholder="House number, street, area"
                      required
                      rows="3"
                      className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-indigo-300 focus:bg-white focus:ring-4 focus:ring-indigo-50"
                    />
                  </div>

                  {/* City */}
                  <div>
                    <label className="mb-2 block text-xs font-bold text-slate-700">
                      City
                    </label>

                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      placeholder="Enter city"
                      required
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-indigo-300 focus:bg-white focus:ring-4 focus:ring-indigo-50"
                    />
                  </div>

                  {/* State */}
                  <div>
                    <label className="mb-2 block text-xs font-bold text-slate-700">
                      State
                    </label>

                    <input
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      placeholder="Enter state"
                      required
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-indigo-300 focus:bg-white focus:ring-4 focus:ring-indigo-50"
                    />
                  </div>

                  {/* Pincode */}
                  <div>
                    <label className="mb-2 block text-xs font-bold text-slate-700">
                      Pincode
                    </label>

                    <input
                      type="text"
                      name="pincode"
                      value={formData.pincode}
                      onChange={(e) => {
                        const value = e.target.value
                          .replace(/\D/g, "")
                          .slice(0, 6);

                        setFormData((previous) => ({
                          ...previous,
                          pincode: value,
                        }));
                      }}
                      placeholder="6 digit pincode"
                      inputMode="numeric"
                      maxLength={6}
                      required
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-indigo-300 focus:bg-white focus:ring-4 focus:ring-indigo-50"
                    />
                  </div>
                </div>
              </section>

              {/* Delivery */}
              <section className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
                    <Truck size={20} />
                  </div>

                  <div>
                    <h2 className="text-lg font-black text-slate-950">
                      Delivery
                    </h2>

                    <p className="mt-1 text-xs text-slate-400">
                      Choose your delivery option.
                    </p>
                  </div>
                </div>

                <div className="mt-6 rounded-2xl border border-indigo-200 bg-indigo-50/50 p-4">
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-indigo-600 shadow-sm">
                      <CheckCircle size={19} />
                    </div>

                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="text-sm font-bold text-slate-900">
                          Standard Delivery
                        </p>

                        <span className="rounded-full bg-emerald-100 px-2 py-1 text-[9px] font-black uppercase tracking-wider text-emerald-600">
                          Free
                        </span>
                      </div>

                      <p className="mt-1 text-xs text-slate-500">
                        Estimated delivery in 3–7 business days
                      </p>
                    </div>

                    <Check size={19} className="text-indigo-600" />
                  </div>
                </div>
              </section>

              {/* Payment */}
              <section className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-violet-50 text-violet-600">
                    <CreditCard size={20} />
                  </div>

                  <div>
                    <h2 className="text-lg font-black text-slate-950">
                      Payment Method
                    </h2>

                    <p className="mt-1 text-xs text-slate-400">
                      Select your preferred payment method.
                    </p>
                  </div>
                </div>

                <div className="mt-6 space-y-3">
                  {/* COD */}
                  <label
                    className={`block cursor-pointer rounded-2xl border p-4 transition-all ${
                      paymentMethod === "COD"
                        ? "border-slate-950 bg-slate-50 shadow-sm"
                        : "border-slate-200 hover:border-slate-300"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="COD"
                        checked={paymentMethod === "COD"}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="h-4 w-4 accent-slate-950"
                      />

                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-slate-700 shadow-sm">
                        <Truck size={18} />
                      </div>

                      <div className="flex-1">
                        <p className="text-sm font-bold text-slate-900">
                          Cash on Delivery
                        </p>

                        <p className="mt-1 text-xs text-slate-500">
                          Pay when your order arrives
                        </p>
                      </div>

                      {paymentMethod === "COD" && (
                        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-950 text-white">
                          <Check size={14} />
                        </div>
                      )}
                    </div>
                  </label>

                  {/* Online */}
                  <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4 opacity-60">
                    <div className="flex items-center gap-4">
                      <div className="flex h-4 w-4 items-center justify-center rounded-full border border-slate-300" />

                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-slate-500 shadow-sm">
                        <CreditCard size={18} />
                      </div>

                      <div className="flex-1">
                        <p className="text-sm font-bold text-slate-800">
                          Online Payment
                        </p>

                        <p className="mt-1 text-xs text-slate-500">
                          Card, UPI and other online payments
                        </p>
                      </div>

                      <span className="rounded-full bg-slate-200 px-3 py-1 text-[9px] font-black uppercase tracking-wider text-slate-500">
                        Coming Soon
                      </span>
                    </div>
                  </div>
                </div>
              </section>

              {/* Error */}
              {error && (
                <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-4 text-sm font-medium text-red-600">
                  {error}
                </div>
              )}
            </div>

            {/* RIGHT */}
            <div>
              <div className="sticky top-6 space-y-4">
                {/* Order Summary */}
                <section className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_15px_50px_rgba(15,23,42,0.07)]">
                  <div className="border-b border-slate-100 p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-[10px] font-black uppercase tracking-[0.16em] text-indigo-500">
                          Your Order
                        </p>

                        <h2 className="mt-1 text-xl font-black text-slate-950">
                          Order Summary
                        </h2>
                      </div>

                      <span className="rounded-full bg-slate-100 px-3 py-1.5 text-[10px] font-bold text-slate-500">
                        {totalItems} item
                        {totalItems !== 1 ? "s" : ""}
                      </span>
                    </div>
                  </div>

                  {/* Products */}
                  <div className="max-h-/[320px] space-y-4 overflow-y-auto p-6">
                    {cartItems.map((item) => {
                      const itemTotal = item.product.price * item.quantity;

                      return (
                        <div key={item.product._id} className="flex gap-3">
                          <Link
                            to={`/products/${item.product._id}`}
                            className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-slate-100"
                          >
                            <img
                              src={item.product.thumbnail}
                              alt={item.product.title}
                              className="h-full w-full object-cover"
                            />

                            <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-slate-950 px-1 text-[9px] font-bold text-white ring-2 ring-white">
                              {item.quantity}
                            </span>
                          </Link>

                          <div className="min-w-0 flex-1">
                            <Link
                              to={`/products/${item.product._id}`}
                              className="block truncate text-xs font-bold text-slate-800 hover:text-indigo-600"
                            >
                              {item.product.title}
                            </Link>

                            <p className="mt-1 text-[10px] text-slate-400">
                              ₹{item.product.price.toLocaleString("en-IN")} ×{" "}
                              {item.quantity}
                            </p>

                            <p className="mt-1 text-xs font-black text-slate-950">
                              ₹{itemTotal.toLocaleString("en-IN")}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Amount */}
                  <div className="border-t border-slate-100 p-6">
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-500">Subtotal</span>

                        <span className="font-semibold text-slate-800">
                          ₹{subtotal.toLocaleString("en-IN")}
                        </span>
                      </div>

                      <div className="flex justify-between text-sm">
                        <span className="text-slate-500">Shipping</span>

                        <span className="font-bold text-emerald-600">FREE</span>
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

                    <button
                      type="submit"
                      disabled={loading}
                      className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-slate-950 py-3.5 text-sm font-bold text-white shadow-lg shadow-slate-200 transition-all hover:bg-indigo-600 hover:shadow-indigo-200 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {loading ? (
                        "Placing Order..."
                      ) : (
                        <>
                          Place Order
                          <ChevronRight size={17} />
                        </>
                      )}
                    </button>

                    <div className="mt-4 flex items-center justify-center gap-2 text-[10px] font-semibold text-slate-400">
                      <ShieldCheck size={14} />
                      Secure and protected checkout
                    </div>
                  </div>
                </section>

                {/* Trust Card */}
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
                          Your order information is protected
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
                          Track your order after purchase
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
                        <CheckCircle size={17} />
                      </div>

                      <div>
                        <p className="text-xs font-bold text-slate-800">
                          Easy Order Management
                        </p>

                        <p className="text-[10px] text-slate-400">
                          Manage your orders anytime
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <Link
                  to="/cart"
                  className="flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white py-3 text-xs font-bold text-slate-600 transition hover:bg-slate-50 hover:text-slate-950"
                >
                  <ArrowLeft size={14} />
                  Back to Cart
                </Link>
              </div>
            </div>
          </div>
        </main>
      </form>
    </div>
  );
}

export default Checkout;
