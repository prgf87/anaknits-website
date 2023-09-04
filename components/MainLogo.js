import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import logo from '../public/images/logov3.png';

export default function MainLogo() {
  return (
    <Link href="/">
      <a className="mainlogo flex w-full px-[5%] md:px-[17.5%] lg:px-0 md:mb-0">
        <Image src={logo} alt={'/'} width={580} height={100} />
      </a>
    </Link>
  );
}
