import Link from 'next/link';
import React from 'react';
import Layout from '../components/Layout';

export default function Custom404() {
  return (
    <Layout>
      <div className="flex text-2xl justify-center items-center rounded-full border-4 border-red-500 h-20">
        404 - Page Not Found{' '}
      </div>
      <div className="flex text-2xl justify-center items-center h-10">
        {' '}
        Back to &nbsp;
        <Link href={'/'}>Home Page</Link>
      </div>
    </Layout>
  );
}
