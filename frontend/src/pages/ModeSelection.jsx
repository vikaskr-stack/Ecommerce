import {
  ArrowRight,
  ArrowLeftRight,
  ShoppingBag,
  Store,
  Sparkles,
  ShieldCheck,
  Package,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";

function ModeSelection() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const firstName = user?.fullName?.split(" ")[0] || "there";

  return (
    <main className="min-h-screen bg-[#f5f7ff] px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto flex min-h-[calc(100vh-48px)] max-w-6xl flex-col">
        {/* HEADER */}
        <header className="flex items-center justify-between py-2">
          <Link to="/" className="group inline-flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-950 text-white shadow-lg transition duration-200 group-hover:-translate-y-0.5 group-hover:bg-indigo-600">
              <ShoppingBag size={21} />
            </div>

            <div>
              <p className="text-lg font-black tracking-tight text-slate-950">
                AURA
              </p>

              <p className="text-[9px] font-semibold uppercase tracking-[0.25em] text-slate-400">
                Marketplace
              </p>
            </div>
          </Link>

          <Link
            to="/"
            className="hidden items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-600 shadow-sm transition hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-600 sm:inline-flex"
          >
            <ArrowLeftRight size={16} />
            Back to Store
          </Link>
        </header>

        {/* MAIN */}
        <div className="flex flex-1 items-center justify-center py-10">
          <div className="w-full max-w-5xl">
            {/* HEADING */}
            <div className="mx-auto mb-10 max-w-2xl text-center">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-white px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.17em] text-indigo-600 shadow-sm">
                <Sparkles size={13} />
                Choose your experience
              </div>

              <h1 className="text-4xl font-black tracking-[-0.045em] text-slate-950 sm:text-5xl lg:text-6xl">
                How do you want to
                <br />
                <span className="text-indigo-600">use AURA?</span>
              </h1>

              <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-slate-500 sm:text-base">
                Welcome back, {firstName}. Choose how you'd like to continue.
                You can switch between buying and selling anytime.
              </p>
            </div>

            {/* MODE CARDS */}
            <div className="grid gap-5 md:grid-cols-2">
              {/* BUY */}
              <button
                type="button"
                onClick={() => navigate("/")}
                className="group relative overflow-hidden rounded-[30px] border border-white bg-white p-2 text-left shadow-[0_15px_50px_rgba(65,70,120,0.08)] transition duration-300 hover:-translate-y-2 hover:shadow-[0_25px_65px_rgba(65,70,120,0.14)]"
              >
                <div className="relative min-h-/[360px] overflow-hidden rounded-[25px] bg-linear-to-br from-[#eef1ff] via-[#f8f9ff] to-[#e8eaff] p-7 sm:p-9">
                  {/* Decorative shapes */}
                  <div className="pointer-events-none absolute -right-20 -top-20 h-60 w-60 rounded-full bg-indigo-300/25 blur-3xl transition duration-500 group-hover:bg-indigo-400/35" />

                  <div className="pointer-events-none absolute -bottom-20 -left-20 h-60 w-60 rounded-full bg-blue-300/20 blur-3xl" />

                  {/* Icon */}
                  <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-indigo-600 shadow-sm transition duration-300 group-hover:scale-105">
                    <ShoppingBag size={25} />
                  </div>

                  {/* Text */}
                  <div className="relative mt-12">
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-indigo-500">
                      For shoppers
                    </p>

                    <h2 className="mt-2 text-3xl font-black tracking-[-0.04em] text-slate-950">
                      Buy Products
                    </h2>

                    <p className="mt-4 max-w-sm text-sm leading-6 text-slate-500">
                      Explore products, discover new collections, save favorites
                      and place orders from the marketplace.
                    </p>
                  </div>

                  {/* Features */}
                  <div className="relative mt-7 flex flex-wrap gap-2">
                    <span className="rounded-full border border-white bg-white/80 px-3 py-1.5 text-[10px] font-semibold text-slate-500">
                      Discover products
                    </span>

                    <span className="rounded-full border border-white bg-white/80 px-3 py-1.5 text-[10px] font-semibold text-slate-500">
                      Wishlist
                    </span>

                    <span className="rounded-full border border-white bg-white/80 px-3 py-1.5 text-[10px] font-semibold text-slate-500">
                      Orders
                    </span>
                  </div>

                  {/* CTA */}
                  <div className="relative mt-8 flex items-center justify-between">
                    <span className="text-sm font-bold text-slate-900">
                      Continue shopping
                    </span>

                    <span className="flex h-11 w-11 items-center justify-center rounded-full bg-slate-950 text-white transition duration-300 group-hover:translate-x-1 group-hover:bg-indigo-600">
                      <ArrowRight size={18} />
                    </span>
                  </div>
                </div>
              </button>

              {/* SELL */}
              <button
                type="button"
                onClick={() => navigate("/seller")}
                className="group relative overflow-hidden rounded-[30px] border border-white bg-white p-2 text-left shadow-[0_15px_50px_rgba(65,70,120,0.08)] transition duration-300 hover:-translate-y-2 hover:shadow-[0_25px_65px_rgba(65,70,120,0.14)]"
              >
                <div className="relative min-h-/[360px] overflow-hidden rounded-[25px] bg-linear-to-br from-[#f3edff] via-[#faf8ff] to-[#eee8ff] p-7 sm:p-9">
                  {/* Decorative shapes */}
                  <div className="pointer-events-none absolute -right-20 -top-20 h-60 w-60 rounded-full bg-purple-300/25 blur-3xl transition duration-500 group-hover:bg-purple-400/35" />

                  <div className="pointer-events-none absolute -bottom-20 -left-20 h-60 w-60 rounded-full bg-indigo-300/20 blur-3xl" />

                  {/* Icon */}
                  <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-purple-600 shadow-sm transition duration-300 group-hover:scale-105">
                    <Store size={25} />
                  </div>

                  {/* Text */}
                  <div className="relative mt-12">
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-purple-500">
                      For sellers
                    </p>

                    <h2 className="mt-2 text-3xl font-black tracking-[-0.04em] text-slate-950">
                      Sell Products
                    </h2>

                    <p className="mt-4 max-w-sm text-sm leading-6 text-slate-500">
                      Create your product collection, manage inventory and grow
                      your store from your seller dashboard.
                    </p>
                  </div>

                  {/* Features */}
                  <div className="relative mt-7 flex flex-wrap gap-2">
                    <span className="rounded-full border border-white bg-white/80 px-3 py-1.5 text-[10px] font-semibold text-slate-500">
                      Add products
                    </span>

                    <span className="rounded-full border border-white bg-white/80 px-3 py-1.5 text-[10px] font-semibold text-slate-500">
                      Manage stock
                    </span>

                    <span className="rounded-full border border-white bg-white/80 px-3 py-1.5 text-[10px] font-semibold text-slate-500">
                      Seller tools
                    </span>
                  </div>

                  {/* CTA */}
                  <div className="relative mt-8 flex items-center justify-between">
                    <span className="text-sm font-bold text-slate-900">
                      Open seller studio
                    </span>

                    <span className="flex h-11 w-11 items-center justify-center rounded-full bg-slate-950 text-white transition duration-300 group-hover:translate-x-1 group-hover:bg-purple-600">
                      <ArrowRight size={18} />
                    </span>
                  </div>
                </div>
              </button>
            </div>

            {/* BOTTOM INFO */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-xs text-slate-400">
              <span className="flex items-center gap-2">
                <ShieldCheck size={14} className="text-emerald-500" />
                Secure account
              </span>

              <span className="flex items-center gap-2">
                <ArrowLeftRight size={14} className="text-indigo-500" />
                Switch anytime
              </span>

              <span className="flex items-center gap-2">
                <Package size={14} className="text-purple-500" />
                One account
              </span>
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <footer className="border-t border-slate-200/70 py-5 text-center text-[10px] text-slate-400">
          AURA Marketplace · Shop and sell from one account
        </footer>
      </div>
    </main>
  );
}

export default ModeSelection;
