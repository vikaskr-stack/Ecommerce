import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowRight,
  Check,
  LockKeyhole,
  Mail,
  User,
  UserRound,
  Sparkles,
  ShieldCheck,
  ShoppingBag,
} from "lucide-react";

import { registerUser } from "../services/api";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    fullName: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

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
    setLoading(true);

    try {
      await registerUser(formData);
      navigate("/verify-otp", {
        state: {
          email: formData.email,
        },
      });
    } catch (error) {
      console.error("Registration error:", error);
      setError(error.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f6f8ff] px-4 py-6 sm:px-6">
      {/* Decorative background */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-32 -top-32 h-80 w-80 rounded-full bg-indigo-200/30 blur-3xl" />
        <div className="absolute -bottom-32 -right-32 h-80 w-80 rounded-full bg-violet-200/30 blur-3xl" />
      </div>

      <div className="relative mx-auto flex min-h-[calc(100vh-3rem)] max-w-6xl items-center justify-center">
        <div className="grid w-full overflow-hidden rounded-/[2rem] border border-slate-200 bg-white shadow-xl shadow-slate-200/40 lg:grid-cols-[0.9fr_1.1fr]">
          {/* Left branding panel */}
          <div className="relative hidden overflow-hidden bg-linear-to-br from-indigo-600 via-indigo-600 to-violet-700 p-10 text-white lg:flex lg:flex-col lg:justify-between">
            {/* Glow */}
            <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
            <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-violet-300/20 blur-3xl" />

            {/* Logo */}
            <div className="relative">
              <Link to="/" className="inline-flex items-center gap-2.5 group">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/15 ring-1 ring-white/20 backdrop-blur transition group-hover:scale-105">
                  <ShoppingBag size={19} />
                </div>

                <span className="text-xl font-black tracking-tight">AURA</span>
              </Link>
            </div>

            {/* Main content */}
            <div className="relative my-12">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-semibold backdrop-blur">
                <Sparkles size={14} />
                Your shopping journey starts here
              </div>

              <h2 className="max-w-md text-4xl font-black leading-tight tracking-tight">
                Everything you want,
                <span className="block text-indigo-100">all in one place.</span>
              </h2>

              <p className="mt-5 max-w-md text-sm leading-7 text-indigo-100">
                Create your AURA account and enjoy a seamless shopping
                experience with your cart, wishlist, orders, and more.
              </p>
            </div>

            {/* Benefits */}
            <div className="relative space-y-3">
              <div className="flex items-center gap-3 text-sm text-indigo-50">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10">
                  <Check size={16} />
                </div>
                Save products to your wishlist
              </div>

              <div className="flex items-center gap-3 text-sm text-indigo-50">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10">
                  <Check size={16} />
                </div>
                Track your orders easily
              </div>

              <div className="flex items-center gap-3 text-sm text-indigo-50">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10">
                  <Check size={16} />
                </div>
                Manage your shopping cart
              </div>
            </div>
          </div>

          {/* Right registration panel */}
          <div className="p-6 sm:p-10 lg:p-12">
            {/* Mobile logo */}
            <div className="mb-8 flex justify-center lg:hidden">
              <Link to="/" className="flex items-center gap-2 group">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-br from-indigo-500 to-violet-600 shadow-sm transition group-hover:scale-105">
                  <ShoppingBag size={18} className="text-white" />
                </div>

                <span className="text-xl font-black tracking-tight text-slate-950">
                  AURA
                </span>
              </Link>
            </div>

            {/* Heading */}
            <div className="mb-8">
              <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-indigo-50">
                <UserRound size={21} className="text-indigo-600" />
              </div>

              <h1 className="text-3xl font-black tracking-tight text-slate-950">
                Create your account
              </h1>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Join AURA and start exploring products you'll love.
              </p>
            </div>

            {/* Error */}
            {error && (
              <div className="mb-5 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3.5 text-sm text-red-600">
                <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-red-100 text-xs font-bold">
                  !
                </div>

                <p>{error}</p>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Full Name */}
              <div>
                <label
                  htmlFor="fullName"
                  className="mb-2 block text-sm font-bold text-slate-700"
                >
                  Full Name
                </label>

                <div className="relative">
                  <User
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    id="fullName"
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    required
                    className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50/70 pl-11 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-50"
                  />
                </div>
              </div>

              {/* Username */}
              <div>
                <label
                  htmlFor="username"
                  className="mb-2 block text-sm font-bold text-slate-700"
                >
                  Username
                </label>

                <div className="relative">
                  <UserRound
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    id="username"
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    placeholder="Choose a username"
                    required
                    className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50/70 pl-11 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-50"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-bold text-slate-700"
                >
                  Email Address
                </label>

                <div className="relative">
                  <Mail
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    id="email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    required
                    className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50/70 pl-11 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-50"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-bold text-slate-700"
                >
                  Password
                </label>

                <div className="relative">
                  <LockKeyhole
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    id="password"
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Create a password"
                    required
                    className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50/70 pl-11 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-50"
                  />
                </div>

                <p className="mt-2 text-xs text-slate-400">
                  Use a secure password that you don't reuse elsewhere.
                </p>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="group flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-slate-950 text-sm font-bold text-white shadow-lg shadow-slate-950/10 transition hover:bg-indigo-600 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                    Creating Account...
                  </>
                ) : (
                  <>
                    Create Account
                    <ArrowRight
                      size={17}
                      className="transition-transform group-hover:translate-x-0.5"
                    />
                  </>
                )}
              </button>
            </form>

            {/* Login */}
            <div className="mt-7 border-t border-slate-100 pt-6 text-center">
              <p className="text-sm text-slate-500">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="font-bold text-indigo-600 transition hover:text-indigo-700"
                >
                  Login
                </Link>
              </p>
            </div>

            {/* Security note */}
            <div className="mt-6 flex items-center justify-center gap-2 text-xs text-slate-400">
              <ShieldCheck size={15} />
              Your account information is securely protected
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
