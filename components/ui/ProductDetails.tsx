"use client";
import { useCart } from "@/app/context/cart/Cartcontext";
import { useWishlist } from "@/app/context/whishlist/WishlistContext";
import {
  HeartIcon,
  Instagram,
  Twitter,
  Facebook,
  ChevronLeft,
  ChevronRight,
  Link,
  ShoppingCart,
  Star,
} from "lucide-react";
import { toast } from "react-toastify";
import { useState } from "react";
import { Londrina_Solid } from "next/font/google";
import RelatedProducts from "./RelatedProducts";


const londrina = Londrina_Solid({
  weight: ["100", "300", "400", "900"],
  subsets: ["latin"],
  display: "swap",
});

type ProductType = {
  id: number | string;
  images?: string[];
  image?: string;
  name: string;
  price: number;
  mrp?: number;
  rating?: number;
  sku?: string;
  category?: string;
  subCategory?: string;
  shortDescription?: string;
  description?: string;
  variants?: Array<{
    color?: string;
    design?: string;
    sellingPrice?: number;
    mrp?: number;
    stockQuantity?: number;
    imageUrl?: string;
  }>;
  stockQuantity?: number;
  weight?: number;
  dimensions?: {
    length?: number;
    width?: number;
    height?: number;
  };
  gst?: number;
};

