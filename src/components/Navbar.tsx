"use client";
import Link from "next/link";
import { useState } from "react";
import { FiShoppingCart } from "react-icons/fi";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { useSelector } from "react-redux";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { cartItems } = useSelector((state: any) => state.cart);
  const { data } = useSelector((state: any) => state.user);
  console.log(data);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-gray-800 p-4 top-0 left-0 fixed w-full z-50 border-b-2 border-b-white">
      <div className=" relative flex justify-between items-center mx-auto w-full md:px-3">
        <Link
          href="/"
          className="bg-clip-text text-transparent bg-gradient-to-r from-gray-300 to-gray-400 text-2xl font-semibold"
        >
          Next Commerce
        </Link>
        <div className="md:hidden flex gap-10 items-center">
          <Link
            href="/cart"
            className="text-white text-2xl md:hidden block hover:text-gray-300 relative"
          >
            <span className="absolute text-black h-4 text-[14px] font-semibold mb-4 rounded-full bg-white w-4 flex items-center justify-center bottom-0 right-[-10px]">
              {cartItems.length}
            </span>
            <FiShoppingCart className="text-2xl" />
          </Link>
          {!isMenuOpen ? (
            <button
              className="text-white focus:outline-none"
              onClick={toggleMenu}
            >
              <svg
                className="h-6 w-6 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path
                  fillRule="evenodd"
                  d="M21 18H3a1 1 0 0 1 0-2h18a1 1 0 1 1 0 2zm0-6H3a1 1 0 1 1 0-2h18a1 1 0 1 1 0 2zm0-6H3a1 1 0 0 1 0-2h18a1 1 0 0 1 0 2z"
                />
              </svg>
            </button>
          ) : (
            <AiOutlineCloseCircle
              className="text-white text-2xl"
              onClick={() => setIsMenuOpen(false)}
            />
          )}
        </div>
        <div
          className={`md:flex hidden w-[60%] justify-end 
          `}
        >
          <ul className="md:flex w-[100%] justify-end gap-7 space-x-4">
            <li>
              <Link href="/products" className="text-white hover:text-gray-300">
                Products
              </Link>
            </li>
            <li>
              <Link href="/orders" className="text-white hover:text-gray-300">
                Orders
              </Link>
            </li>
            {!data && (
              <li>
                <Link
                  href="/login"
                  className="text-white text-center hover:text-gray-300"
                >
                  Login
                </Link>
              </li>
            )}
            <li>
              {data && (
                <Link
                  href="/profile"
                  className="text-white hover:text-gray-300 flex items-center gap-2"
                >
                  <CgProfile className="text-xl" />
                  {data && data.name}
                </Link>
              )}
            </li>
            <li>
              <Link
                href="/cart"
                className="text-white text-2xl md:block hidden hover:text-gray-300 relative"
              >
                <span className="absolute text-black h-4 text-[14px] font-semibold mb-4 rounded-full bg-white w-4 flex items-center justify-center bottom-0 right-[-10px]">
                  {cartItems && cartItems.length}
                </span>
                <FiShoppingCart className="text-2xl" />
              </Link>
            </li>
          </ul>
        </div>
        <div
          className={`md:hidden ${
            isMenuOpen ? "flex" : "hidden"
          } absolute top-0  items-center left-0 h-[200px] border-2 border-white mr-18 space-y-2 justify-center w-[95vw]  transition duration-300 ease-out  py-4 bg-slate-800  mt-20  `}
        >
          <ul className="flex flex-col w-full justify-center space-y-6 items-center">
            <li>
              <Link
                href="/products"
                className="text-white text-lg text-center hover:text-gray-300"
              >
                Products
              </Link>
            </li>

            <li>
              <Link
                href="/orders"
                className="text-white text-lg text-center hover:text-gray-300"
              >
                Orders
              </Link>
            </li>
            {!data && (
              <Link
                href="/login "
                className="text-white text-lg text-center hover:text-gray-300"
              >
                Login
              </Link>
            )}
            <li>
              {data && (
                <Link
                  href="/profile"
                  className="text-white  hover:text-gray-300 flex items-center gap-2"
                >
                  <CgProfile className="text-xl" />
                  {data && data.name}
                </Link>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
