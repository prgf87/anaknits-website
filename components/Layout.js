import React from "react";
import Head from "next/head";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Footer from "./footer";
import Navbar from "./Navbar";

function Layout({ title, children }) {
  return (
    <>
      <Head>
        <title>{title ? title + " - Anaknits" : "Anaknits"}</title>
        <meta name="home page" content="Anaknits Website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <ToastContainer position="top-center" limit={1} />

      <>
        <header>
          <Navbar />
        </header>
        <main className="container mx-auto md:px-[0.5%] max-h-max pt-8">
          {children}
        </main>
        <footer className="md:px-[0.5%]">
          <Footer />
        </footer>
      </>
    </>
  );
}

export default Layout;
