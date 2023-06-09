import Link from "next/link";
import React, { useRef } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import buildClient from "../../../hooks/build";
import VulnChart from '../../../components/Graph'
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

  const studentoutcomes = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const result = [];
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

  return (
    <>
      <div ref={pdfRef} className="container mt-5 border p-5 mx-auto ">
        <div className="flex justify-between mb-12 ">
          <img
            src="/benhalogo.jpg"
            alt="Benha Logo"
            className=" top-0 right-0 w-40 h-40 mt-2 mr-2"
          />
          <div className="mt-12"> 
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
            className=" top-0 left-0 w-40 h-40 mt-2 ml-2"
          />
        </div>
       
        <h1 class="flex justify-center mb-8 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl ">
          <span class=" text-blue-800">ABET</span>
          Report
        </h1>

        <div class="relative overflow-x-auto ">
          <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400 shadow-xl mt-9">
            <thead class="text-xs text-black font-bold uppercase dark:text-gray-400 bg-blue-400">
              <tr>
                <th scope="col" class=" border-blue-600 border-2 px-6 py-2">
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
                <th scope="col" class=" border-blue-600 border-2 px-6 py-2">
                  Avg of SOs
                </th>
              </tr>
            </thead>
            <tbody>
              {programAndSos.map((item, index) => (
                <tr class="bg-gray-200 dark:bg-gray-800">
                  <td class="border-blue-400 border-2 px-6 py-4 text-black">
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
          <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400 shadow-xl mt-9">
            <thead class="text-xs text-black font-bold uppercase dark:text-gray-400 bg-blue-400">
              <tr>
                <th scope="col" class=" border-blue-600 border-2 px-6 py-2">
                  Program name
                </th>
                <th scope="col" class=" border-blue-600 border-2 px-6 py-2">
                  Coordinator
                </th>
                <th scope="col" class=" border-blue-600 border-2 px-6 py-2">
                  Number of SOs
                </th>
                <th scope="col" class=" border-blue-600 border-2 px-6 py-2">
                  Acheived ABET criteria
                </th>
              </tr>
            </thead>
            <tbody>
              {/* {console.log(newObj.programs.data)} */}
              {programAndSos.map((item, index) => (
                <tr class="bg-gray-200 dark:bg-gray-800">
                  <th
                    scope="row"
                    class="px-6 py-4 font-medium border-blue-400 border-2 whitespace-nowrap text-black dark:text-white"
                  >
                    {item.programData.name}
                  </th>
                  <td class="border-blue-400 border-2 px-6 py-4 text-black">
                    {item.programData.coordinator}
                  </td>
                  <td class="border-blue-400 border-2 px-6 py-4 text-black">
                    {item.programData.sosIds.length}
                  </td>
                  <td class="border-blue-400 border-2 px-6 py-4 text-black">
                    {getAttainment(result[index])}
                  </td>
                  {/* <td class="px-6 py-4">yes</td> */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h1 class="mb-4 text-2xl font-extrabold text-gray-900 dark:text-white md:text-4xl mt-2 lg:text-5xl">
          <span class=" text-blue-400">Report</span> Description:
        </h1>
        <p class="text-lg font-normal text-black lg:text-xl dark:text-gray-400">
          This report presents an analysis of student performance and learning
          progress in various programs offered by the institution, aiming to
          provide valuable insights to the dean regarding the effectiveness of
          the studying and learning process. The accompanying table displays all
          programs and their associated Student Outcome criteria, with
          intersecting cells indicating the percentage of students passing more
          than 70% of each SO. An average column showcases the overall program
          performance, while a graph compares the average with the targeted
          passing mark. This comprehensive analysis helps evaluate the learning
          process and determine if programs meet the standards required for ABET
          accreditation, enabling informed decisions for continuous improvement.
        </p>
        <br></br>
        <h2 class="text-4xl font-extrabold dark:text-white">Summary</h2>

        <div class="text-lg font-normal lg:text-xl dark:text-gray-400 ">
          This report offers a comprehensive assessment of our programs
          compliance with ABET Criterion 3, providing valuable insights to the
          head of the department and the ABET board. It serves as a vital tool
          in evaluating the effectiveness of our learning processes, guiding
          decisions regarding accreditation, and driving continuous improvement
          in our educational offerings.
        </div>
        <VulnChart data1={result} data2={data2} />
      </div>
      <div className="flex flex-col items-center justify-center pb-16">
        <button
          className="btn mt-4 btn-primary text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          onClick={downloadPDF}
        >
          Download Report
        </button>
        <Link
          className="btn mt-8 btn-primary text-white bg-gray-500 hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          href={`/dean`}
        >
          Back to main page
        </Link>
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  const { headId } = context.query;
  const client=buildClient(context)

  const response = await client.get(
    `/api/prgservice/departments/show/${headId}`
  );
  const programsData = response.data.data.programsIds;
  console.log(programsData , "DATATA");
  const results = [];
  for (const program of programsData) {
    const programSosResponse = await client.get(
      `/api/prgservice/programs/${program._id}/sos`
    );


   
    if ( program.coordinator ){
      console.log(program.coordinator , "idididi")
    const programSosData = programSosResponse.data.data;
    const coord=await client.get(`/api/prgservice/coordinators/${program.coordinator}`)
    if (coord)
    {
    program.coordinator=coord.data.data.name
    console.log("om", programSosResponse.data.data);
    results.push({ programData: program, sosData: programSosData });
    }  


}

else{
  const programSosData = programSosResponse.data.data;
  const coord= 'NA'

  program.coordinator=coord
  console.log("om", programSosResponse.data.data);
  results.push({ programData: program, sosData: programSosData });
   
}


}
  return {
    props: { programAndSos: results },
  };
}