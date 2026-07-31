"use client";
import FeaturedSec from "@/components/ui/FeaturedSec";
// import Header from "@/components/ui/Header";
import Hero from "@/components/ui/Hero";
import OurServices from "@/components/ui/OurServices";
import ProductByAge from "@/components/ui/ProductByAge";
import ShopByCategory from "@/components/ui/ShopByCategory";
// import TrendingReel from "@/components/ui/TrendReel";
import Reels from "@/components/ui/Reels";
import Product from "@/components/ui/Products";
// import Subscribe from "@/components/ui/Subscribe";
// import Footer from "@/components/ui/Footer";

export default function Home() {
  return (
    <>
      {/* <Header/> */}
      <Hero />
      <OurServices/>
      <ProductByAge/>
      <FeaturedSec/>
      <ShopByCategory/>
      {/* <TrendingReel/> */}
      <Reels />
      <Product/>
      {/* <Subscribe /> */}
      {/* <Footer/> */}
    </>
  );
}
