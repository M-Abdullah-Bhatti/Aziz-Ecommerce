"use client";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe, Stripe } from "@stripe/stripe-js";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CheckoutForm from "../checkoutForm/page";
import axios from "axios";
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

export default function Payment() {
  const [stripePromise, setStripePromise] = useState<Stripe | null>();
  const [clientSecret, setClientSecret] = useState("");
  const { cartItems } = useSelector((state: any) => state.cart);
  const grossTotal = cartItems.reduce(
    (total: number, item: Product) => total + item.quantity * item.price,
    0
  );

  useEffect(() => {
    const loadStripePromise = async () => {
      const { data } = await axios.get("/api/config");
      const publishableKey = await data.publishableKey;
      const stripe = await loadStripe(publishableKey);
      setStripePromise(stripe);
      console.log(publishableKey, "sdgdsfag");
      // console.log(data);
    };

    loadStripePromise();
  }, []);

  useEffect(() => {
    const postStripe = async () => {
      const payload = {
        total: grossTotal,
      };
      const { data } = await axios.post("/api/checkout_sessions", payload);
      // var { clientSecret } = await result.json();
      setClientSecret(data);
      console.log(data);
    };
    postStripe();
  }, []);
  return (
    <div className=" w-screen flex flex-col items-center justify-center mt-20  text-black">
      <h1 className="text-2xl py-2 font-bold bg-clip-text  text-center text-transparent bg-gradient-to-r from-pink-700 to-violet-700">
        You will pay Rs. {grossTotal}
      </h1>
      {clientSecret && stripePromise && (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
}
