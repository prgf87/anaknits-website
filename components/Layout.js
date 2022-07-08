import React from 'react';
import Head from 'next/head';
import Link from 'next/link';

export default function Layout({ title, children }) {
  return (
    <>
      <Head>
        <title>{title ? title + ' - Anaknits' : 'Anaknits'}</title>
        <meta name="home page" content="Anaknits Website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex min-h-screen flex-col justify-between">
        <header>
          <nav className="flex h-12 item-center px-4 justify-between shawdow-md">
            <Link href="/">
              <a className="text-lg font-bold">Anaknits</a>
            </Link>
            <div>
              <Link href="/cart">
                <a className="p-2">Cart</a>
              </Link>
              <Link href="/login">
                <a className="p-2">Login</a>
              </Link>
            </div>
          </nav>
        </header>
        <main>{children}</main>
        <footer className="flex h-10 justify-center items-center shadow-inner">
          <p>Copyright © Anaknits 2022 </p>
        </footer>
      </div>
    </>
  );
}
