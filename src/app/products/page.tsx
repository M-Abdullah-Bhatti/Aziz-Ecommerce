"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
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
}

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [query, setquery] = useState("");
  const getProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("/api/products");
      if (query != "") {
        setProducts(
          data.data.filter((x: Product) => {
            return x.name.toLowerCase().includes(query.toLowerCase());
          })
        );
      } else {
        setProducts(data.data);
      }
      console.log("datasss", data);
      setLoading(false);
    } catch (error: any) {
      console.log(error);
    }
  };
  useEffect(() => {
    getProducts();
  }, [query]);
  return (
    <div className="container mx-auto py-8 mt-11">
      <h1 className="text-3xl font-semibold mb-7 text-center">Products</h1>
      <div className="flex justify-center items-center mx-auto w-[90vw] md:w-[700px] mb-5 shadow-lg">
        <input
          type="text"
          value={query}
          onChange={(e) => setquery(e.target.value)}
          placeholder="Search for products.."
          className="w-full md:w-90 px-4 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300 transition-all duration-300 placeholder-gray-800 backdrop-blur-lg backdrop-opacity-50"
        />
      </div>

      {loading ? (
        <div className="animate-spin h-20 w-20 rounded-full mx-auto border-r-2 border-l-2 border-slate-900"></div>
      ) : (
        <div className="grid max-[500px]:grid-cols-1 grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-2">
          {products.length !== 0 &&
            products.map((product: Product) => (
              <Link href={`/products/${product._id}`} key={product._id}>
                <div className="bg-white p-4 h-full py-5 border rounded shadow-md shadow-slate-800">
                  <img
                    src={product.images[0].url} // Assuming images is an array of URLs
                    alt={product.name}
                    className="w-full h-40 object-cover sm:mb-4 mb-2"
                  />
                  <h2 className="max-[597px]:text-base text-lg font-semibold">
                    {product.name}
                  </h2>
                  <p className="text-gray-500 sm:mb-2 mb-0">
                    {product.description}
                  </p>
                  <p className="max-[597px]:text-base text-lg font-semibold">
                    ${product.price}
                  </p>

                  <div className="flex items-center">
                    <div className="mr-2 text-yellow-500">
                      {/* Render star ratings here */}
                      {/* You can use a component or HTML/CSS to render star icons */}
                    </div>
                    <p className="text-sm text-gray-500">({product.ratings})</p>
                  </div>
                </div>
              </Link>
            ))}
        </div>
      )}
    </div>
  );
}
