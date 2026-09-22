import { useEffect, useState } from "react";
import { Search, PackageOpen, RefreshCw } from "lucide-react";

import ProductCard from "./ProductCard";
import { getProducts } from "../services/api";

function ProductSection({ searchQuery, selectedCategory }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getProducts();
        setProducts(data);
      } catch (error) {
        console.error(error);
        setError("Unable to load products.");
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  const filteredProducts = products.filter((product) => {
    const search = searchQuery.toLowerCase().trim();

    const matchesSearch =
      search === "" ||
      product.title?.toLowerCase().includes(search) ||
      product.description?.toLowerCase().includes(search) ||
      product.brand?.toLowerCase().includes(search) ||
      product.category?.toLowerCase().includes(search);

    if (selectedCategory === "All Gear") {
      return matchesSearch;
    }

    const category = selectedCategory.toLowerCase();

    const matchesCategory =
      product.category?.toLowerCase() === category ||
      product.title?.toLowerCase().includes(category) ||
      product.description?.toLowerCase().includes(category) ||
      product.brand?.toLowerCase().includes(category);

    return matchesSearch && matchesCategory;
  });

  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      {/* Section heading */}
      <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="mb-2 flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-indigo-600" />

            <p className="text-xs font-bold uppercase tracking-[0.18em] text-indigo-600">
              Curated Selection
            </p>
          </div>

          <h2 className="text-2xl font-black tracking-tight text-slate-950 sm:text-3xl">
            Trending Products
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            Discover products selected for your everyday needs.
          </p>
        </div>

        {/* Product count */}
        {!loading && !error && (
          <div className="flex w-fit items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 shadow-sm">
            <PackageOpen size={16} className="text-indigo-600" />

            <span className="text-sm font-bold text-slate-700">
              {filteredProducts.length}
            </span>

            <span className="text-sm text-slate-400">
              {filteredProducts.length === 1 ? "Product" : "Products"}
            </span>
          </div>
        )}
      </div>

      {/* Active filters */}
      {(searchQuery.trim() || selectedCategory !== "All Gear") &&
        !loading &&
        !error && (
          <div className="mb-6 flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold text-slate-400">
              Showing:
            </span>

            {searchQuery.trim() && (
              <span className="rounded-full border border-indigo-100 bg-indigo-50 px-3 py-1.5 text-xs font-semibold text-indigo-600">
                Search: "{searchQuery}"
              </span>
            )}

            {selectedCategory !== "All Gear" && (
              <span className="rounded-full border border-violet-100 bg-violet-50 px-3 py-1.5 text-xs font-semibold text-violet-600">
                {selectedCategory}
              </span>
            )}
          </div>
        )}

      {/* Loading */}
      {loading && (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-2xl border border-slate-200 bg-white"
            >
              {/* Image skeleton */}
              <div className="h-64 animate-pulse bg-slate-100" />

              {/* Content skeleton */}
              <div className="space-y-3 p-5">
                <div className="h-3 w-20 animate-pulse rounded bg-slate-100" />

                <div className="h-5 w-3/4 animate-pulse rounded bg-slate-100" />

                <div className="h-4 w-1/2 animate-pulse rounded bg-slate-100" />

                <div className="flex items-center justify-between pt-2">
                  <div className="h-6 w-20 animate-pulse rounded bg-slate-100" />

                  <div className="h-9 w-9 animate-pulse rounded-xl bg-slate-100" />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Error */}
      {!loading && error && (
        <div className="rounded-/[1.5rem] border border-red-200 bg-white p-8 text-center shadow-sm">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-red-50">
            <RefreshCw size={20} className="text-red-500" />
          </div>

          <h3 className="mt-4 text-lg font-black text-slate-950">
            Something went wrong
          </h3>

          <p className="mt-2 text-sm text-slate-500">{error}</p>
        </div>
      )}

      {/* Empty state */}
      {!loading && !error && filteredProducts.length === 0 && (
        <div className="rounded-/[2rem] border border-slate-200 bg-white px-6 py-14 text-center shadow-sm">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-50">
            {searchQuery ? (
              <Search size={27} className="text-indigo-600" />
            ) : (
              <PackageOpen size={27} className="text-indigo-600" />
            )}
          </div>

          <h3 className="mt-5 text-xl font-black text-slate-950">
            No products found
          </h3>

          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
            {searchQuery
              ? `We couldn't find anything matching "${searchQuery}". Try a different search.`
              : "There are no products available in this category yet."}
          </p>

          <p className="mt-4 text-xs font-medium text-slate-400">
            Try another search or choose a different category.
          </p>
        </div>
      )}

      {/* Products */}
      {!loading && !error && filteredProducts.length > 0 && (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
}

export default ProductSection;
