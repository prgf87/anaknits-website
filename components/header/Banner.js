import Image from 'next/image';
import React from 'react';

function Banner() {
  return (
    <div className="relative h-[80px] overflow-hidden">
      <Image
        src={'/images/sock-blue-1.jpg'}
        alt="/"
        width={3605}
        height={681}
        className="z-0"
        priority
      />
      <div className="absolute bg-black/70 left-0 top-0 right-0 bottom-0 h-[80px] z-10 flex justify-center items-center">
        <a href="#newsletter" className="text-white text-4xl">
          Sign up to our Newsletter!
        </a>
      </div>
    </div>
  );
}

export default Banner;
