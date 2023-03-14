import Link from 'next/link';
import React from 'react';

export default function SearchBar() {
  return (
    <div className="py-1 hidden md:block shadow-md">
      <ul className="flex md:space-x-4 lg:space-x-20 justify-center items-center">
        <li className="text-lg text-gray-500 cursor-pointer hover:brightness-50">
          <Link href={'/'}>Home</Link>
        </li>
        <li className="text-lg text-gray-500 cursor-pointer hover:brightness-50">
          <Link href={`/search?category%3Fbabyknits=&category=Baby+Knits`}>
            Baby Knits
          </Link>
        </li>
        <li className="text-lg text-gray-500 cursor-pointer hover:brightness-50">
          <Link href={`/search?category%3Fkidknits=&category=Kid+Knits`}>
            Kid Knits
          </Link>
        </li>
        <li className="text-lg text-gray-500 cursor-pointer hover:brightness-50">
          <Link
            href={`/search?category%3Fkidknits=&category=Blankets+%26+Socks`}
          >
            Blankets &amp; Socks
          </Link>
        </li>
        <li className="text-lg text-gray-500 cursor-pointer hover:brightness-50">
          <Link href={`/search?category%3Fkidknits=&category=Knit+Kits`}>
            Knit Kits
          </Link>
        </li>
        <li className="text-lg text-gray-500 cursor-pointer hover:brightness-50">
          <Link href={`/search?category%3Fkidknits=&category=Patterns`}>
            Patterns
          </Link>
        </li>
        <li className="text-lg text-gray-500 cursor-pointer hover:brightness-50">
          <Link href={'/search?category%3Fyarns=&category=Yarns'}>Yarns</Link>
        </li>
        <li className="text-lg text-gray-500 cursor-pointer hover:brightness-50">
          <Link href={'/contact'}>Contact Us</Link>
        </li>
      </ul>
    </div>
  );
}
