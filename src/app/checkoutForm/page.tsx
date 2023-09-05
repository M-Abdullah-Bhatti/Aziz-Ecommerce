"use client";

import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
interface Image {
  url: string;
  // Add any other properties related to the image here if needed
}
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
import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();

  const { cartItems } = useSelector((state: any) => state.cart);
  const grossTotal = cartItems.reduce(
    (total: number, item: Product) => total + item.quantity * item.price,
    0
  );
  const user = useSelector((state: any) => state.user);
  const [message, setMessage] = useState("");
  console.log(user.data);

  const dispatch = useDispatch();
  const [isProcessing, setIsProcessing] = useState(false);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  // Map cartItems to create orderItems array
  const orderItems = cartItems.map((item: Product) => ({
    name: item.name,
    price: item.price,
    quantity: item.quantity,
    image: item.images.length > 0 ? item.images[0].url : "",
    product: item._id, // Assuming _id is the identifier for the product
  }));
  console.log(orderItems, "hfrheferg");
  const handleSubmit = async (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();
    const { data } = await axios.post("/api/createorder", {
      customer: name,
      userId: user.data._id,
      address,
      total: grossTotal,
      status: 0,
      method: 1,
      orderItems,
    });

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsProcessing(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: `${window.location.origin}/orders`,
      },
    });

    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage("error occured");
    } else {
      setMessage("An unexpected error occured.");
    }
    console.log(data);
    setIsProcessing(false);
    toast.success("order created successfully");
  };

  return (
    <div className="w-screen ">
      <form
        id="payment-form"
        className="mx-auto text-white rounded-lg bg-gray-800 md:w-2/5 w-full p-4 flex flex-col items-center border-2 border-black mt-4"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-gray-300 to-gray-400">
          Shipping Details
        </h2>
        <div className="flex flex-col space-y-2 w-full">
          <label htmlFor="name">Name</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border border-gray-300 rounded px-2 py-1"
          />
        </div>
        <div className="flex flex-col space-y-2 mt-4 w-full">
          <label htmlFor="address">Address</label>
          <input
            id="address"
            type="text"
            placeholder="Karachi"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="border border-gray-300 rounded px-2 text-black py-1"
          />
        </div>
        <h2 className="text-2xl font-bold text my-4 center bg-clip-text text-transparent bg-gradient-to-r from-gray-300 to-gray-400">
          Billing Details
        </h2>
        <PaymentElement id="payment-element" className="w-full" />
        <button
          disabled={isProcessing || !stripe || !elements}
          className="bg-blue-500 mx-auto my-6 w-[200px] text-white px-4 py-2 rounded-lg"
        >
          <span id="button-text">
            {isProcessing ? "Processing..." : "Pay now"}
          </span>
        </button>
        {/* Show any error or success messages */}
        {message && <div className="text-red-500 text-center">{message}</div>}
      </form>
    </div>
  );
}
