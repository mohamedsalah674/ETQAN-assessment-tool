import buildClient from "../../../../../hooks/build";
import SectionHeading from "../../../../../components/SectionHeading";
import Link from "next/link";
import VulnChart from "../../../../../components/Graph";
import { useRouter } from "next/router";

const vulnChart = ({ programAndSos }) => {
  const router = useRouter();
  const { programId, courseId, role, coordinatorId } = router.query;

  const calculateAverage = (arr) => {
    let sum = 0;
    for (var i = 0; i < arr.length; i++) {
      sum += arr[i].SoAchievementPercent;
    }
    return sum / arr.length;
  };
  const data1 = [15, 12, 6, 7, 4];
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

  console.log(data2);

  return (
    <>
      
      <SectionHeading text="Program assessment results compared to targets" />
      <VulnChart data1={result} data2={data2} />
      <div className="flex flex-col items-center justify-center">
        {" "}
        <Link
          className="btn btn-primary text-white bg-gray-500 hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          href={`/coordinator/${coordinatorId}/dashboard`}
        >
          Back to your Program
        </Link>
      </div>
    </>
  );
};

export default vulnChart;
export async function getServerSideProps(context) {
  const client = buildClient(context)
  try {
    const programsResponse = await client.get(
      `/api/prgservice/programs/`
    );
    const programsData = programsResponse.data.data;

    const programAndSosPromises = programsData.map(async (program) => {
      const programSosResponse = await client.get(
        `/api/prgservice/programs/${program._id}/sos`
      );
      const programSosData = programSosResponse.data.data;
      console.log("om", programSosResponse.data.data);
      return { programData: program, sosData: programSosData };
    });

    const programAndSos = await Promise.all(programAndSosPromises);

    return {
      props: { programAndSos },
    };
  } catch (error) {
    console.error(error);
    return {
      props: { programAndSos: [] },
    };
  }
}
