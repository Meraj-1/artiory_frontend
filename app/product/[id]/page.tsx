"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import ProductDetail from "@/components/ui/ProductDetails";

type ProductData = {
  id: string;
  name: string;
  price: number;
  mrp?: number;
  rating?: number;
  sku?: string;
  category?: string;
  subCategory?: string;
  image?: string;
  images?: string[];
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

export default function ProductPage() {
  const { id } = useParams();
  const productId = Array.isArray(id) ? id[0] : id;
  const [product, setProduct] = useState<ProductData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!productId) { setLoading(false); return; }

    fetch(`/api/products/${productId}`, { cache: "no-store" })
      .then((res) => res.json())
      .then((data) => {
        const p = data?.product ?? data?.data ?? data;
        if (!p || typeof p !== "object") { setProduct(null); return; }

        console.log("RAW API images field:", p.images);
        console.log("RAW API image field:", p.image);
        console.log("UNIQUE images:", [...new Set(Array.isArray(p.images) ? p.images : [])]);

        const rawImages: string[] = Array.isArray(p.images)
          ? p.images.filter((img: unknown) => typeof img === "string" && (img as string).trim())
          : [];

        const image: string = typeof p.image === "string" && p.image.trim()
          ? p.image
          : rawImages[0] ?? "";

        const allImages = rawImages.length > 0 ? rawImages : image ? [image] : [];
        const images = [...new Set(allImages)];

        setProduct({
          id: String(p._id ?? p.id ?? productId),
          name: p.productName ?? p.name ?? p.title ?? "",
          price: Number(p.sellingPrice ?? p.price ?? 0),
          mrp: Number(p.mrp ?? 0),
          rating: Number(p.rating ?? 3),
          sku: p.skuCode ?? p.sku ?? "",
          category: p.category ?? p.categoryName ?? "",
          subCategory: p.subCategory ?? "",
          shortDescription: p.shortDescription ?? p.shortDesc ?? "",
          description: p.detailedDescription ?? p.description ?? p.longDescription ?? "",
          image,
          images,
          variants: p.variants ?? [],
          stockQuantity: Number(p.stockQuantity ?? 0),
          weight: Number(p.weight ?? 0),
          dimensions: p.dimensions ?? {},
          gst: Number(p.gst ?? 0),
        });
      })
      .catch(() => setProduct(null))
      .finally(() => setLoading(false));
  }, [productId]);

  if (loading) return <ProductSkeleton />;
  if (!product) return <p className="text-center mt-10">Product not found!</p>;

  return <ProductDetail product={product} />;
}

const ProductSkeleton = () => {
  return (
    <div className="max-w-[1238.63px] mx-auto pt-3 p-3 md:pt-10 space-y-6 animate-pulse text-[#1e1e4d]/30">
      {/* Breadcrumbs Skeleton */}
      <div className="h-4 bg-gray-200 rounded w-1/4"></div>

      {/* Grid Skeleton */}
      <div className="grid md:grid-cols-2 gap-10">
        {/* Left Column (Images) */}
        <div className="flex flex-col-reverse sm:flex-row gap-5 justify-center items-center">
          {/* Thumbnails */}
          <div className="flex flex-wrap sm:flex-col gap-3 justify-center mt-3 sm:mt-0">
            {Array.from({ length: 3 }).map((_, idx) => (
              <div key={idx} className="w-20 h-20 bg-gray-200 rounded-md border border-gray-100"></div>
            ))}
          </div>
          {/* Main Image Frame */}
          <div className="w-full max-w-md h-[300px] sm:max-w-lg sm:h-[500px] md:max-w-xl md:h-[500px] lg:max-w-[400px] lg:h-[400px] bg-gray-200 rounded-md"></div>
        </div>

        {/* Right Column (Info) */}
        <div className="flex flex-col justify-start p-2 gap-4 w-full">
          {/* Title */}
          <div className="h-10 bg-gray-200 rounded w-3/4"></div>
          {/* Price */}
          <div className="h-8 bg-gray-200 rounded w-1/4 mt-2"></div>
          {/* Rating */}
          <div className="flex gap-1">
            {Array.from({ length: 5 }).map((_, idx) => (
              <div key={idx} className="w-4 h-4 bg-gray-200 rounded-full"></div>
            ))}
          </div>
          {/* Short Description */}
          <div className="space-y-2 mt-4">
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
          </div>

          {/* Buttons */}
          <div className="flex items-center gap-3 mt-6">
            <div className="h-10 bg-gray-200 rounded-md w-24"></div>
            <div className="h-10 bg-gray-200 rounded-md w-40"></div>
            <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
          </div>

          {/* Specs Card */}
          <div className="border border-gray-200 rounded-2xl p-4 mt-6 space-y-3">
            <div className="h-5 bg-gray-200 rounded w-1/3 mb-2"></div>
            <div className="grid grid-cols-2 gap-y-3 gap-x-4">
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Column (Description) */}
      <div className="border border-gray-200 rounded-xl p-10 mt-10 space-y-4">
        <div className="h-6 bg-gray-200 rounded w-1/6"></div>
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 rounded w-full"></div>
          <div className="h-4 bg-gray-200 rounded w-full"></div>
          <div className="h-4 bg-gray-200 rounded w-4/5"></div>
        </div>
      </div>
    </div>
  );
};
