"use client";
// import CategorySection from "@/components/Categories";
import Slider from "@/components/SLider";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import Image from "next/image";
import { FcMultipleSmartphones } from "react-icons/fc";
import { BsLaptopFill } from "react-icons/bs";
import { GiRunningShoe } from "react-icons/gi";
import { BsCameraFill } from "react-icons/bs";
import { useEffect } from "react";
import { store } from "@/redux/store";
import { fetchUsers } from "@/redux/slices/userSlice";
// import { BsLaptopFill } from "react-icons/bs";

export default function Home() {
  const categories = [
    {
      name: "SmartPhones",
      iconUrl: <FcMultipleSmartphones />,
    },
    {
      name: "Laptops",
      iconUrl: <BsLaptopFill />,
    },
    {
      name: "Footwear",
      iconUrl: <GiRunningShoe />,
    },
    {
      name: "Camera",
      iconUrl: <BsCameraFill />,
    },
  ];
  useEffect(() => {
    store.dispatch(fetchUsers());
  }, []);

  return (
    <main className="">
      <Hero />
      {/* <CategorySection categories={categories} /> */}
      <h2 className="text-5xl font-bold bg-clip-text py-4 text-center text-transparent bg-gradient-to-r from-pink-700 to-violet-700">
        Featured Categories
      </h2>
      <Slider />
      <Footer />
    </main>
  );
}
