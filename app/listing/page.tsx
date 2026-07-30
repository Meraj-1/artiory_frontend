"use client";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import { Star, Heart, ShoppingCart, SlidersHorizontal, ChevronDown, X, PackageSearch } from "lucide-react";
import { Londrina_Solid } from "next/font/google";
import { useWishlist } from "../context/whishlist/WishlistContext";
import { useCart } from "../context/cart/Cartcontext";
import { ToastContainer, toast } from "react-toastify";

const londrina = Londrina_Solid({
  weight: ["100", "300", "400", "900"],
  subsets: ["latin"],
  display: "swap",
});

function Rating({ value }: { value: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`w-3.5 h-3.5 ${i < value ? "fill-[#00b8a2] text-[#00b8a2]" : "fill-gray-200 text-gray-200"}`}
        />
      ))}
      <span className="text-xs text-gray-400 ml-1">({value}.0)</span>
    </div>
  );
}

type Product = {
  id: number;
  name: string;
  price: number;
  oldPrice?: number;
  image: string;
  images: string[];
  // rating: number;
  category: string;
  shortDescription: string;
  description: string;
  isSale?: boolean;
  ageGroup: string;
};

const product: Product[] = [
  {
    id: 1,
    name: "Jumbo Multicolored Crayon",
    price: 299,
    // rating: 3,
    ageGroup: "3+",
    category: "Crayons",
    image: "/products/1toys1.jpg",
    images: ["/products/1toys1.jpg", "/products/1toys2.jpg"],
    shortDescription: "Bring your child's imagination to life with the Artiory Jumbo Multicolored Crayon Set. ",
    description: "Perfect for kid's 3+, with fun shapes & colors.",
  },
  {
    id: 2,
    name: "Crocodile Puzzle Crayon",
    price: 299,
    oldPrice: 399,
    // rating: 4,
    ageGroup: "3+",
    category: "Puzzle Crayons",
    image: "/products/2toys1.jpg",
    images: ["/products/2toys1.jpg", "/products/2toys3.jpg"],
    shortDescription: "Unleash your child's creativity with the Artiory Dino Puzzle Crayon.",
    description: "Designed for little hands, vibrant & easy grip.",
    isSale: true,
  },
  {
    id: 3,
    name: "Dino Puzzle Crayon",
    price: 299,
    // rating: 3,
    ageGroup: "4+",
    category: "Puzzle Crayons",
    image: "/products/3toys1.jpg",
    images: ["/products/3toys1.jpg", "/products/3toys2.jpg"],
    shortDescription: "Ergonomically designed crayons for better grip.",
    description: "Helps improve hand coordination for kid's.",
  },
  {
    id: 4,
    name: "Dino Puzzle Crayon",
    price: 349,
    // rating: 4,
    ageGroup: "3+",
    category: "Puzzle Crayons",
    image: "/products/4toys1.jpg",
    images: ["/products/4toys1.jpg", "/products/4toys2.jpg"],
    shortDescription: "Spark your child's imagination with the Artiory Dino Puzzle",
    description: "Extra durability & smooth coloring for kid's.",
  },
];

const categoryGroups: { label: string; icon: string; items: string[] }[] = [
  { label: "Art & Craft", icon: "🎨", items: ["Crayons", "Water Colours", "Puzzle Crayons"] },
  { label: "Stationery", icon: "✏️", items: ["Pencil Box", "Compass Box", "Slate", "Stationery Combo Set", "Mechanical Sharpener", "Pencil Case", "Diary"] },
  { label: "Bags", icon: "🎒", items: ["Tiffin Bags", "Cross Bags", "Folder Bags", "Fancy Bags", "Vanity Case"] },
  { label: "Pouches", icon: "👜", items: ["Soft Pouch", "Silicone Pouch"] },
  { label: "Drinkware", icon: "🥤", items: ["Sippers", "500 ml Sipper", "900 ml Plastic Bottle Sipper", "Tumbler"] },
  { label: "Gifts & Fun", icon: "🎁", items: ["Metal Money Box", "Gift Hamper", "Mini Fan"] },
];

const ages = ["All", "Upto 1 year", "1 year", "2 years", "3-4 years", "Over 4 years"];

