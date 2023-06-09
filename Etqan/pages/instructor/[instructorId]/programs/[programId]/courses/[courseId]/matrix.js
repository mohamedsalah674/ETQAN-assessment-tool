import Link from "next/link";
import SectionHeading from "../../../components/SectionHeading";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import buildClient from "../../../../../../../hooks/build";
export default function showmatrix(newObj) {
  const router = useRouter();
  const { courseId, programId, instructorId } = router.query;
  console.log(newObj);

  const [studentClos, setStudentClos] = useState(newObj.studentclo);
  useEffect(() => {}, [studentClos]);
  let allmarksTicks = new Array(studentClos.data.length);

  for (var i = 0; i < studentClos.data.length; i++) {
    allmarksTicks[i] = "";
  }

  // newObj.studentmarks.data[0].quizzes[0].CLOs.forEach((el) => {
  //   allmarksTicks[el - 1] = "X";
  // });

  return (
    <>
      <div className="min-h-screen bg-blue-200 overflow-x-auto">
        <SectionHeading text="Course vs CLOs matrix" />
        <div className="flex justify-center m-auto mt-20">
          <table className="text-sm text-left text-blue-100 ">
            <thead className="text-xs text-white uppercase bg-blue-600 border-b border-blue-400">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-center border-2 border-black "
                >
                  CLO
                </th>
                {studentClos.data.clos.map((index) => (
                  <th
                    scope="col"
                    className="px-6 py-3 text-center border-2 border-black "
                  >
                    CLO {index.CLO_number}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {newObj.studentmarks[0]
                ? newObj.studentmarks[0].quizzes.map((quiz, index) => (
                    <tr className="bg-gray-700 border-b border-blue-400 hover:bg-gray-800">
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-blue-50 whitespace-nowrap dark:text-blue-100"
                      >
                        quiz {index + 1}
                      </th>
                      {/* {final_examTicks.map((clo) => {
                  // {newObj.studentmarks.data[0].quizzes[0].CLOs.map((clo) => {
                  console.log("CLO:", clo);
                  <td className="px-6 py-4 text-center">{clo}</td>;
                })}{" "} */}
                      {quiz.CLOs.forEach((el) => {
                        allmarksTicks[el - 1] = "X";
                      })}
                      {studentClos.data.clos.map((clo, index4) => (
                        <td className="px-6 py-4 text-center">
                          {allmarksTicks[index4]}
                        </td>
                      ))}
                      {/* {allmarksTicks.map((clo) => (
                    <td className="px-6 py-4 text-center">{clo}</td>
                  ))}{" "} */}
                      {quiz.CLOs.forEach((el) => {
                        allmarksTicks[el - 1] = "";
                      })}
                    </tr>
                  ))
                : null}
              {newObj.studentmarks[0]
                ? newObj.studentmarks[0].midterms.map((midterm, index) => (
                    <tr className="bg-gray-700 border-b border-blue-400 hover:bg-gray-800">
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-blue-50 whitespace-nowrap dark:text-blue-100"
                      >
                        midterm {index + 1}
                      </th>
                      {midterm.CLOs.forEach((el) => {
                        allmarksTicks[el - 1] = "X";
                      })}
                      {studentClos.data.clos.map((clo, index4) => (
                        <td className="px-6 py-4 text-center">
                          {allmarksTicks[index4]}
                        </td>
                      ))}{" "}
                      {midterm.CLOs.forEach((el) => {
                        allmarksTicks[el - 1] = "";
                      })}
                    </tr>
                  ))
                : null}
              {newObj.studentmarks[0]
                ? newObj.studentmarks[0].progress_exams.map(
                    (progress_exam, index) => (
                      <tr className="bg-gray-700 border-b border-blue-400 hover:bg-gray-800">
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium text-blue-50 whitespace-nowrap dark:text-blue-100"
                        >
                          progress exam {index + 1}
                        </th>
                        {progress_exam.CLOs.forEach((el) => {
                          allmarksTicks[el - 1] = "X";
                        })}
                        {studentClos.data.clos.map((clo, index4) => (
                          <td className="px-6 py-4 text-center">
                            {allmarksTicks[index4]}
                          </td>
                        ))}{" "}
                        {progress_exam.CLOs.forEach((el) => {
                          allmarksTicks[el - 1] = "";
                        })}
                      </tr>
                    )
                  )
                : null}
              {newObj.studentmarks[0]
                ? newObj.studentmarks[0].projects.map((project, index) => (
                    <tr className="bg-gray-700 border-b border-blue-400 hover:bg-gray-800">
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-blue-50 whitespace-nowrap dark:text-blue-100"
                      >
                        project {index + 1}
                      </th>
                      {/* {final_examTicks.map((clo) => {
                  // {newObj.studentmarks.data[0].quizzes[0].CLOs.map((clo) => {
                  console.log("CLO:", clo);
                  <td className="px-6 py-4 text-center">{clo}</td>;
                })}{" "} */}
                      {project.CLOs.forEach((el) => {
                        allmarksTicks[el - 1] = "X";
                      })}
                      {studentClos.data.clos.map((clo, index4) => (
                        <td className="px-6 py-4 text-center">
                          {allmarksTicks[index4]}
                        </td>
                      ))}{" "}
                      {project.CLOs.forEach((el) => {
                        allmarksTicks[el - 1] = "";
                      })}
                    </tr>
                  ))
                : null}
              {newObj.studentmarks[0]
                ? newObj.studentmarks[0].labs.map((lab, index) => (
                    <tr className="bg-gray-700 border-b border-blue-400 hover:bg-gray-800">
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-blue-50 whitespace-nowrap dark:text-blue-100"
                      >
                        lab {index + 1}
                      </th>
                      {lab.CLOs.forEach((el) => {
                        allmarksTicks[el - 1] = "X";
                      })}
                      {studentClos.data.clos.map((clo, index4) => (
                        <td className="px-6 py-4 text-center">
                          {allmarksTicks[index4]}
                        </td>
                      ))}{" "}
                      {lab.CLOs.forEach((el) => {
                        allmarksTicks[el - 1] = "";
                      })}
                    </tr>
                  ))
                : null}
              {newObj.studentmarks[0]
                ? newObj.studentmarks[0].assignments.map(
                    (assignment, index) => (
                      <tr className="bg-gray-700 border-b border-blue-400 hover:bg-gray-800">
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium text-blue-50 whitespace-nowrap dark:text-blue-100"
                        >
                          assignment {index + 1}
                        </th>
                        {/* {final_examTicks.map((clo) => {
                  // {newObj.studentmarks.data[0].quizzes[0].CLOs.map((clo) => {
                  console.log("CLO:", clo);
                  <td className="px-6 py-4 text-center">{clo}</td>;
                })}{" "} */}
                        {assignment.CLOs.forEach((el) => {
                          allmarksTicks[el - 1] = "X";
                        })}
                        {studentClos.data.clos.map((clo, index4) => (
                          <td className="px-6 py-4 text-center">
                            {allmarksTicks[index4]}
                          </td>
                        ))}{" "}
                        {assignment.CLOs.forEach((el) => {
                          allmarksTicks[el - 1] = "";
                        })}
                      </tr>
                    )
                  )
                : null}
              <tr className="bg-gray-700 border-b border-blue-400 hover:bg-gray-800">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-blue-50 whitespace-nowrap dark:text-blue-100"
                >
                  Final exam{" "}
                </th>
                {/* {final_examTicks.map((clo) => {
                  // {newObj.studentmarks.data[0].quizzes[0].CLOs.map((clo) => {
                  console.log("CLO:", clo);
                  <td className="px-6 py-4 text-center">{clo}</td>;
                })}{" "} */}
                {newObj.studentmarks[0]
                  ? newObj.studentmarks[0].final_exam.CLOs.forEach((el) => {
                      allmarksTicks[el - 1] = "X";
                    })
                  : null}
                {studentClos.data.clos.map((clo, index4) => (
                  <td className="px-6 py-4 text-center">
                    {allmarksTicks[index4]}
                  </td>
                ))}{" "}
                {newObj.studentmarks[0]
                  ? newObj.studentmarks[0].final_exam.CLOs.forEach((el) => {
                      allmarksTicks[el - 1] = "";
                    })
                  : null}
              </tr>
            </tbody>
          </table>
        </div>
        <div className="flex flex-col items-center justify-center my-8">
          <Link
            className="btn btn-primary text-white bg-gray-500 hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            href={`/instructor/${instructorId}/programs/${programId}/courses/${courseId}/`}
          >
            Back to your course
          </Link>
        </div>{" "}
      </div>
      {newObj.studentmarks[0]
        ? newObj.studentmarks[0].quizzes.map((quiz) => {
            console.log("num:", quiz);
          })
        : null}
    </>
  );
}
export async function getServerSideProps(context) {
const client=buildClient(context)
  const { courseId } = context.query;

  try {
    const [studentCloResponse, studentMarksResponse] = await Promise.all([
      client.get(
        `/api/assessment/courses/${courseId}/clos`
      ),
      client.get(
        `/api/assessment/courses/${courseId}/marks`
      ),
    ]);

    const studentclo = studentCloResponse.data;
    const studentmarks = studentMarksResponse.data.data;

    return {
      props: {
        studentclo,
        studentmarks,
      },
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      props: {
        studentclo: null,
        studentmarks: [],
      },
    };
  }
}
