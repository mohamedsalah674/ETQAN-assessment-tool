import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import jsPDF from "jspdf";
import Link from "next/link";
import { useRouter } from "next/router";
import html2canvas from "html2canvas";
import { useRef } from "react";
import buildClient from "../../../../../../../hooks/build";


function viewspecs({ course }) {
  const router = useRouter();
  const { programId, instructorId, courseId } = router.query;

  const abetTicks = ["Achieved", "", "", "", "", "", "", ""];
  course.selectedAbetCri.forEach((el) => {
    abetTicks[el] = "X";
  });

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
      pdf.save("CourseSpecs-report.pdf");

      toast.success("PDF downloaded");
    } catch {
      toast.error("Error downloading PDF. Check your internet connection!");
    }
  };
  return (
    <>
      <div ref={pdfRef} className=" mb-8 pl-8">
        <div className="flex justify-between">
          <img
            src="/benhalogo.jpg"
            alt="Benha Logo"
            className="w-40 h-40 mt-2 mr-2"
          />
          <div className="flex flex-col pt-9 text-xl ">
                <h1 className="flex justify-center font-bold">
          Ministry of Higher Education
        </h1>
        <h1 className="flex justify-center font-bold">Benha University</h1>
        <h1 className="flex justify-center font-bold">
          Faculty of Engineering at Shoubra
        </h1>
        </div>
          <img
            src="/shoubralogo.jpg"
            alt="Shoubra Logo"
            className="w-40 h-40 mt-2 ml-2"
          />
            
  
        </div>
      
        <h1 className="flex justify-center my-16 text-4xl font-extrabold text-gray-900 dark:text-white">
          <span className="text-blue-800">Course Specifications</span> Report
        </h1>

        <div className="flex justify-center ">
          {" "}
          <div className="grid grid-cols-2 gap-4 w-3/4 ">
            <div className="bg-blue-600 p-4 font-bold text-3xl text-center flex items-center">
              <p className="text-white text-center mx-auto pb-3 pt-1 py-3">
                Name
              </p>
            </div>
            <div className="p-4 bg-gray-200 font-bold text-center justify-center text-2xl">
              <p>{course.name}</p>
            </div>
            {course.code ? (
              <>
                {" "}
                <div className="bg-blue-600 p-4 font-bold text-3xl text-center flex items-center">
                  <p className="text-white text-center mx-auto pb-3 pt-1">
                    Code
                  </p>
                </div>
                <div className="p-4 bg-gray-200 font-bold text-center justify-center text-2xl">
                  <p>{course.code}</p>
                </div>
              </>
            ) : null}
            {course.credits ? (
              <>
                {" "}
                <div className="bg-blue-600 p-4 font-bold text-3xl text-center flex items-center">
                  <p className="text-white text-center mx-auto pb-3 pt-1">
                    Credits
                  </p>
                </div>
                <div className="p-4 bg-gray-200 font-bold text-center justify-center text-2xl">
                  <p>{course.credits}</p>
                </div>
              </>
            ) : null}
            {course.instructorName ? (
              <>
                {" "}
                <div className="bg-blue-600 p-4 font-bold text-3xl text-center flex items-center">
                  <p className="text-white text-center mx-auto pb-3 pt-1">
                    Instructor Name
                  </p>
                </div>
                <div className="p-4 bg-gray-200 font-bold text-center justify-center text-2xl">
                  <p>{course.instructorName}</p>
                </div>
              </>
            ) : null}
            {course.textBook ? (
              <>
                {" "}
                <div className="bg-blue-600 p-4 font-bold text-3xl text-center flex items-center">
                  <p className="text-white text-center mx-auto pb-3 pt-1">
                    TextBook
                  </p>
                </div>
                <div className="p-4 bg-gray-200 font-bold text-center justify-center text-2xl">
                  <p>{course.textBook}</p>
                </div>
              </>
            ) : null}
            {course.information ? (
              <>
                {" "}
                <div className="bg-blue-600 p-4 font-bold text-3xl text-center flex items-center">
                  <p className="text-white text-center mx-auto pb-3 pt-1">
                    Specific Course Information
                  </p>
                </div>
                <div className="p-4 bg-gray-200 font-bold text-center justify-center text-2xl">
                  <p>{course.information}</p>
                </div>
              </>
            ) : null}
            {abetTicks ? (
              <>
                <div className="bg-blue-600 p-4 font-bold text-3xl text-center flex items-center flex justify-center">
                  <p className="text-white text-center mx-auto pb-3 pt-1">
                    Specific Course Information
                  </p>
                </div>
                <div className="p-4 bg-gray-200 font-bold text-center justify-center text-2xl">
                  <table className="min-w-full border border-separate border-spacing-1 rounded-lg border-black my-4 bg-white">
                    <thead>
                      <tr className="bg-gray-400">
                        <th className="pt-3 pb-5 px-2 text-center">
                          Student Outcomes
                        </th>
                        <th className="py-3 px-4">1</th>
                        <th className="py-3 px-4">2</th>
                        <th className="py-3 px-4">3</th>
                        <th className="py-3 px-4">4</th>
                        <th className="py-3 px-4">5</th>
                        <th className="py-3 px-4">6</th>
                        <th className="py-3 px-4">7</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="bg-gray-200">
                        {abetTicks.map((tick) => (
                          <td key={tick} className="pb-3 px-4">
                            {tick}
                          </td>
                        ))}
                      </tr>
                    </tbody>
                  </table>
                </div>
              </>
            ) : null}
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center mt-8 mb-16">
        <button
          className="btn btn-primary text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          onClick={downloadPDF}
          style={{ fontSize: "20px", padding: "10px 20px" }}
        >
          Download Report
        </button>
        <Link
          className="btn btn-primary text-white bg-gray-500 hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          href={`/instructor/${instructorId}/programs/${programId}/courses/${courseId}/`}
        >
          Back to your course
        </Link>{" "}
      </div>{" "}
    </>
  );
}

export async function getServerSideProps(context) {
const client=buildClient(context)
  const { courseId, programId } = context.query; // Access the programId from the query object

  const course = await client.get(
    `/api/assessment/programs/${programId}/courses/${courseId}`
  );
  console.log(course);

  return {
    props: {
      course: course.data.data,
      courseid: courseId,
    },
  };
}

export default viewspecs;
