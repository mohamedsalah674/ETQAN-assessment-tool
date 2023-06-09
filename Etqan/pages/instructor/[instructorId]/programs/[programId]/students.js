import SideNavbar from "../../../../../components/SideNavbar";
import { useRouter } from "next/router";
import buildClient from "../../../../../hooks/build";
const ProgramPage = ({ programId, studentList }) => {
  const router = useRouter();
  const { instructorId } = router.query;
  const links = [
    {
      text: "Back to your program",
      href: `/instructor/${instructorId}/programs/${programId}`,
      icon: "/icons/back.svg",
      alt: "programs",
    },
  ];
  return (
    <div>
      <SideNavbar links={links} />
      <div className="bg-gray-800 min-h-screen py-8 bg-no-repeat bg-right-bottom bg-[length:600px_300px] bg-[url('/backgrounds/Students-cuate.svg')]">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-white mb-4 text-center">
            Student list for the program
          </h1>

          {studentList.length > 0 ? (
            <table className="w-full bg-white rounded shadow">
              <thead>
                <tr className="bg-gray-700 text-white">
                  <th className="py-2 px-4">Name</th>
                  <th className="py-2 px-4">Email</th>
                  <th className="py-2 px-4">Student ID</th>
                </tr>
              </thead>
              <tbody>
                {studentList.map((student, index) => (
                  <tr
                    key={student._id}
                    className={`bg-gray-100 ${
                      index !== studentList.length - 1 &&
                      "border-b border-black"
                    }`}
                  >
                    <td className="py-2 px-2 text-center">{student.name}</td>
                    <td className="py-2 px-2 text-center">{student.email}</td>
                    <td className="py-2 px-2 text-center">
                      {student.student_id}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-white">No students found for this program.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export async function getServerSideProps(context) {
const client=buildClient(context)
  const { programId } = context.query;

  
  try {
    const response = await client.get(
      `/api/prgservice/programs/${programId}/students`
    );
    const studentList = response.data.data;

    return {
      props: {
        programId,
        studentList,
      },
    };
  } catch (error) {
    console.log("Error fetching data:", error);

    return {
      props: {
        programId,
        studentList: [], // Set studentList to an empty array or handle the error appropriately
      },
    };
  }
}

export default ProgramPage;
