"use client";
import { useCart } from "@/app/context/cart/Cartcontext";
import { useWishlist } from "@/app/context/whishlist/WishlistContext";
import { HeartIcon, Instagram ,Twitter,Facebook, ChevronLeft, ChevronRight , Link, ShoppingCart, Star  } from "lucide-react";
import { toast } from "react-toastify";
import { useState  } from "react";
import { Londrina_Solid } from "next/font/google";
import RelatedProducts from "./RelatedProducts";
import Image from "next/image";

const londrina = Londrina_Solid({
  weight: ["100", "300", "400", "900"],
  subsets: ["latin"],
  display: "swap",
});

type ProductType = {
  id: number;
  images: string[];
  name: string;
  price: number;
  rating:number;
  sku: string;
  // ageGroup: string;
  category: string;
  shortDescription: string;
  description: string;
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

export default function ProductDetail({ product }: { product: ProductType }) {
  const { dispatch } = useCart();
  const { wishlistDispatch, wishlistState } = useWishlist();
  const [quantity, setQuantity] = useState(1);
  const [mainImage] = useState(product.images[0]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStartX, setTouchStartX] = useState(0);
  const [touchEndX, setTouchEndX] = useState(0)

  // const Images = product.images[currentIndex];

    const handlePrev = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? product.images.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prev) =>
      prev === product.images.length - 1 ? 0 : prev + 1
    );
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEndX(e.targetTouches[0].clientX);
  };
  
  const handleTouchEnd = () => {
    if (touchStartX - touchEndX > 50) handleNext(); // swipe left → next
    if (touchEndX - touchStartX > 50) handlePrev(); // swipe right → prev
  };


  const isInWishlist = wishlistState.items.some(
    (item) => item.id === String(product.id)
  );

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
      {/* Thumbnails (below image on mobile, left side on desktop) */}
      <div className="flex flex-wrap  sm:flex-col gap-3 sm:h-[400px] sm:overflow-y-auto justify-center mt-3 sm:mt-0">
        {product.images.map((img, idx) => (
          <div
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`w-20 h-20 border border-gray-200 rounded-md cursor-pointer overflow-hidden transition 
              ${
                currentIndex === idx
                  ? "ring-2 ring-[#1e1e4d]"
                  : "hover:ring-1 hover:ring-gray-400"
              }`}>
            <Image
              src={img}
              alt={`${product.name} ${idx + 1}`}
              width={80}
              height={80}
              className="object-contain w-full h-full"
            />
          </div>
        ))}
      </div>
     
      {/* Right main image (on top for mobile) */}
     
      <div
        className="relative max-w-md h-[300px] w-full sm:max-w-lg sm:h-[500px]
        md:max-w-xl md:h-[500px] lg:max-w-[400px] lg:h-[400px] overflow-hidden 
        flex justify-center items-center border border-gray-300 rounded-md shadow-md"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <Image
          src={product.images[currentIndex]}
          alt={product.name}
          width={500}
          height={500}
          className="object-contain w-full h-full"
        />

        {/* Prev/Next Buttons (hidden on small screens) */}
        <button
          onClick={handlePrev}
          className="hidden sm:flex absolute left-2 top-1/2 -translate-y-1/2 
          bg-[#1e1e4d] text-white cursor-pointer rounded-full p-2"
        >
          <ChevronLeft size={24} /> 
        </button>
        <button
          onClick={handleNext}
          className="hidden sm:flex absolute right-2 top-1/2 -translate-y-1/2 
          bg-[#1e1e4d] text-white cursor-pointer rounded-full p-2"
        >
          <ChevronRight size={24} />
        </button>
      </div>
  
   
    </div>
        {/* Right Side: Product Info */}
        <div className="flex flex-col justify-start p-2 gap-4">
          <h1 className="text-xl md:text-4xl font-bold">{product.name}</h1>
          <p className="text-xl md:text-2xl text-teal-600 mt-1 font-light">₹{product.price}.00</p>
          <RatingStars rating={product.rating} />

          <div>
            <p className="font-light">{product.shortDescription}</p>
          </div>
          {/* <p className="text-[#1e1e4d] font-light text-lg">{product.shortDescription}</p> */}
          <div className="flex gap-3">
            <p>Share this: </p>
            <Instagram width={20} />
            <Twitter width={20} />
            <Facebook width={20} />
            <Link  width={20}/>
          </div>

          {/* Quantity & Buttons */}
          <div className="flex items-center gap-3 mt-4">
            <div className="flex items-center border rounded-md">
              <button
                className="px-3 cursor-pointer py-2 border-r"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              >
                -
              </button>
              <span className="px-4">{quantity}</span>
              <button className="px-3 py-2 cursor-pointer border-l"  onClick={() => setQuantity((q) => q + 1)}>
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

          {/* Extra Info */}
          <div className="border rounded-2xl text-gray-500  border-gray-300 p-2">
          <h1 className="text-2xl font-light">Short Description</h1>
          <div className="mt-4 grid grid-cols-2  font-light text-lg space-y-1">
            <p>
              <strong>SKU:</strong> {product.sku}
            </p>
            <p>
              <strong>Category:</strong> {product.category}
            </p>
            <p>
              {/* <strong>Age Group:</strong> {product.ageGroup} */}
            </p>
          </div>
          </div>
        </div>
      </div>
           {/* Discription/ */}
        <div className="border p-10  xl:p-15 xl:mt-30 border-gray-300 rounded-xl w-full">
         <h1 className="text-2xl mb-4 font-bold text-gray-600">Description</h1>
        <div className="text-sm">
          <p>{product.description}</p>
        </div>
        </div>
        {/* Related Product */}

        <div>
          <RelatedProducts />

        </div>
    </div>
  );
}
