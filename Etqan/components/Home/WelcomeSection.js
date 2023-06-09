import Link from "next/link";
function WelcomeSection() {
  return (
    <div className=" bg-[url('/cover.jpg')]  bg-cover text-white h-screen my-10 flex justify-center items-center flex-col  font-bold lg:text-4xl text-4xl space-y-2">
      <div className="w-5/6 mr-20">
        <h1>
          Welcome to the first ABET-based course management and assessment
          platform in Egypt. Welcome to{" "}
          <span className="pt-3 text-center font-bold text-4xl  italic text-transparent bg-clip-text bg-gradient-to-r to-blue-700 from-sky-400">
            ETQAN
          </span>
          .
        </h1>
      </div>
      <div>
        <Link
          href="/signup"
          className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl  focus:outline-none dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
        >
          Join Us
        </Link>

        <Link
          href="#desc"
          className="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10  dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
        >
          What is ETQAN?
        </Link>
      </div>
    </div>
  );
}

export default WelcomeSection;
