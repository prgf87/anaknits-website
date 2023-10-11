import { signIn, signOut } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

function UserMenu({ session }) {
  return (
    <div className="absolute top-40 right-0 w-[280px] shadow-lg bg-white z-50 flex-col gap-[1rem] py-[1rem] mr-10">
      <h4 className="text-center font-semibold text-lg">
        Welcome to AnaKnits !
      </h4>
      {session ? (
        <div className="flex py-2">
          <div>
            <Image
              src={session.user.image}
              height={100}
              width={100}
              alt=""
              className="rounded-full mx-6"
            />
          </div>

          <div className="flex-col">
            <span className="text-xs">Welcome Back,</span>
            <h3>{session.user.name}</h3>
            <span
              className="text-lg text-blue-400 underline font-semibold cursor-pointer hover:text-blue-600"
              onClick={signOut}
            >
              Sign out
            </span>
          </div>
        </div>
      ) : (
        <div className="flex justify-center gap-x-4 my-4 text-sm">
          <button className="btn1">
            <Link href={'/register'}>Register</Link>
          </button>
          <button className="btn2" onClick={signIn}>
            Login
          </button>
        </div>
      )}

      <ul className="w-full text-left mx-6">
        <li className="hover:bg-[#eeeeee] py-0.5 flex justify-start items-baseline">
          <Link href={'/profile'}>
            <p className="pl-[1rem]">Account</p>
          </Link>
        </li>
        <li className="hover:bg-[#eeeeee] py-0.5 flex justify-start items-baseline">
          <Link href={'/profile'}>
            <p className="pl-[1rem]">My Orders</p>
          </Link>
        </li>
        <li className="hover:bg-[#eeeeee] py-0.5 flex justify-start items-baseline">
          <Link href={'/profile'}>
            <p className="pl-[1rem]">Message Center</p>
          </Link>
        </li>
        <li className="hover:bg-[#eeeeee] py-0.5 flex justify-start items-baseline">
          <Link href={'/profile'}>
            <p className="pl-[1rem]">Wishlist</p>
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default UserMenu;
