"use client";
import axios from "axios";
import Link from "next/link";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

export default function ProfilePage() {
  const [userId, setUserId] = useState("");
  async function getDetails() {
    const token = Cookies.get("token");
    console.log("arif: ", token);
    if (token) {
      const response = await axios.get("/api/me");
      setUserId(response.data.data._id);
    }
  }
  useEffect(() => {
    getDetails();
  }, [userId]);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-5xl mb-10">Profile</h1>
      <h2>
        {userId !== "" && (
          <Link
            href={`/profile/${userId}`}
            className="p-2 bg-slate-900 text-white hover:bg-slate-700 cursor-pointer border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
          >
            Go to Your Profile
          </Link>
        )}
      </h2>
    </div>
  );
}
