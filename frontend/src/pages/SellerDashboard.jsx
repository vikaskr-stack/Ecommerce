import { useEffect, useState } from "react";
import {
  ArrowLeftRight,
  ArrowUpRight,
  Boxes,
  ChevronRight,
  CircleDollarSign,
  Edit3,
  Package,
  Plus,
  ShoppingBag,
  Sparkles,
  Trash2,
  TrendingUp,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/useAuth";

function ProductImage({ src, title }) {
  const [imageError, setImageError] = useState(false);

  if (!src || imageError) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-linear-to-br from-indigo-100 via-white to-purple-100">
        <div className="flex flex-col items-center gap-2 text-indigo-300">
          <Package size={42} strokeWidth={1.5} />
          <span className="text-xs font-medium">No image</span>
        </div>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={title}
      onError={() => setImageError(true)}
      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
    />
  );
}

function SellerDashboard() {
  const { user, token } = useAuth();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const firstName = user?.fullName?.split(" ")[0] || "there";

  const fetchSellerProducts = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        "http://localhost:8000/api/v1/products/seller",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to fetch seller products");
      }

      setProducts(result.data || []);
    } catch (error) {
      console.error("❌ Seller products error:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchSellerProducts();
    }
  }, [token]);

  const handleDelete = async (productId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this product?",
    );

    if (!confirmed) {
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:8000/api/v1/products/${productId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to delete product");
      }

      setProducts((previousProducts) =>
        previousProducts.filter((product) => product._id !== productId),
      );
    } catch (error) {
      console.error("❌ Delete product error:", error);
      alert(error.message);
    }
  };

  const totalProducts = products.length;

  const totalStock = products.reduce(
    (total, product) => total + Number(product.stock || 0),
    0,
  );

  const averageRating =
    products.length > 0
      ? (
          products.reduce(
            (total, product) => total + Number(product.rating || 0),
            0,
          ) / products.length
        ).toFixed(1)
      : "0.0";

  return (
    <main className="min-h-screen bg-[#f5f7ff] px-4 py-6 text-slate-900 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* -------------------------------------------------- */}
        {/* HERO */}
        {/* -------------------------------------------------- */}

        <section className="relative mb-6 overflow-hidden rounded-[28px] border border-white/80 bg-linear-to-br from-white via-[#f7f8ff] to-[#eef0ff] shadow-[0_10px_40px_rgba(65,70,120,0.08)]">
          {/* Decorative circles */}
          <div className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full bg-indigo-200/30 blur-3xl" />

          <div className="pointer-events-none absolute -bottom-32 left-1/3 h-72 w-72 rounded-full bg-purple-200/30 blur-3xl" />

          <div className="relative grid gap-8 px-6 py-8 sm:px-8 sm:py-10 lg:grid-cols-[1fr_320px] lg:items-center lg:px-10">
            <div>
              {/* Small label */}
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-white/80 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-indigo-600 shadow-sm">
                <Sparkles size={13} />
                Seller's  Workspace
              </div>

              <h1 className="max-w-2xl text-3xl font-black leading-tight tracking-[-0.04em] text-slate-950 sm:text-4xl lg:text-5xl">
                Build your store.
                <br />
                <span className="text-indigo-600">Grow your business.</span>
              </h1>

              <p className="mt-4 max-w-xl text-sm leading-6 text-slate-500 sm:text-base">
                Welcome back, {firstName}. Manage your products, keep track of
                your inventory and grow your store from one place.
              </p>

              <div className="mt-7 flex flex-wrap gap-3">
                <Link
                  to="/seller/products/add"
                  className="inline-flex items-center gap-2 rounded-xl bg-slate-950 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-slate-900/10 transition duration-200 hover:-translate-y-0.5 hover:bg-indigo-600"
                >
                  <Plus size={17} />
                  Add Product
                </Link>

                <Link
                  to="/choose-mode"
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-700"
                >
                  <ArrowLeftRight size={17} />
                  Switch Mode
                </Link>
              </div>

              {/* Small trust indicators */}
              <div className="mt-7 flex flex-wrap gap-x-6 gap-y-2 text-xs text-slate-400">
                <span className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  Products synced
                </span>

                <span className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-indigo-500" />
                  Secure seller access
                </span>

                
              </div>
            </div>

            {/* Hero visual */}
            <div className="hidden lg:block">
              <div className="relative mx-auto h-64 w-full max-w-\[290px]">
                <div className="absolute inset-0 rotate-3 rounded-[26px] bg-indigo-100/70" />

                <div className="absolute inset-0 overflow-hidden rounded-[26px] border border-white bg-white p-3 shadow-[0_20px_50px_rgba(55,65,130,0.12)]">
                  <div className="flex h-full flex-col rounded-[20px] bg-linear-to-br from-[#eef1ff] to-[#fafaff] p-5">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-[9px] font-bold uppercase tracking-widest text-indigo-500">
                          Store overview
                        </p>
                        <p className="mt-1 text-sm font-bold text-slate-900">
                          Your business
                        </p>
                      </div>

                      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white shadow-sm">
                        <TrendingUp size={17} className="text-indigo-500" />
                      </div>
                    </div>

                    <div className="mt-7">
                      <p className="text-3xl font-black text-slate-950">
                        {totalProducts}
                      </p>
                      <p className="mt-1 text-xs text-slate-400">
                        products in your store
                      </p>
                    </div>

                    <div className="mt-auto rounded-2xl bg-white p-4 shadow-sm">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-slate-500">
                          Inventory
                        </span>

                        <span className="text-xs font-bold text-emerald-600">
                          {totalStock} units
                        </span>
                      </div>

                      <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-100">
                        <div className="h-full w-[72%] rounded-full bg-linear-to-r from-indigo-500 to-purple-500" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* -------------------------------------------------- */}
        {/* STATS */}
        {/* -------------------------------------------------- */}

        <section className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {/* Products */}
          <div className="rounded-[22px] border border-white bg-white p-5 shadow-[0_8px_30px_rgba(65,70,120,0.06)] transition duration-200 hover:-translate-y-1 hover:shadow-[0_14px_35px_rgba(65,70,120,0.09)]">
            <div className="flex items-start justify-between">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
                <Boxes size={20} />
              </div>

              <span className="rounded-full bg-indigo-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-indigo-600">
                Store
              </span>
            </div>

            <p className="mt-5 text-xs font-bold uppercase tracking-[0.14em] text-slate-400">
              My Products
            </p>

            <div className="mt-1 flex items-end justify-between">
              <p className="text-3xl font-black tracking-tight text-slate-950">
                {totalProducts}
              </p>

              <ArrowUpRight size={17} className="mb-1 text-indigo-400" />
            </div>

            <p className="mt-2 text-xs text-slate-400">
              Products currently listed
            </p>
          </div>

          {/* Stock */}
          <div className="rounded-[22px] border border-white bg-white p-5 shadow-[0_8px_30px_rgba(65,70,120,0.06)] transition duration-200 hover:-translate-y-1 hover:shadow-[0_14px_35px_rgba(65,70,120,0.09)]">
            <div className="flex items-start justify-between">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
                <Package size={20} />
              </div>

              <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-emerald-600">
                Stock
              </span>
            </div>

            <p className="mt-5 text-xs font-bold uppercase tracking-[0.14em] text-slate-400">
              Inventory
            </p>

            <div className="mt-1 flex items-end justify-between">
              <p className="text-3xl font-black tracking-tight text-slate-950">
                {totalStock}
              </p>

              <ArrowUpRight size={17} className="mb-1 text-emerald-400" />
            </div>

            <p className="mt-2 text-xs text-slate-400">Total units available</p>
          </div>

          {/* Orders */}
          <div className="rounded-[22px] border border-white bg-white p-5 shadow-[0_8px_30px_rgba(65,70,120,0.06)] transition duration-200 hover:-translate-y-1 hover:shadow-[0_14px_35px_rgba(65,70,120,0.09)]">
            <div className="flex items-start justify-between">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-purple-50 text-purple-600">
                <ShoppingBag size={20} />
              </div>

              <span className="rounded-full bg-purple-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-purple-600">
                Coming soon
              </span>
            </div>

            <p className="mt-5 text-xs font-bold uppercase tracking-[0.14em] text-slate-400">
              Orders
            </p>

            <div className="mt-1 flex items-end justify-between">
              <p className="text-3xl font-black tracking-tight text-slate-950">
                0
              </p>

              <ArrowUpRight size={17} className="mb-1 text-purple-400" />
            </div>

            <p className="mt-2 text-xs text-slate-400">Seller order tracking</p>
          </div>

          {/* Rating */}
          <div className="rounded-[22px] border border-white bg-white p-5 shadow-[0_8px_30px_rgba(65,70,120,0.06)] transition duration-200 hover:-translate-y-1 hover:shadow-[0_14px_35px_rgba(65,70,120,0.09)]">
            <div className="flex items-start justify-between">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-amber-50 text-amber-500">
                <CircleDollarSign size={20} />
              </div>

              <span className="rounded-full bg-amber-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-amber-600">
                Rating
              </span>
            </div>

            <p className="mt-5 text-xs font-bold uppercase tracking-[0.14em] text-slate-400">
              Avg. Rating
            </p>

            <div className="mt-1 flex items-end justify-between">
              <p className="text-3xl font-black tracking-tight text-slate-950">
                {averageRating}
              </p>

              <span className="mb-1 text-lg text-amber-400">★</span>
            </div>

            <p className="mt-2 text-xs text-slate-400">
              Across your listed products
            </p>
          </div>
        </section>

        {/* -------------------------------------------------- */}
        {/* PRODUCTS HEADER */}
        {/* -------------------------------------------------- */}

        <section>
          <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-indigo-500" />
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-indigo-500">
                  Your collection
                </p>
              </div>

              <h2 className="mt-2 text-2xl font-black tracking-[-0.03em] text-slate-950">
                Trending Products
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Manage the products currently listed in your store.
              </p>
            </div>

            {products.length > 0 && (
              <span className="inline-flex w-fit items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-500 shadow-sm">
                {products.length} product
                {products.length !== 1 ? "s" : ""}
                <ChevronRight size={14} />
              </span>
            )}
          </div>

          {/* -------------------------------------------------- */}
          {/* ERROR */}
          {/* -------------------------------------------------- */}

          {error && (
            <div className="mb-6 rounded-2xl border border-red-100 bg-red-50 px-5 py-4 text-sm text-red-600">
              <p className="font-semibold">Something went wrong</p>
              <p className="mt-1 text-red-500">{error}</p>
            </div>
          )}

          {/* -------------------------------------------------- */}
          {/* LOADING */}
          {/* -------------------------------------------------- */}

          {loading ? (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {[1, 2, 3, 4].map((item) => (
                <div
                  key={item}
                  className="overflow-hidden rounded-3xl border border-white bg-white p-3 shadow-sm"
                >
                  <div className="h-52 animate-pulse rounded-[18px] bg-slate-100" />

                  <div className="px-2 pb-2 pt-4">
                    <div className="h-3 w-20 animate-pulse rounded bg-slate-100" />

                    <div className="mt-3 h-5 w-36 animate-pulse rounded bg-slate-100" />

                    <div className="mt-5 h-4 w-24 animate-pulse rounded bg-slate-100" />

                    <div className="mt-5 h-10 animate-pulse rounded-xl bg-slate-100" />
                  </div>
                </div>
              ))}
            </div>
          ) : products.length === 0 ? (
            /* -------------------------------------------------- */
            /* EMPTY STATE */
            /* -------------------------------------------------- */

            <div className="rounded-[28px] border border-dashed border-indigo-200 bg-white px-6 py-16 text-center shadow-[0_8px_30px_rgba(65,70,120,0.05)]">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-indigo-50 text-indigo-500">
                <Package size={28} />
              </div>

              <h3 className="mt-5 text-xl font-black text-slate-900">
                Your store is waiting for its first product
              </h3>

              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
                Add your first product and start building your collection.
              </p>

              <Link
                to="/seller/products/add"
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-slate-950 px-5 py-3 text-sm font-bold text-white transition hover:bg-indigo-600"
              >
                <Plus size={17} />
                Add Your First Product
              </Link>
            </div>
          ) : (
            /* -------------------------------------------------- */
            /* PRODUCT GRID */
            /* -------------------------------------------------- */

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {products.map((product) => (
                <article
                  key={product._id}
                  className="group overflow-hidden rounded-3xl border border-white bg-white p-3 shadow-[0_8px_30px_rgba(65,70,120,0.06)] transition duration-300 hover:-translate-y-1.5 hover:shadow-[0_18px_45px_rgba(65,70,120,0.12)]"
                >
                  {/* Image */}
                  <div className="relative h-56 overflow-hidden rounded-[19px] bg-slate-100">
                    <ProductImage
                      src={product.thumbnail}
                      title={product.title}
                    />

                    {/* Category badge */}
                    <div className="absolute left-3 top-3">
                      <span className="rounded-full border border-white/70 bg-white/90 px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.12em] text-indigo-600 shadow-sm backdrop-blur">
                        {product.category || "Product"}
                      </span>
                    </div>

                    {/* Stock badge */}
                    <div className="absolute right-3 top-3">
                      <span
                        className={`rounded-full border border-white/70 bg-white/90 px-2.5 py-1 text-[9px] font-bold shadow-sm backdrop-blur ${
                          Number(product.stock) > 0
                            ? "text-emerald-600"
                            : "text-red-500"
                        }`}
                      >
                        {Number(product.stock) > 0
                          ? `${product.stock} in stock`
                          : "Out of stock"}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="px-2 pb-1 pt-4">
                    <div className="flex items-center justify-between gap-3">
                      <p className="truncate text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400">
                        {product.brand || "Independent brand"}
                      </p>

                      {product.rating && (
                        <span className="flex shrink-0 items-center gap-1 text-[11px] font-semibold text-slate-500">
                          <span className="text-amber-400">★</span>
                          {Number(product.rating).toFixed(1)}
                        </span>
                      )}
                    </div>

                    <h3 className="mt-2 line-clamp-2 min-h-12 text-base font-bold leading-6 tracking-[-0.02em] text-slate-900">
                      {product.title}
                    </h3>

                    <div className="mt-4 flex items-end justify-between gap-3">
                      <div>
                        <p className="text-[10px] font-medium uppercase tracking-wider text-slate-400">
                          Price
                        </p>

                        <p className="mt-0.5 text-lg font-black tracking-tight text-slate-950">
                          ₹{Number(product.price || 0).toLocaleString("en-IN")}
                        </p>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <Link
                          to={`/seller/products/edit/${product._id}`}
                          title="Edit product"
                          className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 transition hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-600"
                        >
                          <Edit3 size={15} />
                        </Link>

                        <button
                          onClick={() => handleDelete(product._id)}
                          title="Delete product"
                          className="flex h-9 w-9 items-center justify-center rounded-xl border border-red-100 bg-white text-red-400 transition hover:bg-red-50 hover:text-red-600"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </div>

                    {/* Bottom action */}
                    <div className="mt-4 border-t border-slate-100 pt-3">
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="text-slate-400">Product ID</span>

                        <span className="max-w-\[120px] truncate font-mono text-slate-500">
                          {product._id}
                        </span>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

        {/* -------------------------------------------------- */}
        {/* BOTTOM CTA */}
        {/* -------------------------------------------------- */}

        <section className="mt-10 overflow-hidden rounded-[26px] border border-white bg-linear-to-r from-slate-950 via-indigo-950 to-[#332b63] shadow-[0_15px_45px_rgba(40,40,80,0.12)]">
          <div className="relative px-6 py-8 sm:px-8">
            <div className="pointer-events-none absolute -right-20 -top-20 h-52 w-52 rounded-full bg-indigo-400/20 blur-3xl" />

            <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.15em] text-indigo-200">
                  <Sparkles size={13} />
                  Keep building
                </div>

                <h3 className="text-xl font-black tracking-tight text-white sm:text-2xl">
                  Ready to add something new?
                </h3>

                <p className="mt-1 max-w-lg text-sm text-indigo-200/70">
                  Keep your catalog fresh and give customers more products to
                  discover.
                </p>
              </div>

              <Link
                to="/seller/products/add"
                className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-slate-950 transition hover:bg-indigo-50"
              >
                Add Product
                <ArrowUpRight size={17} />
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

export default SellerDashboard;
