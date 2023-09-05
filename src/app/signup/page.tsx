"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";
import { toast } from "react-toastify";

export default function Signup() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const signup = async () => {
    if (!user.email || !user.password || !user.name) {
      return toast.error("All fields are mandatory");
    }
    try {
      setLoading(true);
      const { data } = await axios.post("/api/signup", user);
      if (data.error) {
        return toast.error(data.error);
      }
      console.log("signup response is", data);
      router.push("/login");
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="w-screen h-screen bg-[url('/loginbg.png')] bg-cover">
      <div className="w-5/5 bg-gradient-to-r  h-full flex items-center justify-center z-10 ">
        <div className="sm:w-3/5 lg:w-2/5 w-[98vw] h-[400px] space-y-4   p-8 rounded-lg z-10 backdrop-blur-lg bg-white/30">
          <h3 className="text-white text-xl font-semibold mb-4 text-center">
            SIGNUP
          </h3>
          <input
            type="text"
            placeholder="User Name"
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300 placeholder-gray-800"
            value={user.name}
            onChange={(e) => setUser({ ...user, name: e.target.value })}
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300 placeholder-gray-800"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300 placeholder-gray-800"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />

          <button
            onClick={signup}
            className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-all duration-300"
          >
            Sign Up
          </button>
          <h3 className="text-center mt-3 text-white">
            Already a user?{" "}
            <Link
              href="/login"
              className="text-slate-100 underline underline-offset-2 hover:text-slate-500"
            >
              Login
            </Link>
          </h3>
        </div>
      </div>
    </div>
  );
}
