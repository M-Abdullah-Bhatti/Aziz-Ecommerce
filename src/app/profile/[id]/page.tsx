"use client";
import Link from "next/link";
import axios from "axios";
import { removeuser } from "../../../redux/slices/userSlice";

import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
interface USERDETAILS {
  _id: number;
  name: string;
  email: string;
  password: string;
}
export default function UserProfile({ params }: any) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState("");
  const [userDetails, setUserDetails] = useState<USERDETAILS>();
  const dispatch = useDispatch();

  async function getDetails() {
    const response = await axios.get("/api/me");
    setUserId(response.data.data._id);
    setUserDetails(response.data.data);
  }
  useEffect(() => {
    getDetails();
  }, []);
  const logout = async () => {
    try {
      const response = await axios.get("/api/logout");
      toast.success(response.data.message);
      dispatch(removeuser());
      router.push("/");
    } catch (error: any) {
      toast.error(error.message);
    }
  };
  return (
    <div className="flex flex-col md:flex-row items-center justify-center min-h-screen py-2">
      <div className="md:w-1/2 p-4">
        <h1 className="text-4xl mb-4">
          Name: {userDetails && userDetails.name}
        </h1>
        <h1 className="text-4xl mb-4">
          Name: {userDetails && userDetails.email}
        </h1>
        <button
          onClick={logout}
          className="p-2 bg-slate-900 text-white hover:bg-slate-700 cursor-pointer border border-gray-300 rounded-lg focus:outline-none focus:border-gray-600"
        >
          Logout
        </button>
      </div>
      <div className="md:w-1/2 p-4">
        {/* Add an SVG image from the public folder */}
        <img
          src="/profilebg.svg" // Replace with your SVG file path
          alt="Amazing SVG"
          className="max-w-full h-auto"
        />
      </div>
    </div>
  );
}
