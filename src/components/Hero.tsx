"use client";
import React from "react";
import Carousel from "react-material-ui-carousel";
import Lottie from "lottie-react";
import animationData from "../assets/animation_llthhaf5.json";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

const Hero = () => {
  const images = [
    "/camwra.png",
    "/shoes.png",
    "/hp.png",
    "/lp.png",
    "/phone.png",
  ];

  return (
    <div className=" relative bg-slate-900 flex flex-col md:flex-row justify-around items-center md:h-screen overflow-x-hidden border-2 border-black ">
      <motion.div className="w-full md:w-[50%] flex-shrink-0 px-4 md:h-[350px] h-[450px] justify-center md:gap-0 gap-5 flex flex-col md:justify-between md:items-start items-center  z-10">
        <h1 className="text-5xl font-bold bg-clip-text md:text-left text-center text-transparent bg-gradient-to-r from-pink-700 to-violet-700">
          Welcome To Next Commerce
        </h1>
        <h4 className="text-2xl font-bold bg-clip-text md:text-left text-center text-transparent bg-gradient-to-r from-slate-500 to-slate-300">
          Shop, Click, Delight: Your Online Retail Heaven!
        </h4>
        <button className="bg-black border-2 border-white text-white text-lg py-3 px-6 rounded-lg hover:bg-slate-800">
          <Link href="/products" className="text-white">
            Shop Now
          </Link>
        </button>
      </motion.div>
      {/* <div className="    h-[500px] lg:h-full mt-4    w-[50%] bg-gray-300  z-10 md:clip-path-heroPoly"> */}
      <img
        src="/maaaaain.png"
        alt=""
        className=" lg:w-[600px] h-[300px] w-[80%] md:h-[400px] object-fill md:py-0 py-5"
      />
      {/* </div> */}
    </div>
  );
};

export default Hero;
