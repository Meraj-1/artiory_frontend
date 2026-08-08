"use client";
import React, { useState, useEffect } from "react";
import { Londrina_Solid } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { HeartIcon, ShoppingCart, Star } from "lucide-react";
import { useCart } from "@/app/context/cart/Cartcontext";
import { useWishlist } from "@/app/context/whishlist/WishlistContext";
import { toast } from "react-toastify";

const londrina = Londrina_Solid({
  weight: ["100", "300", "400", "900"],
  subsets: ["latin"],
  display: "swap",
});

type Product = {
  id: string | number;
  image: string;
  name: string;
  price: number;
  sku: string;
  ageGroup: string;
  category: string;
  shortDescription: string;
  description: string;
  rating: number;
};

const RatingStars: React.FC<{ rating: number }> = ({ rating }) => {
  return (
    <div className="flex gap-1 mt-1">
      {Array.from({ length: 5 }).map((_, index) => (
        <Star
          key={index}
          className={`w-4 h-4 ${
            index < rating ? "fill-[#00b8a2] text-[#00b8a2]" : "text-gray-300"
          }`}
        />
      ))}
    </div>
  );
};

interface RelatedProductsProps {
  category?: string;
  currentProductId?: string;
}

const RelatedProducts: React.FC<RelatedProductsProps> = ({ category, currentProductId }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRelated = async () => {
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
        
        let filtered = list
          .map((item: any, index: number) => ({
            id: String(item._id || item.id || index + 1),
            name: item.productName || item.name || "",
            price: Number(item.sellingPrice ?? item.price ?? 0),
            image: item.image || item.thumbnail || (item.images && item.images[0]) || "/product/placeholder.svg",
            images: item.images || [],
            sku: item.skuCode || item.sku || "",
            ageGroup: item.ageGroup || "3+",
            category: item.category || "",
            shortDescription: item.shortDescription || item.shortDesc || "",
            description: item.description || "",
            rating: item.rating || 4,
          }))
          .filter((p: any) => String(p.id) !== String(currentProductId));

        if (category) {
          const sameCategory = filtered.filter((p: any) => p.category === category);
          filtered = sameCategory.length > 0 ? sameCategory : filtered;
        }

        setProducts(filtered.slice(0, 4));
      } catch (err) {
        console.error("Failed to fetch related products", err);
      } finally {
        setLoading(false);
      }
    };
    fetchRelated();
  }, [category, currentProductId]);

  const { dispatch } = useCart();
  const { wishlistDispatch, wishlistState } = useWishlist();

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
    return <div className="text-center py-10 text-gray-400">Loading related products...</div>;
  }

  if (products.length === 0) {
    return null;
  }

  return (
    <section className={`${londrina.className} py-16 bg-white`}>
      {/* Heading */}
      <div className="text-center mb-10 px-4">
        <h1 className="text-4xl md:text-5xl font-extrabold text-[#00b8a2]">
          RELATED PRODUCTS
        </h1>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 w-[90%] mx-auto">
        {products.map((product) => (
          <div key={product.id} className="w-full flex justify-center">
            <Link
              href={`/product/${product.id}`}
              className="w-full flex justify-center"
            >
              <div className="bg-white h-auto flex flex-col items-center w-full aspect-[295/398] relative">
                <span className="absolute top-4 left-4 bg-[#00b8a2] text-white text-xs font-bold px-3 py-1 rounded-full z-10">
                  SALE
                </span>

                {/* Icons */}
                <div className="absolute top-2 right-4 flex gap-2 z-10">
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      handleWishlist(product);
                    }}
                    className="absolute top-3 right-2 cursor-pointer"
                  >
                    <HeartIcon
                      id={String(product.id)}
                      fill={
                        wishlistState.items.some(
                          (item) => item.id === String(product.id)
                        )
                          ? "#00c8a2"
                          : "none"
                      }
                      className="stroke-[#8bd2c9] stroke-2"
                    />
                  </button>
                </div>

                <div className="absolute top-12 cursor-pointer right-6 flex gap-2 z-10">
                  <ShoppingCart
                    onClick={(e) => {
                      e.preventDefault();
                      handleAddToCart(product);
                    }}
                    className="stroke-[#8bd2c9] stroke-2"
                  />
                </div>

                {/* Product Image */}
                <div className="w-full border transition-all ease-in-out duration-500 hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] border-[#8bd2c9] rounded-2xl cursor-pointer p-3 flex justify-center">
                  <div className="w-48 h-48 sm:w-56 sm:h-56 flex justify-center items-center">
                    <Image
                      src={product.image}
                      alt={product.name}
                      width={295}
                      height={295}
                      className="object-contain w-full h-full aspect-square"
                    />
                  </div>
                </div>

                {/* Info */}
                <div className="w-full px-1 pb-4 pt-1">
                  <h2 className="tracking-[0.2px] font-light text-[#2e306a] md:text-lg">
                    {product.name}
                  </h2>
                  <div className="flex gap-1">
                    <p
                      className={`text-gray-400 font-light text-lg line-through ${londrina.className}`}
                    >
                      &#x20B9;{product.price + 100}.00
                    </p>
                    <p
                      className={`text-[#00b8a2] font-light text-lg ${londrina.className}`}
                    >
                      &#x20B9;{product.price}.00
                    </p>
                  </div>
                  <RatingStars rating={product.rating} />
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};

export default RelatedProducts;
