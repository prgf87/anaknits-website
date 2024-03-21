import React from "react";
import Link from "next/link";
import "react-toastify/dist/ReactToastify.css";
import { Menu } from "@headlessui/react";
import DropdownLink from "./DropdownLink";
import Image from "next/image";
import logo from "../public/images/logov3.png";
import hamicon from "../public/images/hamicon.png";
import facebook from "../public/images/facebookicon2.png";
import instagram from "../public/images/instaicon2.png";
import whatsapp from "../public/images/whatsappicon2.png";
import email from "../public/images/emailicon2.png";
import SearchBar from "./SearchBar";
import { signOut, useSession } from "next-auth/react";
import { useContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import { Store } from "../utils/Store";
import axios from "axios";
import { toast } from "react-toastify";
import { getError } from "../utils/error";
import MainLogo from "./MainLogo";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { status, data: session } = useSession();

  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  const [cartItemsCount, setCartItemsCount] = useState(0);

  const [query, setQuery] = useState("");

  const router = useRouter();

  useEffect(() => {
    fetchCategories();
    setCartItemsCount(cart.cartItems.reduce((a, c) => a + c.quantity, 0));
  }, [cart.cartItems]);

  const logoutClickHandler = () => {
    Cookies.remove("cart");

    dispatch({ type: "CART_RESET" });
    signOut({ callbackUrl: "/login" });
  };

  if (typeof document !== "undefined") {
    const body = document.querySelector("body");
    if (open === true) {
      body.style.overflow = "hidden";
    } else body.style.overflow = "auto";
  }

  const [categories, setCategories] = useState([]);

  const fetchCategories = async () => {
    try {
      const { data } = await axios.get(`/api/products/categories`);
      setCategories(data);
    } catch (err) {
      toast.error(getError(err));
    }
  };

  const queryChangeHandler = (e) => {
    setQuery(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    router.push(`/search?query=${query}`);
  };

  return (
    <nav>
      <div className="topHeader flex px-1 py-1 justify-between">
        <div className={`sidebarIcon z-50 p-0 ml-1`}>
          <button onClick={() => setOpen(!open)} className="h-8 w-8">
            <Image src={hamicon} alt={Menu} height={32} width={32} />
          </button>
        </div>

        <div className="absolute left-0 top-4 right-0">
          <div className="flex flex-col justify-center items-center">
            <div className="px-10 lg:px-5 md:px-20">
              <Link
                href="/"
                className="mainlogo flex w-full px-[17.5%] mb-2 md:mb-0"
              >
                <Image src={logo} alt={"/"} width={580} height={100} />
              </Link>
            </div>
          </div>
          <div>
            <div className="searchSection w-full hidden md:flex justify-center mt-2 py-2">
              <form onSubmit={submitHandler} className="searchForm px-5">
                <input
                  name="query"
                  className="searchInput pl-5"
                  placeholder="Search Products"
                  onChange={queryChangeHandler}
                />
                <button
                  type="submit"
                  className="submitButton searchIcon"
                  aria-label="search"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-10 w-10 mt-3 ml-3 inline-block text-blue-500"
                    fill="none"
                    viewBox="0 0 42 42"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </button>
              </form>
            </div>
          </div>
        </div>

        <div className="flex">
          <Link href="/cart" className="text-gray-500 p-2 mr-2">
            <div className="h-8 w-8">
              <svg
                fill="none"
                stroke="currentColor"
                strokeWidth={1.5}
                viewBox="0 0 32 32"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                />
              </svg>
            </div>
            {cartItemsCount > 0 && (
              <span className="absolute top-3 ml-7 rounded-full bg-blue-500/90 px-2 py-1 text-[0.65rem] font-bold text-white">
                {cartItemsCount}
              </span>
            )}
          </Link>

          {status === "loading" ? (
            "Loading"
          ) : session?.user ? (
            <Menu as="div" className="relative pl-3 z-1 hidden md:inline-block">
              <Menu.Button className="text-gray-500 p-2 hover:brightness-50">
                {session.user.name}
              </Menu.Button>
              <Menu.Items className="absolute right-0 w-56 origin-top-right  bg-white shadow-lg">
                <Menu.Item>
                  <DropdownLink className="dropdown-link" href="/profile">
                    Profile
                  </DropdownLink>
                </Menu.Item>
                <Menu.Item>
                  <DropdownLink className="dropdown-link" href="/order-history">
                    Order History
                  </DropdownLink>
                </Menu.Item>
                {session.user.isAdmin && (
                  <Menu.Item>
                    <DropdownLink
                      className="dropdown-link"
                      href="/admin/dashboard"
                    >
                      Admin Dashboard
                    </DropdownLink>
                  </Menu.Item>
                )}
                <Menu.Item>
                  <Link
                    className="dropdown-link"
                    href="#"
                    onClick={logoutClickHandler}
                  >
                    Logout
                  </Link>
                </Menu.Item>
              </Menu.Items>
            </Menu>
          ) : (
            <Link href="/login" className="p-2 hidden md:inline-block">
              Login
            </Link>
          )}
        </div>
      </div>

      <div id="sidebar">
        <div
          id="bgBlur"
          onClick={() => {
            if (open) setOpen(!open);
          }}
          className={`absolute top-0 left-0 bg-black/60 z-[1] overscroll-hidden ${
            open
              ? "transition-all ease-in-out left-0 opacity-100 h-screen w-screen"
              : "transition-all ease-in-out left-[-100%] w-0"
          } ease-in-out duration-1000 opacity-0`}
        >
          <div className="z-[2] w-screen md:w-1/2 lg:w-1/3 xl:w-1/4 bg-white h-screen">
            <div className="grid mx-20 pt-10">
              <MainLogo />
              <table className="w-full">
                <tbody className="grid grid-cols-1 gap-3 p-3 pt-8 place-items-center shadow-sm">
                  <tr>
                    <td>
                      <button className="sidebarLinkButton">
                        <Link href={"/"} onClick={() => setOpen(!open)}>
                          Home
                        </Link>
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <button className="sidebarLinkButton">
                        <Link href={`/search`} onClick={() => setOpen(!open)}>
                          Product Search
                        </Link>
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <button className="sidebarLinkButton">
                        <Link href={"/contact"} onClick={() => setOpen(!open)}>
                          Contact Us
                        </Link>
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <button className="sidebarLinkButton">
                        <Link href={"/login"} onClick={() => setOpen(!open)}>
                          Login
                        </Link>
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
              <table className="w-full">
                <thead
                  className={`grid grid-cols-1 gap-3 px-5 pt-3 place-items-center`}
                >
                  <tr>
                    <td>
                      <h1 className="font-bold text-lg lg:text-lg p-0 flex justify-center">
                        Product Categories
                      </h1>
                    </td>
                  </tr>
                </thead>
                <tbody className="grid grid-cols-1 gap-3 p-3 w-full place-items-center shadow-sm">
                  {categories.map((cat, i) => {
                    return (
                      <tr key={i}>
                        <td>
                          <button className="sidebarLinkButton">
                            <Link href={`search?${cat}`}>{cat}</Link>
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>

              <div className={`bottom-20 h-40 z-10`}>
                <div className="p-7 md:p-0 md:px-7 md:pt-3">
                  <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 gap-2">
                      <div className="mb-5 md:mb-0">
                        <h4 className="font-bold text-lg lg:text-lg pb-2 flex justify-center">
                          Check Out Our Socials
                        </h4>
                        <p className="text-sm lg:text-sm italic flex text-center">
                          Come and say hello over on our social media pages on
                          Facebook or Instagram. You can also send us a message
                          on WhatsApp or even an email!
                        </p>
                        <div className="w-full">
                          <div className="flex gap-3 p-2 pr-1 justify-evenly place-items-center">
                            <Link
                              href={"https://facebook.com/anaknits"}
                              target="_blank"
                              onClick={() => setOpen(!open)}
                            >
                              <Image
                                Link
                                src={facebook}
                                alt="/"
                                width={25}
                                height={25}
                              />
                            </Link>
                            <Link
                              href={"https://instagram.com/anaknits"}
                              target="_blank"
                            >
                              <Image
                                src={instagram}
                                alt="/"
                                width={25}
                                height={25}
                              />
                            </Link>
                            <Link
                              href={"https://whatsapp.com/anaknits"}
                              target="_blank"
                            >
                              <Image
                                src={whatsapp}
                                alt="/"
                                width={25}
                                height={25}
                              />
                            </Link>
                            <Link
                              href={
                                "mailto:info@anaknits.com?body=Hi Ana, this is my question..."
                              }
                              target="_blank"
                            >
                              <Image
                                src={email}
                                alt="/"
                                width={35}
                                height={35}
                              />
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="py-3 hidden md:block">
        <SearchBar />
      </div>
    </nav>
  );
}
