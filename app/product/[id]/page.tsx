"use client";
import { useParams } from "next/navigation";
import ProductDetail from "@/components/ui/ProductDetails";

const products = [
  {
    id: 1,
    name: "PUZZLE-CRAYONS",
    price: 299,
    rating: 3,
    sku: "PC-001",
    ageGroup: "3+",
    category: "Art Supplies",
    image: "/product/1toys1.jpg",
    images: [
      "/products/1toys1.jpg",
      "/products/1toys2.jpg",
      "/products/1toys3.jpg",
      "/products/1toys4.jpg",
    ],
    shortDescription: "Bright and colorful puzzle crayons for kids.",
    description:
      "These puzzle crayons are perfect for children aged 3 and above. They come in a variety of bright colors and can be easily assembled into fun shapes, making coloring time even more enjoyable.",
  },
  {
    id: 2,
    name: "JUMBO-MULTI-COLOUR-CRAYON",
    price: 299,
    rating: 3,
    sku: "JMC-001",
    ageGroup: "3+",
    category: "Art Supplies",
    image: "/product/2toys1.jpg",
    images: [
      "/products/2toys1.jpg",
      "/products/2toys2.jpg",
      "/products/2toys3.jpg",
      "/products/2toys4.jpg",
      "/products/2toys5.jpg",
    ],
    shortDescription: "Large, easy-to-hold crayons in multiple colors.",
    description:
      "These jumbo multi-color crayons are designed for little hands. They are easy to grip and come in a variety of vibrant colors, making them ideal for young artists to explore their creativity.",
  },
  {
    id: 3,
    name: "BALANCE-CRAYONS",
    price: 299,
    rating: 3,
    sku: "BC-001",
    ageGroup: "3+",
    category: "Art Supplies",
    image: "/product/3toys1.jpg",
    images: [
      "/products/3toys1.jpg",
      "/products/3toys2.jpg",
      "/products/3toys3.jpg",
      "/products/3toys4.jpg",
    ],
    shortDescription: "Ergonomically designed crayons for better grip.",
    description:
      "Balance crayons are ergonomically designed to provide a comfortable grip for children. They help improve hand coordination and make coloring easier and more enjoyable for young artists.",
  },
  {
    id: 3,
    name: "BALANCE-CRAYONS",
    price: 299,
    rating: 3,
    sku: "BC-001",
    ageGroup: "3+",
    // rating:4,
    category: "Art Supplies",
    image: "/product/4toys1.jpg",
    images: [
      "/products/4toys1.jpg",
      "/products/4toys2.jpg",
      "/products/4toys3.jpg",
      "/products/4toys4.jpg",
    ],
    shortDescription: "Ergonomically designed crayons for better grip.",
    description:
      "Balance crayons are ergonomically designed to provide a comfortable grip for children. They help improve hand coordination and make coloring easier and more enjoyable for young artists.",
  },
  {
    id: 4,
    name: "BALANCE-CRAYONS",
    price: 299,
    rating: 3,
    sku: "BC-001",
    ageGroup: "3+",
    category: "Art Supplies",
    image: "/product/4toys1.jpg",
    images: [
      "/products/4toys1.jpg",
      "/products/4toys2.jpg",
      "/products/4toys3.jpg",
      "/products/4toys4.jpg",
    ],
    shortDescription: "Ergonomically designed crayons for better grip.",
    description:
      "Balance crayons are ergonomically designed to provide a comfortable grip for children. They help improve hand coordination and make coloring easier and more enjoyable for young artists.",
  },
  {
    id: 5,
    name: "BALANCE-CRAYONS",
    price: 299,
    rating: 3,
    sku: "BC-001",
    ageGroup: "3+",
    category: "Art Supplies",
    image: "/product/5toys1.jpg",
    images: [
      "/products/5toys1.jpg",
      "/products/5toys2.jpg",
      "/products/5toys3.jpg",
      "/products/5toys4.jpg",
    ],
    shortDescription: "Ergonomically designed crayons for better grip.",
    description:
      "Balance crayons are ergonomically designed to provide a comfortable grip for children. They help improve hand coordination and make coloring easier and more enjoyable for young artists.",
  },
  {
    id: 6,
    name: "BALANCE-CRAYONS",
    price: 299,
    rating: 3,
    sku: "BC-001",
    ageGroup: "3+",
    category: "Art Supplies",
    image: "/product/6toys1.jpg",
    images: [
      "/products/6toys1.jpg",
      "/products/6toys2.jpg",
      "/products/6toys3.jpg",
      "/products/6toys4.jpg",
    ],
    shortDescription: "Ergonomically designed crayons for better grip.",
    description:
      "Balance crayons are ergonomically designed to provide a comfortable grip for children. They help improve hand coordination and make coloring easier and more enjoyable for young artists.",
  },
  {
    id: 7,
    name: "BALANCE-CRAYONS",
    price: 299,
    rating: 3,
    sku: "BC-001",
    ageGroup: "3+",
    category: "Art Supplies",
    image: "/product/7toys1.jpg",
    images: [
      "/products/7toys1.jpg",
      "/products/7toys2.jpg",
      "/products/7toys3.jpg",
      "/products/7toys4.jpg",
    ],
    shortDescription: "Ergonomically designed crayons for better grip.",
    description:
      "Balance crayons are ergonomically designed to provide a comfortable grip for children. They help improve hand coordination and make coloring easier and more enjoyable for young artists.",
  },
  {
    id: 8,
    name: "BALANCE-CRAYONS",
    price: 299,
    rating: 3,
    sku: "BC-001",
    ageGroup: "3+",
    category: "Art Supplies",
    image: "/product/8toys1.jpg",
    images: [
      "/products/8toys1.jpg",
      "/products/8toys2.jpg",
      "/products/8toys3.jpg",
      "/products/8toys4.jpg",
    ],
    shortDescription: "Ergonomically designed crayons for better grip.",
    description:
      "Balance crayons are ergonomically designed to provide a comfortable grip for children. They help improve hand coordination and make coloring easier and more enjoyable for young artists.",
  },
  {
    id: 9,
    name: "BALANCE-CRAYONS",
    price: 299,
    rating: 3,
    sku: "BC-001",
    ageGroup: "3+",
    category: "Art Supplies",
    image: "/product/9toys1.jpg",
    images: [
      "/products/9toys1.jpg",
      "/products/9toys2.jpg",
      "/products/9toys3.jpg",
      "/products/9toys4.jpg",
    ],
    shortDescription: "Ergonomically designed crayons for better grip.",
    description:
      "Balance crayons are ergonomically designed to provide a comfortable grip for children. They help improve hand coordination and make coloring easier and more enjoyable for young artists.",
  },
  {
    id: 10,
    name: "BALANCE-CRAYONS",
    price: 299,
    rating: 3,
    sku: "BC-001",
    ageGroup: "3+",
    category: "Art Supplies",
    image: "/product/10toys1.jpg",
    images: [
      "/products/10toys1.jpg",
      "/products/10toys2.jpg",
      "/products/10toys3.jpg",
      "/products/10toys4.jpg",
    ],
    shortDescription: "Ergonomically designed crayons for better grip.",
    description:
      "Balance crayons are ergonomically designed to provide a comfortable grip for children. They help improve hand coordination and make coloring easier and more enjoyable for young artists.",
  },
  {
    id: 11,
    name: "BALANCE-CRAYONS",
    price: 299,
    rating: 3,
    sku: "BC-001",
    ageGroup: "3+",
    category: "Art Supplies",
    image: "/product/11toys1.jpg",
    images: [
      "/products/11toys1.jpg",
      "/products/11toys2.jpg",
      "/products/11toys3.jpg",
      "/products/11toys4.jpg",
    ],
    shortDescription: "Ergonomically designed crayons for better grip.",
    description:
      "Balance crayons are ergonomically designed to provide a comfortable grip for children. They help improve hand coordination and make coloring easier and more enjoyable for young artists.",
  },
];

export default function ProductPage() {
  const { id } = useParams();
  const product = products.find((p) => p.id === Number(id));

  if (!product) return <p className="text-center mt-10">Product not found!</p>;

  return <ProductDetail product={product} />;
}
