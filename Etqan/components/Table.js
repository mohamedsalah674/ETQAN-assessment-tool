import React from "react";

const getAttainment = (avg) => {
  return avg >= 70 ? "Yes" : "No";
};

const Table = (props) => {
  const calculateAverage = (arr) => {
    let sum = 0;
    for (var i = 0; i < arr.length; i++) {
      sum += arr[i].achieved / props.Students.data.length;
    }
    return (sum / arr.length) * 100;
  };

  return (
    <table className="table-auto bg-blue-200  mx-auto px-4 py-8">
      <thead>
        <tr className="bg-blue-500 text-white">
          <th className="px-4 py-2"></th>
          <th className="px-4 py-2">Student Outcomes</th>
          <th className="px-4 py-2">PIs</th>
          <th className="px-4 py-2">Target</th>
          <th className="px-4 py-2">Result</th>
          <th className="px-4 py-2">Attained</th>
        </tr>
      </thead>
      <tbody>
        {props.studentoutcomes.data.map((so, i) => (
          <tr key={i}>
            <td className="border px-4 py-2">{i + 1}</td>
            <td className="border px-4 py-2">Student Outcome {i + 1}</td>
            <td className="border px-4 py-2">
              {so.PIs.map((pi, j) => (
                <div key={j}>
                  {i + 1}.{pi.number}
                </div>
              ))}
            </td>
            <td className="border px-4 py-2">
              {so.PIs.map((pi, j) => (
                <div key={j}>{pi.target}%</div>
              ))}
            </td>
            <td className="border px-4 py-2">
              {/* {Math.round(calculateAverage(so.PIs))}% */}
              {so.SoAchievementPercent}%
            </td>
            <td className="border px-4 py-2">
              {/* {getAttainment(calculateAverage(so.PIs))} */}
              {getAttainment(so.SoAchievementPercent)}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default function ABETCourseAssessmentReport({
  studentoutcomes,
  Students,
}) {
  return (
    <div className="container mx-auto p-4">
      {/* Render other components or JSX as needed */}
      <Table studentoutcomes={studentoutcomes} Students={Students} />
    </div>
  );
}