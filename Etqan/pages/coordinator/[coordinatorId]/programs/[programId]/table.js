import SectionHeading from "../../../../../components/SectionHeading";
import SideNavBar from "../../../../../components/SideNavbar";
import buildClient from "../../../../../hooks/build";
const getAttainment = (avg) => {
  return avg >= 70 ? "Yes" : "No";
};

const Table = (props) => {
  const calculateAverage = (arr) => {
    let sum = 0;
    for (var i = 0; i < arr.length; i++) {
      sum += arr[i].achieved / props.props.Students.data.length;
    }
    return (sum / arr.length) * 100;
  };
  // console.log("Students", props.props.Students);
  const results = {};

  props.props.studentoutcomes.data.forEach((so) => {
    const average = calculateAverage(so.PIs);
    results[so._id] = Math.round(average);
  });
  console.log("SASA", results);

  // console.log("SOs", props.props.studentoutcomes.data);
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
        {props.props.studentoutcomes.data.map((so, i) => (
          <tr key={i}>
            <td className="border px-4 py-2"> {i + 1} </td>
            <td className="border px-4 py-2">Student Outcome {i + 1}</td>
            {/* {console.log(so.PIs)} */}
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
              {Math.round(calculateAverage(so.PIs))}%
            </td>
            <td className="border px-4 py-2">
              {getAttainment(calculateAverage(so.PIs))}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default function Home(newObj) {
  return (
    <div className="container mx-auto p-4">
      <SideNavBar />
      <div className="text-center">
        {" "}
        <SectionHeading text="ABET Course Assessment Report" />
      </div>
      <Table props={newObj} />
    </div>
  );
}
export async function getServerSideProps(context) {
  const client = buildClient(context)
  const { programId } = context.query;

  try {
    const [sosResponse, studentsResponse] = await Promise.all([
      client.get(
        `/api/prgservice/programs/${programId}/sos`
      ),
      client.get(
        `/api/prgservice/programs/${programId}/students`
      ),
    ]);

    const studentoutcomes = sosResponse.data;
    const Students = studentsResponse.data;
    const newObj = { studentoutcomes, Students };
    console.log(newObj);

    const results = {}; // Assuming results is defined somewhere in the code

    for (const soId in results) {
      let achievementPercent = results[soId];
      if (isNaN(achievementPercent)) {
        achievementPercent = 75;
      }

      try {
        await client.put(
          `/api/prgservice/programs/${programId}/sos/${soId}`,
          { SoAchievementPercent: achievementPercent }
        );
        console.log(`PUT request successful for ${soId}`);
      } catch (error) {
        console.error(`Error updating document for ${soId}:`, error);
      }
    }

    return {
      props: newObj,
    };
  } catch (error) {
    console.error("Error fetching data:", error);

    return {
      props: {
        studentoutcomes: null,
        Students: null,
      },
    };
  }
}
