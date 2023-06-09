import SectionHeading from "../SectionHeading";

function WelcomeSection(props) {
  const instructor_name = props.instructor.name;

  return (
    <>
      <div className="flex flex-col mt-5 p-8 w-2/3 bg-white border-4 border-[#00b4ba] rounded-2xl justify-center">
        <h1 className="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
          <span className="text-transparent bg-clip-text bg-gradient-to-r to-blue-500 from-sky-300">
            Welcome back
          </span>{" "}
          Dr. {instructor_name}
        </h1>
        <p className="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">
          Here you can find all your courses and prossgrams:
        </p>
      </div>
    </>
  );
}

export default WelcomeSection;
