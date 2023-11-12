import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import logo from '../public/images/logov3.png';

export default function MainLogo() {
  return (
    <Link href="/" className="flex w-full">
      <Image src={logo} alt={'/'} width={580} height={100} />
    </Link>
  );
}
