import React, { useState } from 'react';
import logo from '../public/images/logov3.png';
import facebook from '../public/images/facebookicon2.png';
import instagram from '../public/images/instaicon2.png';
import whatsapp from '../public/images/whatsappicon2.png';
import email from '../public/images/emailicon.png';
import Image from 'next/image';
import Link from 'next/link';

export default function Sidebar() {
  const [open, setOpen] = useState(false);

  if (typeof document !== 'undefined') {
    const body = document.querySelector('body');
    if (open === true) {
      body.style.overflow = 'hidden';
    } else body.style.overflow = 'auto';
  }

  return (
    <>
      <div
        id="bgBlur"
        onClick={() => setOpen(!open)}
        className={`absolute top-0 left-0 bg-black z-10 h-full w-full ${
          open
            ? 'transition-opacity ease-in-out opacity-70 overscroll-hidden fixed'
            : 'transition-opacity ease-in-out opacity-0 scale-0'
        } ease-in-out duration-300`}
      ></div>
      <div
        id="sidebarBg"
        className={`absolute z-10 top-0 left-0 bg-white h-full ${
          open ? 'w-full md:w-4/12 lg:w-3/12 overscroll-hidden fixed' : 'w-0'
        } ease-in-out duration-300`}
      >
        <div
          className={`flex flex-col justify-center items-center pl-3 pt-0.5 ${
            open ? 'shadow-md' : 'shadow-none'
          } ease-in-out duration-300`}
        >
          <div
            className={`z-10 ${
              open ? 'duration-300' : 'transition-opacity opacity-0'
            } ease-in-out duration-300`}
          >
            <Image src={logo} alt={'/'} height={35} width={185} />
          </div>
        </div>

        <table className="w-full">
          <tbody
            className={`grid grid-cols-1 gap-3 p-3 place-items-center shadow-sm ${
              open ? 'opacity-100 w-full' : 'opacity-0 w-0 scale-0 hidden'
            } transition-opacity ease-in-out duration-1000`}
          >
            <tr>
              <td>
                <button className="sidebarLinkButton">
                  <Link href={'/'}>
                    <a onClick={() => setOpen(!open)}>Home</a>
                  </Link>
                </button>
              </td>
            </tr>
            <tr>
              <td>
                <button className="sidebarLinkButton">
                  <Link href={`/search`}>
                    <a onClick={() => setOpen(!open)}>Product Search</a>
                  </Link>
                </button>
              </td>
            </tr>
            <tr>
              <td>
                <button className="sidebarLinkButton">
                  <Link href={'/contact'}>
                    <a onClick={() => setOpen(!open)}>Contact Us</a>
                  </Link>
                </button>
              </td>
            </tr>
            <tr>
              <td>
                <button className="sidebarLinkButton">
                  <Link href={'/login'}>
                    <a onClick={() => setOpen(!open)}>Login</a>
                  </Link>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
        <table className="w-full">
          <thead
            className={`grid grid-cols-1 gap-3 px-5 pt-3 place-items-center ${
              open ? 'opacity-100' : 'opacity-0 scale-0 hidden'
            } transition-opacity ease-in-out duration-300`}
          >
            <tr>
              <td>
                <h1 className="p-0">Product Categories</h1>
              </td>
            </tr>
          </thead>
          <tbody
            className={`grid grid-cols-1 gap-3 p-3 w-full place-items-center shadow-sm ${
              open ? 'opacity-100' : 'opacity-0 scale-0 hidden'
            } transition-opacity ease-in-out duration-300`}
          >
            <tr>
              <td>
                <button className="sidebarLinkButton">
                  <Link
                    href={`/search?category%3Fbabyknits=&category=Baby+Knits`}
                  >
                    <a onClick={() => setOpen(!open)}>Baby Knits</a>
                  </Link>
                </button>
              </td>
            </tr>
            <tr>
              <td>
                <button className="sidebarLinkButton">
                  <Link
                    href={`/search?category%3Fbabyknits=&category=Kid+Knits`}
                  >
                    <a onClick={() => setOpen(!open)}>Kid Knits</a>
                  </Link>
                </button>
              </td>
            </tr>
            <tr>
              <td>
                <button className="sidebarLinkButton">
                  <Link
                    href={`/search?category%3Fkidknits=&category=Blankets+%26+Socks`}
                  >
                    <a onClick={() => setOpen(!open)}>Blankets &amp; Socks</a>
                  </Link>
                </button>
              </td>
            </tr>
            <tr>
              <td>
                <button className="sidebarLinkButton">
                  <Link
                    href={`/search?category%3Fknitkits=&category=Knit+Kits`}
                  >
                    <a onClick={() => setOpen(!open)}>Knit Kits</a>
                  </Link>
                </button>
              </td>
            </tr>
            <tr>
              <td>
                <button className="sidebarLinkButton">
                  <Link href={`/search?category%3Fpatterns=&category=Patterns`}>
                    <a onClick={() => setOpen(!open)}>Patterns</a>
                  </Link>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
        <div
          className={`bottom-20 h-40 z-10 ${
            open ? 'opactity-100' : 'opacity-0'
          } transition-opacity ease-in-out duration-300`}
        >
          <div className="p-7 md:p-0 md:px-7 md:pt-3">
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-1 gap-2">
                <div className="mb-5 md:mb-0">
                  <h4 className="font-bold text-xs lg:text-lg pb-2 flex justify-center">
                    Check Out Our Socials
                  </h4>
                  <p className="text-xs lg:text-sm italic flex justify-center">
                    Come and say hello over on our social media pages: Facebook,
                    Instagram, send us a message on WhatsApp or even send us an
                    email!
                  </p>
                  <div className="w-full">
                    <div className="flex gap-3 p-2 pr-1 justify-evenly place-items-center">
                      <Link
                        href={'https://facebook.com/anaknits'}
                        target="_blank"
                      >
                        <a onClick={() => setOpen(!open)}>
                          <Image
                            Link
                            src={facebook}
                            alt="/"
                            width={25}
                            height={25}
                          />
                        </a>
                      </Link>
                      <Link
                        href={'https://instagram.com/anaknits'}
                        target="_blank"
                      >
                        <a onClick={() => setOpen(!open)}>
                          <Image
                            src={instagram}
                            alt="/"
                            width={25}
                            height={25}
                          />
                        </a>
                      </Link>
                      <Link
                        href={'https://whatsapp.com/anaknits'}
                        target="_blank"
                      >
                        <a onClick={() => setOpen(!open)}>
                          <Image
                            src={whatsapp}
                            alt="/"
                            width={25}
                            height={25}
                          />
                        </a>
                      </Link>
                      <Link
                        href={
                          'mailto:info@anaknits.com?body=Hi Ana, this is my question...'
                        }
                        target="_blank"
                      >
                        <a onClick={() => setOpen(!open)}>
                          <Image src={email} alt="/" width={25} height={20} />
                        </a>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
