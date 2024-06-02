import Link from 'next/link';
import React from 'react';

export default function SearchBar() {
  return (
    <div className="pt-24 pb-2 hidden md:block shadow-md">
      <ul className="flex md:space-x-4 lg:space-x-20 justify-center items-center">
        <li className="text-lg text-gray-500 cursor-pointer hover:brightness-50">
          <Link href={'/'}>Home</Link>
        </li>
        <li className="text-lg text-gray-500 cursor-pointer hover:brightness-50">
          <Link href={`/search?category=accessories`}>Accessories</Link>
        </li>
        <li className="text-lg text-gray-500 cursor-pointer hover:brightness-50">
          <Link href={`/search?category=Magazines`}>Magazines</Link>
        </li>
        <li className="text-lg text-gray-500 cursor-pointer hover:brightness-50">
          <Link href={`/search?category=Knit+Kits`}>Knit Kits</Link>
        </li>
        <li className="text-lg text-gray-500 cursor-pointer hover:brightness-50">
          <Link href={'/search?category=Yarns'}>Yarns</Link>
        </li>
        <li className="text-lg text-gray-500 cursor-pointer hover:brightness-50">
          <Link href="/gallery">Gallery</Link>
        </li>
        <li className="text-lg text-gray-500 cursor-pointer hover:brightness-50">
          <Link href={'/contact'}>Contact Us</Link>
        </li>
      </ul>
    </div>
  );
}
