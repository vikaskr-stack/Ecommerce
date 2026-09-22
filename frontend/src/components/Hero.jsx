import { ArrowRight, ShoppingBag, Sparkles, ChevronRight } from "lucide-react";

function Hero() {
  return (
    <section className="mx-auto max-w-7xl px-4 pt-5 sm:px-6 lg:px-8">
      <div className="relative overflow-hidden rounded-/[2rem] bg-linear-to-br from-indigo-600 via-indigo-600 to-violet-700 px-6 py-12 shadow-xl shadow-indigo-200/40 sm:px-10 md:py-16 lg:px-14">
        {/* Background Glow Effects */}
        <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-white/10 blur-3xl" />

        <div className="pointer-events-none absolute -bottom-32 right-20 h-72 w-72 rounded-full bg-violet-300/20 blur-3xl" />

        <div className="pointer-events-none absolute bottom-0 left-1/2 h-40 w-40 -translate-x-1/2 rounded-full bg-indigo-300/10 blur-3xl" />

        {/* Decorative Circles */}
        <div className="pointer-events-none absolute right-10 top-10 hidden h-24 w-24 rounded-full border border-white/10 lg:block" />

        <div className="pointer-events-none absolute right-24 top-24 hidden h-12 w-12 rounded-full border border-white/10 lg:block" />

        {/* Main Content */}
        <div className="relative max-w-3xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3.5 py-2 text-xs font-bold uppercase tracking-wider text-indigo-50 backdrop-blur">
            <Sparkles size={14} />A modern shopping experience
          </div>

          {/* Heading */}
          <h1 className="mt-6 text-4xl font-black leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-6xl">
            Everything you need,
            <span className="block text-indigo-100">all in one place.</span>
          </h1>

          {/* Description */}
          <p className="mt-6 max-w-2xl text-sm leading-7 text-indigo-100 sm:text-base">
            Discover electronics, lifestyle products, workspace essentials, and
            more — thoughtfully brought together in one simple shopping
            experience.
          </p>

          {/* Buttons */}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            {/* Explore Products */}
            <a
              href="#products"
              className="group inline-flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-3.5 text-sm font-bold text-indigo-600 shadow-lg shadow-indigo-950/10 transition hover:-translate-y-0.5 hover:bg-indigo-50"
            >
              Explore Products
              <ArrowRight
                size={17}
                className="transition-transform group-hover:translate-x-1"
              />
            </a>

            {/* View Collection */}
            <a
              href="#products"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/10 px-5 py-3.5 text-sm font-bold text-white backdrop-blur transition hover:bg-white/15"
            >
              <ShoppingBag size={17} />
              View Collection
            </a>
          </div>

          {/* Trust / Feature Points */}
          <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-white/10 pt-6 text-xs font-medium text-indigo-100">
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-300" />
              Curated products
            </div>

            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-300" />
              Secure checkout
            </div>

            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-300" />
              Easy order tracking
            </div>
          </div>
        </div>

        {/* Right Side Product Card */}
        <div className="absolute bottom-8 right-10 hidden w-52 rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-xl lg:block">
          <div className="flex items-center justify-between">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/15">
              <ShoppingBag size={19} className="text-white" />
            </div>

            <ChevronRight size={17} className="text-indigo-100" />
          </div>

          <p className="mt-4 text-sm font-bold text-white">
            Your next favorite
          </p>

          <p className="mt-1 text-xs leading-5 text-indigo-100">
            Browse our latest collection.
          </p>
        </div>
      </div>
    </section>
  );
}

export default Hero;
