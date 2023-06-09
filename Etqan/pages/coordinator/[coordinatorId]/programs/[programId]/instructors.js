import { BiEdit, BiTrashAlt } from "react-icons/bi";
import SectionHeading from "../../../../../components/SectionHeading";
import buildClient from "../../../../../hooks/build";
import Link from "next/link";
import SideNavbar from "../../../../../components/SideNavbar";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function instructors(props) {
  const client =  buildClient('')
  const router = useRouter();
  const { programId, coordinatorId, role } = router.query;

  const url = `/api/assessment/instructors`;
  const links = [
    {
      text: "Back to your program",
      href: `/coordinator/${coordinatorId}/dashboard`,
      icon: "/icons/back.svg",
      alt: "programs",
    },
    // Add more links as needed
  ];
  const [instructorsList, setInstructors] = useState(props.instructorsData);

  const deleteInstructor = async (id) => {
    try {
      const currentInstructors = instructorsList.filter(
        (instructor) => instructor._id !== id
      );
      const wanted = instructorsList.filter(
        (instructor) => instructor._id == id
      );

      const filteredCourses = wanted[0].courses.filter(
        (course) => !props.programData.coursesIds.includes(course)
      );

      wanted[0].courses = filteredCourses;

      console.log("wanted", currentInstructors);

      const { data } = await client.put(`${url}/${id}`, wanted[0]);
      setInstructors(currentInstructors);
      toast.success("Instructor deleted from this program successfully");
      console.log(data.message);
    } catch (error) {
      toast.error("Error deleting Instructor. Check your internet connection!");
      console.log(error);
    }
  };

  const editInstructor = async (id) => {};
  useEffect(() => {}, [instructorsList]);
  if (!instructorsList || instructorsList.length == 0)
    return (
      <>
        <SectionHeading text="Instructors List" />
        <SideNavbar links={links} />
        <div className="bg-blue-200 pt-20 pb-20 min-h-screen">
          <div className="mr-10 items-baseline space-x-4 flex justify-end">
            <Link
              href={`/coordinator/${coordinatorId}/programs/${programId}/allinstructors`}
              className="text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:bg-gradient-to-bl  focus:outline-none dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
            >
              ADD INSTRUCTOR
            </Link>
          </div>
          <div className=" w-1/2 m-auto mt-20 ">
            <SectionHeading text="No Instructors Yet" />
          </div>
        </div>
      </>
    );
  else
    return (

      <div className="min-h-screen w-screen">
        {/* <div className="bg-black"> */}
        <SectionHeading text="Instructors List" />
        <SideNavbar links={links} />
        <div className="bg-blue-200 pt-20 pb-20 min-h-screen">
          <div className="mr-10 items-baseline space-x-4 flex justify-end">
            <Link
              href={`/coordinator/${coordinatorId}/programs/${programId}/allinstructors`}
              className="text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:bg-gradient-to-bl  focus:outline-none dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
            >
              ADD INSTRUCTOR
            </Link>
          </div>
          <div className=" w-[70%] m-auto mt-20 ">
            <table className="w-full text-sm text-left text-blue-100 ">
              <thead className="text-xs text-black uppercase bg-blue-600 border-b border-blue-400">
                <tr className="bg-gray-800">
                  <th
                    scope="col"
                    className="px-6 py-3 text-center text-gray-200"
                  >
                    {" "}
                    Instructor Name
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-center text-gray-200"
                  >
                    Instructor ID
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-center text-gray-200"
                  >
                    email
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-center text-gray-200"
                  >
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="text-black">
                {instructorsList.map((instructor) => (
                  <tr
                    key={instructor._id}
                    className="bg-gray-50 border-b border-blue-400 hover:bg-gray-300"
                  >
                    <th scope="row" className="text-center">
                      <span className="text-center ml-2 font-bold text-lg">
                        {instructor.name}
                      </span>
                    </th>
                    <td className="px-6 py-4 text-center">
                      {instructor.employee_id}
                    </td>
                    <td className="px-6 py-4 text-center">
                      {instructor.email}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex space-x-8 justify-center ">
                        <Link
                          href={`/coordinator/${coordinatorId}/programs/${programId}/assigncourses?instructorId=${instructor._id}`}
                        >
                              <BiEdit
                              size={30}
                              color={"rgb(34,197,94)"}
                            ></BiEdit>{" "}
                         </Link>
                        <button
                           onClick={() => deleteInstructor(instructor._id)}
                        >
                          {" "}
                           <BiTrashAlt
                            size={30}
                            color={"rgb(244,63,94)"}
                          ></BiTrashAlt>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
}

export const getServerSideProps = async (context) => {
  const client = buildClient(context)
  const { programId } = context.query;

  try {
    const programResponse = await client.get(
      `/api/prgservice/programs/${programId}`
    );
    const programData = programResponse.data.data;
    const programCoursesIds = programData.coursesIds;

    const instructorsResponse = await client.get(
      `/api/assessment/instructors/`
    );
    const instructorsData = instructorsResponse.data.data;

    const programInstructors = [];

    for (const instructor of instructorsData) {
      if (instructor.courses) {
        const teachesCourseInProgram = instructor.courses.some((courseId) =>
          programCoursesIds.includes(courseId.toString())
        );
        if (teachesCourseInProgram) {
          programInstructors.push(instructor);
        }
      }
    }

    return {
      props: {
        programData,
        instructorsData: programInstructors,
      },
    };
  } catch (error) {
    console.error(error);
    return {
      props: {
        instructorsData: [],
      },
    };
  }
};