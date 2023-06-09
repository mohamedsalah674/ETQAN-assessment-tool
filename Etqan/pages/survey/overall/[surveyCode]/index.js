import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React, { useState } from "react";
import buildClient from "../../../../hooks/build";
import { useRouter } from "next/router";
import SideNavbar from "../../../../components/SideNavbar";

const SurveyPage = ({ surveyData }) => {
  const [rateInput, setRateInput] = useState("");
  const [answerInputs, setAnswerInputs] = useState([]);
  const [commentInput, setCommentInput] = useState("");
  const [answerObjects, setAnswerObjects] = useState([]);
  const router = useRouter();
  const { surveyId, instructorId, programId, courseId } = router.query;

  const links = [
    {
      text: "back to your course",
      href: `/instructor/${instructorId}/programs/${programId}/courses/${courseId}/createoverallsurvey`,
      icon: "/icons/back.svg",
      alt: "programs",
    },
    // Add more links as needed
  ];
  const handleRateInputChange = (e) => {
    setRateInput(e.target.value);
  };

  const handleAnswerInputChange = (index, value) => {
    const updatedAnswerInputs = [...answerInputs];
    updatedAnswerInputs[index] = value;
    setAnswerInputs(updatedAnswerInputs);
    const updatedAnswerObjects = [...answerObjects];
    updatedAnswerObjects[index] = {
      questionId: surveyData.questions[index]._id,
      studentAnswer: value,
    };
    setAnswerObjects(updatedAnswerObjects);
  };

  const handleCommentInputChange = (e) => {
    setCommentInput(e.target.value);
  };

  const handleSubmitSurvey = async () => {
    if (!rateInput) {
      toast.error("Please enter the course rate.");
      return;
    }

    if (isNaN(rateInput) || +rateInput < 0 || +rateInput > 10) {
      toast.error(
        "The course rate must be a positive number between 0 and 10."
      );
      return;
    }

    if (answerInputs.some((input) => input.trim() === "")) {
      toast.error("Please providss.");
      return;
    }
    if (commentInput.trim() === "") {
      toast.warning("There is no additional comment");
    }

    const requestBody = {
      rate: rateInput,
      answers: answerObjects,
      comment: commentInput,
    };

    try {
      const client = buildClient('')
      await client.put(
        `/api/assessment/overallsurveys/${surveyData._id}`,
        requestBody
      );
      toast.success("Survey submitted successfully!");
    } catch (error) {
      console.error("Error submitting survey:", error);
      toast.error(
        "An error occurred while submitting the survey. Please try again."
      );
      // Handle error scenario
    }
  };

  if (!surveyData) {
    return (
      <div className="bg-sky-200 min-h-screen flex items-center justify-center">
        <div className="bg-white rounded p-8 max-w-md">
          <h1 className="text-3xl font-bold mb-4">Invalid Survey Link</h1>
          <p className="text-xl">
            The survey you are trying to access is not valid.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-sky-200 min-h-screen flex items-center justify-center">
      {" "}
      <SideNavbar links={links} />
      <div className="bg-white rounded p-8 max-w-md">
        <h1 className="text-3xl font-bold mb-4">Survey</h1>
        <h2 className="text-xl font-bold mb-2">Rate the Course</h2>
        <label className="block">
          Rate the Course out of 10:
          <input
            className="border border-gray-300 rounded px-2 py-1"
            type="number"
            min="0"
            max="10"
            value={rateInput}
            onChange={handleRateInputChange}
          />
        </label>

        <h2 className="text-xl font-bold mb-2">Answer the Questions</h2>
        {surveyData.questions.map((question, index) => (
          <div className="mb-4" key={question._id}>
            <h3 className="text-lg font-bold mb-1">
              Question {question.questionNumber}
            </h3>
            <p className="mb-1">{question.questionTitle}</p>
            <p className="mb-2">{question.questionDescription}</p>
            <input
              className="border border-gray-300 rounded px-2 py-1 w-full"
              type="text"
              value={answerInputs[index] || ""}
              onChange={(e) => handleAnswerInputChange(index, e.target.value)}
            />
          </div>
        ))}

        <h2 className="text-xl font-bold mb-2">Additional Comments</h2>
        <label className="block">
          Any Other Comments:
          <textarea
            className="border border-gray-300 rounded px-2 py-1 w-full"
            rows="4"
            value={commentInput}
            onChange={handleCommentInputChange}
          ></textarea>
        </label>

        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleSubmitSurvey}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export async function getServerSideProps(context) {
  const { surveyCode } = context.query;
  const client = buildClient(context)

  try {
    const surveysResponse = await client.get(
      `/api/assessment/overallsurveys/`
    );
    const surveysData = surveysResponse.data.data;
    const survey = surveysData.find(
      (survey) => survey.survey_id === surveyCode
    );
    if (!survey) {
      return {
        props: {
          surveyData: null,
        },
      };
    }
    const surveyId = survey._id;
    const response = await client.get(
      `/api/assessment/overallsurveys/${surveyId}`
    );
    const surveyData = response.data.data;
    return {
      props: {
        surveyData,
      },
    };
  } catch (error) {
    console.error("Error fetching survey data:", error);
    return {
      props: {
        surveyData: null,
      },
    };
  }
}

export default SurveyPage;
