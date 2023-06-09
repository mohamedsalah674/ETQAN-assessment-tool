import Image from "next/image";
import Link from "next/link";
import { Disclosure } from "@headlessui/react";
import Logo from "./Logo";
import ETQAN from "./ETQAN";
import { Context } from "../context";
import { useRouter } from 'next/router';
import { useContext } from 'react';
import buildClient from "../hooks/build";
import Cookies from 'js-cookie';



function SideNavbar({ links }) {
  const router = useRouter();

  const { state, dispatch } = useContext(Context);
  const LogOUt = async () => {
    const client = buildClient('')

    try {
      // Make the request to the backend signout endpoint
      await client.get('/api/users/signout');

      // Dispatch the LOGOUT action to update the state
      dispatch({ type: 'LOGOUT' });

      // Remove the token from cookies
      Cookies.remove('token');

      // Redirect to the login page
      router.push('/login');
    } catch (error) {
      console.log('Error occurred during logout', error);
    }
  };
  return (
    <div>
      <Disclosure as="nav" defaultOpen="true">
        <Disclosure.Button className="absolute top-4 right-4 inline-flex items-center peer justify-center bg-white rounded-md p-2 text-gray-800 hover:bg-gray-900 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white group">
          <Image
            src="/icons/hmenu.svg"
            className="block h-6 w-6"
            aria-hidden="true"
            width="30"
            height="30"
            alt="menu"
          />
        </Disclosure.Button>
        <Disclosure.Panel>
          <div className="p-6 w-1/2 h-screen fixed bg-white z-20  top-0  left-0 w-60  peer-focus:left-0 peer:transition ease-out delay-150 duration-200">
            <div className="flex flex-col justify-start item-center">
              <Link
                className=" flex content-center font-bold text-m cursor-pointer"
                href="/"
              >
                <Logo />
                <ETQAN />
              </Link>
              <div className="my-4 border-b border-gray-100 pb-4">
                {/* Dynamic links */}
                {links.map((link, index) => (
                  <Link
                    key={index}
                    href={link.href}
                    className="flex mb-2 justify-start items-center gap-4 pl-5 hover:bg-gray-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto"
                  >
                    <Image
                      src={link.icon}
                      className="text-2xl text-gray-600 group-hover:bg-white"
                      width="25"
                      height="25"
                      alt={link.alt}
                    />
                    <h3 className="text-base text-gray-800 group-hover:text-white font-semibold">
                      {link.text}
                    </h3>
                  </Link>
                ))}
              </div>
              {/* logout */}
              <div 

          className="flex mb-2 justify-start items-center w-48 ml-0 gap-4 pl-5 hover:bg-gray-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto"
          onClick={LogOUt}
                >
                  <Image
                    src="/icons/logout.svg"
                    className="text-2xl text-gray-600 group-hover:bg-white "
                    width="25"
                    height="25"
                    alt="logout"
                  />
                  <h3 className="text-base text-gray-800 group-hover:text-white font-semibold ">
                    Logout
                  </h3>
              
              </div>
            </div>
          </div>
        </Disclosure.Panel>
      </Disclosure>
    </div>
  );
}

export default SideNavbar;
