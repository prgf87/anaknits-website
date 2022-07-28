import React, { useContext, useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { ToastContainer } from 'react-toastify';
import { Store } from '../utils/Store';
import { signOut, useSession } from 'next-auth/react';
import 'react-toastify/dist/ReactToastify.css';
import { Menu } from '@headlessui/react';
import DropdownLink from './DropdownLink';
import Cookies from 'js-cookie';
import Image from 'next/image';
import logo from '../public/images/logov3.png';
import { ChevronRightIcon } from '@heroicons/react/solid';
import facebook from '../public/images/facebookicon.png';
import instagram from '../public/images/instaicon.png';
import whatsapp from '../public/images/whatsappicon.png';
import email from '../public/images/emailicon.png';

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

  return (
    <>
      <Head>
        <title>{title ? title + ' - Anaknits' : 'Anaknits'}</title>
        <meta name="home page" content="Anaknits Website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ToastContainer position="bottom-center" limit={1} />
      <div className="flex min-h-screen flex-col justify-between">
        <header>
          <nav className="flex h-50 item-center px-4 justify-between shawdow-md pt-4">
            <div className="w-auto h-auto mx-auto">
              <Link href="/">
                <a>
                  <Image src={logo} alt={'/'} width={600} height={200} />
                </a>
              </Link>
            </div>
            <div>
              <Link href="/cart">
                <a className="p-2">
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
                <Menu as="div" className="relative inline-block">
                  <Menu.Button className="text-blue-600">
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
          </nav>
          <div className="pb-5">
            <ul className="flex pl-20 pr-20">
              <li className="p-0.5 mx-auto text-gray-500 cursor-pointer hover:brightness-50">
                Home
              </li>

              <li className="p-0.5 mx-auto text-gray-500 cursor-pointer hover:brightness-50">
                Baby Knits
              </li>
              <li className="p-0.5 mx-auto text-gray-500 cursor-pointer hover:brightness-50">
                Kid Knits
              </li>
              <li className="p-0.5 mx-auto text-gray-500 cursor-pointer hover:brightness-50">
                Blanket & Socks
              </li>
              <li className="p-0.5 mx-auto text-gray-500 cursor-pointer hover:brightness-50">
                Knit Kits
              </li>
              <li className="p-0.5 mx-auto text-gray-500 cursor-pointer hover:brightness-50">
                Patterns
              </li>
              <li className="p-0.5 mx-auto text-gray-500 cursor-pointer hover:brightness-50">
                Contact Us
              </li>
            </ul>
          </div>
        </header>
        <main className="container m-auto mt-4 px-20">{children}</main>
        <footer className="h-40">
          <div className="p-10">
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
                <div className="mb-5">
                  <h4 className="font-bold text-2xl pb-4">Anaknits</h4>
                  <p className="text-gray-500">
                    123 Test Street <br></br>
                    USA, Georgia 1234 <br></br>
                    America <br></br>
                    <strong>Phone: </strong>
                    +1234 567 891 <br></br>
                    <strong>Email: </strong>test@anaknits.com <br></br>
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
    </>
  );
}

export default Layout;
