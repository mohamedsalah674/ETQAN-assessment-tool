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
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const deleteInstructor = async (id) => {
    const client = buildClient('')
    try {
      const { data } = await client.delete(url + "/" + id);
      const currentInstructors = instructorsList.filter(
        (instructor) => instructor._id !== id
      );
      setInstructors(currentInstructors);
      toast.success("Instructor deleted successfully");
      console.log(data.message);
    } catch (error) {
      toast.error("Error deleting Instructor. Check your internet connection!");
      console.log(error);
    }
  };

  const editInstructor = async (id) => {};

  const handleSearch = (event) => {
    const searchText = event.target.value.toLowerCase();
    setSearchText(searchText);

    const filteredInstructors = instructorsList.filter(
      (instructor) =>
        instructor.name.toLowerCase().includes(searchText) ||
        instructor.email.toLowerCase().includes(searchText)
    );
    setSearchResults(filteredInstructors);
  };

  useEffect(() => {
    setSearchResults(instructorsList);
  }, [instructorsList]);

  if (!instructorsList || instructorsList.length == 0)
    return (
      <>
        <SectionHeading text="Instructors List" />
        <SideNavbar links={links} />
        <div className="bg-blue-200 pt-20 pb-20 min-h-screen">
          <div className=" w-1/2 m-auto mt-20 ">
            <SectionHeading text="No Instructors Yet" />
          </div>
        </div>
      </>
    );
  else
    return (
      <>
        {/* <div className="bg-black"> */}
        <SectionHeading text="Instructors List" />
        <SideNavbar links={links} />
        <div className="bg-blue-200 pt-20 pb-20 w-full min-h-screen">
          <div className=" w-full mt-20 mx-auto">
            <div className="mb-4 flex justify-end pr-[17.5%]">
              <input
                type="text"
                placeholder="Search instructors by name or email"
                value={searchText}
                onChange={handleSearch}
                className="px-4 py-2 border border-gray-300 rounded-md w-72"
              />
            </div>
            <table className="text-sm text-left mx-auto w-[65%] text-blue-100  ">
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
                {searchResults.map((instructor) => (
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
                      <div>
                        <Link
                          href={`/coordinator/${coordinatorId}/programs/${programId}/assigncourses?instructorId=${instructor._id}`}
                        >
                          <span className="focus:outline-none flex items-center justify-center text-white bg-green-700 hover:bg-green-800 font-medium rounded-lg text-xs px-5 py-2.5 mr-2 mb-2">
                            Assign Courses
                            <BiEdit
                              size={25}
                              color={"rgb(34,197,94)"}
                            ></BiEdit>{" "}
                          </span>
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </>
    );
}

export const getServerSideProps = async (context) => {
  const client = buildClient (context)
  const { programId } = context.query;

  try {
    const instructorsResponse = await client.get(
      `/api/assessment/instructors/`
    );
    const instructorsData = instructorsResponse.data.data;

    return {
      props: {
        instructorsData: instructorsData,
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
