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
import facebook from '../public/images/facebookicon2.png';
import instagram from '../public/images/instaicon2.png';
import whatsapp from '../public/images/whatsappicon2.png';
import email from '../public/images/emailicon.png';
import { getError } from '../utils/error';
import axios from 'axios';
import { useRouter } from 'next/router';
import Footer from '../components/Footer';
import SearchBar from '../components/SearchBar';
import MainLogo from './MainLogo';

function Layout({ title, children }) {
  const { status, data: session } = useSession();

  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  const [cartItemsCount, setCartItemsCount] = useState(0);
  useEffect(() => {
    setCartItemsCount(cart.cartItems.reduce((a, c) => a + c.quantity, 0));
  }, [cart.cartItems]);

  const router = useRouter();

  const logoutClickHandler = () => {
    Cookies.remove('cart');

    dispatch({ type: 'CART_RESET' });
    signOut({ callbackUrl: '/login' });
  };

  const [open, setOpen] = useState(false);

  if (typeof document !== 'undefined') {
    const body = document.querySelector('body');
    if (open === true) {
      body.style.overflow = 'hidden';
    } else body.style.overflow = 'auto';
  }

  // eslint-disable-next-line no-unused-vars
  const [categories, setCategories] = useState([]);
  const fetchCategories = async () => {
    try {
      const { data } = await axios.get(`/api/products/categories`);
      setCategories(data);
    } catch (err) {
      toast.error(getError(err));
    }
  };
  useEffect(() => {
    fetchCategories();
  }, []);

  const [query, setQuery] = useState('');
  const queryChangeHandler = (e) => {
    setQuery(e.target.value);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    router.push(`/search?query=${query}`);
  };

  return (
    <div>
      <Head>
        <title>{title ? title + ' - Anaknits' : 'Anaknits'}</title>
        <meta name="home page" content="Anaknits Website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ToastContainer position="top-center" limit={1} />
      <div>
        <header>
          <nav>
            <div className="topHeader flex px-1 py-1 pb- 1 justify-between">
              <div className={`sidebarIcon z-50 p-0`}>
                <button onClick={() => setOpen(!open)}>
                  <Image src={hamicon} alt={Menu} height={34} width={34} />
                </button>
              </div>
              <div>
                <div className="searchSection hidden md:block md:pl-[125px]">
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

              <div>
                <Link href="/cart">
                  <a className="text-gray-500 p-2 hover:brightness-50">
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
                  <Menu
                    as="div"
                    className="relative inline-block z-10 hidden md:inline-block"
                  >
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
                    <a className="p-2 hidden md:inline-block">Login</a>
                  </Link>
                )}
              </div>
            </div>
            <div id="sidebar">
              <div
                id="bgBlur"
                onClick={() => setOpen(!open)}
                className={`absolute top-0 left-0 bg-black z-10 h-full w-full overscroll-hidden fixed ${
                  open ? 'opacity-70' : 'opacity-0 scale-0'
                } transition-opacity ease-in-out duration-300`}

              ></div>
              <div
                id="sidebarBg"
                className={`absolute z-10 top-0 left-0 bg-white h-full ${
                  open
                    ? 'w-full opacity-100 md:w-4/12 lg:w-3/12 overscroll-hidden fixed'
                    : 'w-0 opacity-0'
                } transition-opacity ease-in-out duration-300`}
              >
                <div
                  className={`flex flex-col justify-center items-center pl-3 pt-0.5 ${
                    open ? 'shadow-md' : 'shadow-none'
                  } ease-in-out duration-300`}
                >
                  <div
                    className={`z-10 ${

                      open ? 'opacity-100' : ' opacity-0'
                    } transition-opacity ease-in-out duration-300`}

                  >
                    <Image src={logo} alt={'/'} height={35} width={185} />
                  </div>
                </div>

                <table className="w-full">
                  <tbody
                    className={`grid grid-cols-1 gap-3 p-3 place-items-center shadow-sm ${
                      open
                        ? 'opacity-100 w-full'
                        : 'opacity-0 w-0 scale-0 hidden'
                    } transition-opacity ease-in-out duration-1000`}
                  >
                    <tr>
                      <td>
                        <button className="sidebarLinkButton">
                          <Link href={'/'}>
                            <a onClick={() => setOpen(!open)}>Home</a>
                          </Link>
                        </button>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <button className="sidebarLinkButton">
                          <Link href={`/search`}>
                            <a onClick={() => setOpen(!open)}>Product Search</a>
                          </Link>
                        </button>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <button className="sidebarLinkButton">
                          <Link href={'/contact'}>
                            <a onClick={() => setOpen(!open)}>Contact Us</a>
                          </Link>
                        </button>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <button className="sidebarLinkButton">
                          <Link href={'/login'}>
                            <a onClick={() => setOpen(!open)}>Login</a>
                          </Link>
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <table className="w-full">
                  <thead
                    className={`grid grid-cols-1 gap-3 px-5 pt-3 place-items-center ${
                      open ? 'opacity-100' : 'opacity-0 scale-0 hidden'
                    } transition-opacity ease-in-out duration-300`}
                  >
                    <tr>
                      <td>
                        <h1 className="p-0">Product Categories</h1>
                      </td>
                    </tr>
                  </thead>
                  <tbody
                    className={`grid grid-cols-1 gap-3 p-3 w-full place-items-center shadow-sm ${
                      open ? 'opacity-100' : 'opacity-0 scale-0 hidden'
                    } transition-opacity ease-in-out duration-300`}
                  >
                    <tr>
                      <td>
                        <button className="sidebarLinkButton">
                          <Link
                            href={`/search?category%3Fbabyknits=&category=Baby+Knits`}
                          >
                            <a onClick={() => setOpen(!open)}>Baby Knits</a>
                          </Link>
                        </button>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <button className="sidebarLinkButton">
                          <Link
                            href={`/search?category%3Fbabyknits=&category=Kid+Knits`}
                          >
                            <a onClick={() => setOpen(!open)}>Kid Knits</a>
                          </Link>
                        </button>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <button className="sidebarLinkButton">
                          <Link
                            href={`/search?category%3Fkidknits=&category=Blankets+%26+Socks`}
                          >
                            <a onClick={() => setOpen(!open)}>
                              Blankets &amp; Socks
                            </a>
                          </Link>
                        </button>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <button className="sidebarLinkButton">
                          <Link
                            href={`/search?category%3Fknitkits=&category=Knit+Kits`}
                          >
                            <a onClick={() => setOpen(!open)}>Knit Kits</a>
                          </Link>
                        </button>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <button className="sidebarLinkButton">
                          <Link
                            href={`/search?category%3Fpatterns=&category=Patterns`}
                          >
                            <a onClick={() => setOpen(!open)}>Patterns</a>
                          </Link>
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div
                  className={`bottom-20 h-40 z-10 ${
                    open ? 'opactity-70' : 'opacity-0'
                  } transition-opacity`}
                >
                  <div className="p-7 md:p-0 md:px-7 md:pt-3">
                    <div className="max-w-7xl mx-auto">
                      <div className="grid grid-cols-1 gap-2">
                        <div className="mb-5 md:mb-0">
                          <h4 className="font-bold text-xs lg:text-lg pb-2 flex justify-center">
                            Check Out Our Socials
                          </h4>
                          <p className="text-xs lg:text-sm italic flex justify-center">
                            Come and say hello over on our social media pages:
                            Facebook, Instagram, send us a message on WhatsApp
                            or even send us an email!
                          </p>
                          <div className="w-full">
                            <div className="flex gap-3 p-2 pr-1 justify-evenly place-items-center">
                              <Link
                                href={'https://facebook.com/anaknits'}
                                target="_blank"
                              >
                                <a onClick={() => setOpen(!open)}>
                                  <Image
                                    Link
                                    src={facebook}
                                    alt="/"
                                    width={25}
                                    height={25}
                                  />
                                </a>
                              </Link>
                              <Link
                                href={'https://instagram.com/anaknits'}
                                target="_blank"
                              >
                                <a onClick={() => setOpen(!open)}>
                                  <Image
                                    src={instagram}
                                    alt="/"
                                    width={25}
                                    height={25}
                                  />
                                </a>
                              </Link>
                              <Link
                                href={'https://whatsapp.com/anaknits'}
                                target="_blank"
                              >
                                <a onClick={() => setOpen(!open)}>
                                  <Image
                                    src={whatsapp}
                                    alt="/"
                                    width={25}
                                    height={25}
                                  />
                                </a>
                              </Link>
                              <Link
                                href={
                                  'mailto:info@anaknits.com?body=Hi Ana, this is my question...'
                                }
                                target="_blank"
                              >
                                <a onClick={() => setOpen(!open)}>
                                  <Image
                                    src={email}
                                    alt="/"
                                    width={25}
                                    height={20}
                                  />
                                </a>
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
            <div className="flex flex-col justify-center items-center">
              <div className="px-10 lg:px-5 md:px-20">
                <MainLogo />
              </div>
            </div>
            <SearchBar />
          </nav>
        </header>


        <main className="container p-0 m-0 md:my-5 md:mx-auto lg:mx-auto px-[5%] md:px-[7%] lg:px-[10%] min-h-[600px] pt-3">
          {children}
        </main>
        <footer className="h-40 px-[5%] md:px-[10%]">

          <Footer />
        </footer>
      </div>
    </div>
  );
}
export default Layout;
