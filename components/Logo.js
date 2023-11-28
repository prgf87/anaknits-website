import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import logo from './../public/images/logov3.png';

export default function Logo() {
  return (
    <Link href={'/'} className="flex justify-center items-center">
      <Image src={logo} alt="/" height={42.5} width={213} />
    </Link>
  );
}
