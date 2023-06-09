import React, { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, CartesianGrid, Tooltip } from "recharts";
import { useRouter } from "next/router";
import SideNavbar from "../../../../../../../components/SideNavbar";
import buildClient from "../../../../../../../hooks/build";

const SurveyPage = () => {
  const [courseData, setCourseData] = useState(null);
  const [surveyData, setSurveyData] = useState(null);
  const router = useRouter();
  const { instructorId, programId, courseId } = router.query;
  const links = [
    {
      text: "back to your course",
      href: `/instructor/${instructorId}/programs/${programId}/courses/${courseId}/`,
      icon: "/icons/back.svg",
      alt: "programs",
    },
    // Add more links as needed
  ];

  useEffect(() => {
    const fetchData = async () => {
      const client=buildClient('')
      try {
        const courseResponse = await client.get(
          `/api/assessment/courses/${courseId}`
        );
        const courseData = courseResponse.data.data;

        setCourseData(courseData);

        if (courseData.surveyId) {
          const surveyResponse = await client.get(
            `/api/assessment/overallSurveys/${courseData.surveyId}`
          );
          const surveyData = surveyResponse.data.data;

          setSurveyData(surveyData);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setCourseData(null);
        setSurveyData(null);
      }
    };

    fetchData();
  }, [courseId]);

  const getRandomStudentIcon = (numIcons) => {
    const randomIndex = Math.floor(Math.random() * numIcons) + 1;
    return `/icons/students/student${randomIndex}.svg`;
  };

  const getRatingsData = () => {
    const ratings = Array(10).fill(0);
    surveyData.rates.forEach((rating) => {
      if (!isNaN(rating) && rating >= 1 && rating <= 10) {
        ratings[rating - 1]++;
      }
    });
    return ratings.map((count, index) => ({
      rating: index + 1,
      count,
    }));
  };

  const ratingsData = surveyData ? getRatingsData() : [];

  if (!courseData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-sky-200 min-h-screen flex items-center justify-center">
      <SideNavbar links={links} />
      <div className="container mx-auto w-[50%] p-8 bg-white rounded shadow-lg right-0 my-4">
        <h1 className="text-2xl font-bold mb-4">Course Survey</h1>

        <div className="mb-8">
          {surveyData && (
            <div className="mt-4">
              <h4 className="text-lg font-semibold mb-2">
                Summary of students rates for the course
              </h4>
              <BarChart width={400} height={300} data={ratingsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="rating" />
                <Tooltip />
                <Bar dataKey="count" fill="#8884d8" />
              </BarChart>
            </div>
          )}

          {surveyData &&
            surveyData.questions.map((question) => (
              <div key={question._id} className="mb-6">
                <div
                  key={question.questionNumber}
                  className="mb-4 p-4 bg-gray-200 rounded shadow"
                >
                  <div className="flex flex-col items-star justify-between mb-2">
                    <div className="flex items-center mb-2">
                      <h3 className="text-lg font-bold mr-2">Title:</h3>
                      <h3 className="text-lg font-semibold ">
                        {question.questionTitle}
                      </h3>
                    </div>
                    <div className="flex items-center">
                      <h3 className="text-gray-700 font-semibold mr-2">
                        Description:
                      </h3>
                      <p className="text-gray-600">
                        {question.questionDescription}
                      </p>
                    </div>
                  </div>
                  <div></div>
                </div>

                <div className="space-y-4">
                  {question.questionId !== 1 && (
                    <h4 className="text-lg font-semibold mb-2">
                      Some of student responses:
                    </h4>
                  )}
                  {question.answers
                    .sort(() => Math.random() - 0.5)
                    .slice(0, 5)
                    .map((answer, index) => (
                      <div
                        key={index}
                        className="bg-white p-4 rounded shadow-sm flex items-start space-x-4"
                      >
                        <div className="bg-gray-200 rounded-full p-2">
                          {/* Student icon */}
                          <img
                            src={getRandomStudentIcon(5)} // Pass the total number of student icons available
                            alt="Student Icon"
                            className="h-6 w-6 text-gray-500"
                          />
                        </div>
                        <blockquote className="text-gray-700 italic">
                          {answer}
                        </blockquote>
                      </div>
                    ))}
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default SurveyPage;
