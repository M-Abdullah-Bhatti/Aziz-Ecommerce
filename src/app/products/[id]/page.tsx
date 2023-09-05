"use client";
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
interface Image {
  url: string;
  // Add any other properties related to the image here if needed
}
import axios from "axios";
import { NextRequest } from "next/server";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { add } from "@/redux/slices/cartSlice";

export default function Product(
  { params }: { params: { id: string } },
  request: NextRequest
) {
  const [productDetails, setProductDetails] = useState<Product>();
  //   const { searchParams } = new URL(request.url);
  const id = params.id;
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [quantity, setquantity] = useState(1);
  const handleAddToCart = (product: Product) => {
    dispatch(add({ ...product, quantity: 1 }));
  };
  const getDetails = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/products/${id}`);
      if (data.error) {
        return toast.error(data.error);
      }
      setProductDetails(data.data);
      setLoading(false);
      console.log(data);
    } catch (error: any) {
      toast.error(error.message);
      setLoading(false);
    }
  };
  useEffect(() => {
    getDetails();
    console.log(id);
  }, [id]);

  return (
    <div className="container mx-auto flex items-center  justify-center p-4 mt-10 h-screen ">
      {loading ? (
        <p>Loading...</p>
      ) : productDetails ? (
        <div className="flex items-center flex-col md:flex-row h-full mt-6 md:mt-0  md:h-3/4 w-3/4 bg-slate-900 text-white">
          <div className="md:w-1/2 w-full h-1/2 md:h-full">
            <img
              src={productDetails.images[0].url}
              alt={productDetails.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="md:w-1/2 w-full h-3/4 p-4 flex flex-col justify-around">
            <h1 className="text-3xl font-bold">{productDetails.name}</h1>
            <p className="text-gray-400 text-xl">
              {productDetails.description}
            </p>
            <p className=" font-semibold mt-2 text-xl">
              ${productDetails.price * quantity}
            </p>

            <button
              className="bg-blue-500 text-white px-4 py-2 mt-4 rounded"
              onClick={() => handleAddToCart(productDetails)}
            >
              Add to Cart
            </button>
          </div>
        </div>
      ) : (
        <p>Product not found.</p>
      )}
    </div>
  );
}

{
  /* <div className="flex justify-between w-[100px]">
  <button
    className="bg-black px-2 text-lg text-white cursor-pointer rounded-lg"
    onClick={() => setquantity(quantity + 1)}
  >
    +
  </button>
  <h2 className="text-lg font-semibold">{quantity}</h2>
  <button
    className="bg-black px-2 text-lg text-white cursor-pointer rounded-lg"
    onClick={() => {
      quantity > 1 && setquantity(quantity - 1);
    }}
  >
    -
  </button>
</div>; */
}
