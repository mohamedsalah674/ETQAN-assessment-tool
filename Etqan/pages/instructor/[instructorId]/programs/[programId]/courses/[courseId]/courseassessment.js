import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React, { useState } from "react";
import { useRouter } from "next/router";
import SideNavbar from "../../../../../../../components/SideNavbar";
import buildClient from "../../../../../../../hooks/build";
export default function ProgramPage({ programData, sosData, ireData }) {
  const router = useRouter();
  const { role, instructorId, programId, courseId } = router.query;

  const links = [
    {
      text: "back to your course",
      href: `/instructor/${instructorId}/programs/${programId}/courses/${courseId}/`,
      icon: "/icons/back.svg",
      alt: "programs",
    },
    // Add more links as needed
  ];
  const [program, setProgram] = useState(programData);

  const handleOptionChange = (soIndex, piIndex, option) => {
    setProgram((prevProgram) => {
      const updatedSos = [...sosData];
      updatedSos[soIndex].PIs[piIndex].selectedOption = option;
      return { ...prevProgram, sos: updatedSos };
    });
  };

  const handleUpdateIRE = () => {
    const hasEmptyOption = sosData.some((so) => {
      return so.PIs.some(
        (pi) =>
          pi.selectedOption === "s" ||
          pi.selectedOption === "" ||
          !pi.selectedOption
      );
    });

    if (hasEmptyOption) {
      toast.error("Please select an option for all fields.");
      return; // Prevent saving
    }
    const ireSosArray = sosData.map((so) => {
      const pis = so.PIs.map((pi) => ({
        piId: pi._id,
        piValue: pi.selectedOption,
      }));
      return { soId: so._id, pis };
    });
    const client=buildClient('')

    const requestBody = { ireSosArray };
    console.log("requestBody", requestBody);
    const ireId = ireData._id;
    client
      .put(
        `/api/assessment/courses/${courseId}/ires/${ireId}`,
        requestBody
      )
      .then((response) => {
        console.log("IRE values updated:", response.data);
        toast.success("IRE Values Updated Successfully");
      })
      .catch((error) => {
        console.error("Error updating IRE values:", error);
        toast.error("Error updating IRE values:", { body: error.message });
      });
  };

  // Helper function to get the PI value from ireData
  const getPIValueFromIRE = (soId, piId) => {
    const sos = ireData.ireSosArray.find((sos) => sos.soId === soId);
    if (sos) {
      const pi = sos.pis.find((pi) => pi.piId === piId);
      if (pi) {
        if (pi.piValue === "N/A") {
          return "N/A";
        }
        return pi.piValue;
      }
    }

    return "";
  };

  return (
    <>
      <SideNavbar links={links} />

      <div className="bg-blue-100 min-h-screen py-8">
        <div className="w-2/3 mx-auto">
          <h1 className="text-4xl text-center text-blue-900 mb-6">
            Program: {program.name}
          </h1>
          <table className="mx-auto bg-white shadow-md rounded-md">
            <thead>
              <tr className="bg-blue-200">
                <th className="py-4 px-6 border-b">SO</th>
                <th className="py-4 px-6 border-b">Description</th>
                <th className="py-4 px-6 border-b">PIs</th>
              </tr>
            </thead>
            <tbody>
              {sosData.map((so, soIndex) => (
                <tr
                  key={soIndex}
                  className={soIndex % 2 === 0 ? "bg-blue-50" : ""}
                >
                  <td className="py-4 px-6 border-b">{so.SO_number}</td>
                  <td className="py-4 px-6 border-b">{so.description}</td>
                  <td className="py-4 px-6 border-b">
                    <ul>
                      {so.PIs.map((pi, piIndex) => (
                        <li key={piIndex} className="text-blue-900">
                          PI {pi.number}
                          <select
                            className="ml-2 px-2 py-1 border border-gray-300 rounded"
                            value={pi.selectedOption}
                            onChange={(e) =>
                              handleOptionChange(
                                soIndex,
                                piIndex,
                                e.target.value
                              )
                            }
                          >
                            <option value="s">Select Option</option>
                            <option value="I">I</option>
                            <option value="R">R</option>
                            <option value="E">E</option>
                            <option value="N/A">Not Applicable</option>
                          </select>
                          <span className="ml-2">
                            {getPIValueFromIRE(so._id, pi._id)}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button
            className="block mx-auto mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={handleUpdateIRE}
          >
            Update IRE
          </button>
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  const client=buildClient(context)
  const { programId, courseId } = context.query;
  const programResponse = await client.get(
    `/api/prgservice/programs/${programId}/`
  );
  const programData = programResponse.data.data;

  const sosResponse = await client.get(
    `/api/prgservice/programs/${programId}/sos`
  );

  const sosData = sosResponse.data.data;
  const courseResponse = await client.get(
    `/api/assessment/programs/${programId}/courses/${courseId}`
  );
  const courseData = await courseResponse.data.data;
  const ireId = courseData.ireAssessment;
  const ireResponse = await client.get(
    `/api/assessment/courses/${courseId}/ires/${ireId}`
  );

  const ireData = ireResponse.data.data.ireData;
  console.log("dasd", ireData);
  return {
    props: { programData, sosData, ireData },
  };
}