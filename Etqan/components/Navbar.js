import React, { useState } from "react";
import { Transition } from "@headlessui/react";
import Image from "next/image";
import Link from "next/link";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <nav className=" shadow-sm fixed top-0 w-full z-30 bg-white">
        <div className="w-full">
          <div className="flex items-center h-20 w-full">
            <div className="flex items-center  mx-20  justify-between w-full">
              <div className="flex justify-center items-center flex-shrink-0 ">
                <Link
                  className=" flex content-center font-bold text-xl cursor-pointer"
                  href="/"
                >
                  <div>
                    <Image
                      src="/logo.svg"
                      width="50"
                      height="100"
                      alt="logo"
                    ></Image>
                  </div>
                  <div className="flex justify-center items-center text-center font-bold text-2xl italic text-transparent bg-clip-text bg-gradient-to-r to-blue-700 from-sky-400">
                    ETQAN
                  </div>
                </Link>
              </div>
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                  <Link
                    href="/"
                    className="cursor-pointer text-blue-600 font-semibold px-3 py-2 text-md hover:font-black"
                  >
                    Home
                  </Link>
                  <Link
                    href="/#services"
                    className="cursor-pointer hover:bg-blue-600 text-black hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Services
                  </Link>
                  <Link
                    href="/ABET"
                    className="cursor-pointer hover:bg-blue-600 text-black hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    ABET
                  </Link>
                  <Link
                    href="/#contact"
                    className="cursor-pointer hover:bg-blue-600 text-black hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Contact Us
                  </Link>

                  <Link
                    href="/login"
                    className="cursor-pointer bg-blue-600 text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-black"
                  >
                    Sign in
                  </Link>
                </div>
              </div>
            </div>
            <div className="mr-10 flex md:hidden ">
              <button
                onClick={() => setIsOpen(!isOpen)}
                type="button"
                className="bg-blue-600 inline-flex items-center justify-center p-2 rounded-md text-white  hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-blue-800 focus:ring-white"
                aria-controls="mobile-menu"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                {!isOpen ? (
                  <svg
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="+true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                ) : (
                  <svg
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="+true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        <Transition
          show={isOpen}
          enter="transition ease-out duration-100 transform"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="transition ease-in duration-75 transform"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <div className="md:hidden" id="mobile-menu">
            <div className="bg-white px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link
                href="/home"
                className="cursor-pointer hover:bg-blue-600 text-black hover:text-white block px-3 py-2 rounded-md text-base font-medium"
              >
                Home
              </Link>
              <Link
                href="/about"
                className="cursor-pointer hover:bg-blue-600 text-black hover:text-white block px-3 py-2 rounded-md text-base font-medium"
              >
                About
              </Link>

              <Link
                href="/instructor"
                className="cursor-pointer hover:bg-blue-600 text-black hover:text-white block px-3 py-2 rounded-md text-base font-medium"
              >
                Instructor
              </Link>
              <Link
                href="/services"
                className="cursor-pointer hover:bg-blue-600 text-black hover:text-white block px-3 py-2 rounded-md text-base font-medium"
              >
                Services
              </Link>

              <Link
                href="/contact"
                className="cursor-pointer hover:bg-blue-600 text-black hover:text-white block px-3 py-2 rounded-md text-base font-medium"
              >
                Contact
              </Link>
            </div>
          </div>
        </Transition>
      </nav>
    </>
  );
}

export default Navbar;
