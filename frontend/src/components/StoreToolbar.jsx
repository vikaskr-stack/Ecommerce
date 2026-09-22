function StoreToolbar({ selectedCategory, setSelectedCategory }) {
  const categories = [
    "All Gear",
    "Audio",
    "Laptops",
    "Desk Setup",
    "Wearables",
    "Bundles",
  ];

  return (
    <section className="mx-auto max-w-7xl px-6 pt-4">
      <div className="flex gap-2 overflow-x-auto pb-2">
        {categories.map((category) => {
          const isSelected = selectedCategory === category;

          return (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`whitespace-nowrap rounded-full px-4 py-2 text-xs font-medium transition ${
                isSelected
                  ? "bg-blue-600 text-white"
                  : "bg-blue-50 text-gray-700 hover:bg-blue-100"
              }`}
            >
              {category}
            </button>
          );
        })}
      </div>
    </section>
  );
}

export default StoreToolbar;
