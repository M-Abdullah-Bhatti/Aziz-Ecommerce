"use client";
import {
  CardElement,
  useElements,
  useStripe,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from "@stripe/react-stripe-js";
import axios from "axios";
// import { useRouter } from "next/router";
import React from "react";
import { BsCalendar3EventFill, BsFillKeyFill } from "react-icons/bs";
import { AiFillCreditCard } from "react-icons/ai";
import { useSelector } from "react-redux";
interface Product {
  _id: number;
  images: Image[];
  name: string;
  description: string;
  price: number;
  category: string;
  stock: number;
  ratings: number;
  quantity: number;
}
interface Image {
  url: string;
  // Add any other properties related to the image here if needed
}
export default function PaymentForm() {
  const stripe = useStripe();
  const { cartItems } = useSelector((state: any) => state.cart); // Assuming your cart slice is named 'cart'

  const elements = useElements();
  const cardElement = elements?.getElement("card");
  const grossTotal = cartItems.reduce(
    (total: number, item: Product) => total + item.quantity * item.price,
    0
  );
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (!stripe || !cardElement) return null;
      const { data } = await axios.post("/api/checkout_sessions", {
        data: { amount: grossTotal },
      });
      const clientSecret = data;

      await stripe?.confirmCardPayment(clientSecret, {
        payment_method: { card: cardElement },
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <form
      onSubmit={onSubmit}
      className="w-full h-screen mt-12  flex flex-col items-center justify-center gap-7 relative"
    >
      <div className="absolute top-0 left-0  flex items-start h-full  justify-start w-full bg-gray-300  z-10 md:clip-path-signUpPoly">
        <img src="/payBg.png" alt="" className=" object-cover mt-16" />
      </div>
      <h1 className="text-center font-bold text-5xl text-slate-900 ">
        Payment
      </h1>
      <div className="flex w-[360px] items-center justify-between bg-white px-2 h-[40px] relative rounded-sm border-2 border-black">
        <AiFillCreditCard className="absolute " />
        <CardNumberElement className="w-[100%] px-7 h-full py-3 " />
      </div>
      <div className="flex w-[360px] items-center justify-between bg-white px-2 h-[40px] relative rounded-sm border-2 border-black">
        <BsCalendar3EventFill className="absolute " />
        <CardExpiryElement className="w-[100%] px-7 h-full py-3" />
      </div>
      <div className="flex w-[360px] items-center justify-between bg-white px-2 h-[40px]  relative rounded-sm border-2 border-black">
        <BsFillKeyFill className="absolute " />
        <CardCvcElement className=" w-[100%] px-7 h-full py-3 focus:outline-[5px]" />
      </div>
      <h2>You will Pay {grossTotal}</h2>
      <button
        className=" bg-slate-800 text-white px-4 py-2 rounded-md hover:bg-slate-600 transition-all duration-300"
        type="submit"
      >
        Pay
      </button>
    </form>
  );
}
