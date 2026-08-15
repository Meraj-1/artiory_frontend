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
  isSale?: boolean;
};

const Products: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

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
          };
        });
        setProducts(finalProducts);
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
  const totalPages = Math.ceil(products.length / itemsPerPage);
  const paginatedProducts = products.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  const { dispatch } = useCart();
  const handleAddToCart = (product: Product) => {
    dispatch({
      type: "ADD_ITEM",
      payload: {
        id: String(product.id),
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: 1,
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
                    className="h-full w-full contain transition-opacity duration-300 group-hover:opacity-0"
                  />
                  {product.images[1] && (
                    <img
                      src={product.images[1]}
                      alt={product.name}
                      className="absolute inset-0 h-full w-full contain opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    />
                  )}
                </div>

                {/* Info */}
                <div className="flex flex-col gap-1 px-3 pt-2 pb-3">
                  {product.category && (
                    <span className="text-[10px] text-[#00b8a2] font-medium uppercase tracking-wide">{product.category}</span>
                  )}
                  <h2 className="line-clamp-2 text-sm font-semibold text-[#2e306a]">{product.name}</h2>
                  {product.shortDescription && (
                    <p className="text-xs text-gray-400 line-clamp-1">{product.shortDescription}</p>
                  )}
                  <div className="flex items-center gap-2 mt-1">
                    <span className={`${londrina.className} text-lg font-semibold text-[#00b8a2]`}>₹{product.price}</span>
                    {product.oldPrice && product.oldPrice > product.price && (
                      <span className={`${londrina.className} text-sm text-gray-400 line-through`}>₹{product.oldPrice}</span>
                    )}
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
