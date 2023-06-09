import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import SectionHeading from "../../../../../../../components/SectionHeading";
import SideNavbar from "../../../../../../../components/SideNavbar";
import buildClient from "../../../../../../../hooks/build";
const SOtable = ({ SOs, students }) => {
  const [achievedpercent, setAchievedpercent] = useState(false);
  const router = useRouter();
  const { programId, coordinatorId, SOid } = router.query;
  const links = [
    {
      text: "Back to SOs",
      href: `/coordinator/${coordinatorId}/programs/${programId}/SOs`,
      icon: "/icons/back.svg",
      alt: "programs",
    },
  ];
  function calcAverage(arr) {
    let sum = 0;
    for (var i = 0; i < arr.length; i++) {
      sum += arr[i].achieved;
    }
    return (sum / arr.length / Students.length) * 100;
  }

  const Students = students.data;
  console.log("Students", Students);
  const [tableData, setTableData] = useState(() => {
    const initialTableData = [];
    for (let i = 0; i < Students.length; i++) {
      const rowData = [];
      for (let j = 0; j < SOs.data.PIs.length; j++) {
        Students[i].PI_marks.map((pimark, pimarkidx) => {
          pimark.PI_Id == SOs.data.PIs[j]._id
            ? rowData.push(pimark.PI_mark)
            : null;
        });

        // rowData.push("");
      }
      initialTableData.push(rowData);
    }
    console.log("initialTableData", initialTableData);
    return initialTableData;
  });
  let studentspercents = new Array(SOs.data.PIs.length);
  for (var i = 0; i < SOs.data.PIs.length; i++) {
    studentspercents[i] = 0;
  }
  const handleInputChange = (rowIndex, colIndex, newValue) => {
    const newTableData = [...tableData];
    newTableData[rowIndex][colIndex] = newValue;
    setTableData(newTableData);
  };
  useEffect(() => {
    console.log("TableData", tableData);
  }, [tableData]);
  const totalCount = SOs.data.PIs.length;
  let sum = 0;
  let usablepi = 0;
  for (let i = 0; i < totalCount; i++) {
    if (
      isNaN(
        tableData.reduce((sum, row) => sum + row[i], 0) / Students.length
      ) ||
      !tableData.reduce((sum, row) => sum + row[i], 0)
    ) {
      continue;
    }
    sum +=
      (tableData.reduce((count, row) => count + (row[i] > 70 ? 1 : 0), 0) *
        100) /
      Students.length;
    usablepi++;
  }
  const average = Math.round(sum / usablepi);
  console.log("mmmm", average);
  // setAchievedpercent(1);
  useEffect(() => {
    const fetchData = async () => {
      const client=buildClient('')
      try {
        const response = await client.put(
          `/api/prgservice/programs/${programId}/sos/${SOid}`,
          {
            SoAchievementPercent: average,
          }
        );
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    if (!achievedpercent) {
      // Check if achievedpercent is false
      setAchievedpercent(true); // Set achievedpercent to true
    }
    fetchData();
  }, [achievedpercent]);

  const saveFunction = async () => {
    const client=buildClient('')
    for (var i = 0; i < SOs.data.PIs.length; i++) {
      studentspercents[i] = 0;
    }
    for (let i = 0; i < Students.length; i++) {
      for (let j = 0; j < SOs.data.PIs.length; j++) {
        if (tableData[i][j] != "" && Students[i].PI_marks.length > 0) {
          const index = Students[i].PI_marks.findIndex(
            (piMark) => piMark.PI_Id === SOs.data.PIs[j]._id
          );

          Students[i].PI_marks[index]
            ? (Students[i].PI_marks[index].PI_mark = tableData[i][j]
                ? tableData[i][j]
                : null)
            : null;
        }
      }

      console.log("TTTT", Students[i]);
    
      const updatedStudent = await client.put(
        `/api/prgservice/programs/${programId}/students/${Students[i]._id}/`,
        Students[i]
      );
    }

    for (let i = 0; i < SOs.data.PIs.length; i++) {
      const updatedPI = await client.put(
        `/api/prgservice/programs/${programId}/sos/${SOs.data._id}/pis/${SOs.data.PIs[i]._id}/`,
        { achieved: studentspercents[i] }
      );
    }

    const soPercent = await Math.round(calcAverage(SOs.data.PIs));
    // console.log("first", soPercent);
    const soAfterPuttingPercent = await client.put(
      `/api/prgservice/programs/${programId}/sos/${SOs.data._id}`,
      { SoAchievementPercent: soPercent }
    );
    console.log("studentspercents", studentspercents);
    router.reload(window.location.pathname);
  };
  return (
    <div className="min-h-screen mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex justify-flex items-center flex-col">
      <SectionHeading text={`SO #${SOs.data.SO_number} Assessment`} />
      <SideNavbar links={links} />
      {SOs.data.PIs.length != 0 ? (
        <>
          <div className="mt-8 mb-12">
            <table className="table-auto border-separate bg-blue-200 relative overflow-x-auto shadow-md sm:rounded-lg  mx-auto px-4 py-8">
              {" "}
              <thead>
                <tr>
                  {" "}
                  <th
                    colSpan={3}
                    className="border bg-black text-white text-center "
                  >
                    {" "}
                    PIs{" "}
                  </th>
                </tr>
              </thead>
              <tbody>
                {" "}
                {SOs.data.PIs.map((PI) => (
                  <tr className="border bg-blue-500 text-white">
                    {" "}
                    <th className="px-6 py-3 text-center">PI</th>
                    <td className="px-6 py-3 text-center">
                      {SOs.data.SO_number}.{PI.number}
                    </td>
                    <th className="px-6 py-3 text-center">{PI.description}</th>
                  </tr>
                ))}
              </tbody>
            </table>
            <table className="table-auto mt-8 border-separate bg-blue-200 relative overflow-x-auto shadow-md sm:rounded-lg  mx-auto">
              {" "}
              <thead>
                <tr>
                  {" "}
                  <th
                    colSpan={5}
                    className="border bg-black text-white text-center "
                  >
                    {" "}
                    Target Indicators{" "}
                  </th>
                </tr>
              </thead>
              <tbody>
                {" "}
                <tr className="border bg-gray-500 text-white">
                  {" "}
                  <th className="px-6 py-3 text-center">
                    Targeted percentage of students to attain the PI
                  </th>
                  <td className="px-6 py-3 text-center">Green = Attained</td>
                  <td className="px-6 py-3 text-center">Red = Not Attained</td>
                </tr>
                <tr className="border bg-gray-500 text-white">
                  {" "}
                  <th className="px-6 py-3 text-center">
                    Targeted percentage of students to attain the SO
                  </th>
                  <td className="px-6 py-3 text-center">Green = Attained</td>
                  <td className="px-6 py-3 text-center">Red = Not Attained</td>
                </tr>
              </tbody>
            </table>
          </div>
          <table className="table-fixed w-full text-sm md:ml-64">
            <thead className="text-xs text-white uppercase bg-blue-600 border-b border-blue-400">
              <tr>
                <th className="px-6 py-3 text-center">Students</th>
                {SOs.data.PIs.map((PI, index) => (
                  <th key={index} className="px-6 py-3 text-center">
                    PI {SOs.data.SO_number}.{PI.number}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr className="bg-gray-800 border-b border-blue-400 hover:bg-gray-700">
                <td className="w-1/5 border border-b border-blue-400 hover:bg-gray-700 bg-black text-white  text-center">
                  Target
                </td>
                {SOs.data.PIs.map((object, colIndex) => (
                  <td
                    key={colIndex}
                    className=" border border-b  border-blue-400 hover:bg-gray-700 text-white  text-center"
                  >
                    <input
                      type="number"
                      placeholder={object.target}
                      className="bg-black text-center placeholder-white w-full p-5 flex-1 h-[40px] border border-b border-[#00b4ba]  shadow-md outline-none"
                      // value={tableData[rowIndex][colIndex]}
                      // onChange={(event) =>
                      // handleInputChange(rowIndex, colIndex, event.target.value)
                      // }
                    />
                  </td>
                ))}
              </tr>
              {Students.map((student, rowIndex) => (
                <tr
                  className="bg-gray-800 border-b border-blue-400 hover:bg-gray-700"
                  key={rowIndex}
                >
                  <td className="w-1/5 border border-b border-blue-400 hover:bg-gray-700 bg-gray-800 text-white py-2  text-center">
                    {student.name}
                  </td>
                  {SOs.data.PIs.map((pi, colIndex) => (
                    <td
                      key={colIndex}
                      className="border border-b border-blue-400 hover:bg-gray-700 bg-gray-800 text-white  text-center"
                    >
                      {student.PI_marks.map((pi_mark, pi_mark_idx) =>
                        pi_mark.PI_Id == pi._id ? (
                          <input
                            placeholder={pi_mark.PI_mark}
                            type="number"
                            className="w-full text-center p-5 placeholder-white flex-1 h-[40px] border border-b border-[#00b4ba]  bg-gray-800 shadow-md outline-none"
                            value={tableData[rowIndex][colIndex]}
                            onChange={(event) =>
                              handleInputChange(
                                rowIndex,
                                colIndex,
                                event.target.value
                              )
                            }
                          />
                        ) : (
                          <span></span>
                        )
                      )}
                    </td>
                  ))}
                </tr>
              ))}
              <tr className="bg-gray-800 border-b border-blue-400 hover:bg-gray-700">
                <td className="w-1/5 border border-b border-blue-400 hover:bg-gray-700 bg-gray-800 text-white  text-center">
                  Percentage of students achieved the target
                </td>
                {SOs.data.PIs.map((PI, colIndex) => (
                  <td className="w-1/5 h-[40px] border border-b border-blue-400 hover:bg-gray-700 bg-gray-800 text-white  text-center">
                    {isNaN(
                      tableData.reduce((sum, row) => sum + row[colIndex], 0) /
                        Students.length
                    ) ||
                    !tableData.reduce((sum, row) => sum + row[colIndex], 0) ? (
                      ""
                    ) : tableData.reduce((sum, row) => sum + row[colIndex], 0) /
                        Students.length >=
                      PI.target ? (
                      <div className="bg-green-600 font-bold  h-full w-full flex flex-row justify-center items-center ">
                        {Math.round(
                          (tableData.reduce(
                            (count, row) =>
                              count + (row[colIndex] > PI.target ? 1 : 0),
                            0
                          ) *
                            100) /
                            Students.length
                        )}{" "}
                        %
                      </div>
                    ) : (
                      <div className="bg-red-600 font-bold  h-full w-full flex flex-row justify-center items-center ">
                        {Math.round(
                          (tableData.reduce(
                            (count, row) =>
                              count + (row[colIndex] > 70 ? 1 : 0),
                            0
                          ) *
                            100) /
                            Students.length
                        )}{" "}
                        %
                      </div>
                    )}
                  </td>
                ))}
              </tr>
              <tr className="bg-gray-800  border-b border-blue-400 hover:bg-gray-700">
                <td className="w-1/5 border  border-b border-blue-400 hover:bg-gray-700 bg-gray-800 text-white  text-center">
                  Average of SO
                </td>
                <td
                  colSpan={SOs.data.PIs.length}
                  className="w-1/5 border h-[40px] border-b border-blue-400 hover:bg-gray-700 bg-gray-800 text-white  text-center"
                >
                  {average >= 70 ? (
                    <div className="bg-green-600 font-bold h-full w-full flex flex-row justify-center items-center">
                      {average} %
                    </div>
                  ) : (
                    <div className="bg-red-700 h-full w-full flex flex-row justify-center items-center ">
                      {average} %
                    </div>
                  )}{" "}
                  {/* {calcAverage(SOs.data.PIs) >= 70 ? (
                    <div className="bg-green-600 font-bold h-full w-full flex flex-row justify-center items-center">
                      {Math.round(calcAverage(SOs.data.PIs))} %
                    </div>
                  ) : (
                    <div className="bg-red-700 h-full w-full flex flex-row justify-center items-center ">
                      {Math.round(calcAverage(SOs.data.PIs))} %
                    </div>
                  )}{" "} */}
                </td>
              </tr>
            </tbody>
          </table>
          <div className="mt-10">
            <button
              className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl  focus:outline-none dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
              onClick={saveFunction}
            >
              Save
            </button>
          </div>
        </>
      ) : (
        <div>
          <SectionHeading text="There is no PIs yet!" />
        </div>
      )}
    </div>
  );
};

export async function getServerSideProps(context) {
  const client=buildClient(context)
  const { SOid, programId } = context.query;

  const [soResponse, studResponse] = await Promise.all([
    client.get(
      `/api/prgservice/programs/${programId}/sos/${SOid}`
    ),
    client.get(
      `/api/prgservice/programs/${programId}/students/`
    ),
  ]);

  const soData = soResponse.data;
  const studData = studResponse.data;

  console.log(soData);

  return {
    props: {
      SOs: soData,
      students: studData,
    },
  };
}

export default SOtable;