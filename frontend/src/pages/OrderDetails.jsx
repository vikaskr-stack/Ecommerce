import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Check,
  CheckCircle,
  Clipboard,
  Clock3,
  Copy,
  CreditCard,
  Home,
  MapPin,
  Package,
  ShieldCheck,
  ShoppingBag,
  Truck,
  XCircle,
} from "lucide-react";

import { cancelOrder, getOrderById } from "../services/api";
import { useAuth } from "../context/useAuth";

function OrderDetails() {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const { token } = useAuth();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cancelLoading, setCancelLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        setLoading(true);
        setError("");

        const result = await getOrderById(orderId, token);
        setOrder(result.data);
      } catch (error) {
        console.error("Fetch order error:", error);
        setError(error.message || "Failed to fetch order");
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchOrder();
    }
  }, [orderId, token]);

  const handleCancel = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to cancel this order?",
    );

    if (!confirmed) return;

    try {
      setCancelLoading(true);
      setError("");

      const result = await cancelOrder(orderId, token);
      setOrder(result.data);
    } catch (error) {
      console.error("Cancel order error:", error);
      setError(error.message || "Failed to cancel order");
    } finally {
      setCancelLoading(false);
    }
  };

  const handleCopyOrderId = async () => {
    try {
      await navigator.clipboard.writeText(order._id);
      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      console.error("Copy error:", error);
    }
  };

  const formatDate = (date) => {
    if (!date) return "—";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const formatDateTime = (date) => {
    if (!date) return "—";

    return new Date(date).toLocaleString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  };

  const getStatusConfig = (status) => {
    switch (status) {
      case "pending":
        return {
          label: "Order Pending",
          description: "We're processing your order.",
          icon: Clock3,
          classes: "bg-amber-50 text-amber-700 border-amber-200",
          iconBg: "bg-amber-100",
        };

      case "confirmed":
        return {
          label: "Order Confirmed",
          description: "Your order has been confirmed.",
          icon: CheckCircle,
          classes: "bg-blue-50 text-blue-700 border-blue-200",
          iconBg: "bg-blue-100",
        };

      case "shipped":
        return {
          label: "Order Shipped",
          description: "Your package is on its way.",
          icon: Truck,
          classes: "bg-indigo-50 text-indigo-700 border-indigo-200",
          iconBg: "bg-indigo-100",
        };

      case "delivered":
        return {
          label: "Delivered",
          description: "Your order has been delivered.",
          icon: CheckCircle,
          classes: "bg-emerald-50 text-emerald-700 border-emerald-200",
          iconBg: "bg-emerald-100",
        };

      case "cancelled":
        return {
          label: "Order Cancelled",
          description: "This order has been cancelled.",
          icon: XCircle,
          classes: "bg-red-50 text-red-700 border-red-200",
          iconBg: "bg-red-100",
        };

      default:
        return {
          label: status,
          description: "Order status updated.",
          icon: Package,
          classes: "bg-gray-50 text-gray-700 border-gray-200",
          iconBg: "bg-gray-100",
        };
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-linear-to-br from-slate-50 via-indigo-50/20 to-white">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="h-6 w-28 bg-white rounded-lg animate-pulse mb-8" />

          <div className="h-36 bg-white rounded-3xl border border-slate-200 animate-pulse mb-6" />

          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <div className="h-80 bg-white rounded-3xl border border-slate-200 animate-pulse" />
              <div className="h-56 bg-white rounded-3xl border border-slate-200 animate-pulse" />
            </div>

            <div className="h-80 bg-white rounded-3xl border border-slate-200 animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="min-h-screen bg-linear-to-br from-slate-50 via-indigo-50/20 to-white flex items-center justify-center px-4">
        <div className="w-full max-w-md bg-white border border-slate-200 rounded-3xl p-8 text-center shadow-xl shadow-slate-200/40">
          <div className="w-16 h-16 rounded-2xl bg-red-50 flex items-center justify-center mx-auto">
            <XCircle size={32} className="text-red-500" />
          </div>

          <h1 className="text-2xl font-bold text-slate-950 mt-5">
            Unable to load order
          </h1>

          <p className="text-slate-500 mt-2">
            {error || "The requested order could not be found."}
          </p>

          <Link
            to="/orders"
            className="inline-flex items-center justify-center gap-2 mt-6 bg-slate-950 text-white px-6 py-3 rounded-xl font-semibold hover:bg-indigo-700 transition"
          >
            <ArrowLeft size={17} />
            My Orders
          </Link>
        </div>
      </div>
    );
  }

  const statusConfig = getStatusConfig(order.status);
  const StatusIcon = statusConfig.icon;

  const canCancel = ["pending", "confirmed"].includes(order.status);

  const totalItems = order.items.reduce(
    (total, item) => total + item.quantity,
    0,
  );

  const orderNumber = order._id.slice(-8).toUpperCase();

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-indigo-50/20 to-white">
      {/* Header */}
      <header className="border-b border-slate-200/70 bg-white/80 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between gap-4">
            <button
              onClick={() => navigate("/orders")}
              className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-slate-950 transition"
            >
              <span className="w-9 h-9 rounded-xl border border-slate-200 bg-white flex items-center justify-center">
                <ArrowLeft size={17} />
              </span>

              <span className="hidden sm:inline">Back to Orders</span>
            </button>

            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-linear-to-br from-indigo-500 to-violet-600 flex items-center justify-center">
                <ShoppingBag size={17} className="text-white" />
              </div>

              <span className="font-black tracking-tight text-slate-950">
                AURA
              </span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8 lg:py-10">
        {/* Page heading */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-5 mb-8">
          <div>
            <div className="flex items-center gap-2 text-sm text-slate-500 mb-3">
              <Link to="/orders" className="hover:text-indigo-600">
                Orders
              </Link>

              <span>/</span>

              <span>Order Details</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-950">
              Order Details
            </h1>

            <div className="flex flex-wrap items-center gap-3 mt-3">
              <p className="text-slate-500">Order #{orderNumber}</p>

              <button
                onClick={handleCopyOrderId}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-600 hover:text-indigo-700"
              >
                {copied ? <Check size={14} /> : <Copy size={14} />}

                {copied ? "Copied" : "Copy ID"}
              </button>
            </div>
          </div>

          <div className="text-sm text-slate-500">
            Placed on{" "}
            <span className="font-semibold text-slate-800">
              {formatDate(order.createdAt)}
            </span>
          </div>
        </div>

        {/* Status Banner */}
        <div className="bg-white border border-slate-200 rounded-3xl p-5 sm:p-6 mb-6 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center gap-5">
            <div
              className={`w-14 h-14 shrink-0 rounded-2xl ${statusConfig.iconBg} flex items-center justify-center`}
            >
              <StatusIcon size={27} />
            </div>

            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-3">
                <h2 className="text-xl font-bold text-slate-950">
                  {statusConfig.label}
                </h2>

                <span
                  className={`px-3 py-1 rounded-full border text-xs font-bold capitalize ${statusConfig.classes}`}
                >
                  {order.status}
                </span>
              </div>

              <p className="text-sm text-slate-500 mt-1">
                {statusConfig.description}
              </p>
            </div>

            <div className="text-left sm:text-right">
              <p className="text-xs uppercase tracking-wider text-slate-400 font-semibold">
                Total
              </p>

              <p className="text-2xl font-black text-slate-950 mt-1">
                ₹{order.totalAmount.toLocaleString("en-IN")}
              </p>
            </div>
          </div>
        </div>

        {/* Order Progress */}
        {order.status !== "cancelled" && (
          <div className="bg-white border border-slate-200 rounded-3xl p-6 mb-6 shadow-sm">
            <div className="flex items-center justify-between mb-7">
              <div>
                <h2 className="font-bold text-slate-950">Order Progress</h2>
                <p className="text-sm text-slate-500 mt-1">
                  Track the current stage of your order.
                </p>
              </div>

              <Truck size={20} className="text-indigo-500" />
            </div>

            <div className="relative">
              <div className="absolute left-0 right-0 top-4 h-0.5 bg-slate-200" />

              <div
                className={`absolute left-0 top-4 h-0.5 bg-indigo-500 transition-all ${
                  order.status === "pending"
                    ? "w-0"
                    : order.status === "confirmed"
                      ? "w-1/3"
                      : order.status === "shipped"
                        ? "w-2/3"
                        : "w-full"
                }`}
              />

              <div className="relative grid grid-cols-4">
                {[
                  {
                    key: "pending",
                    label: "Placed",
                  },
                  {
                    key: "confirmed",
                    label: "Confirmed",
                  },
                  {
                    key: "shipped",
                    label: "Shipped",
                  },
                  {
                    key: "delivered",
                    label: "Delivered",
                  },
                ].map((step, index) => {
                  const statusOrder = [
                    "pending",
                    "confirmed",
                    "shipped",
                    "delivered",
                  ];

                  const currentIndex = statusOrder.indexOf(order.status);
                  const stepIndex = index;

                  const completed = stepIndex <= currentIndex;

                  return (
                    <div
                      key={step.key}
                      className="flex flex-col items-center text-center"
                    >
                      <div
                        className={`w-8 h-8 rounded-full border-4 border-white flex items-center justify-center shadow-sm ${
                          completed
                            ? "bg-indigo-600 text-white"
                            : "bg-slate-200 text-slate-400"
                        }`}
                      >
                        {completed ? (
                          <Check size={14} strokeWidth={3} />
                        ) : (
                          <span className="w-2 h-2 rounded-full bg-slate-400" />
                        )}
                      </div>

                      <p
                        className={`text-xs font-semibold mt-3 ${
                          completed ? "text-slate-900" : "text-slate-400"
                        }`}
                      >
                        {step.label}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Cancelled banner */}
        {order.status === "cancelled" && (
          <div className="bg-red-50 border border-red-200 rounded-3xl p-5 mb-6 flex gap-4">
            <div className="w-11 h-11 shrink-0 rounded-xl bg-red-100 flex items-center justify-center">
              <XCircle className="text-red-600" size={22} />
            </div>

            <div>
              <h3 className="font-bold text-red-900">
                This order has been cancelled
              </h3>

              <p className="text-sm text-red-700 mt-1">
                No further shipment updates will be available for this order.
              </p>
            </div>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main */}
          <div className="lg:col-span-2 space-y-6">
            {/* Ordered Items */}
            <section className="bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden">
              <div className="px-5 sm:px-6 py-5 border-b border-slate-100">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center">
                      <Package size={20} className="text-indigo-600" />
                    </div>

                    <div>
                      <h2 className="font-bold text-slate-950">
                        Ordered Items
                      </h2>

                      <p className="text-sm text-slate-500">
                        {totalItems} {totalItems === 1 ? "item" : "items"} in
                        this order
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="divide-y divide-slate-100">
                {order.items.map((item, index) => (
                  <div
                    key={index}
                    className="p-5 sm:p-6 flex gap-4 hover:bg-slate-50/70 transition"
                  >
                    <div className="w-24 h-24 sm:w-28 sm:h-28 shrink-0 rounded-2xl bg-slate-100 overflow-hidden border border-slate-200">
                      <img
                        src={
                          item.product?.thumbnail ||
                          "https://dummyjson.com/image/100x100"
                        }
                        alt={item.product?.title || "Product"}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:justify-between gap-3">
                        <div>
                          <p className="text-xs uppercase tracking-wider text-indigo-500 font-bold">
                            {item.product?.category || "Product"}
                          </p>

                          <h3 className="font-bold text-slate-950 mt-1 line-clamp-2">
                            {item.product?.title || "Product"}
                          </h3>

                          {item.product?.brand && (
                            <p className="text-sm text-slate-500 mt-1">
                              {item.product.brand}
                            </p>
                          )}
                        </div>

                        <p className="font-black text-slate-950 whitespace-nowrap">
                          ₹
                          {(item.price * item.quantity).toLocaleString("en-IN")}
                        </p>
                      </div>

                      <div className="flex flex-wrap items-center gap-3 mt-4 text-sm">
                        <span className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-600 font-medium">
                          Qty: {item.quantity}
                        </span>

                        <span className="text-slate-500">
                          ₹{item.price.toLocaleString("en-IN")} each
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Shipping Address */}
            <section className="bg-white border border-slate-200 rounded-3xl shadow-sm p-5 sm:p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-violet-50 flex items-center justify-center">
                  <MapPin size={20} className="text-violet-600" />
                </div>

                <div>
                  <h2 className="font-bold text-slate-950">Shipping Address</h2>

                  <p className="text-sm text-slate-500">
                    Your delivery destination
                  </p>
                </div>
              </div>

              <div className="rounded-2xl bg-slate-50 border border-slate-100 p-5">
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center shrink-0">
                    <Home size={18} className="text-slate-600" />
                  </div>

                  <div className="text-sm text-slate-600 space-y-1.5">
                    <p className="font-bold text-slate-950">
                      {order.shippingAddress.fullName}
                    </p>

                    <p>{order.shippingAddress.address}</p>

                    <p>
                      {order.shippingAddress.city},{" "}
                      {order.shippingAddress.state}
                    </p>

                    <p>
                      Pincode:{" "}
                      <span className="font-semibold text-slate-800">
                        {order.shippingAddress.pincode}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Order Information */}
            <section className="bg-white border border-slate-200 rounded-3xl shadow-sm p-5 sm:p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
                  <Clipboard size={20} className="text-blue-600" />
                </div>

                <div>
                  <h2 className="font-bold text-slate-950">
                    Order Information
                  </h2>

                  <p className="text-sm text-slate-500">
                    Details about this purchase
                  </p>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="rounded-2xl bg-slate-50 p-4">
                  <p className="text-xs uppercase tracking-wider text-slate-400 font-bold">
                    Order ID
                  </p>

                  <p className="font-semibold text-slate-800 mt-1 break-all">
                    {order._id}
                  </p>
                </div>

                <div className="rounded-2xl bg-slate-50 p-4">
                  <p className="text-xs uppercase tracking-wider text-slate-400 font-bold">
                    Order Date
                  </p>

                  <p className="font-semibold text-slate-800 mt-1">
                    {formatDateTime(order.createdAt)}
                  </p>
                </div>

                <div className="rounded-2xl bg-slate-50 p-4">
                  <p className="text-xs uppercase tracking-wider text-slate-400 font-bold">
                    Payment
                  </p>

                  <div className="flex items-center gap-2 mt-1">
                    <CreditCard size={16} className="text-indigo-500" />

                    <p className="font-semibold text-slate-800">
                      {order.paymentMethod}
                    </p>
                  </div>
                </div>

                <div className="rounded-2xl bg-slate-50 p-4">
                  <p className="text-xs uppercase tracking-wider text-slate-400 font-bold">
                    Items
                  </p>

                  <p className="font-semibold text-slate-800 mt-1">
                    {totalItems} {totalItems === 1 ? "item" : "items"}
                  </p>
                </div>
              </div>
            </section>
          </div>

          {/* Summary */}
          <div>
            <div className="lg:sticky lg:top-6 space-y-4">
              <section className="bg-white border border-slate-200 rounded-3xl shadow-sm p-5 sm:p-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-black text-slate-950">
                    Order Summary
                  </h2>

                  <ShoppingBag size={20} className="text-indigo-500" />
                </div>

                <div className="space-y-4 mt-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">Items</span>

                    <span className="font-medium text-slate-800">
                      {totalItems}
                    </span>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">Payment</span>

                    <span className="font-semibold text-slate-800">
                      {order.paymentMethod}
                    </span>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">Delivery</span>

                    <span className="font-semibold text-emerald-600">Free</span>
                  </div>

                  <div className="border-t border-slate-100 pt-5 flex justify-between items-end">
                    <div>
                      <p className="text-sm text-slate-500">Total Amount</p>

                      <p className="text-2xl font-black text-slate-950 mt-1">
                        ₹{order.totalAmount.toLocaleString("en-IN")}
                      </p>
                    </div>
                  </div>
                </div>

                {canCancel && (
                  <button
                    onClick={handleCancel}
                    disabled={cancelLoading}
                    className="w-full mt-6 inline-flex items-center justify-center gap-2 border border-red-200 text-red-600 bg-red-50/50 py-3 rounded-xl font-semibold hover:bg-red-50 transition disabled:opacity-50"
                  >
                    <XCircle size={17} />

                    {cancelLoading ? "Cancelling..." : "Cancel Order"}
                  </button>
                )}

                <Link
                  to="/"
                  className="w-full mt-3 inline-flex items-center justify-center gap-2 bg-slate-950 text-white py-3 rounded-xl font-semibold hover:bg-indigo-700 transition"
                >
                  <ShoppingBag size={17} />
                  Continue Shopping
                </Link>

                <Link
                  to="/orders"
                  className="w-full mt-3 inline-flex items-center justify-center gap-2 border border-slate-200 text-slate-700 py-3 rounded-xl font-semibold hover:bg-slate-50 transition"
                >
                  <ArrowLeft size={17} />
                  View All Orders
                </Link>
              </section>

              {/* Trust card */}
              <div className="rounded-3xl bg-linear-to-br from-indigo-600 to-violet-600 p-5 text-white">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center shrink-0">
                    <ShieldCheck size={20} />
                  </div>

                  <div>
                    <h3 className="font-bold">Your order is protected</h3>

                    <p className="text-sm text-indigo-100 mt-1 leading-relaxed">
                      Your order details and shipping information are securely
                      associated with your account.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default OrderDetails;