const RatingStars: React.FC<{ rating?: number }> = ({ rating = 3 }) => {
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

export default function ProductDetail({ product }: { product: ProductType }) {
  const { dispatch } = useCart();
  const { wishlistDispatch, wishlistState } = useWishlist();
  const [quantity, setQuantity] = useState(1);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStartX, setTouchStartX] = useState(0);
  const [touchEndX, setTouchEndX] = useState(0);

  const displayImages = product.images && product.images.length > 0
    ? product.images
    : product.image && product.image !== "/product/placeholder.svg"
      ? [product.image]
      : [];
  
  const mainImage = displayImages[currentIndex] || displayImages[0] || "/product/placeholder.svg";

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? displayImages.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === displayImages.length - 1 ? 0 : prev + 1));
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEndX(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStartX - touchEndX > 50) handleNext();
    if (touchEndX - touchStartX > 50) handlePrev();
  };

  const isInWishlist = wishlistState.items.some((item) => item.id === String(product.id));

  const handleCart = () => {
    dispatch({
      type: "ADD_ITEM",
      payload: {
        id: String(product.id),
        name: product.name,
        price: product.price,
        image: mainImage,
        quantity,
      },
    });
    toast.success(`${product.name} added to cart!`);
  };

  const handleWishlist = () => {
    if (isInWishlist) {
      wishlistDispatch({
        type: "REMOVE_FROM_WISHLIST",
        payload: { id: String(product.id) },
      });
      toast.info(`${product.name} removed from Wishlist!`);
    } else {
      wishlistDispatch({
        type: "ADD_TO_WISHLIST",
        payload: {
          id: String(product.id),
          name: product.name,
          price: product.price,
          image: mainImage,
        },
      });
      toast.success(`${product.name} added to Wishlist!`);
    }
  };

  return (
    <div className="max-w-[1238.63px] mx-auto pt-3 p-3 md:pt-10 space-y-6 text-[#1e1e4d]">
      <div>
        <p className="text-sm">
          Home / <span className="font-medium cursor-pointer">{product.name}</span>
        </p>
      </div>

      <div className={`${londrina.className} grid md:grid-cols-2 10`}>
        <div className="flex flex-col-reverse sm:flex-row gap-5 justify-center items-center">
          <div className="flex flex-wrap sm:flex-col gap-3 sm:h-[400px] sm:overflow-y-auto justify-center mt-3 sm:mt-0">
            {displayImages.map((img, idx) => (
              <div
                key={`${img}-${idx}`}
                onClick={() => setCurrentIndex(idx)}
                className={`w-20 h-20 border border-gray-200 rounded-md cursor-pointer overflow-hidden transition ${
                  currentIndex === idx
                    ? "ring-2 ring-[#1e1e4d]"
                    : "hover:ring-1 hover:ring-gray-400"
                }`}
              >
                <img
                  src={img}
                  alt={`${product.name} ${idx + 1}`}
                  className="object-contain w-full h-full"
                />
              </div>
            ))}
          </div>

          <div
            className="relative max-w-md h-[300px] w-full sm:max-w-lg sm:h-[500px] md:max-w-xl md:h-[500px] lg:max-w-[400px] lg:h-[400px] overflow-hidden flex justify-center items-center border border-gray-300 rounded-md shadow-md"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <img
              src={mainImage}
              alt={product.name}
              className="object-contain w-full h-full"
            />

            <button
              onClick={handlePrev}
              className="hidden sm:flex absolute left-2 top-1/2 -translate-y-1/2 bg-[#1e1e4d] text-white cursor-pointer rounded-full p-2"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={handleNext}
              className="hidden sm:flex absolute right-2 top-1/2 -translate-y-1/2 bg-[#1e1e4d] text-white cursor-pointer rounded-full p-2"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>

        <div className="flex flex-col justify-start p-2 gap-4">
          <h1 className="text-xl md:text-4xl font-bold">{product.name}</h1>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-xl md:text-2xl text-teal-600 font-medium">₹{product.price}.00</span>
            {product.mrp && product.mrp > product.price ? (
              <span className="text-sm text-gray-400 line-through">₹{product.mrp}.00</span>
            ) : null}
          </div>
          <RatingStars rating={product.rating} />

          <div>
            <p className="font-light">{product.shortDescription}</p>
          </div>

          <div className="flex gap-3">
            <p>Share this: </p>
            <Instagram width={20} />
            <Twitter width={20} />
            <Facebook width={20} />
            <Link width={20} />
          </div>

          <div className="flex items-center gap-3 mt-4">
            <div className="flex items-center border rounded-md">
              <button
                className="px-3 cursor-pointer py-2 border-r"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              >
                -
              </button>
              <span className="px-4">{quantity}</span>
              <button className="px-3 py-2 cursor-pointer border-l" onClick={() => setQuantity((q) => q + 1)}>
                +
              </button>
            </div>

            <button
              className="bg-[#1e1e4d] font-light flex gap-2 cursor-pointer text-white px-6 py-2 rounded-md"
              onClick={handleCart}
            >
              <ShoppingCart />
              Add to Cart
            </button>

            <HeartIcon
              onClick={handleWishlist}
              id={String(product.id)}
              fill={isInWishlist ? "#00c8a2" : "none"}
              className="stroke-[#8bd2c9] stroke-2 cursor-pointer"
            />
          </div>

          <div className="border rounded-2xl text-gray-500 border-gray-300 p-4">
            <h2 className="text-lg font-medium text-[#1e1e4d] border-b pb-2 mb-3">Product Specifications</h2>
            <div className="grid grid-cols-2 gap-y-2 gap-x-4 text-xs font-light">
              <p><strong>SKU:</strong> {product.sku}</p>
              <p><strong>Category:</strong> {product.category}{product.subCategory ? ` / ${product.subCategory}` : ""}</p>
              
              {product.stockQuantity !== undefined && (
                <p>
                  <strong>Stock Status:</strong>{" "}
                  {product.stockQuantity > 0 ? (
                    <span className="text-green-600 font-medium">{product.stockQuantity} units left</span>
                  ) : (
                    <span className="text-red-500 font-medium">Out of Stock</span>
                  )}
                </p>
              )}

              {product.weight ? (
                <p><strong>Weight:</strong> {product.weight}g</p>
              ) : null}

              {product.dimensions && (product.dimensions.length || product.dimensions.width || product.dimensions.height) ? (
                <p className="col-span-2">
                  <strong>Dimensions (L × W × H):</strong>{" "}
                  {product.dimensions.length ?? 0} × {product.dimensions.width ?? 0} × {product.dimensions.height ?? 0} cm
                </p>
              ) : null}

              {product.gst ? (
                <p><strong>Tax Rate (GST):</strong> {product.gst}% included</p>
              ) : null}
            </div>
          </div>
        </div>
      </div>

      <div className="border p-10 xl:p-15 xl:mt-30 border-gray-300 rounded-xl w-full">
        <h1 className="text-2xl mb-4 font-bold text-gray-600">Description</h1>
        <div className="text-sm">
          <p>{product.description}</p>
        </div>
      </div>

      <div>
        <RelatedProducts category={product.category} currentProductId={String(product.id)} />
      </div>
    </div>
  );
}
