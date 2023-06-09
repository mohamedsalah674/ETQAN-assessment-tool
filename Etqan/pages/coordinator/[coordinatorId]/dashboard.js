import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";
import buildClient from "../../../hooks/build";
import SideNavbar from "../../../components/SideNavbar" 
import { FiEdit, FiTrash } from "react-icons/fi";

function Instructor({
  coordinatorData,
  coordinatorProgramData,
  courses,
  loading,
  error,
}) {
  const [allcourses, setAllcourses] = useState(courses);
  const router = useRouter();
  const coordinatorId = router.query.coordinatorId;
  // const { coordinatorId } = router.query;
  const programId = coordinatorProgramData._id;
  const role = "coordinator";
  const links = [
    {
      text: "Program SOs",
      href: `/coordinator/${coordinatorId}/programs/${programId}/SOs`,
      icon: "/icons/courses.svg",
      alt: "courses",
    },
    {
      text: "Program Instructors",
      href: `/coordinator/${coordinatorId}/programs/${programId}/instructors`,
      icon: "/icons/instructors.svg",
      alt: "courses",
    },
    {
      text: "Program Report",
      href: `/coordinator/${coordinatorId}/programs/${programId}/programreport`,
      icon: "/icons/report.svg",
      alt: "courses",
    },
    {
      text: "Program Students",
      href: `/coordinator/${coordinatorId}/programs/${programId}/students`,
      icon: "/icons/students.svg",
      alt: "courses",
    },
    {
      text: "Courses vs SOs Matrix",
      href: `/coordinator/${coordinatorId}/programs/${programId}/matrix2`,
      icon: "/icons/matrix.svg",
      alt: "courses",
    },
    {
      text: "Graph",
      href: `/coordinator/${coordinatorId}/programs/${programId}/graph`,
      icon: "/icons/graph.svg",
      alt: "courses",
    },

    {
      text: "Profile",
      href: `/coordinator/${coordinatorId}/profile`,
      icon: "/icons/profile.svg",
      alt: "programs",
    },
    // Add more links as needed
  ];

  if (loading) {
    // Display a loading spinner or skeleton UI while fetching data
    return <div>Loading...</div>;
  }

  if (error) {
    // Display an error message if an error occurred
    return <div>Error: {error}</div>;
  }

  const handleEditCourse = (courseId) => {
    // Navigate to the edit course page
    router.push(
      `/coordinator/${coordinatorId}/programs/${programId}/editcourse?courseId=${courseId}`
    );
  };

  const handleDeleteCourse = async (courseId) => {
    const client = buildClient('')
    try {
      await client.delete(
        `/api/assessment/programs/${programId}/courses/${courseId}`
      );

      // Remove the deleted course from the courses state
      setAllcourses((prevCourses) =>
        prevCourses.filter((course) => course._id !== courseId)
      );

      toast.success("Course deleted successfully!"); // Display success message
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete course."); // Display error message
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen pl-20 bg-cover bg-[url('/backg.svg')]">
      <SideNavbar links={links} />
       <div className="w-[65%]">
        {allcourses.length == 0 ? (
          <div className="my-12">
            <h1 className="text-3xl mb-4 text-white font-bold italic">
              There are no courses added to this{" "}
              <span className="bg-blue-500 rounded px-2">program!</span>
            </h1>
          </div>
        ) : (
          <div className="bg-[#FFF] border-2 border-blue-500 w-full rounded-md shadow-lg p-8 mt-8 md:w-full">
            <h1 className="text-4xl mb-6 font-semibold">
              <span className="py-4 italic bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text inline-block">
                Program:
              </span>{" "}
              {coordinatorProgramData.name}
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 ">
              {allcourses.map((course) => (
                <div
                  className="bg-gray-100 p-6 rounded-md shadow-md relative hover:scale-105 transition-transform"
                  key={course._id}
                >
                  <div className="flex justify-end absolute top-4 right-4">
                    <button
                      className="text-blue-500 mx-2 cursor-pointer"
                      onClick={() => handleEditCourse(course._id)}
                    >
                      <FiEdit />
                    </button>
                    <button
                      className="text-red-500 cursor-pointer"
                      onClick={() => handleDeleteCourse(course._id)}
                    >
                      <FiTrash />
                    </button>
                  </div>
                  <h2 className="text-2xl mb-2 font-medium italic">
                    {course.name}
                  </h2>
                  <p className="text-gray-700 mb-4">{course.code}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const client = buildClient(context)
  const coordinatorId = context.query.coordinatorId;

  try {
    const [coordinatorResponse, programsResponse] = await Promise.all([
      client.get(
        `/api/prgservice/coordinators/${coordinatorId}`
      ),
      client.get(`/api/prgservice/programs/`),
    ]);

    const coordinatorData = coordinatorResponse.data.data;
    const programsData = programsResponse.data.data;

    const coordinatorProgramData = programsData.find(
      (program) => program.coordinator === coordinatorId
    );

    const coursesResponse = await client.get(
      `/api/assessment/programs/${coordinatorProgramData._id}/courses`
    );
    const courses = coursesResponse.data.data;

    return {
      props: {
        coordinatorData,
        coordinatorProgramData,
        courses,
        loading: false,
        error: null,
      },
    };
  } catch (error) {
    console.error("Error fetching data:", error);

    return {
      props: {
        coordinatorData: null,
        coordinatorProgramData: null,
        courses: [],
        loading: false,
        error: "Error occurred while fetching coordinator data",
      },
    };
  }
}

export default Instructor;
