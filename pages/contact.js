import Link from 'next/link';
import React from 'react';
import ContactUs from '../components/ContactUs';
import Layout from '../components/Layout';

export default function ContactUsPage() {
  return (
    <Layout>
      <ContactUs />
      <div className="w-full flex justify-center m-auto pt-5">
        <button className="sidebarLinkButton border border-2 border-black hover:focus-cyan-500">
          <Link href={'/search'}>
            <a className="text-black">Browse more Products</a>
          </Link>
        </button>
      </div>
    </Layout>
  );
}
