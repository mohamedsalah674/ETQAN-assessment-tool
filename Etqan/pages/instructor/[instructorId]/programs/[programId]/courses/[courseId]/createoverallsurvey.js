import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React, { useState } from "react";
import { RiEdit2Line, RiDeleteBin6Line } from "react-icons/ri";
import SideNavbar from "../../../../../../../components/SideNavbar";
import { useRouter } from "next/router";
import buildClient from "../../../../../../../hooks/build";
const CreateSurveyPage = ({ studentEmails, courseData, courseSurveyLink }) => {
  const router = useRouter();
  const { role, instructorId, programId, courseId } = router.query;

  const links = [
    {
      text: "back to your course",
      href: `/instructor/${instructorId}/programs/${programId}/courses/${courseId}`,
      icon: "/icons/back.svg",
      alt: "programs",
    },
    // Add more links as needed
  ];
  const [questionNumber, setQuestionNumber] = useState(1);
  const [questionTitle, setQuestionTitle] = useState("");
  const [questionDescription, setQuestionDescription] = useState("");
  const [surveyData, setSurveyData] = useState({
    questions: [],
    rates: [],
  });
  const [editQuestionIndex, setEditQuestionIndex] = useState(null);
  const [editQuestionTitle, setEditQuestionTitle] = useState("");
  const [editQuestionDescription, setEditQuestionDescription] = useState("");
  const [surveyId, setSurveyId] = useState(null);
  const [surveyLink, setSurveyLink] = useState(null);

  const handleAddQuestion = () => {
    if (questionTitle.trim() === "" || questionDescription.trim() === "") {
      toast.warning("Please enter a question title and description.");
      // alert("Please enter a question title and description.");
      return;
    }
    if (isNaN(questionNumber)) {
      toast.warning(
        "Please enter a valid question number, title, and description."
      );
      return;
    }
    try {
      const question = {
        questionNumber,
        questionTitle,
        questionDescription,
      };

      setQuestionNumber(questionNumber + 1);
      setQuestionTitle("");
      setQuestionDescription("");

      const updatedQuestions = [...surveyData.questions, question];
      setSurveyData({ ...surveyData, questions: updatedQuestions });
      toast.success("Question added successfully!");
    } catch {
      toast.error("Error adding question. Please Check your internet!");
    }
  };

  const handleEditQuestion = (questionNumber) => {
    const question = surveyData.questions.find(
      (q) => q.questionNumber === questionNumber
    );

    setEditQuestionIndex(questionNumber);
    setEditQuestionTitle(question.questionTitle);
    setEditQuestionDescription(question.questionDescription);
  };

  const handleSaveQuestion = () => {
    if (
      editQuestionTitle.trim() === "" ||
      editQuestionDescription.trim() === ""
    ) {
      toast.warning("Please enter a question title and description.");
      // alert("Please enter a question title and description.");
      return;
    }

    try {
      const updatedQuestions = surveyData.questions.map((q) => {
        if (q.questionNumber === editQuestionIndex) {
          return {
            ...q,
            questionTitle: editQuestionTitle,
            questionDescription: editQuestionDescription,
          };
        }
        return q;
      });

      setSurveyData({ ...surveyData, questions: updatedQuestions });
      setEditQuestionIndex(null);
      setEditQuestionTitle("");
      setEditQuestionDescription("");
      toast.success("Question saved successfully!");
    } catch {
      toast.error("Error saving question. Please check your internet!");
    }
  };

  const handleDeleteQuestion = (questionNumber) => {
    try {
      const updatedQuestions = surveyData.questions.filter(
        (q) => q.questionNumber !== questionNumber
      );

      setSurveyData({ ...surveyData, questions: updatedQuestions });
      toast.success("Question deleted successfully!");
    } catch {
      toast.error("Erro deleting question. Please check your internet!");
    }
  };

  const handleSendEmail = async () => {
    const requestBody = {
      to: studentEmails, //modify this
      from: "etqan.assessment.tool.2023@gmail.com",
      subject: `Survey for ${courseData.name} (${courseData.code})`,
      text: "Please take the survey for the course.",
      html: `
          <div>
            <p>Please take the survey for the course:</p>
            <p><strong>Course Name:</strong> ${courseData.name}</p>
            <p><strong>Course Code:</strong> ${courseData.code}</p>
            <a href=${surveyLink}>Take Survey</a>
            <p>survey link:${surveyLink}</p>
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

  const handleSubmitSurvey = async () => {
    const client=buildClient('')
    if (surveyData.questions.length === 0) {
      // alert("Please add at least one question to the survey.");
      toast.warning("Please add at least one question to the survey.");
      return;
    }

    try {
      const response = await client.post(
        "/api/assessment/overallsurveys",
        {
          rates: surveyData.rates,
          questions: surveyData.questions,
        }
      );
      const createdSurveyId = response.data.data.survey_id;
      setSurveyId(createdSurveyId);

      const surveyLink = `etqan.dev/survey/overall/${createdSurveyId}`;
      setSurveyLink(surveyLink);
      toast.success("Survey created successfully!");
    } catch (error) {
      console.error("Error creating survey:", error);
      toast.error(
        "An error occurred while creating the survey. Check your connection!"
      );
      // alert("An error occurred while creating the survey.");
    }
  };

  return (
    <div className="bg-sky-200 min-h-screen flex justify-center items-center">
      <SideNavbar links={links} />
      {/* <div>Course Survey Link: ${courseSurveyLink}</div> */}
      <div className="w-full max-w-md bg-white rounded shadow p-6 my-8">
        <h1 className="text-2xl font-bold mb-4">Create Survey</h1>
        <div className="mb-4">
          <label className="block mb-2">
            Question Number:
            <input
              type="number"
              value={questionNumber}
              onChange={(e) => setQuestionNumber(parseInt(e.target.value))}
              className="border p-2 w-full rounded"
            />
          </label>
          <label className="block mb-2">
            Question Title:
            <input
              type="text"
              value={questionTitle}
              onChange={(e) => setQuestionTitle(e.target.value)}
              className="border p-2 w-full rounded"
            />
          </label>
          <label className="block mb-2">
            Question Description:
            <input
              type="text"
              value={questionDescription}
              onChange={(e) => setQuestionDescription(e.target.value)}
              className="border p-2 w-full rounded"
            />
          </label>
          <button
            onClick={handleAddQuestion}
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            Add Question
          </button>
        </div>
        <div className="bg-gray-100 p-4 rounded mb-4">
          <h2 className="text-xl font-bold mb-2">Survey Questions</h2>
          {surveyData.questions.map((question) => (
            <div
              key={question.questionNumber}
              className="mb-4 p-4 bg-white rounded shadow"
            >
              <div className="flex items-center justify-between mb-2">
                <div>
                  <h3 className="font-bold">
                    Question {question.questionNumber}
                  </h3>
                  <p>{question.questionTitle}</p>
                  <p>{question.questionDescription}</p>
                </div>
                <div>
                  <button
                    onClick={() => handleEditQuestion(question.questionNumber)}
                    className="text-blue-500 mr-2"
                  >
                    <RiEdit2Line />
                  </button>
                  <button
                    onClick={() =>
                      handleDeleteQuestion(question.questionNumber)
                    }
                    className="text-red-500"
                  >
                    <RiDeleteBin6Line />
                  </button>
                </div>
              </div>
              {editQuestionIndex === question.questionNumber && (
                <div className="mb-2">
                  <input
                    type="text"
                    value={editQuestionTitle}
                    onChange={(e) => setEditQuestionTitle(e.target.value)}
                    className="border p-2 w-full rounded"
                  />
                  <input
                    type="text"
                    value={editQuestionDescription}
                    onChange={(e) => setEditQuestionDescription(e.target.value)}
                    className="border p-2 w-full rounded"
                  />
                  <button
                    onClick={handleSaveQuestion}
                    className="bg-green-500 text-white py-2 px-4 rounded mt-2 hover:bg-green-600"
                  >
                    Save Question
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="flex flex-col">
          <button
            onClick={handleSubmitSurvey}
            className="bg-green-500 text-white py-2 px-4 my-2 rounded hover:bg-blue-600"
          >
            Save Survey
          </button>
          <button
            onClick={handleSendEmail}
            className="bg-blue-500 text-white py-2 px-4 my-2 rounded hover:bg-blue-600"
          >
            Send Email
          </button>
        </div>
        {surveyLink && (
          <div className="mt-4">
            <label className="bg-gray-200 border border-gray-300 p-2 block w-full rounded">
              Survey Link:
              <a
                href={`http://${surveyLink}?instructorId=${instructorId}&programId=${programId}&courseId=${courseId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="cursor text-blue-600"
              >
                <div> {surveyLink}</div>
              </a>
            </label>
          </div>
        )}
      </div>{" "}
    </div>
  );
};

export async function getServerSideProps(context) {
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

    const surveyResponse = await client.get(
      `/api/assessment/overallsurveys/${courseData.surveyId}`
    );
    const surveyData = surveyResponse.data.data;
    const surveyLink = `http://etqan.dev/survey/overall/${surveyData.survey_id}`;
    const studentEmails = [];
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Regular expression for email validation

    for (const student of students) {
      if (student.email && emailRegex.test(student.email)) {
        studentEmails.push(student.email);
      }
    }

    return {
      props: {
        studentEmails,
        courseData,
        courseSurveyLink: surveyLink,
      },
    };
  } catch (error) {
    console.error("Error fetching student emails:", error);
    return {
      props: {
        studentEmails: [],
      },
    };
  }
}

export default CreateSurveyPage;