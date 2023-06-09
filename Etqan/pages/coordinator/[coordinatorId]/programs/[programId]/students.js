import { BiEdit, BiTrashAlt, BiSearch } from "react-icons/bi";
import { toast } from "react-toastify";
import SectionHeading from "../../../../../components/SectionHeading";
import buildClient from "../../../../../hooks/build";
import Link from "next/link";
import SideNavbar from "../../../../../components/SideNavbar";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function students(props) {

  const router = useRouter();
  const { programId, coordinatorId, role } = router.query;

  const url = `/api/prgservice/programs/${programId}/students`;
  const links = [
    {
      text: "Back to your program",
      href: `/coordinator/${coordinatorId}/dashboard`,
      icon: "/icons/back.svg",
      alt: "programs",
    },
    // Add more links as needed
  ];
  const [searchText, setSearchText] = useState("");
  const [studentsList, setStudents] = useState(props.studentData);
  console.log("daa", studentsList);

  const deleteStudent = async (id) => {
    const client = buildClient('')
    try {
      console.log(id);
      const { data } = await client.delete(url + "/" + id);
      // setStudents("");
      // setStudents((prev) => [prev, data.data]);
      const currentStudents = studentsList.filter(
        (student) => student._id !== id
      );
      setStudents(currentStudents);
      toast.success("Student deleted successfully!"); // Display success message
      console.log(studentsList);

      console.log(data);
      // setCLOs((prev) => prev.filter((CLO) => CLO._id !== id));

      console.log(data.message);
    } catch (error) {
      toast.error("Error deleting student. Check your internet connection!");
      console.log(error);
    }
  };
  useEffect(() => {
    console.log("theLIST", studentsList);
  }, [studentsList]);
  const filteredStudents = studentsList.filter(
    (student) =>
      student.name.toLowerCase().includes(searchText.toLowerCase()) ||
      student.student_id.toLowerCase().includes(searchText.toLowerCase()) ||
      student.email.toLowerCase().includes(searchText.toLowerCase())
  );
  if (!studentsList || studentsList.length == 0)
    return (
      <>
        {/* <div className="bg-black"> */}
        <SectionHeading text="Students List" />
        <SideNavbar links={links} />
        <div className="bg-blue-200 pt-20 pb-20 min-h-screen">
          <div className="mr-10 items-baseline space-x-4 flex justify-end">
            <Link
              href={`/coordinator/${coordinatorId}/programs/${programId}/addstudent`}
              className="text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:bg-gradient-to-bl  focus:outline-none dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
            >
              ADD STUDENT
            </Link>
          </div>

          <div className=" w-1/2 m-auto mt-20 ">
            <SectionHeading text="No Students Yet" />
          </div>
        </div>
      </>
    );
  else
    return (
      <>
        {/* <div className="bg-black"> */}
        <SectionHeading text="Students List" />
        <SideNavbar links={links} />
        <div className="bg-blue-200 pt-20 pb-20 min-h-screen">
          <div className="mr-10 items-baseline space-x-4 flex justify-end ">
            <Link
              href={`/coordinator/${coordinatorId}/programs/${programId}/addstudent`}
              className="text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:bg-gradient-to-bl  focus:outline-none dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
            >
              ADD STUDENT
            </Link>
          </div>
          <div className="flex justify-end">
            {" "}
            <div className="relative flex items-center mr-[20%]">
              <input
                type="text"
                placeholder="Search by name, ID, or email"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                className="pl-8 pr-4 py-2 border border-gray-300 rounded-md w-64"
              />
              <BiSearch className="absolute left-3 text-gray-400" />
            </div>
          </div>
          <div className=" w-[60%] m-auto mt-12 ">
            <table className="text-sm text-left text-blue-100 w-full">
              <thead className="text-xs text-black uppercase bg-blue-600 border-b border-blue-400 w-full">
                <tr className="bg-gray-800 w-full">
                  <th
                    scope="col"
                    className="px-6 py-3 text-center text-gray-200"
                  >
                    Student Name
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-center text-gray-200"
                  >
                    Student ID
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
                    year
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
                {filteredStudents.map((student) => (
                  <tr
                    key={student._id}
                    className="bg-gray-50 border-b border-blue-400 hover:bg-gray-300"
                  >
                    <th scope="row" className="text-center">
                      <span className="text-center ml-2 font-semibold">
                        {student.name}
                      </span>
                    </th>
                    <td className="px-6 py-4 text-center">
                      {student.student_id}
                    </td>
                    <td className="px-6 py-4 text-center">{student.email}</td>
                    <td className="px-6 py-4 text-center">
                      {" "}
                      <button className="cursor">
                        <span className="bg-green-500 hover:bg-green-700 text-white px-5 py-1 rounded-full">
                          {student.year}
                        </span>
                      </button>
                    </td>{" "}
                    <td className="px-16 py-2 flex justify-around gap-5">
                      <div className="flex">
                        <Link
                          href={`/coordinator/${coordinatorId}/programs/${programId}/editstudent?studentId=${student._id}`}
                          className="mr-2"
                        >
                          <BiEdit size={25} color={"rgb(34,197,94)"}></BiEdit>
                        </Link>
                        <button
                          className="hover:bg-red-800 rounded"
                          onClick={() => deleteStudent(student._id)}
                        >
                          <BiTrashAlt
                            size={25}
                            color={"rgb(244,63,94)"}
                          ></BiTrashAlt>{" "}
                        </button>
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
  const { programId } = context.query;
  const client = buildClient(context)
  const url = `/api/prgservice/programs/${programId}/students`;
  const { data } = await client.get(url);
  console.log(data);
  // console.log([...data.CLOs]);
  return {
    props: {
      studentData: data.data,
    },
  };
};
