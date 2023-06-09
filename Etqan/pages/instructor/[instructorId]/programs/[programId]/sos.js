import React from "react";
import SideNavbar from "../../../../../components/SideNavbar";
import { useRouter } from "next/router";
import buildClient from "../../../../../hooks/build";
const ProgramsPage = ({ sosData }) => {
  const router = useRouter();
  const { programId, instructorId } = router.query;
  const links = [
    {
      text: "Back to your program",
      href: `/instructor/${instructorId}/programs/${programId}`,
      icon: "/icons/back.svg",
      alt: "programs",
    },
  ];
  return (
    <div className=" min-h-screen bg-[url('/backgrounds/sos.jpg')]">
      <SideNavbar links={links} />
      <div className="container mx-auto px-4 py-8 w-1/2 ">
        <h1 className="text-3xl font-bold mb-8 ">
          Program <span className="">SOs</span>
        </h1>

        {sosData.map((so) => (
          <div key={so._id} className="bg-white rounded shadow p-6 mb-4">
            <h2 className="text-xl font-bold mb-4">SO: {so.SO_number}</h2>
            <p className="text-gray-700 mb-4">{so.description}</p>

            <h3 className="text-lg font-bold mb-2">
              Performance Indicators (PIs)
            </h3>
            <ul>
              {so.PIs.map((pi) => (
                <li key={pi._id} className="mb-2">
                  <span className="font-bold">PI {pi.number}:</span>{" "}
                  {pi.description}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export async function getServerSideProps(context) {
const client=buildClient(context)
  const { programId } = context.query;

  try {
    const response = await client.get(
      `/api/prgservice/programs/${programId}/sos`
    );
    const sosData = response.data.data;
    console.log("sdd", sosData);

    return {
      props: {
        programId,
        sosData,
      },
    };
  } catch (error) {
    console.log("Error fetching data:", error);

    return {
      props: {
        programId,
        sosData: [], // Set sosData to an empty array or handle the error appropriately
      },
    };
  }
}
export default ProgramsPage;
