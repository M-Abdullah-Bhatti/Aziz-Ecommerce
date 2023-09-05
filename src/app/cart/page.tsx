"use client";
import { add, remove } from "@/redux/slices/cartSlice";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { checkout } from "../../checkout";
import { loadStripe } from "@stripe/stripe-js";
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
export default function Cart() {
  const { cartItems } = useSelector((state: any) => state.cart); // Assuming your cart slice is named 'cart'
  const dispatch = useDispatch();
  const router = useRouter();

  //   const [quantity, setquantity] = useState(1);
  const deleteItem = (id: number) => {
    dispatch(remove(id));
  };

  const handleCheckout = () => {};
  const increaseQuantity = (id: number, quantity: number, stock: number) => {
    const newQty = quantity + 1;
    if (stock <= quantity) {
      alert("Not Enough Stock available");
      return;
    }
    const updatedProduct = {
      ...cartItems.find((item: Product) => item._id === id),
      quantity: newQty,
    };
    dispatch(add(updatedProduct));
  };

  const decreaseQuantity = (id: number, quantity: number) => {
    const newQty = quantity - 1;
    if (1 >= quantity) {
      return;
    }
    const updatedProduct = {
      ...cartItems.find((item: Product) => item._id === id),
      quantity: newQty,
    };
    dispatch(add(updatedProduct));
  };
  const grossTotal = cartItems.reduce(
    (total: number, item: Product) => total + item.quantity * item.price,
    0
  );
  const totalQuantity = cartItems.reduce(
    (total: number, item: Product) => total + item.quantity,
    0
  );
  useEffect(() => {
    console.log(cartItems, "helo");
  }, []);

  return (
    <div className="container mx-auto p-4 mt-16">
      <h1 className="text-3xl font-semibold mb-8 text-center">Cart Items</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="grid gap-4">
          {cartItems.map((item: Product) => (
            <div
              key={item._id}
              className="flex items-center flex-wrap justify-between border h-[150px] p-2 rounded"
            >
              <img
                src={item.images[0].url}
                alt=""
                className="h-[60px] w-[100px] object-cover"
              />
              <div className="flex-1 mx-4">
                <p className="text-xl font-semibold">{item.name}</p>
                <p className="text-gray-600">${item.price * item.quantity}</p>
              </div>
              <div className="flex items-center">
                <p
                  className="cursor-pointer mr-5 font-semibold text-red-700 text-lg"
                  onClick={() => deleteItem(item._id)}
                >
                  Remove
                </p>
                <button
                  className="bg-black px-2 text-white cursor-pointer rounded-lg"
                  onClick={() => {
                    decreaseQuantity(item._id, item.quantity);
                  }}
                >
                  -
                </button>
                <p className="px-2">{item.quantity}</p>
                <button
                  className="bg-black px-2 text-white cursor-pointer rounded-lg"
                  onClick={() =>
                    increaseQuantity(item._id, item.quantity, item.stock)
                  }
                >
                  +
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      {grossTotal == 0 ? (
        ""
      ) : (
        <>
          <div className="mb-4">
            <p className="text-xl text-slate-700  font-semibold text-center my-4">
              Gross Total:{" "}
              <span className="ml-5 text-slate-800">${grossTotal}</span>{" "}
            </p>
          </div>
          <div className="mb-4">
            <p className="text-xl text-slate-700  font-semibold text-center my-4">
              Total Items:{" "}
              <span className="ml-5 text-slate-800">{totalQuantity}</span>{" "}
            </p>
          </div>
          <div className="flex justify-center">
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-lg"
              onClick={() => router.push("/payment")}
            >
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
}
