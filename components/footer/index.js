import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import { ChevronRightIcon } from '@heroicons/react/solid';
import facebook from '../../public/images/facebookicon2.png';
import instagram from '../../public/images/instaicon2.png';
import whatsapp from '../../public/images/whatsappicon2.png';
import Logo from '../header/Logo';
import Newsletter from './Newsletter';
import Payment from './Payment';
import Copyright from './Copyright';

export default function Footer({ country }) {
  return (
    <div className="bg-white min-h-[1/2] bottom-0">
      <div className="max-w-7xl mx-auto justify-center px-4 sm:px-20 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          <div className="mb-5">
            <h4 className="font-bold text-2xl pb-4 flex place-content-start">
              <Logo />
            </h4>
            <ul>
              <li className="flex  cursor-pointer place-content-start">
                <ChevronRightIcon className="h-5 w-5 pt-1 text-blue-500 " />
                <p className="hover:brightness-50">
                  <Link href={'/contact'}>Contact Us</Link>
                </p>
              </li>
              <li className="flex cursor-pointer place-content-start">
                <ChevronRightIcon className="h-5 w-5 pt-1 text-blue-500 " />
                <p className="hover:brightness-50">
                  <Link href={'/about'}>About Us</Link>
                </p>
              </li>
              <li className="flex cursor-pointer place-content-start">
                <p className="hover:brightness-50 flex">
                  <ChevronRightIcon className="h-5 w-5 pt-1 text-blue-500 " />
                  <Link href={'/policies'}>Disclaimer</Link>
                </p>
              </li>
            </ul>
          </div>
          <div className="mb-5">
            <ul>
              <h4 className="font-bold pb-4 flex place-content-start">
                Help & Support
              </h4>
              <li className="flex cursor-pointer place-content-start">
                <ChevronRightIcon className="h-5 w-5 pt-1 text-blue-500 " />
                <p className="hover:brightness-50">
                  <Link href={'/policies/shipping'}>Shipping Policy</Link>
                </p>
              </li>
              <li className="flex cursor-pointer place-content-start">
                <ChevronRightIcon className="h-5 w-5 pt-1 text-blue-500 " />
                <p className="hover:brightness-50">
                  <Link href={'/policies/returns'}>Returns Policy</Link>
                </p>
              </li>

              <li className="flex cursor-pointer place-content-start">
                <ChevronRightIcon className="h-5 w-5 pt-1 text-blue-500 " />
                <p className="hover:brightness-50">
                  <Link href={'/policies/terms'}>How to Order</Link>
                </p>
              </li>
              <li className="flex cursor-pointer place-content-start">
                <ChevronRightIcon className="h-5 w-5 pt-1 text-blue-500 " />
                <p className="hover:brightness-50">
                  <Link href={'/policies/terms'}>How to Track</Link>
                </p>
              </li>
              <li className="flex cursor-pointer place-content-start">
                <ChevronRightIcon className="h-5 w-5 pt-1 text-blue-500 " />
                <p className="hover:brightness-50">
                  <Link href={'/policies/terms'}>Size Guide</Link>
                </p>
              </li>
            </ul>
          </div>
          <div className="mb-5">
            <h4 className="font-bold pb-4 flex place-content-start">
              Customer Services
            </h4>
            <ul className="text-gray-500">
              <li className="flex cursor-pointer place-content-start">
                <ChevronRightIcon className="h-5 w-5 pt-1 text-blue-500 " />
                <p className="hover:brightness-50">
                  <Link href={'/policies/terms'}>Terms and Conditions</Link>
                </p>
              </li>
              <li className="flex cursor-pointer place-content-start">
                <ChevronRightIcon className="h-5 w-5 pt-1 text-blue-500 " />
                <p className="hover:brightness-50">
                  <Link href={'/policies/terms'}>Customer service</Link>
                </p>
              </li>
              <li className="flex cursor-pointer place-content-start">
                <ChevronRightIcon className="h-5 w-5 pt-1 text-blue-500 " />
                <p className="hover:brightness-50">
                  <Link href={'/policies/cookies'}>Cookies Policy</Link>
                </p>
              </li>

              <li className="flex cursor-pointer place-content-start">
                <ChevronRightIcon className="h-5 w-5 pt-1 text-blue-500 " />
                <p className="hover:brightness-50">
                  <Link href={'/policies/privacy'}>Privacy policy</Link>
                </p>
              </li>
              <li className="flex cursor-pointer place-content-start">
                <ChevronRightIcon className="h-5 w-5 pt-1 text-blue-500 " />
                <p className="hover:brightness-50">
                  <Link href={'/policies/privacy'}>
                    Take our feedback survey
                  </Link>
                </p>
              </li>
            </ul>
          </div>
          <div className="mb-5 text-left">
            <h4 className="font-bold pb-4 flex place-content-start">
              Check Out Our Socials
            </h4>
            <p className="text-sm italic">
              Come and say hello over on our social media pages: Facebook,
              Instagram, send us a message on WhatsApp or even send us an email!
            </p>
            <div className="w-full">
              <div className="flex gap-8 p-2 pr-1 justify-center place-items-center">
                <Link href={'https://facebook.com/anaknits'} target="_blank">
                  <Image src={facebook} alt="/" width={25} height={25} />
                </Link>
                <Link href={'https://instagram.com/anaknits'} target="_blank">
                  <Image src={instagram} alt="/" width={25} height={25} />
                </Link>
                <Link href={'https://whatsapp.com/anaknits'} target="_blank">
                  <Image src={whatsapp} alt="/" width={25} height={25} />
                </Link>
                <Link
                  href={
                    'mailto:info@anaknits.com?body=Hi Ana, this is my question...'
                  }
                  target="_blank"
                >
                  <Image
                    src={'/images/emailicon.png'}
                    alt="/"
                    width={40}
                    height={30}
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div>
          <Newsletter />
          <Payment />
          <Copyright country={country} />
        </div>
      </div>
    </div>
  );
}
