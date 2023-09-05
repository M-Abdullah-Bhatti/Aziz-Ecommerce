"use client";
import axios from "axios";
import { useEffect, useState } from "react";
interface Order {
  _id: string;
  customer: string;
  address: string;
  total: number;
  orderItems: {
    product: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
  }[];
  status: number;
}
import React from "react";

const Orders = () => {
  const [orders, setorders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [query, setquery] = useState("");
  const [userId, setUserId] = useState("");
  async function getDetails() {
    const response = await axios.get("/api/me");
    setUserId(response.data.data._id);
  }
  const getOrders = async () => {
    getDetails();
    try {
      setLoading(true);
      const { data } = await axios.get("/api/getmyorders");
      setorders(data.orders);

      console.log("datasssorder", data);
      setLoading(false);
    } catch (error: any) {
      console.log(error);
    }
  };
  useEffect(() => {
    getOrders();
  }, []);
  return (
    <div className="container mx-auto mt-4 px-2">
      <h1 className="text-2xl font-bold mb-4">My Orders</h1>
      {loading ? (
        <div className="animate-spin h-20 w-20 rounded-full mt-10 mx-auto border-r-2 border-l-2 border-slate-900"></div>
      ) : (
        orders.length !== 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
            {orders.map((order: Order) => (
              <div
                key={order._id}
                className="bg-gray-300 rounded-lg p-5 shadow-xl"
              >
                <h2 className="text-lg font-semibold mb-2">
                  Order ID: {order._id}
                </h2>
                <p className="text-gray-700 mb-2">Customer: {order.customer}</p>
                <p className="text-gray-700 mb-2">Address: {order.address}</p>
                <p className="text-gray-700 mb-2">Total: ${order.total}</p>
                <h3 className="text-md font-bold mt-2 mb-2  text-xl ">
                  Order Items:
                </h3>
                <ul>
                  {order.orderItems.map((item: any) => (
                    <li key={item.product} className="flex space-x-4 mb-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                      <div>
                        <p className="font-semibold">{item.name}</p>
                        <p>Price: ${item.price}</p>
                        <p>Quantity: {item.quantity}</p>
                      </div>
                    </li>
                  ))}
                </ul>
                <p className="text-lg text-gray-700">
                  Status: {order.status === 0 ? "Processing" : "Completed"}
                </p>
              </div>
            ))}
          </div>
        )
      )}
    </div>
  );
};

export default Orders;
