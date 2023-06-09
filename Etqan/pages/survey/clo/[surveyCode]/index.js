import { useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import Head from "next/head";
import buildClient from "../../../../hooks/build";
export default function CourseSurvey({
  cloDescription,
  invalidSurvey,
  surveyId,
}) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const router = useRouter();

  const handleSubmit = async (event) => {
    const build = buildClient('')
    event.preventDefault();
    if (rating === 0 || !rating || comment.trim() === "") {
      toast.error("Please provide a rating and comment");
      return;
    }
    console.log(`Rating: ${rating}, Comment: ${comment}`);
    // Submit the survey data to your API or backend server here
    try {
      const { data } = await build.post(
        `/api/assessment/surveys/${surveyId}/responses/`,
        {
          comment,
          rate: rating,
        }
      );
      toast.success("Survey submitted successfully");
      router.push(`https://etqan.dev`);
    } catch (error) {
      toast.error("Error submitting survey. Please try again later.");
    }
  };

  return (
    <>
      <Head>
        <title>Course Survey</title>
      </Head>
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        {invalidSurvey ? (
          <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Invalid Survey Link
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              The survey link you provided is not valid.
            </p>
          </div>
        ) : (
          <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              {cloDescription}
            </h2>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
              <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                    <div className="flex flex-col">
                      <div className="flex flex-col">
                        <label className="leading-loose">Rating</label>
                        <div className="mt-2">
                          {numbers.map((value, index) => (
                            <span key={value}>
                              <button
                                type="button"
                                className={`${
                                  value === rating
                                    ? "text-yellow-500"
                                    : "text-gray-400"
                                } text-3xl focus:outline-none`}
                                onClick={() => setRating(value)}
                              >
                                {value}
                              </button>
                              {index !== numbers.length - 1 && (
                                <span className="px-2"> </span>
                              )}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="comment"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Comments
                    </label>
                    <div className="mt-1">
                      <textarea
                        id="comment"
                        name="comment"
                        rows="3"
                        value={comment}
                        onChange={(event) => setComment(event.target.value)}
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                  </div>

                  <div>
                    <button
                      type="submit"
                      className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text -sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Submit Survey
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export const getServerSideProps = async (context) => {
  const { surveyCode } = context.query;
  const client = buildClient(context)

  try {
    // Fetch the course data and clos from your API
    const surveys = await client.get(
      `/api/assessment/surveys`
    );
    const surveysData = surveys.data.data;
    const survey = surveysData.find(
      (survey) => survey.survey_id === surveyCode
    );

    console.log(survey , "survey");
    if (!survey) {
      return {
        props: {
          invalidSurvey: true,
        },
      };
    }

    const cloDescription = survey.description;
    const surveyId = survey._id;

    return {
      props: {
        cloDescription,
        invalidSurvey: false,
        surveyId,
      },
    };
  } catch (error) {
    console.error(error);
    return {
      props: {
        cloDescription: "",
        invalidSurvey: true,
      },
    };
  }
};
