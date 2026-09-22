import {
  Search,
  Heart,
  ShoppingBag,
  User,
  Menu,
  X,
  Package,
  ArrowLeftRight,
  Sparkles,
  LogOut,
  ChevronRight,
} from "lucide-react";

import { Link } from "react-router-dom";
import { useState } from "react";

import { useAuth } from "../context/useAuth";

function Navbar({ searchQuery, setSearchQuery }) {
  const { cartItems, user, logout, wishlistItems } = useAuth();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const cartTotal = cartItems.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0,
  );

  const wishlistCount = wishlistItems.length;

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    closeMobileMenu();
  };

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/90 backdrop-blur-xl">
      {/* ===================================================== */}
      {/* MAIN NAVBAR                                           */}
      {/* ===================================================== */}

      <div className="mx-auto max-w-/[1440px] px-4 sm:px-6 lg:px-8">
        <div className="flex min-h-/[76px] items-center gap-4">
          {/* ================= LOGO ================= */}

          <Link
            to="/"
            onClick={closeMobileMenu}
            className="group flex shrink-0 items-center gap-3"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-950 text-white shadow-sm transition-all duration-300 group-hover:-translate-y-0.5 group-hover:bg-indigo-600">
              <ShoppingBag size={20} strokeWidth={2.2} />
            </div>

            <div className="hidden sm:block">
              <h1 className="text-[19px] font-black tracking-[-0.04em] text-slate-950">
                AURA
              </h1>

              <p className="text-[9px] font-bold uppercase tracking-[0.24em] text-slate-400">
                Marketplace
              </p>
            </div>
          </Link>

          {/* ================= DESKTOP SEARCH ================= */}

          <div className="mx-auto hidden max-w-2xl flex-1 md:block">
            <div className="group flex h-12 items-center rounded-2xl border border-slate-200 bg-slate-50/80 px-2 transition-all duration-200 focus-within:border-indigo-200 focus-within:bg-white focus-within:shadow-[0_8px_30px_rgba(79,70,229,0.08)]">
              <Search
                size={18}
                className="ml-3 shrink-0 text-slate-400 transition-colors group-focus-within:text-indigo-500"
              />

              <input
                type="text"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Search products, brands and categories..."
                className="min-w-0 flex-1 bg-transparent px-3 text-sm text-slate-800 outline-none placeholder:text-slate-400"
              />

              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="mr-2 rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                  aria-label="Clear search"
                >
                  <X size={15} />
                </button>
              )}

              <button
                type="button"
                className="flex h-9 items-center gap-2 rounded-xl bg-slate-950 px-4 text-xs font-bold text-white transition-all duration-200 hover:bg-indigo-600"
              >
                <Search size={14} />
                Search
              </button>
            </div>
          </div>

          {/* ================= DESKTOP ACTIONS ================= */}

          <div className="ml-auto hidden items-center gap-1.5 md:flex">
            {/* Wishlist */}

            <Link
              to="/wishlist"
              className="group relative flex h-11 w-11 items-center justify-center rounded-xl text-slate-600 transition-all hover:bg-slate-100 hover:text-red-500"
              aria-label="Wishlist"
            >
              <Heart
                size={20}
                strokeWidth={1.9}
                className="transition-transform group-hover:scale-105"
              />

              {wishlistCount > 0 && (
                <span className="absolute right-0.5 top-0.5 flex h-/[18px] min-w-/[18px] items-center justify-center rounded-full bg-red-500 px-1 text-[9px] font-bold text-white ring-2 ring-white">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Cart */}

            <Link
              to="/cart"
              className="group relative flex items-center gap-2 rounded-xl px-3 py-2.5 transition-all hover:bg-slate-100"
            >
              <div className="relative">
                <ShoppingBag
                  size={21}
                  strokeWidth={1.9}
                  className="text-slate-700 transition-colors group-hover:text-indigo-600"
                />

                {cartCount > 0 && (
                  <span className="absolute -right-2 -top-2 flex h-/[18px] min-w-/[18px] items-center justify-center rounded-full bg-indigo-600 px-1 text-[9px] font-bold text-white ring-2 ring-white">
                    {cartCount}
                  </span>
                )}
              </div>

              <div className="hidden xl:block">
                <p className="text-[9px] font-semibold uppercase tracking-wider text-slate-400">
                  Cart
                </p>

                <p className="text-xs font-bold text-slate-800">
                  ₹{cartTotal.toLocaleString("en-IN")}
                </p>
              </div>
            </Link>

            {/* Orders */}

            <Link
              to="/orders"
              className="flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-600 transition-all hover:bg-slate-100 hover:text-slate-950"
            >
              <Package size={19} strokeWidth={1.9} />
              <span className="hidden xl:block">Orders</span>
            </Link>

            {/* Divider */}

            <div className="mx-1 h-8 w-px bg-slate-200" />

            {/* User */}

            {user ? (
              <div className="flex items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-50 text-indigo-600 ring-1 ring-indigo-100">
                  <User size={18} />
                </div>

                <div className="hidden max-w-/[145px] lg:block">
                  <p className="truncate text-sm font-bold text-slate-800">
                    {user.fullName}
                  </p>

                  <p className="truncate text-[11px] text-slate-400">
                    {user.email}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={logout}
                  className="ml-1 rounded-xl p-2 text-slate-400 transition hover:bg-red-50 hover:text-red-500"
                  title="Logout"
                  aria-label="Logout"
                >
                  <LogOut size={17} />
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="flex items-center gap-2 rounded-xl px-2 py-1.5 transition hover:bg-slate-100"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-600">
                  <User size={18} />
                </div>

                <div className="hidden lg:block">
                  <p className="text-xs font-bold text-slate-800">Account</p>
                  <p className="text-[10px] text-slate-400">Login / Register</p>
                </div>
              </Link>
            )}
          </div>

          {/* ================= MOBILE ACTIONS ================= */}

          <div className="ml-auto flex items-center gap-1 md:hidden">
            {/* Wishlist */}

            <Link
              to="/wishlist"
              onClick={closeMobileMenu}
              className="relative flex h-10 w-10 items-center justify-center rounded-xl text-slate-600 hover:bg-slate-100"
              aria-label="Wishlist"
            >
              <Heart size={20} />

              {wishlistCount > 0 && (
                <span className="absolute right-0 top-0 flex h-4 min-w-4 items-center justify-center rounded-full bg-red-500 px-1 text-[8px] font-bold text-white ring-2 ring-white">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Cart */}

            <Link
              to="/cart"
              onClick={closeMobileMenu}
              className="relative flex h-10 w-10 items-center justify-center rounded-xl text-slate-600 hover:bg-slate-100"
              aria-label="Cart"
            >
              <ShoppingBag size={20} />

              {cartCount > 0 && (
                <span className="absolute right-0 top-0 flex h-4 min-w-4 items-center justify-center rounded-full bg-indigo-600 px-1 text-[8px] font-bold text-white ring-2 ring-white">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Menu */}

            <button
              type="button"
              onClick={() => setMobileMenuOpen((previous) => !previous)}
              className="flex h-10 w-10 items-center justify-center rounded-xl text-slate-700 transition hover:bg-slate-100"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* ===================================================== */}
        {/* MOBILE SEARCH                                         */}
        {/* ===================================================== */}

        <div className="pb-3 md:hidden">
          <div className="flex h-11 items-center rounded-xl border border-slate-200 bg-slate-50/80 px-2 focus-within:border-indigo-200 focus-within:bg-white">
            <Search size={17} className="ml-2 text-slate-400" />

            <input
              type="text"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="Search products..."
              className="min-w-0 flex-1 bg-transparent px-3 text-sm outline-none placeholder:text-slate-400"
            />

            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="mr-1 rounded-lg p-1.5 text-slate-400 hover:bg-slate-100"
                aria-label="Clear search"
              >
                <X size={14} />
              </button>
            )}
          </div>
        </div>

        {/* ===================================================== */}
        {/* MOBILE MENU                                           */}
        {/* ===================================================== */}

        {mobileMenuOpen && (
          <div className="border-t border-slate-100 py-4 md:hidden">
            {/* Account */}

            {user ? (
              <div className="mb-4 flex items-center gap-3 rounded-2xl border border-indigo-100 bg-indigo-50/60 p-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-indigo-600 shadow-sm">
                  <User size={19} />
                </div>

                <div className="min-w-0">
                  <p className="truncate text-sm font-bold text-slate-800">
                    {user.fullName}
                  </p>

                  <p className="truncate text-xs text-slate-500">
                    {user.email}
                  </p>
                </div>
              </div>
            ) : (
              <Link
                to="/login"
                onClick={closeMobileMenu}
                className="mb-4 flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-slate-600 shadow-sm">
                  <User size={19} />
                </div>

                <div>
                  <p className="text-sm font-bold text-slate-800">
                    Welcome to AURA
                  </p>

                  <p className="text-xs text-slate-500">
                    Login or create an account
                  </p>
                </div>

                <ChevronRight size={18} className="ml-auto text-slate-400" />
              </Link>
            )}

            {/* Links */}

            <div className="space-y-1">
              <Link
                to="/"
                onClick={closeMobileMenu}
                className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-indigo-600 transition hover:bg-indigo-50"
              >
                <ShoppingBag size={18} />
                Home
              </Link>

              <Link
                to="/wishlist"
                onClick={closeMobileMenu}
                className="flex items-center justify-between rounded-xl px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                <span className="flex items-center gap-3">
                  <Heart size={18} />
                  Wishlist
                </span>

                {wishlistCount > 0 && (
                  <span className="rounded-full bg-red-50 px-2 py-1 text-[10px] font-bold text-red-500">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              <Link
                to="/cart"
                onClick={closeMobileMenu}
                className="flex items-center justify-between rounded-xl px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                <span className="flex items-center gap-3">
                  <ShoppingBag size={18} />
                  Cart
                </span>

                {cartCount > 0 && (
                  <span className="rounded-full bg-indigo-50 px-2 py-1 text-[10px] font-bold text-indigo-600">
                    {cartCount}
                  </span>
                )}
              </Link>

              <Link
                to="/orders"
                onClick={closeMobileMenu}
                className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                <Package size={18} />
                Orders
              </Link>

              {user && (
                <Link
                  to="/choose-mode"
                  onClick={closeMobileMenu}
                  className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                >
                  <ArrowLeftRight size={18} />
                  Switch Mode
                </Link>
              )}
            </div>

            {/* Logout */}

            {user && (
              <button
                type="button"
                onClick={handleLogout}
                className="mt-4 flex w-full items-center gap-3 rounded-xl border border-red-100 px-4 py-3 text-left text-sm font-semibold text-red-500 transition hover:bg-red-50"
              >
                <LogOut size={18} />
                Logout
              </button>
            )}
          </div>
        )}
      </div>

      {/* ===================================================== */}
      {/* CATEGORY NAVIGATION                                   */}
      {/* ===================================================== */}

      <nav className="border-t border-slate-100 bg-white">
        <div className="mx-auto flex max-w-/[1440px] items-center gap-2 overflow-x-auto px-4 py-2.5 sm:px-6 lg:px-8">
          <Link
            to="/"
            className="shrink-0 rounded-full bg-slate-950 px-4 py-2 text-xs font-bold text-white transition hover:bg-indigo-600"
          >
            All Deals
          </Link>

          <button
            type="button"
            className="shrink-0 rounded-full px-4 py-2 text-xs font-semibold text-slate-600 transition hover:bg-slate-100 hover:text-indigo-600"
          >
            Electronics & Audio
          </button>

          <button
            type="button"
            className="shrink-0 rounded-full px-4 py-2 text-xs font-semibold text-slate-600 transition hover:bg-slate-100 hover:text-indigo-600"
          >
            Smart Living
          </button>

          <button
            type="button"
            className="shrink-0 rounded-full px-4 py-2 text-xs font-semibold text-slate-600 transition hover:bg-slate-100 hover:text-indigo-600"
          >
            Work & Study
          </button>

          <button
            type="button"
            className="shrink-0 rounded-full px-4 py-2 text-xs font-semibold text-slate-600 transition hover:bg-slate-100 hover:text-indigo-600"
          >
            Fashion & Apparel
          </button>

          <button
            type="button"
            className="shrink-0 rounded-full px-4 py-2 text-xs font-semibold text-slate-600 transition hover:bg-slate-100 hover:text-indigo-600"
          >
            Home & Kitchen
          </button>

          <button
            type="button"
            className="shrink-0 rounded-full px-4 py-2 text-xs font-semibold text-slate-600 transition hover:bg-slate-100 hover:text-indigo-600"
          >
            Sale & Clearance
          </button>

          <span className="shrink-0 rounded-full bg-red-50 px-2.5 py-1 text-[9px] font-black uppercase tracking-wider text-red-500">
            Hot
          </span>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
