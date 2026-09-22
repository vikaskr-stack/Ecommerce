import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  Clock3,
  Package,
  ShoppingBag,
  Truck,
  XCircle,
} from "lucide-react";

import { getMyOrders } from "../services/api";
import { useAuth } from "../context/useAuth";

function Orders() {
  const { token } = useAuth();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        setError("");

        const result = await getMyOrders(token);
        setOrders(result.data || []);
      } catch (error) {
        console.error("Fetch orders error:", error);
        setError(error.message || "Failed to fetch orders");
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchOrders();
    }
  }, [token]);

  const getStatusConfig = (status) => {
    switch (status) {
      case "pending":
        return {
          label: "Pending",
          icon: Clock3,
          classes: "bg-amber-50 text-amber-700 border-amber-200",
          iconClasses: "bg-amber-100 text-amber-600",
        };

      case "confirmed":
        return {
          label: "Confirmed",
          icon: CheckCircle,
          classes: "bg-blue-50 text-blue-700 border-blue-200",
          iconClasses: "bg-blue-100 text-blue-600",
        };

      case "shipped":
        return {
          label: "Shipped",
          icon: Truck,
          classes: "bg-indigo-50 text-indigo-700 border-indigo-200",
          iconClasses: "bg-indigo-100 text-indigo-600",
        };

      case "delivered":
        return {
          label: "Delivered",
          icon: CheckCircle,
          classes: "bg-emerald-50 text-emerald-700 border-emerald-200",
          iconClasses: "bg-emerald-100 text-emerald-600",
        };

      case "cancelled":
        return {
          label: "Cancelled",
          icon: XCircle,
          classes: "bg-red-50 text-red-700 border-red-200",
          iconClasses: "bg-red-100 text-red-600",
        };

      default:
        return {
          label: status,
          icon: Package,
          classes: "bg-slate-50 text-slate-700 border-slate-200",
          iconClasses: "bg-slate-100 text-slate-600",
        };
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

  const totalItems = orders.reduce(
    (total, order) =>
      total +
      order.items.reduce((itemTotal, item) => itemTotal + item.quantity, 0),
    0,
  );

  const totalSpent = orders.reduce(
    (total, order) => total + order.totalAmount,
    0,
  );

  if (!token) {
    return (
      <div className="min-h-screen bg-linear-to-br from-slate-50 via-indigo-50/20 to-white flex items-center justify-center px-4">
        <div className="w-full max-w-md bg-white border border-slate-200 rounded-3xl p-8 text-center shadow-xl shadow-slate-200/40">
          <div className="w-16 h-16 rounded-2xl bg-indigo-50 flex items-center justify-center mx-auto">
            <ShoppingBag size={30} className="text-indigo-600" />
          </div>

          <h1 className="text-2xl font-black text-slate-950 mt-5">
            Sign in to view your orders
          </h1>

          <p className="text-slate-500 mt-2 leading-relaxed">
            Your purchases, delivery updates and order history will appear here.
          </p>

          <Link
            to="/login"
            className="inline-flex items-center justify-center gap-2 mt-6 bg-slate-950 text-white px-6 py-3 rounded-xl font-semibold hover:bg-indigo-700 transition"
          >
            Sign In
            <ArrowRight size={17} />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-indigo-50/20 to-white">
      {/* Header */}
      <header className="border-b border-slate-200/70 bg-white/80 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between gap-4">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-slate-950 transition"
            >
              <span className="w-9 h-9 rounded-xl border border-slate-200 bg-white flex items-center justify-center">
                <ArrowLeft size={17} />
              </span>

              <span className="hidden sm:inline">Back to Store</span>
            </Link>

            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-9 h-9 rounded-xl bg-linear-to-br from-indigo-500 to-violet-600 flex items-center justify-center group-hover:scale-105 transition-transform">
                <ShoppingBag size={17} className="text-white" />
              </div>

              <span className="font-black tracking-tight text-slate-950 group-hover:text-indigo-600 transition-colors">
                AURA
              </span>
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8 lg:py-10">
        {/* Page heading */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-5 mb-8">
          <div>
            <div className="flex items-center gap-2 text-sm text-slate-500 mb-3">
              <Link to="/" className="hover:text-indigo-600 transition">
                Store
              </Link>

              <span>/</span>

              <span>My Orders</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-950">
              My Orders
            </h1>

            <p className="text-slate-500 mt-2">
              Track and manage everything you've purchased.
            </p>
          </div>

          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 bg-slate-950 text-white px-5 py-3 rounded-xl font-semibold hover:bg-indigo-700 transition"
          >
            <ShoppingBag size={17} />
            Continue Shopping
          </Link>
        </div>

        {/* Loading */}
        {loading && (
          <div className="space-y-4">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="bg-white border border-slate-200 rounded-3xl p-6 animate-pulse"
              >
                <div className="flex gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-slate-100" />

                  <div className="flex-1 space-y-3">
                    <div className="h-4 bg-slate-100 rounded w-40" />
                    <div className="h-3 bg-slate-100 rounded w-28" />
                    <div className="h-3 bg-slate-100 rounded w-20" />
                  </div>

                  <div className="hidden sm:block space-y-3">
                    <div className="h-5 bg-slate-100 rounded w-24" />
                    <div className="h-7 bg-slate-100 rounded-full w-24" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="bg-red-50 border border-red-200 rounded-3xl p-6">
            <div className="flex items-start gap-4">
              <div className="w-11 h-11 rounded-xl bg-red-100 flex items-center justify-center shrink-0">
                <XCircle size={22} className="text-red-600" />
              </div>

              <div>
                <h2 className="font-bold text-red-900">
                  Unable to load orders
                </h2>

                <p className="text-sm text-red-700 mt-1">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Empty state */}
        {!loading && !error && orders.length === 0 && (
          <div className="bg-white border border-slate-200 rounded-3xl p-10 sm:p-16 text-center shadow-sm">
            <div className="w-20 h-20 rounded-3xl bg-indigo-50 flex items-center justify-center mx-auto">
              <Package size={36} className="text-indigo-600" />
            </div>

            <h2 className="text-2xl font-black text-slate-950 mt-6">
              No orders yet
            </h2>

            <p className="text-slate-500 mt-2 max-w-md mx-auto">
              Once you place an order, you'll be able to track its status and
              view all the details here.
            </p>

            <Link
              to="/"
              className="inline-flex items-center justify-center gap-2 mt-7 bg-slate-950 text-white px-6 py-3 rounded-xl font-semibold hover:bg-indigo-700 transition"
            >
              <ShoppingBag size={17} />
              Start Shopping
            </Link>
          </div>
        )}

        {/* Order stats */}
        {!loading && !error && orders.length > 0 && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-500">Total Orders</p>

                    <p className="text-2xl font-black text-slate-950 mt-1">
                      {orders.length}
                    </p>
                  </div>

                  <div className="w-11 h-11 rounded-xl bg-indigo-50 flex items-center justify-center">
                    <Package size={21} className="text-indigo-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-500">Items Purchased</p>

                    <p className="text-2xl font-black text-slate-950 mt-1">
                      {totalItems}
                    </p>
                  </div>

                  <div className="w-11 h-11 rounded-xl bg-violet-50 flex items-center justify-center">
                    <ShoppingBag size={21} className="text-violet-600" />
                  </div>
                </div>
              </div>

             
            </div>

            {/* Orders */}
            <div className="space-y-4">
              {orders.map((order) => {
                const statusConfig = getStatusConfig(order.status);
                const StatusIcon = statusConfig.icon;

                const itemCount = order.items.reduce(
                  (total, item) => total + item.quantity,
                  0,
                );

                const firstItem = order.items[0];

                return (
                  <Link
                    key={order._id}
                    to={`/orders/${order._id}`}
                    className="group block bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl hover:shadow-indigo-100/50 hover:border-indigo-200 transition-all duration-300"
                  >
                    <div className="p-5 sm:p-6">
                      <div className="flex flex-col lg:flex-row lg:items-center gap-5">
                        {/* Product preview */}
                        <div className="flex items-center gap-4 flex-1 min-w-0">
                          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-slate-100 overflow-hidden border border-slate-200 shrink-0">
                            {firstItem?.product?.thumbnail ? (
                              <img
                                src={firstItem.product.thumbnail}
                                alt={firstItem.product.title || "Product"}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center">
                                <Package size={24} className="text-slate-400" />
                              </div>
                            )}
                          </div>

                          <div className="min-w-0">
                            <div className="flex flex-wrap items-center gap-2">
                              <h2 className="font-bold text-slate-950">
                                Order #{order._id.slice(-8).toUpperCase()}
                              </h2>

                              <span
                                className={`px-2.5 py-1 rounded-full border text-xs font-bold ${statusConfig.classes}`}
                              >
                                {statusConfig.label}
                              </span>
                            </div>

                            <p className="text-sm text-slate-500 mt-1">
                              {formatDate(order.createdAt)}
                            </p>

                            <p className="text-sm text-slate-500 mt-1">
                              {itemCount} {itemCount === 1 ? "item" : "items"}
                            </p>
                          </div>
                        </div>

                        {/* Status icon */}
                        <div
                          className={`hidden sm:flex w-11 h-11 rounded-xl items-center justify-center shrink-0 ${statusConfig.iconClasses}`}
                        >
                          <StatusIcon size={20} />
                        </div>

                        {/* Price */}
                        <div className="flex items-center justify-between lg:justify-end gap-6 lg:min-w-/[190px]">
                          <div>
                            <p className="text-xs uppercase tracking-wider text-slate-400 font-bold">
                              Total
                            </p>

                            <p className="text-xl font-black text-slate-950 mt-1">
                              ₹{order.totalAmount.toLocaleString("en-IN")}
                            </p>
                          </div>

                          <div className="w-10 h-10 rounded-xl bg-slate-50 group-hover:bg-indigo-50 flex items-center justify-center transition">
                            <ArrowRight
                              size={18}
                              className="text-slate-400 group-hover:text-indigo-600 group-hover:translate-x-0.5 transition"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Bottom information strip */}
                    <div className="px-5 sm:px-6 py-3.5 bg-slate-50/70 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                      <div className="flex items-center gap-2 text-xs text-slate-500">
                        <Truck size={14} />
                        <span>
                          {order.status === "delivered"
                            ? "Order delivered"
                            : order.status === "cancelled"
                              ? "Order cancelled"
                              : "View delivery details"}
                        </span>
                      </div>

                      <span className="text-xs font-semibold text-indigo-600 group-hover:text-indigo-700">
                        View Order Details →
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </>
        )}
      </main>
    </div>
  );
}

export default Orders;
