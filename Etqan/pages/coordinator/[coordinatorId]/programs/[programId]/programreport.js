import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";
import React, { useRef } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import buildClient from "../../../../../hooks/build";
import ShowMatrixComponent from "./../../../../../components/Matrix2";
import { useRouter } from "next/router";
import ABETCourseAssessmentReport from "./../../../../../components/Table";
export default function PDF(newObj) {
  const router = useRouter();
  const { programId, coordinatorId } = router.query;
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
      pdf.save("co-ordinator-report.pdf");

      toast.success("PDF downloaded");
    } catch {
      toast.error("Error downloading PDF. Check your internet connection!");
    }
  };

  console.log(newObj.program);
  return (
    <>
      <div ref={pdfRef} className="container mt-5 mx-auto">
        <div className="flex justify-between mb-12 ">
          <img
            src="/benhalogo.jpg"
            alt="Benha Logo"
            className=" top-0 right-0 w-40 h-40 mt-8 mr-8"
          />
          <div className="mt-10">
                 <h1 className="flex justify-center font-bold">
          Ministry of Higher Education
        </h1>
        <h1 className="flex justify-center font-bold">Benha university</h1>
        <h1 className="flex justify-center font-bold">
          Faculty of Engineering at Shoubra
        </h1>
        </div>
          <img
            src="/shoubralogo.jpg"
            alt="Shoubra Logo"
            className=" top-0 left-0 w-40 h-40 mt-8 ml-8"
          />
          
        </div>

    <h1 className="flex justify-center mb-4  text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl ">
         
          <span className=" text-blue-800">ABET Program Assessment</span>
          
          Report
        </h1>
    
    <div className="mt-12">
        <h1 className="flex justify-center my-4 text-2xl font-bold">
          Program name: {newObj.program.name}
        </h1>
        <h1 className="flex justify-center my-4 text-2xl font-bold">
          Student Outcomes Table
        </h1>
        <ABETCourseAssessmentReport
          studentoutcomes={newObj.studentoutcomes}
          Students={newObj.Students}
        />
        {/* <h1 className="mb-4 text-2xl font-extrabold text-gray-900 dark:text-white md:text-4xl lg:text-5xl">
          <span className="ml-4 text-blue-400">Table </span>{" "}
          <span>Explanation:</span>
        </h1> */}
        <p className="text-lg font-normal text-black lg:text-xl py-2 mx-8 mr-8 text-justify dark:text-gray-400">
          The table presented provides an overview of the student outcomes
          within a university program and evaluates their attainment based on
          performance indices (PIs). Each row in the table corresponds to a
          specific student outcome and includes information on the performance
          index (PI) associated with that outcome. The PI serves as a measure of
          student understanding and mastery of the respective outcome.
          Additionally, a target is established to determine the minimum
          threshold that students need to pass in order to consider the PI as
          understood.
        </p>
        <p className="text-lg font-normal text-black lg:text-xl py-2 mx-8 mr-8 text-justify dark:text-gray-400">
          To assess the attainment of each student outcome, the table also
          displays the average results of students for each PI. By analyzing
          these results, it becomes possible to determine if the students have
          successfully passed the PIs associated with a particular outcome. If
          the students have met or exceeded the target for all PIs, it indicates
          that the outcome has been attained. However, if any of the PIs fall
          below the target, it suggests that the outcome has not been fully
          achieved.
        </p>
        <p className="text-lg font-normal text-black lg:text-xl py-2 mx-8 mr-8 text-justify dark:text-gray-400">
          This table serves as a valuable tool for evaluating the overall
          performance of the program and provides insights into the extent to
          which students have mastered the intended learning outcomes. By
          identifying areas where students may be struggling, necessary
          adjustments can be made to enhance the learning process and ensure the
          attainment of all student outcomes within the program.
        </p>
        <h1 className="flex justify-center mt-8 text-2xl font-bold text-center">
          Mapping of the {newObj.program.name.toUpperCase()} program curriculum
          to performance indicators (I = Introductory, R = Reinforced, E =
          Emphasized, I is used for formative assessment while R and E are used
          for summative assessment).
        </h1>
        <ShowMatrixComponent
          courses={newObj.coursesWithIreData}
          so={newObj.studentoutcomes}
        />
        {/* <h1 className="mb-4 text-2xl font-extrabold text-gray-900 dark:text-white md:text-4xl lg:text-5xl">
          <span className="ml-4 text-blue-400">Matrix </span>{" "}
          <span>Explanation:</span>
        </h1> */}
        <p className="text-lg font-normal text-black lg:text-xl py-2 mx-8 mr-8 text-justify dark:text-gray-400">
          The Course-Student Outcome Mapping Matrix provides a comprehensive
          overview of the relationship between the courses offered in the
          program and the student outcomes they help achieve. In the matrix,
          each row represents a course, and each column corresponds to a student
          outcome. The intersection of a course and a student outcome indicates
          whether the course contributes to the achievement of that particular
          outcome. A checkmark(x) is used to signify the alignment between a
          course and a student outcome.{" "}
        </p>
        <p className="text-lg font-normal text-black lg:text-xl py-2 mx-8 text-justify dark:text-gray-400">
          By examining this matrix, it becomes clear which student outcomes are
          addressed by each course. This information facilitates curriculum
          design and evaluation, allowing for a more targeted approach to
          teaching and learning. Faculty members can identify the courses that
          heavily emphasize certain outcomes and ensure that the program as a
          whole provides a well-rounded educational experience.
        </p>
        <p className="text-lg font-normal text-black lg:text-xl py-2 mx-8 mr-8 text-justify dark:text-gray-400">
          The Course-Student Outcome Mapping Matrix serves as a powerful visual
          representation of the interplay between courses and student outcomes.
          It aids in curriculum planning, assessment, and continuous improvement
          efforts, ultimately enhancing the overall quality and effectiveness of
          the program.{" "}
        </p>{" "}
      </div>

      <div className="flex flex-col items-center justify-center my-8">
        <button
          className="btn btn-primary text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          onClick={downloadPDF}
        >
          Download Report
        </button>
        <Link
          className="btn btn-primary text-white bg-gray-500 hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          href={`/coordinator/${coordinatorId}/dashboard`}
        >
          Back to your program
        </Link>
      </div>
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  const client = buildClient(context)
  const { programId } = context.query;

  const sosPromise = client.get(
    `/api/prgservice/programs/${programId}/sos`
  );
  const programResponsePromise = client.get(
    `/api/prgservice/programs/${programId}`
  );
  const coursesResponsePromise = client.get(
    `/api/assessment/programs/${programId}/courses`
  );
  const studentsPromise = client.get(
    `/api/prgservice/programs/${programId}/students`
  );

  const [sos, programResponse, coursesResponse, students] = await Promise.all([
    sosPromise,
    programResponsePromise,
    coursesResponsePromise,
    studentsPromise,
  ]);

  const studentoutcomes = sos.data;
  const Students = students.data;
  const program = programResponse.data.data;

  const courses = coursesResponse.data;
  const coursesWithIreData = [];

  await Promise.all(
    courses.data.map(async (course) => {
      if (course.ireAssessment) {
        const ireResponse = await client.get(
          `/api/assessment/courses/${course._id}/ires/${course.ireAssessment}`
        );
        const ireData = ireResponse.data.data;

        const courseWithIreData = {
          ...course,
          ireData: ireData.ireData,
        };

        coursesWithIreData.push(courseWithIreData);
      }
    })
  );

  const newObj = {
    studentoutcomes,
    Students,
    coursesWithIreData,
    program,
  };

  return {
    props: newObj,
  };
}
