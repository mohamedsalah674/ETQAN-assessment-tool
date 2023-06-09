import React, { useRef } from "react";
import jsPDF from "jspdf";
import Chart from "chart.js/auto";
import html2canvas from "html2canvas";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import ABETCourseAssessmentReport from "../components/Table";
import ShowMatrixComponent from "../components/Matrix2";
import VulnChart from "../components/Graph";

export default function PDF({ programAndSos }) {
  console.log("ppp", programAndSos);
  const data1 = [15, 12, 6, 7, 4];
  // const data2 = [20, 13, 6, 8, 9];

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
      pdf.save("headofdepartment-report.pdf");
    });
  };

  const getAttainment = (avg) => {
    return avg >= 70 ? "Yes" : "No";
  };
  const calculateAverage = (arr) => {
    let sum = 0;
    for (var i = 0; i < arr.length; i++) {
      sum += arr[i].SoAchievementPercent;
    }
    return sum / arr.length;
  };
  const calculateAverage2 = (arr) => {
    let sum = 0;
    for (var i = 0; i < arr.length; i++) {
      sum += arr[i].target;
    }
    return (sum / arr.length) * 100;
  };

  // const getAttainment = (arr) => {
  //   for (let i = 0; i < arr.length; i++) {
  //     arr[i].avg = calculateAverage(arr.PIs);
  //     if (arr[i].avg < 70) {
  //       return "No";
  //     }
  //   }
  //   return "Yes";
  // };
  const studentoutcomes = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  // const length = newObj.programs.data.length;
  const result = [];
  // let x;
  // newObj.programs.data.map((program) => {
  //   newObj.studentoutcomes.data.map((so) => {
  //     x = Math.round(calculateAverage(so.PIs));
  //   });
  //   result.push(x);
  // });
  // console.log(result);
  // const result2 = [];
  let x2;
  programAndSos.map((item) => {
    // .map((so) => {
    x2 = Math.round(calculateAverage(item.sosData));
    console.log(x2);
    // console.log(so.PIs.target);
    // });
    result.push(x2);
  });
  const x = result.length;
  const data2 = Array(x).fill(70);

  console.log(data2);

  // console.log(result2);
  // console.log(length);
  return (
    <>
      <div ref={pdfRef} className="container mt-5 border p-5">
        <div className="flex justify-between">
          <img
            src="/benhalogo.jpg"
            alt="Benha Logo"
            className="absolute top-0 right-0 w-40 h-40 mt-2 mr-2"
          />
          <img
            src="/shoubralogo.jpg"
            alt="Shoubra Logo"
            className="absolute top-0 left-0 w-40 h-40 mt-2 ml-2"
          />
        </div>
        <h1 className="flex justify-center font-semibold">
          Ministry of Higher Education
        </h1>
        <h1 className="flex justify-center font-semibold">Benha university</h1>
        <h1 className="flex justify-center font-semibold">
          Faculty of Engineering at Shoubra
        </h1>
        <h1 className="flex justify-center mb-8 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl ">
          <span className=" text-blue-800">ABET</span>
          Report
        </h1>

        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 shadow-xl mt-9">
            <thead className="text-xs text-black font-bold uppercase dark:text-gray-400 bg-blue-400">
              <tr>
                <th scope="col" className=" border-blue-600 border-2 px-6 py-2">
                  Program name / SO
                </th>
                {studentoutcomes.map((outcome) => (
                  <th
                    scope="col"
                    className="border-blue-600 border-2 text-center py-2"
                  >
                    SO {outcome}
                  </th>
                ))}
                <th scope="col" className=" border-blue-600 border-2 px-6 py-2">
                  Avg of SOs
                </th>
              </tr>
            </thead>
            <tbody>
              {programAndSos.map((item, index) => (
                <tr className="bg-gray-200 dark:bg-gray-800">
                  <td className="border-blue-400 border-2 px-6 py-4 text-black">
                    {item.programData.name}
                  </td>
                  {/* {item.sosData.map((so, index) => (
                    <td
                      className={`border-blue-400 border-2 px-6 py-4 text-black relative ${
                        isNaN(so.SoAchievementPercent) ||
                        so.SoAchievementPercent
                          ? "bg-gray-600 "
                          : "hover:bg-gray-400"
                      }`}
                    >
                      {isNaN(so.SoAchievementPercent) ||
                      so.SoAchievementPercent ? (
                        <span className="absolute inset-0 flex items-center justify-center"></span>
                      ) : (
                        so.SoAchievementPercent
                      )}
                    </td>
                  ))}{" "} */}
                  {studentoutcomes.map((outcome, index3) => (
                    <td
                      className={`border-blue-400 border-2 px-6 py-4 text-black relative ${
                        !item.sosData[index3] ||
                        isNaN(item.sosData[index3].SoAchievementPercent)
                          ? "bg-gray-600 "
                          : "hover:bg-gray-400"
                      }`}
                    >
                      {item.sosData[index3]
                        ? item.sosData[index3].SoAchievementPercent
                        : null}
                    </td>
                  ))}
                  <td
                    className={`border-blue-400 border-2 px-6 py-4 text-black relative ${
                      !result[index] || isNaN(result[index])
                        ? "bg-gray-600 "
                        : "hover:bg-gray-400"
                    }`}
                  >
                    {!result[index] || isNaN(result[index]) ? (
                      <span className="absolute inset-0 flex items-center justify-center"></span>
                    ) : (
                      result[index]
                    )}{" "}
                  </td>{" "}
                </tr>
              ))}
            </tbody>
          </table>
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 shadow-xl mt-9">
            <thead className="text-xs text-black font-bold uppercase dark:text-gray-400 bg-blue-400">
              <tr>
                <th scope="col" className=" border-blue-600 border-2 px-6 py-2">
                  Program name
                </th>
                <th scope="col" className=" border-blue-600 border-2 px-6 py-2">
                  Coordinator
                </th>
                <th scope="col" className=" border-blue-600 border-2 px-6 py-2">
                  Number of SOs
                </th>
                <th scope="col" className=" border-blue-600 border-2 px-6 py-2">
                  Acheived ABET criteria
                </th>
              </tr>
            </thead>
            <tbody>
              {/* {console.log(newObj.programs.data)} */}
              {programAndSos.map((item, index) => (
                <tr className="bg-gray-200 dark:bg-gray-800">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium border-blue-400 border-2 whitespace-nowrap text-black dark:text-white"
                  >
                    {item.programData.name}
                  </th>
                  <td className="border-blue-400 border-2 px-6 py-4 text-black">
                    {item.programData.coordinator}
                  </td>
                  <td className="border-blue-400 border-2 px-6 py-4 text-black">
                    {item.programData.sosIds.length}
                  </td>
                  <td className="border-blue-400 border-2 px-6 py-4 text-black">
                    {getAttainment(result[index])}
                  </td>
                  {/* <td className="px-6 py-4">yes</td> */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h1 className="mb-4 text-2xl font-extrabold text-gray-900 dark:text-white md:text-4xl mt-2 lg:text-5xl">
          <span className=" text-blue-400">Report</span> Description:
        </h1>
        <p className="text-lg font-normal text-black lg:text-xl dark:text-gray-400">
          This comprehensive report aims to provide a detailed analysis of each
          program offered by our university, specifically focusing on whether
          they have achieved the ABET (Accreditation Board for Engineering and
          Technology) Criterion 3. Criterion 3 evaluates the extent to which our
          programs are successful in achieving their intended student outcomes.
          To determine if a program has met ABET Criterion 3, we employ a
          rigorous assessment process. We calculate the average performance
          indicator (PI) for each student outcome and assess whether at least
          70% of students have achieved a minimum average of 70% in their
          respective PIs. If all student outcomes within a program meet or
          exceed this threshold, we consider the program to have achieved ABET
          Criterion 3. However, if even one student outcome falls short of the
          required percentage, the program is deemed not to have met the
          criterion. This report serves as a crucial resource for the head of
          the department, providing a comprehensive review of the learning
          process within our university. By examining the achievement of ABET
          Criterion 3, the report offers valuable insights into the
          effectiveness of our programs in fulfilling the desired student
          outcomes. It also enables the department head to identify areas for
          improvement and initiate necessary actions to address any shortcomings
          identified. Furthermore, this report can be shared with the ABET board
          to provide them with an overview of our learning processes. The
          information presented here will help the board assess the overall
          progress of our university and make informed decisions regarding ABET
          accreditation. It is essential that we strive to meet the criterion,
          but if any program falls short, it serves as a call to action for our
          university staff to redouble their efforts in order to achieve the
          necessary standards in subsequent years. By addressing the identified
          issues and implementing necessary corrective measures, we aim to
          continually enhance the quality of education and ensure our programs
          meet the rigorous standards set by ABET.
        </p>
        <br></br>
        <h2 className="text-4xl font-extrabold dark:text-white">Summary</h2>

        <div className="text-lg font-normal lg:text-xl dark:text-gray-400 ">
          This report offers a comprehensive assessment of our programs
          compliance with ABET Criterion 3, providing valuable insights to the
          head of the department and the ABET board. It serves as a vital tool
          in evaluating the effectiveness of our learning processes, guiding
          decisions regarding accreditation, and driving continuous improvement
          in our educational offerings.
        </div>
        <VulnChart data1={result} data2={data2} />
      </div>
      <div className="flex flex-col items-center justify-center">
        <button
          className="btn btn-primary text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          onClick={downloadPDF}
        >
          Download Report
        </button>
      </div>
    </>
  );
}

export async function getServerSideProps() {
  const programsResponse = await axios.get(
    "http://localhost:8080/api/prgservice/programs/"
  );
  const programsData = programsResponse.data.data;

  const programPromises = programsData.map(async (program) => {
    const programSosResponse = await axios.get(
      `http://localhost:8080/api/prgservice/programs/${program._id}/sos`
    );
    const programSosData = programSosResponse.data.data;
    return { programData: program, sosData: programSosData };
  });

  const programAndSos = await Promise.all(programPromises);

  return {
    props: { programAndSos },
  };
}
