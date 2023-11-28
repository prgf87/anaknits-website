import Link from 'next/link';
import React from 'react';
import ContactUs from '../components/ContactUs';
import Layout from '../components/Layout';

export default function ContactUsPage() {
  return (
    <Layout>
      <ContactUs />
      <div className="w-full flex justify-center m-auto pt-5">
        <button className="sidebarLinkButton border-2 border-black hover:focus-cyan-500">
          <Link href={'/search'} className="text-black">
            Browse more Products
          </Link>
        </button>
      </div>
    </Layout>
  );
}
