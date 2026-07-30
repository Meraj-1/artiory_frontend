"use client";
import { useParams } from "next/navigation";
import ProductDetail from "@/components/ui/ProductDetails";

const products = [
  {
    id: 1,
    name: "Jumbo Multicolored Crayon",
    price: 299,
    rating: 3,
    sku: "PC-001",
    category: "Crayons",
    image: "/product/1toys1.jpg",
    images: [
      "/products/1toys1.jpg",
      "/products/1toys2.jpg",
      "/products/1toys3.jpg"      
    ],
    shortDescription: "Made from child-friendly, non-toxic materials, these crayons are ideal for school projects, coloring books, art activities, and everyday creative fun. Their sturdy jumbo design helps reduce breakage, making them perfect for young artists.",
    description:
      "Bring your child's imagination to life with the Artiory Jumbo Multicolored Crayon Set. Designed for little hands, these jumbo crayons offer a comfortable grip, making coloring easy, fun, and mess-free. With rich, vibrant colors and a smooth application, kids can enjoy endless hours of creative play while improving their fine motor skills and artistic expression.",
  },
  {
    id: 2,
    name: "Crocodile Puzzle Crayon",
    price: 299,
    rating: 3,
    sku: "JMC-001",
    category: "Puzzle Crayons",
    image: "/product/2toys1.jpg",
    images: [
      "/products/2toys1.jpg",
      "/products/2toys2.jpg",
      "/products/2toys3.jpg",
      "/products/2toys4.jpg",
      "/products/2toys5.jpg",
    ],
    shortDescription: "Make coloring even more exciting with the Artiory Crocodile Puzzle Crayon.",
    description:
      "This unique crayon set features vibrant colors that can be stacked together to form a fun crocodile puzzle, turning every coloring session into a creative learning experience. Its playful design keeps children engaged while encouraging imagination, color recognition, and fine motor skill development.",
  },
  {
    id: 3,
    name: "Dino Puzzle Crayon",
    price: 299,
    rating: 3,
    sku: "BC-001",
    // ageGroup: "3+",
    category: "Puzzle Crayons",
    image: "/product/3toys1.jpg",
    images: [
      "/products/3toys1.jpg",
      "/products/3toys2.jpg",
      "/products/3toys3.jpg",
      "/products/3toys4.jpg",
    ],
    shortDescription: "Unleash your child's creativity with the Artiory Dino Puzzle Crayon",
    description:
      "Designed in a fun dinosaur shape, this stackable puzzle crayon combines vibrant colours with interactive play, making every colouring session exciting and educational. Kids can assemble the dinosaur while enjoying smooth, colourful artwork, helping develop creativity, hand-eye coordination, and problem-solving skills. Made from child-safe, non-toxic materials, the Dino Puzzle Crayon is easy to hold, durable, and perfect for little hands. An ideal choice for school, art activities, return gifts, and everyday creative fun.",
  },
  {
    id: 4,
    name: "Dino Puzzle Crayon",
    price: 299,
    rating: 3,
    sku: "BC-001",
    // ageGroup: "3+",
    // rating:4,
    category: "Puzzle Crayons",
    image: "/product/4toys1.jpg",
    images: [
      "/products/4toys1.jpg",
      "/products/4toys2.jpg",
      "/products/4toys3.jpg"
    ],
    shortDescription: "Spark your child's imagination with the Artiory Dino Puzzle Crayon, a fun and interactive coloring companion designed for young artists. ",
    description:
    "Crafted from child-safe, non-toxic materials, the Dino Puzzle Crayon offers vibrant colors, a smooth coloring experience, and a comfortable grip for little hands. It's perfect for school, art projects, return gifts, birthday hampers, and everyday creative fun.",
  },
  {
    id: 5,
    name: "BALANCE-CRAYONS",
    price: 299,
    rating: 3,
    sku: "BC-001",
    // ageGroup: "3+",
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
  }
];

export default function ProductPage() {
  const { id } = useParams();
  const product = products.find((p) => p.id === Number(id));

  if (!product) return <p className="text-center mt-10">Product not found!</p>;

  return <ProductDetail product={product} />;
}
