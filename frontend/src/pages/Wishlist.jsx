import { useMemo, useState } from "react";
import { Link } from "react-router-dom";

import {
  ArrowLeft,
  ArrowUpDown,
  Check,
  Heart,
  Package,
  Plus,
  ShoppingCart,
  Star,
  Trash2,
  X,
} from "lucide-react";

import { addToCart, removeFromWishlist } from "../services/api";

import { useAuth } from "../context/useAuth";

function Wishlist() {
  const { token, wishlistItems, refreshWishlist, refreshCart } = useAuth();

  const [sortBy, setSortBy] = useState("recent");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedItems, setSelectedItems] = useState([]);
  const [removingId, setRemovingId] = useState(null);
  const [addingId, setAddingId] = useState(null);

  const categories = useMemo(() => {
    const uniqueCategories = [
      ...new Set(
        wishlistItems.map((product) => product.category).filter(Boolean),
      ),
    ];

    return ["All", ...uniqueCategories];
  }, [wishlistItems]);

  const filteredItems = useMemo(() => {
    let items = [...wishlistItems];

    if (selectedCategory !== "All") {
      items = items.filter((product) => product.category === selectedCategory);
    }

    if (sortBy === "price-low") {
      items.sort((a, b) => a.price - b.price);
    }

    if (sortBy === "price-high") {
      items.sort((a, b) => b.price - a.price);
    }

    if (sortBy === "name") {
      items.sort((a, b) => a.title.localeCompare(b.title));
    }

    return items;
  }, [wishlistItems, selectedCategory, sortBy]);

  const allVisibleSelected =
    filteredItems.length > 0 &&
    filteredItems.every((product) => selectedItems.includes(product._id));

  const totalWishlistValue = wishlistItems.reduce(
    (total, product) => total + product.price,
    0,
  );

  const handleRemove = async (productId) => {
    try {
      setRemovingId(productId);

      await removeFromWishlist(productId, token);
      await refreshWishlist();

      setSelectedItems((previous) => previous.filter((id) => id !== productId));
    } catch (error) {
      console.error("Remove wishlist error:", error);
    } finally {
      setRemovingId(null);
    }
  };

  const handleAddToCart = async (productId) => {
    try {
      setAddingId(productId);

      await addToCart(
        {
          productId,
          quantity: 1,
        },
        token,
      );

      await refreshCart();
    } catch (error) {
      console.error("Add to cart error:", error);
    } finally {
      setAddingId(null);
    }
  };

  const toggleSelect = (productId) => {
    setSelectedItems((previous) =>
      previous.includes(productId)
        ? previous.filter((id) => id !== productId)
        : [...previous, productId],
    );
  };

  const toggleSelectAll = () => {
    if (allVisibleSelected) {
      setSelectedItems((previous) =>
        previous.filter(
          (id) => !filteredItems.some((product) => product._id === id),
        ),
      );
    } else {
      setSelectedItems((previous) => [
        ...new Set([
          ...previous,
          ...filteredItems.map((product) => product._id),
        ]),
      ]);
    }
  };

  const removeSelected = async () => {
    try {
      for (const productId of selectedItems) {
        await removeFromWishlist(productId, token);
      }

      await refreshWishlist();
      setSelectedItems([]);
    } catch (error) {
      console.error("Remove selected wishlist items error:", error);
    }
  };

  if (!token) {
    return (
      <div className="min-h-screen bg-linear-to-br from-slate-50 via-indigo-50/40 to-white px-4 py-16">
        <div className="mx-auto flex min-h-[70vh] max-w-md items-center justify-center">
          <div className="w-full rounded-/[32px] border border-slate-200 bg-white p-10 text-center shadow-[0_20px_70px_rgba(15,23,42,0.08)]">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-indigo-50 text-indigo-600">
              <Heart size={34} />
            </div>

            <h1 className="mt-6 text-2xl font-black tracking-tight text-slate-950">
              Your wishlist is waiting
            </h1>

            <p className="mt-3 text-sm leading-6 text-slate-500">
              Sign in to save products, compare your favorites, and come back to
              them anytime.
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
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-indigo-50/30 to-white px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-/[1400px]">
        {/* Back */}
        <Link
          to="/"
          className="mb-6 inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold text-slate-500 transition hover:bg-white hover:text-slate-900"
        >
          <ArrowLeft size={17} />
          Continue Shopping
        </Link>

        {/* Hero */}
        <div className="relative overflow-hidden rounded-/[32px] border border-indigo-100 bg-white p-6 shadow-[0_18px_60px_rgba(79,70,229,0.07)] sm:p-8 lg:p-10">
          <div className="absolute -right-20 -top-24 h-64 w-64 rounded-full bg-indigo-100/60 blur-3xl" />
          <div className="absolute -bottom-32 left-1/3 h-64 w-64 rounded-full bg-blue-100/50 blur-3xl" />

          <div className="relative flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-red-50 px-3 py-1.5 text-xs font-bold text-red-500">
                <Heart size={14} fill="currentColor" />
                Your Favorites
              </div>

              <h1 className="text-3xl font-black tracking-[-0.04em] text-slate-950 sm:text-4xl lg:text-5xl">
                My Wishlist
              </h1>

              <p className="mt-3 max-w-xl text-sm leading-6 text-slate-500 sm:text-base">
                Keep track of the products you love and easily move them to your
                cart when you're ready.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <div className="rounded-2xl bg-slate-50 px-4 py-3">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Saved
                  </p>
                  <p className="mt-1 text-lg font-black text-slate-900">
                    {wishlistItems.length}
                  </p>
                </div>

                <div className="rounded-2xl bg-slate-50 px-4 py-3">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Wishlist Value
                  </p>
                  <p className="mt-1 text-lg font-black text-slate-900">
                    ₹{totalWishlistValue.toLocaleString("en-IN")}
                  </p>
                </div>

                <div className="rounded-2xl bg-slate-50 px-4 py-3">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Categories
                  </p>
                  <p className="mt-1 text-lg font-black text-slate-900">
                    {categories.length - 1}
                  </p>
                </div>
              </div>
            </div>

            <div className="hidden h-32 w-32 items-center justify-center rounded-[28px] bg-linear-to-br from-indigo-500 to-violet-600 text-white shadow-xl shadow-indigo-200 lg:flex">
              <Heart size={54} fill="currentColor" strokeWidth={1.5} />
            </div>
          </div>
        </div>

        {/* Toolbar */}
        {wishlistItems.length > 0 && (
          <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
            <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
              {/* Categories */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1">
                {categories.map((category) => (
                  <button
                    key={category}
                    type="button"
                    onClick={() => setSelectedCategory(category)}
                    className={`shrink-0 rounded-full px-4 py-2 text-xs font-bold transition ${
                      selectedCategory === category
                        ? "bg-slate-950 text-white"
                        : "bg-slate-50 text-slate-600 hover:bg-indigo-50 hover:text-indigo-600"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>

              {/* Actions */}
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={toggleSelectAll}
                  className="flex items-center gap-2 rounded-xl border border-slate-200 px-3 py-2 text-xs font-bold text-slate-600 transition hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-600"
                >
                  <Check size={15} />
                  {allVisibleSelected ? "Deselect All" : "Select All"}
                </button>

                {selectedItems.length > 0 && (
                  <button
                    type="button"
                    onClick={removeSelected}
                    className="flex items-center gap-2 rounded-xl border border-red-100 bg-red-50 px-3 py-2 text-xs font-bold text-red-500 transition hover:bg-red-100"
                  >
                    <Trash2 size={15} />
                    Remove ({selectedItems.length})
                  </button>
                )}

                <div className="flex items-center gap-2 rounded-xl border border-slate-200 px-3 py-2">
                  <ArrowUpDown size={15} className="text-slate-400" />

                  <select
                    value={sortBy}
                    onChange={(event) => setSortBy(event.target.value)}
                    className="bg-transparent text-xs font-bold text-slate-700 outline-none"
                  >
                    <option value="recent">Recently Added</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="name">Name</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Empty */}
        {wishlistItems.length === 0 ? (
          <div className="mt-6 rounded-/[32px] border border-slate-200 bg-white px-6 py-20 text-center shadow-sm">
            <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-[30px] bg-indigo-50 text-indigo-300">
              <Heart size={42} />
            </div>

            <h2 className="mt-6 text-2xl font-black text-slate-950">
              Your wishlist is empty
            </h2>

            <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-slate-500">
              Discover something you love and tap the heart icon to save it
              here.
            </p>

            <Link
              to="/"
              className="mt-7 inline-flex items-center gap-2 rounded-2xl bg-slate-950 px-7 py-3.5 text-sm font-bold text-white transition hover:bg-indigo-600"
            >
              <ShoppingCart size={17} />
              Explore Products
            </Link>
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="mt-6 rounded-[28px] bg-white p-12 text-center">
            <Package size={38} className="mx-auto text-slate-300" />
            <h2 className="mt-4 text-lg font-bold text-slate-900">
              No products in this category
            </h2>
            <button
              type="button"
              onClick={() => setSelectedCategory("All")}
              className="mt-4 rounded-xl bg-slate-950 px-5 py-2.5 text-sm font-bold text-white"
            >
              View All Items
            </button>
          </div>
        ) : (
          <>
            {/* Result info */}
            <div className="mt-7 flex items-center justify-between">
              <div>
                <p className="text-sm font-bold text-slate-800">
                  {filteredItems.length} saved product
                  {filteredItems.length !== 1 ? "s" : ""}
                </p>

                {selectedCategory !== "All" && (
                  <p className="mt-1 text-xs text-slate-400">
                    Showing {selectedCategory}
                  </p>
                )}
              </div>

              {selectedItems.length > 0 && (
                <p className="text-xs font-semibold text-indigo-600">
                  {selectedItems.length} selected
                </p>
              )}
            </div>

            {/* Products */}
            <div className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredItems.map((product) => {
                const isSelected = selectedItems.includes(product._id);

                const isRemoving = removingId === product._id;

                const isAdding = addingId === product._id;

                return (
                  <div
                    key={product._id}
                    className={`group relative overflow-hidden rounded-[26px] border bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_50px_rgba(15,23,42,0.10)] ${
                      isSelected
                        ? "border-indigo-400 ring-2 ring-indigo-100"
                        : "border-slate-200"
                    }`}
                  >
                    {/* Image */}
                    <div className="relative h-64 overflow-hidden bg-slate-100">
                      <Link to={`/products/${product._id}`}>
                        <img
                          src={product.thumbnail}
                          alt={product.title}
                          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                        />
                      </Link>

                      {/* Image overlay */}
                      <div className="absolute inset-x-0 bottom-0 h-24 bg-linear-to-t from-slate-950/30 to-transparent opacity-0 transition group-hover:opacity-100" />

                      {/* Select */}
                      <button
                        type="button"
                        onClick={() => toggleSelect(product._id)}
                        className={`absolute left-3 top-3 flex h-9 w-9 items-center justify-center rounded-xl border shadow-sm backdrop-blur transition ${
                          isSelected
                            ? "border-indigo-600 bg-indigo-600 text-white"
                            : "border-white/70 bg-white/90 text-slate-500 hover:text-indigo-600"
                        }`}
                        title={isSelected ? "Deselect" : "Select product"}
                      >
                        {isSelected ? (
                          <Check size={16} />
                        ) : (
                          <span className="h-4 w-4 rounded border border-slate-300" />
                        )}
                      </button>

                      {/* Wishlist */}
                      <button
                        type="button"
                        onClick={() => handleRemove(product._id)}
                        disabled={isRemoving}
                        className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-xl bg-white/90 text-red-500 shadow-sm backdrop-blur transition hover:bg-red-50 disabled:opacity-50"
                        title="Remove from wishlist"
                      >
                        {isRemoving ? (
                          <X size={16} />
                        ) : (
                          <Heart size={17} fill="currentColor" />
                        )}
                      </button>

                      {/* Category */}
                      {product.category && (
                        <span className="absolute bottom-3 left-3 rounded-full bg-white/90 px-3 py-1 text-[9px] font-black uppercase tracking-wider text-slate-700 shadow-sm backdrop-blur">
                          {product.category}
                        </span>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-5">
                      {product.brand && (
                        <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-indigo-500">
                          {product.brand}
                        </p>
                      )}

                      <Link to={`/products/${product._id}`}>
                        <h2 className="mt-1 line-clamp-2 min-h-/[48px] text-base font-black leading-6 text-slate-900 transition group-hover:text-indigo-600">
                          {product.title}
                        </h2>
                      </Link>

                      {/* Rating / Stock */}
                      <div className="mt-3 flex items-center justify-between">
                        {product.rating ? (
                          <div className="flex items-center gap-1">
                            <Star
                              size={14}
                              fill="currentColor"
                              className="text-amber-400"
                            />
                            <span className="text-xs font-bold text-slate-700">
                              {product.rating}
                            </span>
                          </div>
                        ) : (
                          <span className="text-xs text-slate-400">
                            Saved item
                          </span>
                        )}

                        {product.stock !== undefined && (
                          <span
                            className={`text-[10px] font-bold ${
                              product.stock > 0
                                ? "text-emerald-600"
                                : "text-red-500"
                            }`}
                          >
                            {product.stock > 0
                              ? `${product.stock} in stock`
                              : "Out of stock"}
                          </span>
                        )}
                      </div>

                      {/* Price */}
                      <div className="mt-4 flex items-end justify-between">
                        <div>
                          <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                            Price
                          </p>

                          <p className="mt-0.5 text-xl font-black text-slate-950">
                            ₹{product.price.toLocaleString("en-IN")}
                          </p>
                        </div>

                        <Link
                          to={`/products/${product._id}`}
                          className="text-xs font-bold text-indigo-600 hover:text-indigo-700"
                        >
                          Details →
                        </Link>
                      </div>

                      {/* Actions */}
                      <div className="mt-5 flex gap-2">
                        <button
                          type="button"
                          onClick={() => handleAddToCart(product._id)}
                          disabled={
                            isAdding ||
                            (product.stock !== undefined && product.stock <= 0)
                          }
                          className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-slate-950 py-3 text-xs font-bold text-white transition hover:bg-indigo-600 disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-400"
                        >
                          {isAdding ? (
                            <>
                              <Plus size={15} className="animate-spin" />
                              Adding...
                            </>
                          ) : (
                            <>
                              <ShoppingCart size={15} />
                              Add to Cart
                            </>
                          )}
                        </button>

                        <button
                          type="button"
                          onClick={() => handleRemove(product._id)}
                          disabled={isRemoving}
                          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-slate-200 text-slate-400 transition hover:border-red-200 hover:bg-red-50 hover:text-red-500 disabled:opacity-50"
                          title="Remove"
                        >
                          <Trash2 size={17} />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Wishlist;
