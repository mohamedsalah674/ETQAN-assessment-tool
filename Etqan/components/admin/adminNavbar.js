import Image from 'next/image';
import Link from 'next/link';
import { Disclosure } from '@headlessui/react';
import Logo from '../Logo';
import ETQAN from '../ETQAN';
import { useContext } from 'react';
import { Context } from '../../context';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import buildClient from '../../hooks/build';
function AdminNavbar() {
  const router = useRouter();

  const { state, dispatch } = useContext(Context);

  const LogOUt = async () => {
    const client = buildClient('');

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
              <div className=" my-4 border-b mt-6 border-gray-100 pb-4">
                <Link
                  href="/admin/users"
                  className="flex  mb-2 justify-start items-center gap-4 pl-5 hover:bg-gray-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto"
                >
                  <Image
                    src="/icons/9.svg.png"
                    className="text-2xl text-gray-600 group-hover:bg-white"
                    width="25"
                    height="25"
                    alt="users"
                  />
                  <h3 className="text-base text-gray-800 group-hover:text-white font-semibold ">
                    Users
                  </h3>
                </Link>

                <Link
                  href="/admin/university"
                  className="flex  mb-2 justify-start items-center gap-4 pl-5 hover:bg-gray-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto"
                >
                  <Image
                    src="/icons/5.svg"
                    className="text-2xl text-gray-600 group-hover:bg-white"
                    width="25"
                    height="25"
                    alt="university"
                  />
                  <h3 className="text-base text-gray-800 group-hover:text-white font-semibold ">
                    university
                  </h3>
                </Link>
                <Link
                  href="/admin/faculty"
                  className="flex  mb-2 justify-start items-center gap-4 pl-5 hover:bg-gray-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto"
                >
                  <Image
                    src="/icons/8.jpg"
                    className="text-2xl text-gray-600 group-hover:bg-white"
                    width="25"
                    height="25"
                    alt="faculty"
                  />
                  <h3 className="text-base text-gray-800 group-hover:text-white font-semibold ">
                    faculty
                  </h3>
                </Link>
                <Link
                  href="/admin/department"
                  className="flex  mb-2 justify-start items-center gap-4 pl-5 hover:bg-gray-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto"
                >
                  <Image
                    src="/icons/dep.jpg"
                    className="text-2xl text-gray-600 group-hover:bg-white"
                    width="25"
                    height="25"
                    alt="faculty"
                  />
                  <h3 className="text-base text-gray-800 group-hover:text-white font-semibold ">
                    department
                  </h3>
                </Link>

                <Link
                  href="/admin/program"
                  className="flex  mb-2 justify-start items-center gap-4 pl-5 hover:bg-gray-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto"
                >
                  <Image
                    src="/icons/1.svg"
                    className="text-2xl text-gray-600 group-hover:bg-white"
                    width="25"
                    height="25"
                    alt="Programs"
                  />
                  <h3 className="text-base text-gray-800 group-hover:text-white font-semibold ">
                    Programs
                  </h3>
                </Link>
                <Link
                  href="/admin/course"
                  className="flex mb-2 justify-start items-center gap-4 pl-5 hover:bg-gray-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto"
                >
                  <Image
                    src="/icons/courses.svg"
                    className="text-2xl text-gray-600  group-hover:bg-white "
                    width="25"
                    height="25"
                    alt="courses"
                  />
                  <h3 className="text-base text-gray-800 group-hover:text-white font-semibold ">
                    Courses
                  </h3>
                </Link>

                <div
                  onClick={LogOUt}
                  className="flex mb-2 justify-start items-center gap-4 pl-5 border border-gray-200  hover:bg-gray-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto"
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
          </div>
        </Disclosure.Panel>
      </Disclosure>
    </div>
  );
}

export default AdminNavbar;
