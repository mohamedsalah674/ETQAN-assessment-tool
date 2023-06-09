import React, { useEffect, useState } from "react";

const ShowMatrixComponent = ({ so, courses }) => {
  const alphabet = Array.from({ length: 26 }, (_, i) =>
    String.fromCharCode(65 + i)
  );
  const [studentClos, setStudentClos] = useState(so);

  useEffect(() => {}, [studentClos]);

  let allmarksTicks = new Array(studentClos.data.length);
  let allmarksTicks2 = new Array(studentClos.data.length);

  for (var i = 0; i < studentClos.data.length; i++) {
    allmarksTicks[i] = "";
    allmarksTicks2[i] = "";
  }

  // const ireobject = {
  //   ireSosArray: [
  //     {
  //       soId: "das5d5asd5as6d233wq3",
  //       pis: [
  //         { piId: "asdadad455555", piValue: "I" },
  //         { piId: "asdadad455555", piValue: "I" },
  //       ],
  //     },
  //     {
  //       soId: "das5d5as5ds5ds5233wq3",
  //       pis: [
  //         { piId: "asdadad455555", piValue: "I" },
  //         { piId: "asdadad455555", piValue: "I" },
  //       ],
  //     },
  //   ],
  // };

  return (
    <>
      <div className="">
        <div className="flex justify-center mx-auto mt-8">
          <div className="max-w-full">
            <table className="w-full text-sm text-left text-black border border-black bg-white">
              <thead className="text-xs uppercase bg-gray-200 text-black">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-center border border-black bg-gray-200 sticky top-0 z-10"
                    rowSpan="2"
                  >
                    Course \ SO
                  </th>
                  {studentClos.data.map((stud, index) => (
                    <th
                      scope="col"
                      className="px-6 py-3 text-center bg-gray-200 border border-black"
                      key={index}
                      colSpan={stud.PIs.length} // Added colSpan for each student outcome cell
                    >
                      SO {index + 1}
                    </th>
                  ))}
                </tr>
                <tr>
                  {studentClos.data.map((stud, index) => (
                    <React.Fragment key={index}>
                      {stud.PIs.length > 0 ? (
                        stud.PIs.map((pi, piIndex) => (
                          <th
                            scope="col"
                            className="px-2 py-1 text-center bg-gray-200 border border-black"
                            key={piIndex}
                          >
                            {pi.number}
                          </th>
                        ))
                      ) : (
                        <th
                          scope="col"
                          className="px-2 py-1 text-center bg-gray-200 border border-black"
                        >
                          No PIs
                        </th>
                      )}
                    </React.Fragment>
                  ))}
                </tr>
              </thead>
              <tbody>
                {courses.map((crs, index) => (
                  <tr className="bg-white border-b border-gray-200 hover:bg-gray-100">
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium whitespace-nowrap border border-black bg-gray-200"
                    >
                      {crs.name}
                    </th>
                    {crs.selectedAbetCri.forEach((el) => {
                      allmarksTicks[el - 1] = "X";
                    })}
                    {studentClos.data.map((clo, index) =>
                      clo.PIs.length > 0 ? (
                        clo.PIs.map((pi, piIndex) => (
                          <th
                            scope="col"
                            className="px-2 py-1 text-center bg-white border border-black"
                            key={piIndex}
                          >
                            {crs.ireData.ireSosArray[index]
                              ? crs.ireData.ireSosArray[index].pis &&
                                crs.ireData.ireSosArray[index].pis[piIndex]
                                ? crs.ireData.ireSosArray[index].pis[piIndex]
                                    .piValue
                                : ""
                              : ""}
                          </th>
                        ))
                      ) : (
                        <th
                          scope="col"
                          className="px-2 py-1 text-center bg-white border border-black"
                        ></th>
                      )
                    )}{" "}
                    {crs.selectedAbetCri.forEach((el) => {
                      allmarksTicks[el - 1] = "";
                    })}
                  </tr>
                ))}{" "}
              </tbody>{" "}
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShowMatrixComponent;