export default function ProductListPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedAge, setSelectedAge] = useState("All");
  const [sortOption, setSortOption] = useState("Default");
  const [openGroups, setOpenGroups] = useState<string[]>([]);
  const [showMobileFilter, setShowMobileFilter] = useState(false);

  const { dispatch } = useCart();
  const { wishlistDispatch, wishlistState } = useWishlist();

  const handleAddToCart = (p: Product) => {
    dispatch({ type: "ADD_ITEM", payload: { id: String(p.id), name: p.name, price: p.price, image: p.image, quantity: 1 } });
    toast.success(`${p.name} added to cart!`, { position: "bottom-right", autoClose: 800 });
  };

  const handleWishlist = (p: Product) => {
    const isIn = wishlistState.items.some((item) => item.id === String(p.id));
    if (isIn) {
      wishlistDispatch({ type: "REMOVE_FROM_WISHLIST", payload: { id: String(p.id) } });
      toast.info(`${p.name} removed from Wishlist!`, { position: "bottom-right", autoClose: 800 });
    } else {
      wishlistDispatch({ type: "ADD_TO_WISHLIST", payload: { id: String(p.id), name: p.name, price: p.price, image: p.image } });
      toast.success(`${p.name} added to Wishlist!`, { position: "bottom-right", autoClose: 800 });
    }
  };

  const toggleGroup = (label: string) =>
    setOpenGroups((prev) => prev.includes(label) ? prev.filter((g) => g !== label) : [...prev, label]);

  const clearFilters = () => { setSelectedCategory("All"); setSelectedAge("All"); };

  let filteredProducts = product.filter(
    (p) =>
      (selectedCategory === "All" || p.category === selectedCategory ||
        categoryGroups.find((g) => g.label === selectedCategory)?.items.includes(p.category)) &&
      (selectedAge === "All" || p.ageGroup === selectedAge)
  );

  if (sortOption === "Price: Low to High") filteredProducts = [...filteredProducts].sort((a, b) => a.price - b.price);
  else if (sortOption === "Price: High to Low") filteredProducts = [...filteredProducts].sort((a, b) => b.price - a.price);
  // else if (sortOption === "Rating") filteredProducts = [...filteredProducts].sort((a, b) => b.rating - a.rating);

  const activeFilterCount = (selectedCategory !== "All" ? 1 : 0) + (selectedAge !== "All" ? 1 : 0);

  const SidebarFilters = () => (
    <>
      {/* Categories */}
      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
        <div className="px-4 py-3 border-b border-gray-100 bg-gray-50">
          <h3 className={`${londrina.className} font-semibold text-[#2e306a] tracking-wide text-sm uppercase`}>Categories</h3>
        </div>
        <div className="p-3">
          <button
            className={`flex items-center gap-2 w-full text-left px-3 py-2 rounded-xl text-sm transition-all mb-1 ${
              selectedCategory === "All" ? "bg-[#00b8a2] text-white font-medium shadow-sm" : "hover:bg-gray-50 text-gray-600"
            }`}
            onClick={() => setSelectedCategory("All")}
          >
            <span>🛍️</span> All Products
          </button>
          {categoryGroups.map((group) => (
            <div key={group.label}>
              <button
                className="flex items-center justify-between w-full px-3 py-2 text-sm font-medium text-[#2e306a] hover:bg-gray-50 rounded-xl transition-all"
                onClick={() => toggleGroup(group.label)}
              >
                <span className="flex items-center gap-2"><span>{group.icon}</span>{group.label}</span>
                <ChevronDown className={`w-3.5 h-3.5 text-gray-400 transition-transform duration-200 ${openGroups.includes(group.label) ? "rotate-180" : ""}`} />
              </button>
              {openGroups.includes(group.label) && (
                <div className="ml-4 mb-1 space-y-0.5 border-l-2 border-[#00b8a2]/20 pl-3">
                  {group.items.map((cat) => (
                    <button
                      key={cat}
                      className={`block w-full text-left px-2 py-1.5 rounded-lg text-xs transition-all ${
                        selectedCategory === cat ? "bg-[#00b8a2]/10 text-[#00b8a2] font-medium" : "text-gray-500 hover:text-[#2e306a] hover:bg-gray-50"
                      }`}
                      onClick={() => setSelectedCategory(cat)}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Age Filter */}
      {/* <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
        <div className="px-4 py-3 border-b border-gray-100 bg-gray-50">
          <h3 className={`${londrina.className} font-semibold text-[#2e306a] tracking-wide text-sm uppercase`}>Age Group</h3>
        </div>
        <div className="p-3 space-y-0.5">
          {ages.map((age) => (
            <button
              key={age}
              className={`flex items-center gap-2 w-full text-left px-3 py-2 rounded-xl text-sm transition-all ${
                selectedAge === age ? "bg-[#00b8a2] text-white font-medium shadow-sm" : "hover:bg-gray-50 text-gray-600"
              }`}
              onClick={() => setSelectedAge(age)}
            >
              <span className={`w-2 h-2 rounded-full ${selectedAge === age ? "bg-white" : "bg-gray-300"}`} />
              {age}
            </button>
          ))}
        </div>
      </div> */}

      {activeFilterCount > 0 && (
        <button
          onClick={clearFilters}
          className="w-full py-2.5 text-sm text-red-500 border border-red-200 rounded-xl hover:bg-red-50 transition-all"
        >
          Clear All Filters
        </button>
      )}
    </>
  );

  return (
    <div className={`${londrina.className} font-light text-[#2e306a] bg-gray-50 min-h-screen`}>
      <ToastContainer />

      {/* Page Header */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-[1400px] mx-auto px-6 py-6">
          <p className="text-xs text-gray-400 mb-1">
            <Link href="/" className="hover:text-[#00b8a2]">Home</Link> / All Products
          </p>
          <h1 className={`${londrina.className} text-3xl font-semibold text-[#2e306a]`}>Our Products</h1>
          <p className="text-sm text-gray-400 mt-1">{product.length} items available</p>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 py-8">
        <div className="flex gap-7">

          {/* Desktop Sidebar */}
          <aside className="hidden lg:flex flex-col gap-4 w-56 shrink-0">
            <SidebarFilters />
          </aside>

          {/* Main Content */}
          <main className="flex-1 min-w-0">

            {/* Toolbar */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm px-4 py-3 flex items-center justify-between mb-5 gap-3">
              <div className="flex items-center gap-3 flex-wrap">
                {/* Mobile filter trigger */}
                <button
                  className="lg:hidden flex items-center gap-2 px-3 py-1.5 border border-[#00b8a2] text-[#00b8a2] rounded-full text-sm font-medium"
                  onClick={() => setShowMobileFilter(true)}
                >
                  <SlidersHorizontal className="w-3.5 h-3.5" />
                  Filters
                  {activeFilterCount > 0 && (
                    <span className="bg-[#00b8a2] text-white rounded-full w-4 h-4 text-xs flex items-center justify-center">
                      {activeFilterCount}
                    </span>
                  )}
                </button>

                {/* Active filter chips */}
                {selectedCategory !== "All" && (
                  <span className="flex items-center gap-1 px-3 py-1 bg-[#00b8a2]/10 text-[#00b8a2] rounded-full text-xs font-medium">
                    {selectedCategory}
                    <button onClick={() => setSelectedCategory("All")}><X className="w-3 h-3" /></button>
                  </span>
                )}
                {selectedAge !== "All" && (
                  <span className="flex items-center gap-1 px-3 py-1 bg-[#00b8a2]/10 text-[#00b8a2] rounded-full text-xs font-medium">
                    Age: {selectedAge}
                    <button onClick={() => setSelectedAge("All")}><X className="w-3 h-3" /></button>
                  </span>
                )}

                <span className="text-xs text-gray-400 hidden sm:block">
                  {filteredProducts.length} result{filteredProducts.length !== 1 ? "s" : ""}
                </span>
              </div>

              <select
                className="border border-gray-200 px-3 py-1.5 rounded-xl text-sm text-gray-600 bg-white focus:outline-none focus:border-[#00b8a2] cursor-pointer"
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
              >
                <option value="Default">Sort: Default</option>
                <option value="Price: Low to High">Price: Low → High</option>
                <option value="Price: High to Low">Price: High → Low</option>
                <option value="Rating">Top Rated</option>
              </select>
            </div>

            {/* Product Grid */}
            {filteredProducts.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-24 text-gray-400">
                <PackageSearch className="w-14 h-14 mb-4 text-gray-300" />
                <p className="text-lg font-medium text-gray-500">No products found</p>
                <p className="text-sm mt-1">Try adjusting your filters</p>
                <button onClick={clearFilters} className="mt-4 px-5 py-2 bg-[#00b8a2] text-white rounded-full text-sm">
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {filteredProducts.map((p) => {
                  const isWishlisted = wishlistState.items.some((item) => item.id === String(p.id));
                  const discount = p.oldPrice ? Math.round(((p.oldPrice - p.price) / p.oldPrice) * 100) : null;
                  return (
                    <div key={p.id} className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col">
                      {/* Image */}
                      <Link href={`/product/${p.id}`} className="relative block aspect-square bg-gray-50">
                        {/* Badges */}
                        <div className="absolute top-2 left-2 z-10 flex flex-col gap-1">
                          {p.isSale && (
                            <span className="bg-red-500 text-white text-[10px] font-semibold px-2 py-0.5 rounded-full">SALE</span>
                          )}
                          {discount && (
                            <span className="bg-[#00b8a2] text-white text-[10px] font-semibold px-2 py-0.5 rounded-full">-{discount}%</span>
                          )}
                        </div>

                        {/* Actions */}
                        <div className="absolute top-2 right-2 z-10 flex flex-col gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                          <button
                            className="w-8 h-8 bg-white rounded-full shadow flex items-center justify-center hover:scale-110 transition-transform"
                            onClick={(e) => { e.preventDefault(); e.stopPropagation(); handleWishlist(p); }}
                          >
                            <Heart className={`w-4 h-4 ${isWishlisted ? "fill-[#00b8a2] text-[#00b8a2]" : "text-gray-400"}`} />
                          </button>
                          <button
                            className="w-8 h-8 bg-white rounded-full shadow flex items-center justify-center hover:scale-110 transition-transform"
                            onClick={(e) => { e.preventDefault(); e.stopPropagation(); handleAddToCart(p); }}
                          >
                            <ShoppingCart className="w-4 h-4 text-[#00b8a2]" />
                          </button>
                        </div>

                        <Image
                          src={p.image}
                          alt={p.name}
                          fill
                          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                          className="object-contain p-6 transition-opacity duration-400 group-hover:opacity-0"
                        />
                        {p.images[1] && (
                          <Image
                            src={p.images[1]}
                            alt={p.name}
                            fill
                            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                            className="object-contain p-6 absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                          />
                        )}
                      </Link>

                      {/* Info */}
                      <div className="p-3 flex flex-col gap-1.5 flex-1">
                        <span className="text-[10px] text-[#00b8a2] font-medium uppercase tracking-wide">{p.category}</span>
                        <Link href={`/product/${p.id}`}>
                          <h3 className="text-sm font-semibold text-[#2e306a] leading-snug line-clamp-2 hover:text-[#00b8a2] transition-colors">
                            {p.name}
                          </h3>
                        </Link>
                        <p className="text-xs text-gray-400 line-clamp-1">{p.shortDescription}</p>
                        {/* <Rating value={p.rating} /> */}

                        <div className="flex items-center justify-between mt-auto pt-2 border-t border-gray-50">
                          <div className="flex items-baseline gap-1.5">
                            <span className={`${londrina.className} text-lg font-semibold text-[#00b8a2]`}>₹{p.price}</span>
                            {p.oldPrice && (
                              <span className={`${londrina.className} text-sm text-gray-400 line-through`}>₹{p.oldPrice}</span>
                            )}
                          </div>
                          <button
                            onClick={() => handleAddToCart(p)}
                            className="flex items-center gap-1 px-2.5 py-1.5 bg-[#00b8a2] text-white rounded-xl text-xs font-medium hover:bg-[#009e8c] transition-colors"
                          >
                            <ShoppingCart className="w-3 h-3" /> Add
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      {showMobileFilter && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setShowMobileFilter(false)} />
          <div className="relative ml-auto w-4/5 max-w-xs bg-gray-50 h-full overflow-y-auto flex flex-col">
            <div className="flex items-center justify-between px-5 py-4 bg-white border-b border-gray-100 sticky top-0 z-10">
              <h3 className={`${londrina.className} font-semibold text-[#2e306a] text-lg`}>Filters</h3>
              <button onClick={() => setShowMobileFilter(false)} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-4 flex flex-col gap-4">
              <SidebarFilters />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
