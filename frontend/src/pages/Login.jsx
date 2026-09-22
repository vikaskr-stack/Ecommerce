import { useState } from "react";
import {
  ArrowRight,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  Package,
  ShoppingBag,
  Sparkles,
  Store,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

import { loginUser } from "../services/api";
import { useAuth } from "../context/useAuth";

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");

    if (!formData.email || !formData.password) {
      setError("Please enter your email and password.");
      return;
    }

    try {
      setLoading(true);

      

const result = await loginUser(formData);

console.log("Login response:", result);

login(result.data.accessToken, result.data);

      navigate("/choose-mode");
    } catch (error) {
      console.error("Login error:", error);

      setError(error.message || "Invalid email or password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-[calc(100vh-80px)] bg-[#f5f7ff] px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto flex min-h-[calc(100vh-144px)] max-w-6xl items-center">
        <div className="grid w-full overflow-hidden rounded-/[32px] border border-white bg-white shadow-[0_25px_80px_rgba(55,65,130,0.12)] lg:grid-cols-2">
          {/* ================================================= */}
          {/* LEFT SIDE */}
          {/* ================================================= */}

          <section className="relative hidden overflow-hidden bg-linear-to-br from-[#10152f] via-[#20275a] to-[#43358b] p-10 text-white lg:flex lg:flex-col lg:justify-between xl:p-14">
            {/* Background decorations */}

            <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-indigo-400/20 blur-3xl" />

            <div className="pointer-events-none absolute -bottom-24 -left-24 h-80 w-80 rounded-full bg-purple-400/20 blur-3xl" />

            {/* Brand */}

            <div className="relative">
              <Link to="/" className="inline-flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-indigo-600 shadow-lg">
                  <ShoppingBag size={21} />
                </div>

                <div>
                  <p className="text-lg font-black tracking-tight">AURA</p>

                  <p className="text-[9px] uppercase tracking-[0.25em] text-indigo-200">
                    Marketplace
                  </p>
                </div>
              </Link>
            </div>

            {/* Main content */}

            <div className="relative my-12">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-indigo-200 backdrop-blur">
                <Sparkles size={13} />
                Your shopping space
              </div>

              <h1 className="max-w-xl text-4xl font-black leading-[1.05] tracking-[-0.045em] xl:text-5xl">
                Everything you need,
                <br />
                <span className="text-indigo-300">all in one place.</span>
              </h1>

              <p className="mt-6 max-w-md text-sm leading-7 text-indigo-100/70">
                Discover products you love, manage your purchases and build your
                own collection in one simple marketplace.
              </p>

              {/* Feature cards */}

              <div className="mt-9 grid max-w-md grid-cols-3 gap-3">
                <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur">
                  <ShoppingBag size={18} className="text-indigo-300" />

                  <p className="mt-3 text-xs font-bold">Shop</p>

                  <p className="mt-1 text-[10px] leading-4 text-indigo-100/50">
                    Discover products
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur">
                  <Store size={18} className="text-purple-300" />

                  <p className="mt-3 text-xs font-bold">Sell</p>

                  <p className="mt-1 text-[10px] leading-4 text-indigo-100/50">
                    Build your store
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur">
                  <LockKeyhole size={18} className="text-emerald-300" />

                  <p className="mt-3 text-xs font-bold">Secure</p>

                  <p className="mt-1 text-[10px] leading-4 text-indigo-100/50">
                    Protected account
                  </p>
                </div>
              </div>
            </div>

            {/* Bottom */}

            <div className="relative flex items-center justify-between border-t border-white/10 pt-6 text-[10px] text-indigo-200/50">
              <span>Modern shopping experience</span>
              <span>© 2026 AURA</span>
            </div>
          </section>

          {/* ================================================= */}
          {/* RIGHT SIDE - LOGIN FORM */}
          {/* ================================================= */}

          <section className="relative flex items-center justify-center p-6 sm:p-10 lg:p-12 xl:p-16">
            {/* Mobile brand */}

            <div className="absolute left-6 top-6 lg:hidden">
              <Link to="/" className="flex items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-600 text-white">
                  <ShoppingBag size={17} />
                </div>

                <span className="font-black tracking-tight text-slate-900">
                  AURA
                </span>
              </Link>
            </div>

            <div className="w-full max-w-md pt-12 lg:pt-0">
              {/* Heading */}

              <div className="mb-8">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
                  <LockKeyhole size={22} />
                </div>

                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-indigo-500">
                  Welcome back
                </p>

                <h2 className="mt-2 text-3xl font-black tracking-[-0.04em] text-slate-950 sm:text-4xl">
                  Sign in to your account
                </h2>

                <p className="mt-3 text-sm leading-6 text-slate-500">
                  Continue where you left off and explore everything waiting for
                  you.
                </p>
              </div>

              {/* Error */}

              {error && (
                <div className="mb-5 rounded-2xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-600">
                  {error}
                </div>
              )}

              {/* Form */}

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* EMAIL */}

                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-500"
                  >
                    Email address
                  </label>

                  <div className="group relative">
                    <Mail
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 transition group-focus-within:text-indigo-500"
                    />

                    <input
                      id="email"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      autoComplete="email"
                      required
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-3.5 pl-11 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-100"
                    />
                  </div>
                </div>

                {/* PASSWORD */}

                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <label
                      htmlFor="password"
                      className="text-xs font-bold uppercase tracking-wider text-slate-500"
                    >
                      Password
                    </label>

                    <span className="text-xs font-semibold text-slate-400">
                      Keep it secure
                    </span>
                  </div>

                  <div className="group relative">
                    <LockKeyhole
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 transition group-focus-within:text-indigo-500"
                    />

                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Enter your password"
                      autoComplete="current-password"
                      required
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-3.5 pl-11 pr-12 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-100"
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword((previous) => !previous)}
                      className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-xl text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                {/* LOGIN BUTTON */}

                <button
                  type="submit"
                  disabled={loading}
                  className="group flex w-full items-center justify-center gap-2 rounded-2xl bg-slate-950 px-5 py-3.5 text-sm font-bold text-white shadow-lg shadow-slate-900/10 transition duration-200 hover:-translate-y-0.5 hover:bg-indigo-600 hover:shadow-indigo-200 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading ? (
                    <>
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                      Signing in...
                    </>
                  ) : (
                    <>
                      Sign In
                      <ArrowRight
                        size={17}
                        className="transition-transform duration-200 group-hover:translate-x-1"
                      />
                    </>
                  )}
                </button>
              </form>

              {/* DIVIDER */}

              <div className="my-7 flex items-center gap-4">
                <div className="h-px flex-1 bg-slate-100" />

                <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                  New here?
                </span>

                <div className="h-px flex-1 bg-slate-100" />
              </div>

              {/* REGISTER */}

              <Link
                to="/register"
                className="flex w-full items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-5 py-3.5 text-sm font-bold text-slate-700 transition hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-700"
              >
                Create an account
                <ArrowRight size={16} />
              </Link>

              {/* FOOTER */}

              <div className="mt-7 flex items-center justify-center gap-2 text-center text-[11px] text-slate-400">
                <Package size={14} />

                <span>One account. Buy or sell whenever you want.</span>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

export default Login;
