import {
  FaChalkboardTeacher,
  FaEdit,
  FaTrashAlt,
  caption,
} from "react-icons/fa";

function Card({
  topText,
  isCoordinator,
  cardTitle,
  cardDescription,
  buttonText,
  href,
  caption,
}) {
  return (
    <div className="md:w-[40%] w-[70%] h-[300px] my-8 bg-white shadow-md rounded-lg overflow-hidden transition duration-300 transform hover:scale-105">
      <div className="bg-blue-500 text-white flex items-center justify-between py-4 px-6 rounded-t-lg">
        <p>
          <FaChalkboardTeacher className="text-xl" />
        </p>
        <p className="hidden md:block">{caption}</p>
      </div>
      <div className="p-6">
        <p className="text-gray-500 text-xl mb-2">{topText}</p>
        <p className="text-4xl font-bold mb-2 italic font-serif text-gray-700">
          {cardTitle}
        </p>
        <p className="font-semibold text-xl">Courses:</p>
        <div className="flex justify-center">
          {Array.isArray(cardDescription) ? (
            cardDescription.map((course) => (
              <span className="mr-2">◾ {course}</span>
            ))
          ) : (
            <span>{cardDescription}</span>
          )}
        </div>
      </div>
      <div className="flex flex-col md:flex-row justify-between items-center px-6 pb-4">
        <div className="mb-4 md:mb-0 m-auto">
          <a
            className="group relative inline-block overflow-hidden px-8 py-3 focus:outline-none focus:ring transition duration-300 shadow-xl border-2 border-black font-bold"
            href={href}
          >
            <span className="absolute inset-y-0 left-0 w-[2px] bg-[#D6D3D1] transition-all group-hover:w-full group-active:bg-indigo-500"></span>
            <span className="relative md:text-xl text-sm font-bold text-blue-700 transition-colors group-hover:text-black">
              {buttonText}
            </span>
          </a>
        </div>
        {isCoordinator && (
          <div className="flex">
            <button className="border border-gray-400 rounded-full w-10 h-10 flex items-center justify-center text-gray-500 bg-green-200 hover:bg-green-300 transition duration-300">
              <FaEdit className="text-xl" />
            </button>
            <button className="border border-gray-400 rounded-full w-10 h-10 flex items-center justify-center text-gray-500 bg-red-200 hover:bg-red-300 transition duration-300">
              <FaTrashAlt className="text-xl" />
            </button>
          </div>
        )}
      </div>
      <p className="md:hidden text-left px-6 py-4 text-sm">10 Hours</p>
    </div>
  );
}

export default Card;
