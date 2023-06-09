import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React, { useRef } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import buildClient from "../../../../../../../hooks/build";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Context } from "../../../../../../../context";


export default function PDF(newObj) {
  const router = useRouter();
  const [randomLetters, setRandomLetters] = useState([]);
  const { courseId, programId, instructorId } = router.query;
  useEffect(() => {
    const letters = ["I", "R", "E"];
    const generatedLetters = [];

    for (let i = 0; i < newObj.studentoutcomes.data.length; i++) {
      const randomIndex = Math.floor(Math.random() * letters.length);
      const randomLetter = letters[randomIndex];
      generatedLetters.push(randomLetter);
    }

    setRandomLetters(generatedLetters);
  }, []);

  function getCurrentDate() {
    const today = new Date();
    return today.toLocaleDateString();
  }
  const pdfRef = useRef();
  const downloadPDF = async () => {
    try {
      const input = pdfRef.current;
      const canvas = await html2canvas(input);
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4", true);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);

      // Adjust the imgX and imgY variables to start from the top-left corner
      const imgX = 0;
      const imgY = 0;

      pdf.addImage(
        imgData,
        "PNG",
        imgX,
        imgY,
        imgWidth * ratio,
        imgHeight * ratio
      );
      pdf.save("Course-report.pdf");

      toast.success("PDF downloaded");
    } catch {
      toast.error("Error downloading PDF. Check your internet connection!");
    }
  };
  //   console.log(newObj.studentoutcomes.data);
  return (
    <>
      <div ref={pdfRef} className="container mx-auto my-4 border p-5 ">
        <div className="flex justify-between">
          <img
            src="/benhalogo.jpg"
            alt="Benha Logo"
            className=" top-0 right-0 w-40 h-40 mt-2 mr-2"
          />

          <img
            src="/shoubralogo.jpg"
            alt="Shoubra Logo"
            className=" top-0 left-0 w-40 h-40 mt-2 ml-2"
          />
        </div>
        {/* <h1 className="text-5xl font-extrabold flex justify-center dark:text-white">
          ABET Report
        </h1> */}

        <h1 className="flex justify-center font-semibold">
          Ministry of Higher Education
        </h1>
        <h1 className="flex justify-center font-semibold">Benha university</h1>
        <h1 className="flex justify-center font-semibold">
          Faculty of Engineering at Shoubra
        </h1>
        <h1 className="flex justify-center mt-8 mb-16 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl ">
          <span className="  text-blue-800">ABET Course Assessment </span>
          Report
        </h1>

        <div className="flex justify-center my-8">
          <table className="w-3/4 rounded border border-black mx-auto">
            <thead>
              <tr>
                <th colSpan="100%" className="bg-gray-800 text-white py-2 px-4">
                  COURSE INFORMATION
                </th>
              </tr>
            </thead>
            <tbody className="border border-black">
              <tr>
                <td className="bg-gray-400 py-2 px-4 border border-black">
                  Department:
                </td>
                <td className="bg-blue-200 py-2 px-4 border border-black">
                  Computer Science
                </td>
              </tr>
              <tr>
                <td className="bg-gray-400 py-2 px-4 border border-black">
                  Course Title:
                </td>
                <td className="bg-blue-200 py-2 px-4 border border-black">
                  {newObj.courses.data.name}
                </td>
              </tr>
              <tr>
                <td className="bg-gray-400 py-2 px-4 border border border-black">
                  Course Code:
                </td>
                <td className="bg-blue-200 py-2 px-4 border border border-black">
                  {newObj.courses.data.code}
                </td>
              </tr>
              <tr>
                <td className="bg-gray-400 py-2 px-4 border border border-black">
                  Name:
                </td>
                <td className="bg-blue-200 py-2 px-4   border border-black">
                  {newObj.courses.data.instructorName}
                </td>
              </tr>
              <tr>
                <td className="bg-gray-400 py-2 px-4   border border-black">
                  Role:
                </td>
                <td className="bg-blue-200 py-2 px-4   border border-black">
                  Instructor
                </td>
              </tr>
              <tr>
                <td className="bg-gray-400 py-2 px-4   border border-black">
                  Total no. of students:
                </td>
                <td className="bg-blue-200 py-2 px-4   border border-black">
                  {newObj.students.data.length}
                  {/* {console.log(newObj.students.data.length)} */}
                </td>
              </tr>

              <tr>
                <td className="bg-gray-400 py-2 px-4   border border-black">
                  Date of report:
                </td>
                <td className="bg-blue-200 py-2 px-4   border border-black">
                  {getCurrentDate()}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="flex justify-center my-8">
          <table className="w-3/4 rounded border border-black mx-auto">
            <thead>
              <tr>
                <th
                  colSpan="100%"
                  className="bg-gray-800 text-center text-white border border-black py-2 px-4"
                >
                  {newObj.program.name.toUpperCase()} PROGRAM STUDENT OUTCOMES
                </th>
              </tr>
              <tr>
                <th className="bg-gray-500 text-white py-2 border border-black px-4">
                  SOs
                </th>
                <th className="bg-gray-500 text-white py-2 border border-black px-4">
                  Descriptions
                </th>
                <th className="bg-gray-500 text-white border border-black py-2 px-4">
                  Outcomes assigned to your course (I,R,E)
                </th>
              </tr>
            </thead>
            <tbody>
              {newObj.studentoutcomes.data.map((outcome, index) => (
                <tr>
                  <td className="bg-blue-200 py-2 px-4 border border-black text-center">
                    Student Outcome {outcome.SO_number}
                  </td>
                  <td className="bg-blue-200 py-2 px-4 border border-black text-center">
                    {outcome.description}
                  </td>
                  <td className="bg-blue-200 py-2 px-4 border border-black text-center">
                    {newObj.ireSosArray[index]
                      ? newObj.ireSosArray[index].pis.map((pi, idx) => (
                          <div>
                            {" "}
                            {pi.piValue != " " && pi.piValue ? (
                              <div>
                                PI {idx + 1}:{" "}
                                {pi.piValue == "empty"
                                  ? "Not Applicable"
                                  : pi.piValue}
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                        ))
                      : null}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center">
        <button
          className="btn btn-primary text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          onClick={downloadPDF}
        >
          Download Report
        </button>
        <Link
          className="btn btn-primary text-white bg-gray-500 hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          href={`/instructor/${instructorId}/programs/${programId}/courses/${courseId}/`}
        >
          Back to your course
        </Link>
      </div>
    </>
  );
}

export async function getServerSideProps(req) {
  const client =  buildClient(req)
  const { courseId, programId } = req.query;
  console.log(courseId);
  const allcourses = await client.get(
    `/api/assessment/programs/${programId}/courses/${courseId}`
  );
  const program = await client.get(
    `/api/prgservice/programs/${programId}`
  );
  const studs = await client.get(
    `/api/prgservice/programs/${programId}/students`
  );
  const sos = await client.get(
    `/api/prgservice/programs/${programId}/sos`
  );
  const studentoutcomes = sos.data;
  const students = studs.data;
  const courses = allcourses.data;
  const ireId = courses.data.ireAssessment;
  const ire = await client.get(
    `/api/assessment/courses/${courseId}/ires/${ireId}`
  );
  // console.log(ire.data.data.ireData.ireSosArray);
  const newObj = {
    courses,
    students,
    studentoutcomes,
    ireSosArray: ire.data.data.ireData.ireSosArray,
    program: program.data.data,
  };

  return {
    props: newObj,
  };
}
