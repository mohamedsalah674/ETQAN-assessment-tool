import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import SideNavbar from "../../../../../../../components/SideNavbar";
import { toast } from "react-toastify";
import buildClient from "../../../../../../../hooks/build";

const CreateSurveyLink = ({ clos, courseName, courseCode, studentEmails }) => {
  const router = useRouter();
  const { courseId, programId, instructorId, role } = router.query;
  const links = [
    {
      text: "back to your course",
      href: `/instructor/${instructorId}/programs/${programId}/courses/${courseId}/`,
      icon: "/icons/back.svg",
      alt: "programs",
    },
    // Add more links as needed
  ];
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
      try {
        const surveyId = selectedCLOData.surveyId;
        const surveyLink = `http://etqan.dev/survey/clo/${surveyId}`;
        if (!surveyId) {
          toast.error("you can't create survey for this CLO.");
          return;
        }
        const generatedLink = `Generated Survey Link for CLO ${selectedCLOData.CLO_number}: ${surveyLink}`;
        setSurveyLinks((prevLinks) => [...prevLinks, generatedLink]);
        toast.success("Survey link generated successfully!");
      } catch {
        toast.error(
          "Error happened while generating link. Check your internet!"
        );
      }
    }
  };

  const handleDeleteLink = (index) => {
    try {
      setSurveyLinks((prevLinks) => prevLinks.filter((_, i) => i !== index));
      toast.success("Survey link deleted successfully!");
    } catch {
      toast.error("Error happened while deleting links. Check your internet!");
    }
  };

  const handleSendLinksToStudents = async () => {
    if (!surveyLinks || surveyLinks == []) {
      toast.error("Please select at least one CLO");
      return;
    }
    const requestBody = {
      to: studentEmails, //modify this
      from: "etqan.assessment.tool.2023@gmail.com",
      subject: `Survey for ${courseName} (${courseCode})`,
      text: "Please take the survey for the course CLOs.",
      html: `
      <div>
        <p>Please take the survey for the course:</p>
        <p><strong>Course Name:</strong> ${courseName}</p>
        <p><strong>Course Code:</strong> ${courseCode}</p>
        <p>Survey links:</p>
        ${surveyLinks
          .map((link) => `<p><a href="${link}">${link}</a></p>`)
          .join("")}
      </div>
    `,
    };
    const client=buildClient('')

    await client.post("/api/assessment/mail", requestBody);
    try {
      toast.success("Email sent successfully");
      // alert("Email sent successfully");
    } catch (error) {
      console.error("Error sending email:", error);
      // alert("An error occurred while sending the email");
      toast.warning("Error sending email. Check your internet connection!");
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gray-900 pt-8">
        <SideNavbar links={links} />
        <div className="max-w-xl mx-auto p-4 bg-gray-200 rounded mb-12 ">
          <div className="">
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
                <h2 className="text-xl font-bold mb-4">
                  Generated Survey Links:
                </h2>
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
                  Send <span className="text-red-800 bold">E-mail</span> with
                  Links to Students
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export const getServerSideProps = async (context) => {
  const client=buildClient(context)
  const { courseId, programId } = context.query;
  try {
    const [studentsResponse, courseResponse] = await Promise.all([
      client.get(
        `/api/prgservice/programs/${programId}/students`
      ),
      client.get(
        `/api/assessment/programs/${programId}/courses/${courseId}`
      ),
    ]);

    const students = studentsResponse.data.data;
    const courseData = courseResponse.data.data;
    const { name, code, clos } = courseData;
    const studentEmails = [];
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Regular expression for email validation

    for (const student of students) {
      if (student.email && emailRegex.test(student.email)) {
        studentEmails.push(student.email);
      }
    }

    console.log("CCC", clos);
    return {
      props: {
        clos,
        courseName: name,
        courseCode: code,
        studentEmails,
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
