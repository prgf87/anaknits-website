import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getError } from '../utils/error';
import axios from 'axios';
import Footer from './Footer';
import Navbar from './Navbar';

function Layout({ title, children }) {
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
          <Navbar />
        </header>
        <main className="container md:mt-5 mx-auto md:px-[5%] max-h-max pt-10">
          {children}
        </main>
        <footer className="h-40 md:px-[5%]">
          <Footer />
        </footer>
      </div>
    </div>
  );
}

export default Layout;
