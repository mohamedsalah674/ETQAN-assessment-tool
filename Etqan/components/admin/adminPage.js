import Link from 'next/link';
import Image from 'next/image';

function AdminPage() {
  return (
    <>
      <div className="flex flex-wrap mb-10 ml-40  mt-5 p-8 w-4/5  bg-white border-4 border-[#00b4ba] rounded-2xl justify-between ">
        <div className="block text-center ml-8 border rounded-2xl justify-center bg-black-800 ">
          <Link href="/admin/users">
            <Image
              src="/icons/10.jpeg"
              className="text-2xl h-72 text-gray-600 group-hover:bg-black border rounded-2xl "
              width="345"
              height="100"
              alt="users"
            />
            <h1 className=" text-3xl text-center h-10 text-white border rounded-xl bg-black">
              Users
            </h1>
          </Link>
        </div>
        <div className="block text-center border  ml-8 group-hover:bg-black rounded-2xl justify-center bg-blue-200 ">
          <Link href="/admin/university">
            <Image
              src="/icons/univ.jpg"
              className="text-2xl h-72 text-gray-700 group-hover:bg-black border rounded-2xl "
              width="345"
              height="100"
              alt="users"
            />
            <h1 className=" text-3xl text-center h-10 text-white border rounded-xl bg-black">
              University
            </h1>
          </Link>
        </div>

        <div className="block text-center ml-8  border rounded-2xl justify-center bg-white">
          <Link href="/admin/faculty">
            <Image
              src="/icons/fac.jpg"
              className="text-2xl h-72 text-gray-600 border rounded-2xl "
              width="345"
              height="100"
              alt="users"
            />

            <h1 className=" text-3xl text-center h-10 text-white border rounded-xl bg-black">
              Faculty
            </h1>
          </Link>
        </div>
        <div className="block text-center ml-8 mt-16 border rounded-2xl justify-center  bg-white ">
          <Link href="/admin/department">
            <Image
              src="/icons/dep.jpg"
              className="text-2xl h-72 text-gray-600 group-hover:bg-black border rounded-2xl "
              width="345"
              height="100"
              alt="users"
            />
            <h1 className=" text-3xl text-center h-10 text-white border rounded-xl bg-black">
              Departments
            </h1>
          </Link>
        </div>
        <div className="block text-center ml-8 mt-16 border rounded-2xl justify-center  bg-black ">
          <Link href="/admin/program">
            <Image
              src="/icons/11.jpg"
              className="text-2xl h-72 text-gray-600 group-hover:bg-black border rounded-2xl "
              width="345"
              height="100"
              alt="users"
            />
            <h1 className=" text-3xl text-center h-10 text-white border rounded-xl bg-black">
              Programs
            </h1>
          </Link>
        </div>
        <div className="block text-center ml-8 mt-16  border rounded-2xl justify-center bg-white">
          <Link href="/admin/course">
            <Image
              src="/icons/13.jpg"
              className="text-2xl h-72 text-gray-600 group-hover:bg-black border rounded-2xl "
              width="345"
              height="100"
              alt="users"
            />
            <h1 className=" text-3xl text-center h-10 text-white border rounded-xl bg-black">
              Courses
            </h1>
          </Link>
        </div>
      </div>
    </>
  );
}

export default AdminPage;
