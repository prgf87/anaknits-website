import Link from 'next/link';
import React from 'react';
import Logo from './Logo';
// import { useSelector } from 'react-redux';

function Search() {
  // const { cart } = useSelector((state) => ({ ...state }));
  return (
    <>
      <div className="flex justify-evenly items-center shadow-md my-8 pb-8">
        <Link href={'/'}>
          <Logo />
        </Link>

        <div className="flex items-center justify-center">
          <div className="max-w-5xl mx-auto px-[1rem] flex justify-between items-center">
            <div className="flex items-center gap-x-72">
              <div className="flex h-[40px] items-center bg-[#eeeeeebc] rounded-xl">
                <input
                  type="text"
                  placeholder="Search..."
                  className="border-none outline-none h-full w-[400px] bg-transparent pl-[1rem]"
                />

                <span className="grid place-items-center cursor-pointer bg-blue-500 h-[40px] w-[40px] rounded-tr-xl rounded-br-xl p-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-white"
                    fill="none"
                    viewBox="0 0 25 25"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </span>
              </div>
            </div>
          </div>
        </div>
        {/* <Link href="/cart" className="flex items-center">
          <svg
            className="h-10 w-10 ml-4 inline-block text-gray-500 hover:text-blue-500"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            viewBox="0 0 25 25"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
            />
          </svg>
          <span className="bg-blue-500 w-[25px] h-[25px] rounded-full text-white grid place-items-center">
             {cart.length} 0
          </span>
        </Link> */}
      </div>
    </>
  );
}

export default Search;
