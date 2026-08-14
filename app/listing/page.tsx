"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
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
  id: string;
  name: string;
  price: number;
  oldPrice?: number;
  image: string;
  images: string[];
  category: string;
  subCategory?: string;
  shortDescription: string;
  description: string;
  isSale?: boolean;
};



const categoryGroups: { label: string;  items: string[] }[] = [
  { label: "Art & Craft", items: ["Crayons", "Water Colours", "Puzzle Crayons"] },
  { label: "Stationery", items: ["Pencil Box", "Compass Box", "Slate", "Stationery Combo Set", "Mechanical Sharpener", "Pencil Case", "Diary"] },
  { label: "Bags", items: ["Tiffin Bags", "Cross Bags", "Folder Bags", "Fancy Bags", "Vanity Case"] },
  { label: "Pouches",  items: ["Soft Pouch", "Silicone Pouch"] },
  { label: "Drinkware",  items: ["Sippers", "500 ml Sipper", "900 ml Plastic Bottle Sipper", "Tumbler"] },
  { label: "Gifts & Fun",  items: ["Metal Money Box", "Gift Hamper", "Mini Fan"] },
];



export default function ProductListPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const [sortOption, setSortOption] = useState("Default");
  const [openGroups, setOpenGroups] = useState<string[]>([]);
  const [showMobileFilter, setShowMobileFilter] = useState(false);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const res = await fetch("/api/products/store", { cache: "no-store" });
        const data = await res.json();

        const normalizedProducts = Array.isArray(data)
          ? data
          : Array.isArray(data?.products)
            ? data.products
            : Array.isArray(data?.data)
              ? data.data
              : [];

        const finalProducts = normalizedProducts.length > 0
          ? normalizedProducts.map((item: any, index: number) => {
              const normalized = item ?? {};

              const extractImageCandidates = (value: unknown): string[] => {
                if (Array.isArray(value)) {
                  return value.flatMap((entry) => extractImageCandidates(entry));
                }

                if (value && typeof value === "object") {
                  const objectValue = value as Record<string, unknown>;
                  const nestedCandidates = [
                    objectValue.url,
                    objectValue.secureUrl,
                    objectValue.src,
                    objectValue.path,
                    objectValue.href,
                    objectValue.imageUrl,
                    objectValue.thumbnail,
                    objectValue.image,
                    objectValue.link,
                    objectValue.downloadUrl,
                  ];
                  return nestedCandidates.flatMap((entry) => extractImageCandidates(entry));
                }

                if (typeof value === "string") {
                  const trimmed = value.trim();
                  return trimmed ? [trimmed] : [];
                }

                return [];
              };

              const resolveImageSrc = (src?: unknown) => {
                if (typeof src !== "string") {
                  return "/product/placeholder.svg";
                }

                const trimmed = src.trim();
                if (!trimmed) return "/product/placeholder.svg";
                if (trimmed.startsWith("http://") || trimmed.startsWith("https://") || trimmed.startsWith("data:") || trimmed.startsWith("blob:")) {
                  return trimmed;
                }
                if (trimmed.startsWith("//")) {
                  return `https:${trimmed}`;
                }
                if (/^(?:[a-z][a-z\d+.-]*:)?\/\//i.test(trimmed)) {
                  return trimmed;
                }
                if (/^(?:[a-z0-9.-]+\.)+[a-z]{2,}(?:\/|$)/i.test(trimmed)) {
                  return `https://${trimmed}`;
                }
                if (trimmed.startsWith("/")) {
                  return trimmed;
                }
                return `/product/${trimmed}`;
              };

              const imageCandidates = extractImageCandidates(
                normalized.images ??
                normalized.imageUrls ??
                normalized.imageList ??
                normalized.gallery ??
                normalized.productImages ??
                normalized.media ??
                normalized.image
              );

              const imageList = imageCandidates.filter(Boolean);
              const image = resolveImageSrc(
                normalized.image ??
                normalized.productImage ??
                normalized.thumbnail ??
                normalized.mainImage ??
                normalized.imageUrl ??
                normalized.imagePath ??
                normalized.url ??
                normalized.img ??
                normalized.photo ??
                imageList[0]
              );
              const price = Number(normalized.sellingPrice ?? normalized.price ?? normalized.selling_price ?? normalized.finalPrice ?? normalized.amount ?? 0);
              const mrp = Number(normalized.mrp ?? normalized.oldPrice ?? normalized.originalPrice ?? normalized.basePrice ?? normalized.price ?? 0);

              return {
                ...normalized,
                id: String(normalized._id ?? normalized.id ?? normalized.productId ?? normalized.product_id ?? index + 1),
                _id: normalized._id ?? normalized.id ?? normalized.productId ?? normalized.product_id ?? index + 1,
                name: normalized.productName || normalized.name || normalized.title || normalized.product_title || `Product ${index + 1}`,
                productName: normalized.productName || normalized.name || normalized.title || normalized.product_title || `Product ${index + 1}`,
                category: normalized.category || normalized.categoryName || normalized.productCategory || normalized.type || "",
                subCategory: normalized.subCategory || "",
                shortDescription: normalized.shortDescription || normalized.shortDesc || normalized.description || normalized.summary || normalized.details || "",
                description: normalized.description || normalized.longDescription || normalized.details || normalized.shortDescription || normalized.shortDesc || "",
                price,
                sellingPrice: price,
                mrp,
                oldPrice: mrp || undefined,
                image,
                images: imageList.length > 0 ? imageList.map((img: string) => resolveImageSrc(img)) : [image],
                isSale: Boolean(normalized.isSale ?? normalized.onSale ?? (mrp > 0 && price > 0 && price < mrp)),
              };
            })
          : [];

        setProducts(finalProducts);
        console.log("API categories:", [...new Set(finalProducts.map((p: any) => p.category))]);
      } catch (error) {
        console.error("Failed to load products", error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const catParam = params.get("category");
      if (catParam) setSelectedCategory(catParam);
    }
  }, []);

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

  const clearFilters = () => { setSelectedCategory("All"); };

  const normalizeForMatch = (str: string) => {
    if (!str) return "";
    let res = str.toLowerCase().replace(/[^a-z0-9]/g, "");
    if (res === "artscraft" || res === "artsandcraft" || res === "artandcraft") {
      res = "artcraft";
    }
    return res;
  };

  let filteredProducts = products.filter((p) => {
    // 1. Category Filter
    let catMatch = true;
    if (selectedCategory !== "All") {
      const pCat = normalizeForMatch(p.category);
      const pSub = normalizeForMatch(p.subCategory || "");
      const selCat = normalizeForMatch(selectedCategory);
      
      const directCategoryMatch = pCat === selCat;
      const directSubCategoryMatch = pSub === selCat;
      
      // Find if selCat is a parent category group (like "Art & Craft")
      const group = categoryGroups.find((g) => normalizeForMatch(g.label) === selCat);
      const groupMatch = group 
        ? (pCat === selCat || group.items.some((item) => normalizeForMatch(item) === pSub)) 
        : false;
      
      catMatch = directCategoryMatch || directSubCategoryMatch || groupMatch;
    }

    return catMatch;
  });

  if (sortOption === "Price: Low to High") filteredProducts = [...filteredProducts].sort((a, b) => a.price - b.price);
  else if (sortOption === "Price: High to Low") filteredProducts = [...filteredProducts].sort((a, b) => b.price - a.price);

  const activeFilterCount = selectedCategory !== "All" ? 1 : 0;

  const SidebarFilters = () => (
    <>
      {/* Categories */}
      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
        <div className="px-4 py-3 border-b border-gray-100 bg-gray-50">
          <h3 className={`${londrina.className} font-semibold text-[#2e306a] tracking-wide text-sm uppercase`}>Categories</h3>
        </div>
        <div className="p-3">
          <button
            className={`flex items-center gap-2 w-full text-left px-3 py-2 rounded-xl text-sm transition-all mb-1 cursor-pointer ${
              selectedCategory === "All" ? "bg-[#00b8a2] text-white font-medium shadow-sm" : "hover:bg-gray-50 text-gray-600"
            }`}
            onClick={() => setSelectedCategory("All")}
          >
             All Products
          </button>
          {/* {categoryGroups.map((group) => (
            <div key={group.label}>
              <button
                className="flex items-center justify-between w-full px-3 py-2 text-sm font-medium text-[#2e306a] hover:bg-gray-50 rounded-xl transition-all cursor-pointer"
                onClick={() => toggleGroup(group.label)}
              >
                <span className="flex items-center gap-2">{group.label}</span>
                <ChevronDown className={`w-3.5 h-3.5 text-gray-400 transition-transform duration-200 ${openGroups.includes(group.label) ? "rotate-180" : ""}`} />
              </button>
              {openGroups.includes(group.label) && (
                <div className="ml-4 mb-1 space-y-0.5 border-l-2 border-[#00b8a2]/20 pl-3">
                  {group.items.map((cat) => (
                    <button
                      key={cat}
                      className={`block w-full text-left px-2 py-1.5 rounded-lg text-xs transition-all cursor-pointer ${
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
          ))} */}
          {categoryGroups.map((group) => (
  <div key={group.label}>
    {/* Category Group */}
    <button
      type="button"
      className="flex items-center justify-between w-full px-3 py-2 text-sm font-medium text-[#2e306a] hover:bg-gray-50 rounded-xl transition-all cursor-pointer"
      onClick={() => toggleGroup(group.label)}
    >
      <span className="flex items-center gap-2">
        {group.label}
      </span>

      <ChevronDown
        className={`w-3.5 h-3.5 text-gray-400 transition-transform duration-200 ${
          openGroups.includes(group.label) ? "rotate-180" : ""
        }`}
      />
    </button>

    {/* Categories */}
    {openGroups.includes(group.label) && (
      <div className="ml-4 mb-1 space-y-1 border-l-2 border-[#00b8a2]/20 pl-3">
        {group.items.map((cat) => {
          const isSelected = selectedCategory === cat;

          return (
            <label
              key={cat}
              className={`flex items-center gap-2.5 w-full px-2 py-2 rounded-lg text-xs transition-all cursor-pointer ${
                isSelected
                  ? "bg-[#00b8a2]/10 text-[#00b8a2] font-medium"
                  : "text-gray-500 hover:text-[#2e306a] hover:bg-gray-50"
              }`}
            >
              {/* Checkbox */}
              <input
                type="checkbox"
                checked={isSelected}
                onChange={() =>
                  setSelectedCategory(isSelected ? "" : cat)
                }
                className="peer sr-only"
              />

              {/* Custom Checkbox */}
              <span
                className={`flex items-center justify-center w-4 h-4 rounded border transition-all duration-200 ${
                  isSelected
                    ? "bg-[#00b8a2] border-[#00b8a2]"
                    : "bg-white border-gray-300 group-hover:border-[#00b8a2]"
                }`}
              >
                {isSelected && (
                  <svg
                    className="w-3 h-3 text-white"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 12l4 4L19 7"
                    />
                  </svg>
                )}
              </span>

              {/* Category Name */}
              <span className="flex-1">
                {cat}
              </span>
            </label>
          );
        })}
      </div>
    )}
  </div>
))}
        </div>
      </div>

      {activeFilterCount > 0 && (
        <button
          onClick={clearFilters}
          className="w-full py-2.5 text-sm text-red-500 border border-red-200 rounded-xl hover:bg-red-50 transition-all cursor-pointer"
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
          <p className="text-sm text-gray-400 mt-1">{products.length} items available</p>
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
            {loading ? (
              <div className="flex justify-center items-center py-24 text-gray-400">Loading...</div>
            ) : filteredProducts.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-24 text-gray-400">
                <PackageSearch className="w-14 h-14 mb-4 text-gray-300" />
                <p className="text-lg font-medium text-gray-500">No products found</p>
                <p className="text-sm mt-1">Try adjusting your filters</p>
                <button onClick={clearFilters} className="mt-4 px-5 py-2 bg-[#00b8a2] text-white rounded-full text-sm">
                  Clear Filters
                </button>
              </div>
            ) : loading ? null : (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {filteredProducts.map((p) => {
                  const isWishlisted = wishlistState.items.some((item) => item.id === String(p.id));
                  const discount = p.oldPrice ? Math.round(((p.oldPrice - p.price) / p.oldPrice) * 100) : null;
                  const displayCategory = p.category === "ArtsCraft" || normalizeForMatch(p.category) === "artcraft" 
                    ? "Art & Craft" 
                    : p.category;
                  return (
                    <div key={p.id} className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col">
                      {/* Image */}
                      <Link href={`/product/${p.id}`} className="relative block aspect-square bg-gray-50">
                        {/* Badges */}
                        <div className="absolute top-2 left-2 z-10 flex flex-col gap-1">
                          {p.isSale && (
                            <span className="bg-red-500 text-white text-[10px] font-semibold px-2 py-0.5 rounded-full">SALE</span>
                          )}
                          {discount !== null && discount > 0 && (
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

                        <img
                          src={p.image}
                          alt={p.name}
                          className="h-full w-full p- transition-opacity duration-400 group-hover:opacity-0"
                        />
                        {p.images[1] && (
                          <img
                            src={p.images[1]}
                            alt={p.name}
                            className="h-full w-[100vh] p- absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                          />
                        )}
                      </Link>

                      {/* Info */}
                      <div className="p-3 flex flex-col gap-1.5 flex-1">
                        <span className="text-[10px] text-[#00b8a2] font-medium uppercase tracking-wide">{displayCategory}{p.subCategory ? ` / ${p.subCategory}` : ""}</span>
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
                            {p.oldPrice && p.oldPrice > p.price ? (
                              <span className={`${londrina.className} text-sm text-gray-400 line-through`}>₹{p.oldPrice}</span>
                            ) : null}
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
