import SideNavbar from "../../../components/SideNavbar";
import React from "react";
import Link from "next/link";
import buildClient from "../../../hooks/build";
import { useRouter } from "next/router";
const FacultyDeanPage = ({ programs }) => {
  const router = useRouter();
  const { headId } = router.query;
  const links = [
    {
      text: "Departments Report",
         href: `  /headofdepartment/${headId}/headrrport`,
      icon: "/icons/report.svg",
      alt: "programs",
    },
  ];
  return (
    <>
      <>
        <SideNavbar links={links} />
        <div className="bg-sky-900 min-h-screen flex flex-col items-center w-full pl-20">
          {programs.deanName ? (
            <div className="flex flex-col  mt-5 p-8 w-2/3 bg-white border-4 border-[#00b4ba] rounded-2xl justify-center">
              <h1 className="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
                <span className="text-transparent bg-clip-text bg-gradient-to-r to-blue-500 from-sky-300">
                  Welcome back
                </span>{" "}
                Dr. {programs.deanName}
              </h1>
              <p className="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">
                Here you can find all programs and their courses:
              </p>
            </div>
          ) : null}
          <div
            id="programs"
            className="flex  mb-10 flex-col mt-20  p-8 w-2/3 bg-white border-4 border-[#00b4ba] rounded-2xl justify-center"
          >
            <h1 className="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
              All Programs
            </h1>
            <div className="flex flex-wrap  justify-around text-center">
              {programs.map((program) => (
                <div
                  key={program._id}
                  className=" md:w-[40%]  sm:w-full p-10 m-5 bg-gray-200 p-6 bg-white border-2 border-blue-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
                >
                  <div>
                    <Link href="#" passHref>
                      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        {program.name}
                      </h5>
                    </Link>
                    <h6 className="text-bold italic text-2xl text-sky">
                      Program courses:
                    </h6>
                    {program.courses.map((course) => (
                      <p key={course}>◾ {course}</p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </>
    </>
  );
};

export async function getServerSideProps(context) {
  const client = buildClient(context)

  const {headId} = context.query;
     const response = await client.get(
      `/api/prgservice/departments/show/${headId}`
    );
  // const response = await axios.get(
  //   `http://localhost:8080/api/prgservice/departments/show?email=a.badawy@feng.bu.edu.eg`
  // );
  const programs = response.data.data.programsIds;

  // Fetch course names for each program
  const updatedPrograms = await Promise.all(
    programs.map(async (program) => {
      const courses = await Promise.all(
        program.coursesIds.map(async (courseId) => {
          const courseResponse = await client.get(
            `/api/assessment/programs/${program._id}/courses/${courseId}`
          );
          return courseResponse.data.data.name;
        })
      );

      return { ...program, courses };
    })
  );

  return {
    props: {
      programs: updatedPrograms,
    },
  };
}

export default FacultyDeanPage;
