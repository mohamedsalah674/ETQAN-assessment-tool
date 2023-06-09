import Image from "next/image";
function services() {
  return (
    <>
      <section id="services" className="bg-gray-50 pt-20 pb-28 px-8">
        <div className="max-w-6xl mx-auto  border-4 border-sky-500 rounded bg-white">
          <div className="text-center">
            <h1 className="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
              <span className="text-transparent bg-clip-text bg-gradient-to-r to-blue-700 from-sky-300">
                Our Services
              </span>
            </h1>
            <p className="pt-2 italic text-4xl">
              Each program on{" "}
              <span className="italic text-blue-500 font-bold">ETQAN</span> will
              have access to the following features and more!
            </p>
          </div>
          <div className="mt-24 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-20">
            <div className="relative">
              <div className="bg-blue-500 absolute z-10 inset-0 bg-gradient-to-r from-primary to-secondary shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 rounded-lg"></div>
              <div className="relative z-20 bg-white h-full rounded-md shadow-md">
                <Image
                  src="/home/services/files.svg"
                  className="rounded-md m-auto pt-5"
                  width="100"
                  height="100"
                />
                <div className="px-10 pb-6">
                  <h2 className="pt-3 text-center font-bold text-2xl  text-transparent bg-clip-text bg-gradient-to-r to-blue-700 from-sky-400">
                    Course Assessment
                  </h2>
                  <p className="pt-3 text-justify-low text-center text-xl">
                    ETQAN will provide an easy-to-use interface for instructors
                    to organize their coursework: student marks, course
                    assessment methods such as quizzes, projects, finals, and
                    labs.
                  </p>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="bg-blue-500 absolute z-10 inset-0 bg-gradient-to-r from-primary to-secondary shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 rounded-lg"></div>
              <div className="relative z-20 bg-white h-full rounded-md shadow-md">
                <Image
                  src="/home/services/stats.svg"
                  className="rounded-md m-auto pt-5"
                  width="100"
                  height="100"
                />
                <div className="px-10 pb-6">
                  <h2 className="pt-3 text-center font-bold text-2xl  text-transparent bg-clip-text bg-gradient-to-r to-blue-700 from-sky-400">
                    Insightful Statistics
                  </h2>
                  <p className="pt-3 text-justify-low text-center text-xl">
                    We provide insightful statistics as graphs, matrices and
                    charts to compare CLOs, SOs, PIs, ABET Criteria, and student
                    marks for each course.
                  </p>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="bg-blue-500 absolute z-10 inset-0 bg-gradient-to-r from-primary to-secondary shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 rounded-lg"></div>
              <div className="relative z-20 bg-white h-full rounded-md shadow-md">
                <Image
                  src="/home/services/report.svg"
                  className="rounded-md m-auto pt-5"
                  width="100"
                  height="100"
                />
                <div className="px-10 pb-6">
                  <h2 className="pt-3  text-center font-bold text-2xl  text-transparent bg-clip-text bg-gradient-to-r to-blue-700 from-sky-400">
                    Generating Reports
                  </h2>
                  <p className="pt-3 text-justify-low text-center text-xl">
                    Various reports are generated for each course or program.
                    Each report will contain valuable information and measures
                    that will help the teaching or administrative staff to take
                    decisions.
                  </p>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="bg-blue-500 absolute z-10 inset-0 bg-gradient-to-r from-primary to-secondary shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 rounded-lg"></div>
              <div className="relative z-20 bg-white h-full rounded-md shadow-md">
                <Image
                  src="/home/services/pdf.svg"
                  className="rounded-md m-auto pt-5"
                  width="100"
                  height="100"
                />
                <div className="px-10 pb-6">
                  <h2 className="pt-3 text-center font-bold text-2xl  text-transparent bg-clip-text bg-gradient-to-r to-blue-700 from-sky-400">
                    Export PDFs
                  </h2>
                  <p className="pt-3 text-justify-low text-center text-xl ">
                    Each user could print or download the course reports and
                    statistics as PDF.
                  </p>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="bg-blue-500 absolute z-10 inset-0 bg-gradient-to-r from-primary to-secondary shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 rounded-lg"></div>
              <div className="relative z-20 bg-white h-full rounded-md shadow-md">
                <Image
                  src="/home/services/survey.svg"
                  className="rounded-md m-auto pt-5"
                  width="100"
                  height="100"
                />
                <div className="px-10 pb-6">
                  <h2 className="pt-3 text-center font-bold text-2xl  text-transparent bg-clip-text bg-gradient-to-r to-blue-700 from-sky-400">
                    Student Surveys
                  </h2>
                  <p className="pt-3 text-justify-low text-center text-xl">
                    ETQAN will provide each course to have indirect assessment
                    for students by providing surveys that studnets could fill
                    to rate the course.
                  </p>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="bg-blue-500 absolute z-10 inset-0 bg-gradient-to-r from-primary to-secondary shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 rounded-lg"></div>
              <div className="relative z-20 bg-white h-full rounded-md shadow-md">
                <Image
                  src="/home/services/graph.svg"
                  className="rounded-md m-auto pt-5"
                  width="100"
                  height="100"
                />
                <div className="px-10 pb-6">
                  <h2 className="pt-3 text-center font-bold text-xl  text-transparent bg-clip-text bg-gradient-to-r to-blue-700 from-sky-400">
                    Quantifiable Measurements
                  </h2>
                  <p className="pt-3 text-justify-low text-center text-xl">
                    Each user could generate colorful and useful graphs that
                    highlight some indicators like student marks, course CLOs vs
                    time, course survey results, etc.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default services;
