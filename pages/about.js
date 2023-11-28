import React from 'react';
import Link from 'next/link';
import Layout from '../components/Layout';

export default function AboutUsPage() {
  return (
    <Layout>
      <h1 className="font-bold text-xl py-2">About Us</h1>
      <h2 className="font-bold text-lg">Our Mission Statement</h2>
      <p>Ipsom Lorum blal labh labh</p>
      <h2 className="font-bold text-lg">Why We do This</h2>
      <p>Ipsom Lorum blal labh labh</p>
      <h2 className="font-bold text-lg">Who we Are</h2>
      <p>Ipsom Lorum blal labh labh</p>
      <h1 className="font-bold text-xl py-2">Contact Us</h1>
      <p>
        If you have any questions about these Terms and Conditions, You can
        contact us:
      </p>
      <ul>
        <li>
          <p>By email: info@anaknits.com</p>
        </li>
        <li>
          <p>
            By visiting this page on our website:{' '}
            <Link
              href="https://www.anaknits.com/contact"
              rel="external nofollow noopener noreferrer"
              target="_blank"
            >
              https://www.anaknits.com/contact
            </Link>
          </p>
        </li>
      </ul>
    </Layout>
  );
}
