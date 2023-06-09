import { useState } from "react";
import { useRouter } from "next/router";
import SideNavbar from "../../../components/SideNavbar";
import buildClient from "../../../../../../../hooks/build";

const CreateSurveyLink = ({ clos, courseName, courseCode }) => {
  const router = useRouter();
  const [selectedCLO, setSelectedCLO] = useState("");
  const [surveyLinks, setSurveyLinks] = useState([]);

  const handleCLOSelection = (event) => {
    const selectedCLOId = event.target.value;
    setSelectedCLO(selectedCLOId);
    console.log("Selected CLO ID:", selectedCLOId);
  };

  const handleCreateSurveyLink = async () => {
    const selectedCLOData = clos.find((clo) => clo._id === selectedCLO);
  
    if (selectedCLOData) {
      const surveyId = selectedCLOData.surveyId;
      const surveyLink = `etqan.dev/survey/clo/${surveyId}`; 
      const generatedLink = `Generated Survey Link for CLO ${selectedCLOData.CLO_number}: ${surveyLink}`;
       setSurveyLinks((prevLinks) => [...prevLinks, generatedLink]);
    }
  };
  const handleDeleteLink = (index) => {
    setSurveyLinks((prevLinks) => prevLinks.filter((_, i) => i !== index));
  };

  const handleSendLinksToStudents = async () => {
    const client=buildClient('')

    try {
      // Send POST request to your backend API to send the links to students
      await client.post("/api/assessment/surveyLinks", {
        surveyLinks,
        courseName,
        courseCode,
      });
      console.log("Links sent to students successfully!");
    } catch (error) {
      console.error("Error sending links to students:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <SideNavbar />
      <div className="max-w-xl mx-auto p-4 bg-gray-200 rounded mb-12">
        <h1 className="text-2xl font-bold mb-4">
          Select a CLO to create a survey link:
        </h1>
        <select
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          value={selectedCLO}
          onChange={handleCLOSelection}
        >
          <option value="">Select a CLO</option>
          {clos.map((clo) => (
            <option key={clo._id} value={clo._id}>
              {clo.CLO_number}: {clo.description}
            </option>
          ))}
        </select>
        <button
          className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md disabled:opacity-50"
          onClick={handleCreateSurveyLink}
          disabled={!selectedCLO}
        >
          Generate Survey Link
        </button>
        {surveyLinks.length > 0 && (
          <div className="mt-6">
            <h2 className="text-xl font-bold mb-4">Generated Survey Links:</h2>
            <ul className="list-disc pl-6">
              {surveyLinks.map((link, index) => (
                <li key={index} className="mb-2 flex items-center">
                  <span>{link}</span>
                  <button
                    className="ml-2 px-2 py-1 bg-red-500 text-white rounded-md"
                    onClick={() => handleDeleteLink(index)}
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
            <button
              className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md"
              onClick={handleSendLinksToStudents}
            >
              Send <span className="text-red-800 bold">E-mail</span> with Links
              to Students
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export const getServerSideProps = async (context) => {
  const { courseId } = context.query;
  const client=buildClient(context)
  try {
    const responseCourse = await client.get(
      `/api/assessment/courses/${courseId}`
    );
    const { name, code, clos } = responseCourse.data.data;

    console.log("CCC", clos);
    return {
      props: {
        clos,
        courseName: name,
        courseCode: code,
      },
    };
  } catch (error) {
    console.error(error);
    return {
      props: {
        clos: [],
        courseName: "",
        courseCode: "",
      },
    };
  }
};

export default CreateSurveyLink;
