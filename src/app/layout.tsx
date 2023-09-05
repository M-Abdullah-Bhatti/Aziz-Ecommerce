"use client";
import Navbar from "@/components/Navbar";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Providers from "@/redux/provider";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useEffect } from "react";
import { store } from "@/redux/store";
import { fetchUsers } from "@/redux/slices/userSlice";

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!);

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    store.dispatch(fetchUsers());
  }, []);
  return (
    <html lang="en">
      <head>
        <title>Next Commerce</title>
        <meta name="description" content="Description" />
      </head>
      <body className={inter.className}>
        <Elements stripe={stripePromise}>
          <Providers>
            <ToastContainer position="top-center" autoClose={3000} />
            <Navbar />

            {children}
          </Providers>
        </Elements>
      </body>
    </html>
  );
}
