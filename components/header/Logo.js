import Image from 'next/image';
import React from 'react';
import logo from '/react-projects/anaknits-website/public/images/logov3.png';

export default function Logo() {
  return (
    <div className="flex justify-center items-center">
      <Image src={logo} alt="/" height={42.5} width={213} />
    </div>
  );
}
