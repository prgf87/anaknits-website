import React, { useContext, useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { ToastContainer, toast } from 'react-toastify';
import { Store } from '../utils/Store';
import { signOut, useSession } from 'next-auth/react';
import 'react-toastify/dist/ReactToastify.css';
import { Menu } from '@headlessui/react';
import DropdownLink from './DropdownLink';
import Cookies from 'js-cookie';
import Image from 'next/image';
import logo from '../public/images/logov3.png';
import hamicon from '../public/images/hamicon.png';
import { ChevronRightIcon } from '@heroicons/react/solid';
import facebook from '../public/images/facebookicon.png';
import instagram from '../public/images/instaicon.png';
import whatsapp from '../public/images/whatsappicon.png';
import email from '../public/images/emailicon.png';
import axios from 'axios';
import { getError } from '../utils/error';

function Layout({ title, children }) {
  const { status, data: session } = useSession();

  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  const [cartItemsCount, setCartItemsCount] = useState(0);
  useEffect(() => {
    setCartItemsCount(cart.cartItems.reduce((a, c) => a + c.quantity, 0));
  }, [cart.cartItems]);

  const logoutClickHandler = () => {
    Cookies.remove('cart');

    dispatch({ type: 'CART_RESET' });
    signOut({ callbackUrl: '/login' });
  };

  const [open, setOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const fetchCategories = async () => {
    try {
      const { data } = axios.get(`/api/products/categories`);
      setCategories(data);
    } catch (err) {
      toast.error(getError(err));
    }
  };
  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div>
      <Head>
        <title>{title ? title + ' - Anaknits' : 'Anaknits'}</title>
        <meta name="home page" content="Anaknits Website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ToastContainer position="bottom-center" limit={1} />
      <div>
        <header>
          <nav>
            <div className="topHeader flex px-1 py-1 justify-between">
              <div className="sidebarIcon z-50 p-0 bg-white">
                <button onClick={() => setOpen(!open)}>
                  <Image src={hamicon} alt={Menu} height={34} width={34} />
                </button>
              </div>

              <div>
                <Link href="/cart">
                  <a className="text-blue-600 p-2 hover:text-blue-100 hover:bg-blue-600 hover:rounded-full">
                    Cart
                    {cartItemsCount > 0 && (
                      <span className="ml-1 rounded-full bg-blue-500 px-2 py-1 text-xs font-bold text-white">
                        {cartItemsCount}
                      </span>
                    )}
                  </a>
                </Link>

                {status === 'loading' ? (
                  'Loading'
                ) : session?.user ? (
                  <Menu as="div" className="relative inline-block z-10">
                    <Menu.Button className="text-blue-600 p-2 hover:text-blue-100 hover:bg-blue-600 hover:rounded-full">
                      {session.user.name}
                    </Menu.Button>
                    <Menu.Items className="absolute right-0 w-56 origin-top-right  bg-white shadow-lg">
                      <Menu.Item>
                        <DropdownLink className="dropdown-link" href="/profile">
                          Profile
                        </DropdownLink>
                      </Menu.Item>
                      <Menu.Item>
                        <DropdownLink
                          className="dropdown-link"
                          href="/order-history"
                        >
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
                        <a
                          className="dropdown-link"
                          href="#"
                          onClick={logoutClickHandler}
                        >
                          Logout
                        </a>
                      </Menu.Item>
                    </Menu.Items>
                  </Menu>
                ) : (
                  <Link href="/login">
                    <a className="p-2">Login</a>
                  </Link>
                )}
              </div>
            </div>
            <div id="sidebar" className="">
              <div
                id="bgBlur"
                className={`absolute top-0 left-0 bg-black z-10 h-full w-full overflow-hidden   ${
                  open
                    ? 'transition-opacity ease-in-out opacity-70'
                    : 'transition-opacity ease-in-out opacity-0, hidden'
                } ease-in-out duration-500`}
              ></div>
              <div
                id="sidebarBg"
                className={`absolute z-10 top-0 left-0 bg-white h-full ${
                  open ? 'w-4/12' : 'w-0'
                } ease-in-out duration-500`}
              >
                <div
                  className={`flex flex-col justify-center items-center p-1 ${
                    open ? 'shadow-md' : 'shadow-none'
                  } ease-in-out duration-500`}
                >
                  <div
                    className={`z-10 ${
                      open ? 'duration-500' : 'transition-opacity opacity-0'
                    } ease-in-out duration-300`}
                  >
                    <Image src={logo} alt={'/'} height={35} width={185} />
                  </div>
                </div>
                <ul
                  className={`z-10 ${
                    open ? '' : 'hidden'
                  } ease-in-out duration-500`}
                >
                  <li>Home</li>
                  <li>Category</li>
                  <li>Contact Us</li>
                  <li>User Profile</li>
                </ul>
                <footer
                  className={`absolute bottom-20 h-40 z-10 ${
                    open ? '' : 'transition-opacity opacity-0 duration-100'
                  } ease-in-out duration-500`}
                >
                  <div className="p-10">
                    <div className="max-w-7xl mx-auto">
                      <div className="grid grid-cols-1 gap-2">
                        <div className="mb-5">
                          <h4 className="font-bold text pb-4">
                            Check Out Our Socials
                          </h4>
                          <p className="text-sm italic">
                            Come and say hello over on Instagram, Facebook or
                            send us as email!
                          </p>
                          <div className="flex pt-2 ">
                            <div className="pr-1">
                              <Image
                                src={facebook}
                                alt="/"
                                width={25}
                                height={25}
                              />
                            </div>
                            <div className="pr-2">
                              <Image
                                src={instagram}
                                alt="/"
                                width={25}
                                height={25}
                              />
                            </div>
                            <div className="pr-1">
                              <Image
                                src={whatsapp}
                                alt="/"
                                width={25}
                                height={25}
                              />
                            </div>
                            <div className="pr-1">
                              <Image
                                src={email}
                                alt="/"
                                width={35}
                                height={35}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </footer>
              </div>
            </div>
            <div className="flex flex-col justify-center items-center">
              <div className="px-10 lg:px-5 md:px-20">
                <Link href="/">
                  <a className="flex w-full ">
                    <Image src={logo} alt={'/'} width={880} height={160} />
                  </a>
                </Link>
              </div>
            </div>
            <div className="py-5 hidden md:block">
              <ul className="flex md:space-x-4 lg:space-x-20 justify-center items-center">
                <li className="text-sm text-gray-500 cursor-pointer hover:brightness-50">
                  Home
                </li>

                <li className="text-sm text-gray-500 cursor-pointer hover:brightness-50">
                  Baby Knits
                </li>
                <li className="text-sm text-gray-500 cursor-pointer hover:brightness-50">
                  Kid Knits
                </li>
                <li className="text-sm text-gray-500 cursor-pointer hover:brightness-50">
                  Blanket & Socks
                </li>
                <li className="text-sm text-gray-500 cursor-pointer hover:brightness-50">
                  Knit Kits
                </li>
                <li className="text-sm text-gray-500 cursor-pointer hover:brightness-50">
                  Patterns
                </li>
                <li className="text-sm text-gray-500 cursor-pointer hover:brightness-50">
                  Contact Us
                </li>
              </ul>
            </div>
          </nav>
        </header>
        <main className="container m-auto mt-4 px-20">{children}</main>
        <footer className="h-40">
          <div className="p-10">
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
                <div className="mb-5">
                  <h4 className="font-bold text-2xl pb-4">Anaknits</h4>
                  <p className="text-gray-500">
                    <strong>Phone: </strong>
                    +1 234-567-891 <br></br>
                    <strong>Email: </strong>ana@anaknits.com <br></br>
                  </p>
                </div>
                <div className="mb-5">
                  <h4 className="font-bold text-2xl pb-4">Useful Links</h4>
                  <ul className="text-gray-500">
                    <li className="flex cursor-pointer">
                      <ChevronRightIcon className="h-5 w-5 pt-1 text-blue-500 " />
                      <p className="hover:brightness-50">Home</p>
                    </li>
                    <li className="flex cursor-pointer">
                      <ChevronRightIcon className="h-5 w-5 pt-1 text-blue-500 " />
                      <p className="hover:brightness-50">About us</p>
                    </li>
                    <li className="flex cursor-pointer">
                      <ChevronRightIcon className="h-5 w-5 pt-1 text-blue-500 " />
                      <p className="hover:brightness-50">FAQ</p>
                    </li>
                    <li className="flex cursor-pointer">
                      <ChevronRightIcon className="h-5 w-5 pt-1 text-blue-500 " />
                      <p className="hover:brightness-50">Terms of Services</p>
                    </li>
                    <li className="flex cursor-pointer">
                      <ChevronRightIcon className="h-5 w-5 pt-1 text-blue-500 " />
                      <p className="hover:brightness-50">Privacy policy</p>
                    </li>
                  </ul>
                </div>
                <div className="mb-5">
                  <h4 className="font-bold text-2xl pb-4">Services</h4>
                  <ul className="text-gray-500">
                    <li className="flex  cursor-pointer">
                      <ChevronRightIcon className="h-5 w-5 pt-1 text-blue-500 " />
                      <p className="hover:brightness-50">Contact Us</p>
                    </li>
                    <li className="flex cursor-pointer">
                      <ChevronRightIcon className="h-5 w-5 pt-1 text-blue-500 " />
                      <p className="hover:brightness-50">Returns Policy</p>
                    </li>
                    <li className="flex cursor-pointer">
                      <ChevronRightIcon className="h-5 w-5 pt-1 text-blue-500 " />
                      <p className="hover:brightness-50">Shipping Policy</p>
                    </li>
                  </ul>
                </div>
                <div className="mb-5">
                  <h4 className="font-bold text-2xl pb-4">
                    Check Out Our Socials
                  </h4>
                  <p className="italic">
                    Come and say hello over on Instagram, Facebook or send us as
                    email!
                  </p>
                  <div className="flex pt-2 ">
                    <div className="pr-1">
                      <Image src={facebook} alt="/" width={25} height={25} />
                    </div>
                    <div className="pr-2">
                      <Image src={instagram} alt="/" width={25} height={25} />
                    </div>
                    <div className="pr-1">
                      <Image src={whatsapp} alt="/" width={25} height={25} />
                    </div>
                    <div className="pr-1">
                      <Image src={email} alt="/" width={35} height={35} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default Layout;
