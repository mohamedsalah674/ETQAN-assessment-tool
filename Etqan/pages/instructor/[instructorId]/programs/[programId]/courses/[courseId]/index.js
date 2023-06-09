import SideNavbar from "../../../../../../../components/SideNavbar";
import { useRouter } from "next/router";
import { useRef, useState } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import buildClient from "../../../../../../../hooks/build";
const Course = ({ course }) => {
  const router = useRouter();
  const { programId, courseId, instructorId } = router.query;

  const links = [
    {
      text: "CLOs",
      href: `/instructor/${instructorId}/programs/${programId}/courses/${courseId}/clos/`,
      icon: "/icons/2.svg",
      alt: "courses",
    },
    {
      text: "Course Topics",
      href: `/instructor/${instructorId}/programs/${programId}/courses/${courseId}/topics/`,
      icon: "/icons/4.svg",
      alt: "programs",
    },
    {
      text: "Course Assessment",
      href: `/instructor/${instructorId}/programs/${programId}/courses/${courseId}/courseassessment/`,
      icon: "/icons/assessment.svg",
      alt: "programs",
    },
    {
      text: "Assessment methods",
      href: `/instructor/${instructorId}/programs/${programId}/courses/${courseId}/assessmentmethods/`,
      icon: "/icons/matrix.svg",
      alt: "programs",
    },
    {
      text: "Students marks",
      href: `/instructor/${instructorId}/programs/${programId}/courses/${courseId}/students-marks/`,
      icon: "/icons/report.svg",
      alt: "programs",
    },
    {
      text: "CLO Surveys",
      href: `/instructor/${instructorId}/programs/${programId}/courses/${courseId}/survey/`,
      icon: "/icons/survey.svg",
      alt: "programs",
    },
    {
      text: "Course Survey",
      href: `/instructor/${instructorId}/programs/${programId}/courses/${courseId}/createoverallsurvey/`,
      icon: "/icons/stats.svg",
      alt: "programs",
    },
    {
      text: "Survey results",
      href: `/instructor/${instructorId}/programs/${programId}/courses/${courseId}/survey-responses/`,
      icon: "/icons/stats2.svg",
      alt: "programs",
    },
    {
      text: "Answer Samples",
      href: `/instructor/${instructorId}/programs/${programId}/courses/${courseId}/newuploadsamples`,
      icon: "/icons/samples.svg",
      alt: "programs",
    },
    {
      text: "back to courses",
      href: `/instructor/${instructorId}/programs/${programId}/`,
      icon: "/icons/back.svg",
      alt: "programs",
    },
    // Add more links as needed
  ];
  function getMyVariable() {
    return { variable };
  }
  var variable = "id";
  const [isExpanded, setIsExpanded] = useState(false);
  const [originalHeight, setOriginalHeight] = useState(null);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const handleTextRef = (node) => {
    if (node && !originalHeight) {
      setOriginalHeight(node.clientHeight);
    }
  };

  function handleClickReport2() {
    router.push(
      `/instructor/${instructorId}/programs/${programId}/courses/${courseId}/assessmentreport`
    );
  }
  function handleClickReport() {
    router.push(
      `/instructor/${instructorId}/programs/${programId}/courses/${courseId}/viewspecs`
    );
  }
  const abetTicks = ["Achieved", "", "", "", "", "", "", ""];
  course.selectedAbetCri.forEach((el) => {
    abetTicks[el] = "X";
  });

  const pdfRef = useRef();
  const downloadPDF = () => {
    const input = pdfRef.current;
    html2canvas(input).then((canvas) => {
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
      pdf.save("Course specifications-report.pdf");
    });
  };
  return (
    <>
      <SideNavbar links={links} />
      <div className="min-h-screen mx-auto px-4 sm:px-6 lg:px-8 bg-gray-900 flex justify-center">
        <div className="p-16 w-5/6 ml-56 ">
          <div className="p-8 bg-sky-100 shadow mt-24 bg-[url('/backgrounds/course.svg')]">
            {" "}
            <div className="grid grid-cols-1 md:grid-cols-3">
              {" "}
              <div className="grid grid-cols-3 text-center order-last md:order-first mt-20 md:mt-0">
                {" "}
                <div>
                  {" "}
                  <p className="mx-auto font-bold text-gray-700 text-xl">
                    {course.credits}
                  </p>{" "}
                  <p className="text-gray-800 font-bold">Credits</p>{" "}
                </div>{" "}
              </div>{" "}
              <div className="relative">
                {" "}
                <div className="mx-auto relative mt-6 sm:mt-0">
                  <div className="w-32 h-32 sm:w-48 sm:h-48 bg-indigo-100 rounded-full shadow-2xl absolute inset-x-0 top-0 -mt-16 sm:-mt-24 flex items-center justify-center mx-auto text-indigo-500">
                    <img
                      className="w-16 h-16 sm:w-24 sm:h-24"
                      src="/icons/courses.svg"
                      alt="Courses Icon"
                    />
                  </div>
                </div>{" "}
              </div>{" "}
              <div className="flex flex-col">
                <button
                  onClick={() => handleClickReport()}
                  className="mx-4 mt-8 bg-gray-800 text-white py-2 px-4 rounded-md hover:bg-blue-900 transition duration-200"
                >
                  Download Course Specifications
                </button>
                <button
                  onClick={() => handleClickReport2()}
                  className="mx-4 mt-8 bg-gray-800 text-white py-2 px-4 rounded-md hover:bg-blue-900 transition duration-200"
                >
                  Download Assessment Report
                </button>
              </div>
            </div>{" "}
            <div className="mt-20 text-center border-b pb-12">
              {" "}
              <h1 className="text-6xl text-gray-700 font-bold">
                {course.name}{" "}
                <span className="font-light text-black"> ({course.code})</span>
              </h1>{" "}
            </div>{" "}
            <div className="flex justify-center mt-8"></div>
            <div className="my-6 md:my-12 lg:my-16 bg-white border rounded-lg shadow-lg px-6 md:px-10 lg:px-12 py-6 md:py-10 lg:py-12">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">
                Information about the course:
              </h2>
              <p className="text-base md:text-lg lg:text-xl mb-6">
                {course.information}
              </p>
            </div>
            <div className="border my-12 bg-white rounded-lg shadow-lg p-6 md:p-10 lg:p-12">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">
                Course goals:
              </h2>
              <p
                className={`text-base md:text-lg lg:text-xl mb-6 leading-relaxed overflow-hidden ${
                  isExpanded ? "" : "max-h-14"
                }`}
                ref={handleTextRef}
              >
                {course.goals}
              </p>
              {originalHeight && (
                <button
                  className="text-blue-500 hover:underline focus:outline-none"
                  onClick={toggleExpand}
                >
                  {isExpanded ? "Show Less" : "Show More"}
                </button>
              )}
            </div>
            <div className="border my-12 bg-white rounded-lg shadow-lg p-6 md:p-10 lg:p-12">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">
                Course topics:
              </h2>
              {course.topics.map((topic) => (
                <h1
                  className={`text-base md:text-lg lg:text-xl mb-6 leading-relaxed overflow-hidden`}
                  ref={handleTextRef}
                >
                  {topic.name}
                </h1>
              ))}
            </div>
            <div className="mt-12 flex flex-col justify-center">
              {" "}
              <div className="text-black text-center lg:px-16">
                Text book:{" "}
                <div className="text-indigo-700"> {course.textBook}</div>
              </div>{" "}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
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

export default Course;
