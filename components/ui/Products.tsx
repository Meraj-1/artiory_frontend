"use client";
import React, { useState, useEffect } from "react";
import { Londrina_Solid } from "next/font/google";
import { useCart } from "@/app/context/cart/Cartcontext";
import { HeartIcon, ShoppingCart } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import Link from "next/link";
import { useWishlist } from "@/app/context/whishlist/WishlistContext";

const londrina = Londrina_Solid({
  weight: ["100", "300", "400", "900"],
  subsets: ["latin"],
  display: "swap",
});

type Product = {
  id: string;
  name: string;
  price: number;
  oldPrice?: number;
  image: string;
  images: string[];
  category: string;
  shortDescription: string;
  description: string;
  isSale?: boolean;
  stock?: number;
  stockQuantity?: number;
};

const Products: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/products/store", { cache: "no-store" });
        const data = await res.json();
        
        const list = Array.isArray(data)
          ? data
          : Array.isArray(data?.products)
            ? data.products
            : Array.isArray(data?.data)
              ? data.data
              : [];
        
        const finalProducts = list.map((item: any, index: number) => {
          const price = Number(item.sellingPrice ?? item.price ?? 0);
          const mrp = Number(item.mrp ?? item.price ?? 0);
          const images = Array.isArray(item.images) && item.images.length > 0
            ? item.images
            : [item.image || item.thumbnail || "/product/placeholder.svg"];
          return {
            id: String(item._id || item.id || index + 1),
            name: item.productName || item.name || "",
            price,
            oldPrice: mrp > price ? mrp : undefined,
            image: item.image || item.thumbnail || images[0] || "/product/placeholder.svg",
            images,
            category: item.category || "",
            shortDescription: item.shortDescription || item.shortDesc || "",
            description: item.description || "",
            isSale: mrp > price,
            ageGroup: item.ageGroup || "3+",
            stock: item.stockQuantity ?? item.stock ?? 999,
            stockQuantity: item.stockQuantity ?? item.stock ?? 999,
          };
        });
        
        // Dynamic random shuffle
        const shuffleArray = (arr: Product[]) => {
          const shuffled = [...arr];
          for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
          }
          return shuffled;
        };
        setProducts(shuffleArray(finalProducts));
      } catch (err) {
        console.error("Failed to fetch products:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const itemsPerPage = 8;
  const [page, setPage] = useState(1);

  // Filter products by selected category
  const filteredProducts = selectedCategory === "All"
    ? products
    : products.filter((p) => p.category === selectedCategory);

  const categories = ["All", ...Array.from(new Set(products.map((p) => p.category).filter(Boolean)))];

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  const { cartItems, dispatch } = useCart();
  const handleAddToCart = (product: Product) => {
    dispatch({
      type: "ADD_ITEM",
      payload: {
        id: String(product.id),
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: 1,
        stock: product.stockQuantity ?? product.stock,
      },
    });
    toast.success(`${product.name} added to cart!`, {
      position: "bottom-right",
      autoClose: 800,
    });
  };

  const { wishlistDispatch, wishlistState } = useWishlist();
  const handleWishlist = (product: Product) => {
    const isInWishlist = wishlistState.items.some(
      (item) => item.id === String(product.id)
    );

    if (isInWishlist) {
      wishlistDispatch({
        type: "REMOVE_FROM_WISHLIST",
        payload: { id: String(product.id) },
      });
      toast.info(`${product.name} removed from Wishlist!`, {
        position: "bottom-right",
        autoClose: 800,
      });
    } else {
      wishlistDispatch({
        type: "ADD_TO_WISHLIST",
        payload: {
          id: String(product.id),
          name: product.name,
          price: product.price,
          image: product.image,
        },
      });
      toast.success(`${product.name} added to Wishlist!`, {
        position: "bottom-right",
        autoClose: 800,
      });
    }
  };

  if (loading) {
    return (
      <section className={`${londrina.className} py-16 bg-white`}>
        <div className="text-center mb-10 px-4">
          <h1 className="text-4xl md:text-6xl font-extrabold text-[#00b8a2]">OUR PRODUCTS.</h1>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5 w-full max-w-7xl mx-auto px-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="rounded-2xl border border-gray-100 overflow-hidden bg-white">
              <div className="aspect-square w-full bg-gray-200 animate-pulse" />
              <div className="px-3 pt-2 pb-3 flex flex-col gap-2">
                <div className="h-2.5 w-16 bg-gray-200 rounded animate-pulse" />
                <div className="h-3.5 w-full bg-gray-200 rounded animate-pulse" />
                <div className="h-3 w-3/4 bg-gray-200 rounded animate-pulse" />
                <div className="h-4 w-20 bg-gray-200 rounded animate-pulse mt-1" />
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (products.length === 0) {
    return null;
  }

  return (
    <section className={`${londrina.className} py-16  bg-white`}>
      {/* Heading */}
      <div className="text-center mb-10 px-4">
        <h1 className="text-4xl md:text-6xl font-extrabold text-[#00b8a2]">
          OUR PRODUCTS.
        </h1>
        <p className="text-2xl cursor-pointer mt-3 text-gray-400">
          <Link href="/listing">View All</Link>
        </p>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap justify-center gap-2.5 mb-10 px-4">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => {
              setSelectedCategory(cat);
              setPage(1);
            }}
            className={`px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider border transition-all duration-300 cursor-pointer ${
              selectedCategory === cat
                ? "bg-[#00b8a2] text-white border-[#00b8a2] shadow-md shadow-[#00b8a2]/25"
                : "bg-gray-50 text-[#2e306a] border-gray-200 hover:border-[#00b8a2] hover:text-[#00b8a2]"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5 w-full max-w-7xl mx-auto px-4">
        {paginatedProducts.map((product) => (
          <div key={product.id} className="w-full flex justify-center">
            <Link
              href={`/product/${product.id}`}
              className="w-full flex justify-center"
            >
              <div className="group relative flex flex-col w-full rounded-2xl bg-white border border-[#8bd2c9] overflow-hidden transition-all duration-300 hover:shadow-lg">

                {/* Badges */}
                <div className="absolute top-2 left-2 z-10 flex flex-col gap-1">
                  {product.isSale && (
                    <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">SALE</span>
                  )}
                  {product.oldPrice && product.oldPrice > product.price && (
                    <span className="bg-[#00b8a2] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                      -{Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)}%
                    </span>
                  )}
                </div>

                {/* Wishlist & Cart icons */}
                <div className="absolute top-2 right-2 z-10 flex flex-col gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <button
                    onClick={(e) => { e.preventDefault(); handleWishlist(product); }}
                    className="w-8 h-8 bg-white rounded-full shadow flex items-center justify-center"
                  >
                    <HeartIcon
                      className="w-4 h-4 stroke-[#8bd2c9] stroke-2"
                      fill={wishlistState.items.some((item) => item.id === product.id) ? "#00c8a2" : "none"}
                    />
                  </button>
                  <button
                    onClick={(e) => { e.preventDefault(); handleAddToCart(product); }}
                    className="w-8 h-8 bg-white rounded-full shadow flex items-center justify-center"
                  >
                    <ShoppingCart className="w-4 h-4 text-[#00b8a2]" />
                  </button>
                </div>

                {/* Image */}
                <div className="relative aspect-square w-full bg-gray-50">
                  <img
                    src={product.image || "/product/placeholder.svg"}
                    alt={product.name}
                    className={`h-full w-full contain transition-opacity duration-300 ${
                      product.images && product.images.length > 1 ? "group-hover:opacity-0" : ""
                    }`}
                  />
                  {product.images && product.images[1] && (
                    <img
                      src={product.images[1]}
                      alt={product.name}
                      className="absolute inset-0 h-full w-full contain opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    />
                  )}
                </div>

                {/* Info */}
                <div className="flex flex-col gap-1 px-3 pt-2 pb-3 flex-1">
                  {product.category && (
                    <span className="text-[10px] text-[#00b8a2] font-medium uppercase tracking-wide">{product.category}</span>
                  )}
                  <h2 className="line-clamp-2 text-sm font-semibold text-[#2e306a]">{product.name}</h2>
                  {product.shortDescription && (
                    <p className="text-xs text-gray-400 line-clamp-1">{product.shortDescription}</p>
                  )}
                  <div className="flex items-center justify-between mt-auto pt-2 border-t border-gray-50" onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}>
                    <div className="flex items-baseline gap-1.5">
                      <span className={`${londrina.className} text-lg font-semibold text-[#00b8a2]`}>₹{product.price}</span>
                      {product.oldPrice && product.oldPrice > product.price && (
                        <span className={`${londrina.className} text-sm text-gray-400 line-through`}>₹{product.oldPrice}</span>
                      )}
                    </div>
                    {(() => {
                      const cartItem = cartItems.find((item) => item.id === String(product.id));
                      return cartItem ? (
                        <div className="flex items-center gap-1 bg-gray-50 border border-gray-200 rounded-xl px-1 py-0.5 shadow-sm">
                          <button
                            onClick={(e) => {
                              e.preventDefault(); e.stopPropagation();
                              if (cartItem.quantity > 1) {
                                dispatch({
                                  type: "UPDATE_QUANTITY",
                                  payload: { id: String(product.id), quantity: cartItem.quantity - 1 },
                                });
                              } else {
                                dispatch({ type: "REMOVE_ITEM", payload: String(product.id) });
                                toast.info(`${product.name} removed from cart`, { position: "bottom-right", autoClose: 800 });
                              }
                            }}
                            className="w-5 h-5 flex items-center justify-center text-gray-500 hover:text-red-500 hover:bg-gray-100 rounded-md text-sm font-semibold transition-colors cursor-pointer"
                          >
                            -
                          </button>
                          <input
                            type="number"
                            min="1"
                            max={product.stockQuantity ?? product.stock ?? 999}
                            value={cartItem.quantity}
                            onChange={(e) => {
                              const val = parseInt(e.target.value);
                              const maxStock = product.stockQuantity ?? product.stock ?? 999;
                              if (!isNaN(val)) {
                                if (val > maxStock) {
                                  toast.warn(`Only ${maxStock} items in stock!`, { position: "bottom-right", autoClose: 2000 });
                                  dispatch({
                                    type: "UPDATE_QUANTITY",
                                    payload: { id: String(product.id), quantity: maxStock },
                                  });
                                } else if (val >= 1) {
                                  dispatch({
                                    type: "UPDATE_QUANTITY",
                                    payload: { id: String(product.id), quantity: val },
                                  });
                                }
                              }
                            }}
                            className="w-8 text-center font-bold text-[11px] text-[#2e306a] bg-transparent border-none focus:outline-none focus:ring-0 p-0 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                          />
                          <button
                            onClick={(e) => {
                              e.preventDefault(); e.stopPropagation();
                              const maxStock = product.stockQuantity ?? product.stock ?? 999;
                              if (cartItem.quantity >= maxStock) {
                                toast.warn(`Only ${maxStock} items available in stock!`, { position: "bottom-right", autoClose: 2000 });
                                return;
                              }
                              dispatch({
                                type: "UPDATE_QUANTITY",
                                payload: { id: String(product.id), quantity: cartItem.quantity + 1 },
                              });
                            }}
                            disabled={cartItem.quantity >= (product.stockQuantity ?? product.stock ?? 999)}
                            className="w-5 h-5 flex items-center justify-center text-gray-500 hover:text-[#00b8a2] hover:bg-gray-100 disabled:opacity-30 disabled:hover:bg-transparent disabled:cursor-not-allowed rounded-md text-sm font-semibold transition-colors cursor-pointer"
                            title={cartItem.quantity >= (product.stockQuantity ?? product.stock ?? 999) ? "Stock limit reached" : ""}
                          >
                            +
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={(e) => { e.preventDefault(); e.stopPropagation(); handleAddToCart(product); }}
                          className="flex items-center gap-1 px-2.5 py-1.5 bg-[#00b8a2] text-white rounded-xl text-xs font-medium hover:bg-[#009e8c] transition-colors cursor-pointer"
                        >
                          <ShoppingCart className="w-3 h-3" /> Add
                        </button>
                      );
                    })()}
                  </div>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-3 mt-10">
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            onClick={() => setPage(index + 1)}
            className={`px-3 py-1 cursor-pointer font-extrabold rounded-lg text-[#00b8a2] ${
              page === index + 1 ? "text-white bg-[#00b8a2]" : "text-[#00b8a2]"
            }`}
          >
            {index + 1}
          </button>
        ))}
        {page < totalPages && (
          <button
            onClick={() => setPage(page + 1)}
            className="text-[#00b8a2] font-semibold hover:underline"
          >
            Next
          </button>
        )}
      </div>
      <ToastContainer />
    </section>
  );
};

export default Products;
