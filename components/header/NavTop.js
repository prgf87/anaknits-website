import Image from 'next/image';
import React from 'react';
import { useState } from 'react';
import Link from 'next/link';
import UserMenu from './UserMenu';
import { useSession, signIn, signOut } from 'next-auth/react';

function NavTop() {
  const [open, setOpen] = useState(false);
  const { data: session } = useSession();

  return (
    <div className="bg-[#f8f8f8] border-t-[#eee] border-b-[#eee] shadow-md flex justify-between text-base py-2 pr-5">
      <div className="mt-1"></div>
      <div className="flex justify-center items-center text-gray-500">
        <ul className="flex justify-center items-center space-x-2">
          <li className="flex justify-center items-center hover:text-gray-900 hover:underline cursor-pointer">
            <Image src={'/images/us.png'} height={28} width={28} alt="" />

            <span className="ml-1">United States</span>
            <div className="relative top-[2px] ml-2">
              <p className="text-gray-300">|</p>
            </div>
          </li>
          <li className="hidden md:flex justify-center items-center hover:text-gray-900 hover:underline cursor-pointer">
            <div>
              <svg
                fill="none"
                stroke="currentColor"
                strokeWidth={1.5}
                viewBox="0 0 24 24"
                width={28}
                height={28}
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
                />
              </svg>
            </div>
            <span>Buyer Protection</span>
            <div className="relative top-[2px] ml-2">
              <p className="text-gray-300">|</p>
            </div>
          </li>
          <li className="hidden md:flex justify-center items-center hover:text-gray-900 hover:underline cursor-pointer">
            <span>Customer Service</span>
            <div className="relative top-[2px] ml-2">
              <p className="text-gray-300">|</p>
            </div>
          </li>
          <li className="hidden md:flex justify-center items-center hover:text-gray-900 hover:underline cursor-pointer">
            <span>Help</span>
            <div className="relative top-[2px] ml-2">
              <p className="text-gray-300">|</p>
            </div>
          </li>
          <Link href="/profile/wishlist">
            <span className="flex justify-center items-center hover:text-gray-900 hover:underline cursor-pointer">
              <div>
                <svg
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.5}
                  viewBox="0 0 24 24"
                  width={28}
                  height={28}
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                  />
                </svg>
              </div>
              <span>Wishlist</span>
              <div className="relative top-[2px] ml-2">
                <p className="text-gray-300">|</p>
              </div>
            </span>
          </Link>
          <li onClick={() => setOpen(!open)}>
            {session ? (
              <span className="flex justify-center items-center hover:text-gray-900 hover:underline cursor-pointer">
                <div>
                  <Image
                    src={session.user.image}
                    height={28}
                    width={28}
                    alt=""
                    className="rounded-full mr-2"
                  />
                </div>
                <span>{session.user.name}</span>
                <div className="relative top-[2px] ml-1">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.5}
                    viewBox="0 0 24 24"
                    width={10}
                    height={10}
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                    />
                  </svg>
                </div>
              </span>
            ) : (
              <span className="flex justify-center items-center hover:text-gray-900 hover:underline cursor-pointer">
                <div>
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.5}
                    viewBox="0 0 24 24"
                    width={28}
                    height={28}
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                <span>Account</span>
                <div className=" ml-1">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.5}
                    viewBox="0 0 24 24"
                    width={10}
                    height={10}
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                    />
                  </svg>
                </div>
              </span>
            )}
            {open ? <UserMenu session={session} /> : ''}
          </li>
        </ul>
      </div>
    </div>
  );
}

export default NavTop;
