import Link from "next/link";
import buildClient from "../../../../../hooks/build.js";
import { useRouter } from "next/router";
import SideNavbar from "../../../../../../components/SideNavbar.js";

function ProgramPage({ courses, programData }) {
  const router = useRouter();
  const { programId, userId, role } = router.query;
  const links = [
    {
      text: "Program SOs",
      href: `/coordinator/${coordinatorId}/programs/${programId}/SOs`,
      icon: "/icons/courses.svg",
      alt: "courses",
    },
    {
      text: "Program Report",
      href: `/programs/${programId}/programreport?${authParams}`,
      icon: "/icons/report.svg",
      alt: "courses",
    },
    {
      text: "Program Students",
      href: `/programs/${programId}/students?${authParams}`,
      icon: "/icons/students.svg",
      alt: "courses",
    },
    {
      text: "Courses vs SOs Matrix",
      href: `/programs/${programId}/matrix2?${authParams}`,
      icon: "/icons/matrix.svg",
      alt: "courses",
    },
    {
      text: "Graph",
      href: `/programs/${programId}/graph?${authParams}`,
      icon: "/icons/graph.svg",
      alt: "courses",
    },
    {
      text: "Back to your programs",
      href: `/dashboard/?${authParams}`,
      icon: "/icons/back.svg",
      alt: "programs",
    },
    // Add more links as needed
  ];

  const handleVisitCourse = (courseId, programId, userId, role) => {
    router.push(
      `/courses/${courseId}?programId=${programId}&userId=${userId}&role=${role}`
    ); // Append programId and courseId to the URL
  };

  if (!courses) {
    return <div>Error...</div>;
  }

  return (
    <div>
      <SideNavbar links={links} />
      <div className="min-h-screen bg-gray-900 flex flex-col items-center w-full pl-20">
        <h1 className="text-3xl font-bold text-white mt-8 mb-4">
          Program: {programData.name}
        </h1>
        <div className="pl-40 pr-20 flex flex-wrap justify-around text-center w-full">
          {courses.map((course) => (
            <div key={course._id} className="  md:w-1 lg:w-1/2 xl:w-1/3 p-4">
              <div className="bg-white rounded-lg shadow p-4 h-60 ">
                <h2 className="text-xl italic mb-2">
                  <span className="font-bold">Course:</span> {course.name}
                </h2>
                <p className="text-gray-700 mb-4">
                  <span className="font-bold">Course Code:</span> {course.code}
                </p>
                <p className="text-gray-700 mb-4">
                  <span className="font-bold">Course Credits:</span>{" "}
                  {course.credits}
                </p>

                <button
                  onClick={() =>
                    handleVisitCourse(course._id, programId, userId, role)
                  }
                  className="inline-flex items-center px-3 py-2 mt-3 text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:outline-none dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                >
                  Visit Course Page
                  <svg
                    aria-hidden="true"
                    className="w-4 h-4 ml-2 -mr-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const client = buildClient(context)
  const programId = context.query.programId;
  const instructorId = "646ead70ce98a802578ced39";
  try {
    const coursesResponse = await client.get(
      `/api/assessment/instructors/${instructorId}/programs/${programId}`
    );
    const courses = coursesResponse.data.data.courses;
    const programData = coursesResponse.data.data.programData;
    return {
      props: {
        courses,
        programData,
      },
    };
  } catch (error) {
    console.log("Error fetching program data:", error);
    return {
      props: {
        courses: null,
        error,
      },
    };
  }
}

export default ProgramPage;
