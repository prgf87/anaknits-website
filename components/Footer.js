import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import { ChevronRightIcon } from '@heroicons/react/solid';
import facebook from '../public/images/facebookicon2.png';
import instagram from '../public/images/instaicon2.png';
import whatsapp from '../public/images/whatsappicon2.png';
import email from '../public/images/emailicon.png';

export default function FooterInfo() {
  return (
    <div className="p-10">
      <div className="max-w-7xl mx-auto jutify-center">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
          <div className="mb-5">
            <h4 className="font-bold text-2xl pb-4 flex place-content-center md:place-content-start">
              AnaKnits
            </h4>
            {/* <p className="text-gray-500 flex place-content-center md:place-content-start">
              <strong>Phone: </strong>&nbsp; +1 234-567-891
            </p> */}
            <div className="text-gray-500 flex cursor-pointer place-content-center md:place-content-start">
              <p className="hover:brightness-50">
                <Link href={'/policies'}>
                  <strong>Disclaimer</strong>
                </Link>
              </p>
            </div>
            <p className="text-gray-500 flex place-content-center md:place-content-start">
              <strong>Email: </strong>&nbsp;info@anaknits.com
            </p>
            <p className="text-gray-500 flex place-content-center md:place-content-start">
              <strong>Copyright </strong>&nbsp;&copy;&nbsp;AnaKnits 2022
            </p>
          </div>
          <div className="mb-5">
            <h4 className="font-bold text-2xl pb-4 flex place-content-center md:place-content-start">
              Useful Links
            </h4>
            <ul className="text-gray-500">
              <li className="flex cursor-pointer flex place-content-center md:place-content-start">
                <ChevronRightIcon className="h-5 w-5 pt-1 text-blue-500 " />
                <p className="hover:brightness-50">
                  <Link href={'/'}>Home</Link>
                </p>
              </li>
              <li className="flex cursor-pointer flex place-content-center md:place-content-start">
                <ChevronRightIcon className="h-5 w-5 pt-1 text-blue-500 " />
                <p className="hover:brightness-50">
                  <Link href={'/about'}>About Us</Link>
                </p>
              </li>
              <li className="flex cursor-pointer flex place-content-center md:place-content-start">
                <ChevronRightIcon className="h-5 w-5 pt-1 text-blue-500 " />
                <p className="hover:brightness-50">
                  <Link href={'/policies/terms'}>Terms of Services</Link>
                </p>
              </li>
              <li className="flex cursor-pointer flex place-content-center md:place-content-start">
                <ChevronRightIcon className="h-5 w-5 pt-1 text-blue-500 " />
                <p className="hover:brightness-50">
                  <Link href={'/policies/privacy'}>Privacy policy</Link>
                </p>
              </li>
            </ul>
          </div>
          <div className="mb-5">
            <h4 className="font-bold text-2xl pb-4 flex place-content-center md:place-content-start">
              Services
            </h4>
            <ul className="text-gray-500">
              <li className="flex  cursor-pointer flex place-content-center md:place-content-start">
                <ChevronRightIcon className="h-5 w-5 pt-1 text-blue-500 " />
                <p className="hover:brightness-50">
                  <Link href={'/contact'}>Contact Us</Link>
                </p>
              </li>
              <li className="flex cursor-pointer flex place-content-center md:place-content-start">
                <ChevronRightIcon className="h-5 w-5 pt-1 text-blue-500 " />
                <p className="hover:brightness-50">
                  <Link href={'/policies/returns'}>Returns Policy</Link>
                </p>
              </li>
              <li className="flex cursor-pointer flex place-content-center md:place-content-start">
                <ChevronRightIcon className="h-5 w-5 pt-1 text-blue-500 " />
                <p className="hover:brightness-50">
                  <Link href={'/policies/shipping'}>Shipping Policy</Link>
                </p>
              </li>
              <li className="flex cursor-pointer flex place-content-center md:place-content-start">
                <ChevronRightIcon className="h-5 w-5 pt-1 text-blue-500 " />
                <p className="hover:brightness-50">
                  <Link href={'/policies/cookies'}>Cookies Policy</Link>
                </p>
              </li>
            </ul>
          </div>
          <div className="mb-5">
            <h4 className="font-bold text pb-4 flex place-content-center md:place-content-start">
              Check Out Our Socials
            </h4>
            <p className="text-sm italic px-12 md:px-0">
              Come and say hello over on our social media pages: Facebook,
              Instagram, send us a message on WhatsApp or even send us an email!
            </p>
            <div className="w-full">
              <div className="flex gap-3 p-2 pr-1 justify-evenly place-items-center">
                <Link href={'https://facebook.com/anaknits'} target="_blank">
                  <a>
                    <Image Link src={facebook} alt="/" width={25} height={25} />
                  </a>
                </Link>
                <Link href={'https://instagram.com/anaknits'} target="_blank">
                  <a>
                    <Image src={instagram} alt="/" width={25} height={25} />
                  </a>
                </Link>
                <Link href={'https://whatsapp.com/anaknits'} target="_blank">
                  <a>
                    <Image src={whatsapp} alt="/" width={25} height={25} />
                  </a>
                </Link>
                <Link
                  href={
                    'mailto:info@anaknits.com?body=Hi Ana, this is my question...'
                  }
                  target="_blank"
                >
                  <a>
                    <Image src={email} alt="/" width={25} height={20} />
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
