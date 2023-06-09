import Link from "next/link";
import axios from "axios";
import { useEffect, useState } from "react";
export default function MatrixComponent({ studentclo, studentmarks }) {
  console.log(studentclo);
  const [studentClos, setStudentClos] = useState(studentclo);
  useEffect(() => {
    setStudentClos(studentclo);
  }, [studentclo]);

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
                {studentClos.data.map((index) => (
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
              {studentmarks.data[0].quizzes.map((quiz, index) => (
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
                  {allmarksTicks.map((clo) => (
                    <td className="px-6 py-4 text-center">{clo}</td>
                  ))}{" "}
                  {quiz.CLOs.forEach((el) => {
                    allmarksTicks[el - 1] = "";
                  })}
                </tr>
              ))}
              {studentmarks.data[0].midterms.map((midterm, index) => (
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
                  {allmarksTicks.map((clo) => (
                    <td className="px-6 py-4 text-center">{clo}</td>
                  ))}{" "}
                  {midterm.CLOs.forEach((el) => {
                    allmarksTicks[el - 1] = "";
                  })}
                </tr>
              ))}
              {studentmarks.data[0].progress_exams.map(
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
                    {allmarksTicks.map((clo) => (
                      <td className="px-6 py-4 text-center">{clo}</td>
                    ))}{" "}
                    {progress_exam.CLOs.forEach((el) => {
                      allmarksTicks[el - 1] = "";
                    })}
                  </tr>
                )
              )}
              {studentmarks.data[0].projects.map((project, index) => (
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
                  {allmarksTicks.map((clo) => (
                    <td className="px-6 py-4 text-center">{clo}</td>
                  ))}{" "}
                  {project.CLOs.forEach((el) => {
                    allmarksTicks[el - 1] = "";
                  })}
                </tr>
              ))}
              {studentmarks.data[0].labs.map((lab, index) => (
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
                  {allmarksTicks.map((clo) => (
                    <td className="px-6 py-4 text-center">{clo}</td>
                  ))}{" "}
                  {lab.CLOs.forEach((el) => {
                    allmarksTicks[el - 1] = "";
                  })}
                </tr>
              ))}
              {studentmarks.data[0].assignments.map((assignment, index) => (
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
                  {allmarksTicks.map((clo) => (
                    <td className="px-6 py-4 text-center">{clo}</td>
                  ))}{" "}
                  {assignment.CLOs.forEach((el) => {
                    allmarksTicks[el - 1] = "";
                  })}
                </tr>
              ))}
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
                {studentmarks.data[0].final_exam.CLOs.forEach((el) => {
                  allmarksTicks[el - 1] = "X";
                })}
                {allmarksTicks.map((clo) => (
                  <td className="px-6 py-4 text-center">{clo}</td>
                ))}{" "}
                {studentmarks.data[0].final_exam.CLOs.forEach((el) => {
                  allmarksTicks[el - 1] = "";
                })}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      {studentmarks.data[0].quizzes.map((quiz) => {
        console.log("num:", quiz);
      })}
    </>
  );
}
