import { useRef, useState } from "react";
import { useRouter } from "next/router";
import buildClient from "../hooks/build";

function NewCourseForm(props) {
  const router = useRouter();
  const { programId } = router.query;
  const CourseName = useRef();
  const CourseCode = useRef();
  const CreditInputRef = useRef();
  const TextBookInputRef = useRef();
  const CourseInformationInputRef = useRef();
  const CourseGoalsInputRef = useRef();
  const TopicsInputRef = useRef();
  const InstructorInputRef = useRef();
  const [abetChecked, setAbetChecked] = useState([]);
  const [progOutcomesChecked, setProgOutcomesChecked] = useState([]);

  const criteria = [
    "1- an ability to identify, formulate, and solve complex engineering problems by applying principles of engineering, science, and mathematics.",
    "2- an ability to apply engineering design to produce solutions that meet specified needs with consideration of public health, safety, and welfare, as well as global, cultural, social, environmental, and economic factors.",
    "3- an ability to communicate effectively with a range of audiences.",
    "4- an ability to recognize ethical and professional responsibilities in engineering situations and make informed judgments, which must consider the impact of engineering solutions in global, economic, environmental, and societal contexts.",
    "5- an ability to function effectively on a team whose members together provide leadership, create a collaborative and inclusive environment, establish goals, plan tasks, and meet objectives.",
    "6- an ability to develop and conduct appropriate experimentation, analyze and interpret data, and use engineering judgment to draw conclusions.",
    "7- an ability to acquire and apply new knowledge as needed, using appropriate learning strategies.",
  ];

  let updatedAbetList = [];
  const handleAbetCheck = (event) => {
    updatedAbetList = [...abetChecked];
    if (event.target.checked) {
      updatedAbetList = [...abetChecked, +event.target.value[0]];
    } else {
      updatedAbetList.splice(abetChecked.indexOf(event.target.value), 1);
    }
    setAbetChecked(updatedAbetList);
    console.log(updatedAbetList);
    // let selectedAbetCri = updatedList.map(el=>+el);
  };

  async function submitHandler(event) {
    event.preventDefault();

    const enteredName = CourseName.current.value;
    const enteredCode = CourseCode.current.value;
    const enteredCredits = CreditInputRef.current.value;
    const enteredInformation = CourseInformationInputRef.current.value;
    const enteredGoals = CourseGoalsInputRef.current.value;
    const enteredTopics = TopicsInputRef.current.value;
    const enteredTextBook = TextBookInputRef.current.value;
    const enteredInstructorName = InstructorInputRef.current.value;

    const courseData = {
      name: enteredName,
      code: enteredCode,
      credits: enteredCredits,
      information: enteredInformation,
      goals: enteredGoals,
      topics: enteredTopics,
      textBook: enteredTextBook,
      instructorName: enteredInstructorName,
      selectedAbetCri: abetChecked,
      selectedProgOutcomes: progOutcomesChecked,
    };
    console.log(courseData);
    const client =buildClient('')
    const response = await client
      .post(
        `/api/assessment/programs/${programId}/courses`,
        courseData
      )
      .then(console.log(response));
    // .then(alert(response._id.toString()));
    //  props.onAddMeetup(meetupData);
    router.push("/courses");
  }
  return (
    <>
      <div className="min-h-screen w-full sm:w-9/12 md:w-7/12 lg:w-6/12 xl:w-8/12 p-0 sm:p-12 mx-auto overflow-x-auto">
        <div className="mx-auto px-8 py-12 bg-white border-0 shadow-lg rounded-3xl sm:rounded-3xl md:rounded-4xl lg:rounded-5xl xl:rounded-6xl">
          <div className="">
            <h1 className="pb-20  text-4xl font-bold ">
              Please Enter Course Info
            </h1>
          </div>
          <form className="p-4 bg-white rounded " onSubmit={submitHandler}>
            <div className="mb-2">
              <label className="font-bold mb-2 block" htmlFor="name">
                1- Course title:
              </label>
              <input
                className="block font-inherit rounded-lg border-4 border-[#ccc] border-solid p-1 w-full"
                type="text"
                required
                id="name"
                ref={CourseName}
              />
            </div>
            <div className="mb-2">
              <label className="font-bold mb-2 block" htmlFor="name">
                2- Course code:
              </label>
              <input
                className="block font-inherit rounded-lg border-4 border-[#ccc] border-solid p-1 w-full"
                type="text"
                required
                id="name"
                ref={CourseCode}
              />
            </div>
            <div className="mb-2">
              <label className="font-bold mb-2 block" htmlFor="instructor">
                3- Instructor's or course coordinator's name
              </label>
              <input
                className="block font-inherit rounded-lg border-4 border-[#ccc] border-solid p-1 w-full"
                type="text"
                required
                id="instructor"
                ref={InstructorInputRef}
              />
            </div>
            <div className="mb-2">
              <label className="font-bold mb-2 block" htmlFor="credits">
                4- Credits and Contact hourse:
              </label>
              <input
                className="block font-inherit rounded-lg border-4 border-[#ccc] border-solid p-1 w-full"
                type="number"
                required
                id="credits"
                ref={CreditInputRef}
              />
            </div>
            <div className="mb-2">
              <label className="font-bold mb-2 block" htmlFor="Information">
                5- Specific course information:
              </label>
              <input
                className="block font-inherit rounded-lg border-4 border-[#ccc] border-solid p-1 w-full"
                type="text"
                required
                id="Information"
                ref={CourseInformationInputRef}
              />
            </div>
            <div className="mb-2 border-solid border-black border-2 rounded p-1">
              <div className="mb-2">
                <label className="font-bold mb-2 block" htmlFor="Goals">
                  6- Specific goals of the course
                </label>
                <textarea
                  className="block font-inherit h-64 rounded-lg border-4 border-[#ccc] border-solid p-1 w-full"
                  type="text"
                  required
                  id="Goals"
                  ref={CourseGoalsInputRef}
                />
              </div>
              <div className="flex flex-col">
                <h4 className="font-semibold italic">
                  Please mark the SOs this course aims to achieve:
                </h4>
                {criteria.map((el, index) => {
                  return (
                    <div
                      className="flex flex-row m-4 abet-criteria"
                      key={index + 1}
                    >
                      <div>
                        <input
                          className="mr-2 w-8 h-8 rounded-lg"
                          type="checkbox"
                          value={el}
                          data-id={index + 1}
                          onChange={handleAbetCheck}
                        />
                      </div>
                      <p> {el}</p>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="mb-2">
              <label className="font-bold mb-2 block" htmlFor="TextBook">
                7- TextBook
              </label>
              <textarea
                className="block font-inherit rounded-lg border-4 border-[#ccc] border-solid p-1 w-full"
                type="text"
                required
                id="TextBook"
                ref={TextBookInputRef}
              />
            </div>
            <div className="mb-2">
              <label className="font-bold mb-2 block" htmlFor="topics">
                8- Brief List of topics to be covered:
              </label>
              <textarea
                className="block font-inherit rounded-lg border-4 border-[#ccc] border-solid p-1 w-full"
                id="topics"
                required
                rows="5"
                ref={TopicsInputRef}
              ></textarea>
            </div>
            <div className="cursor-pointer text-center bg-blue-600 text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-black">
              <button>Add Course</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default NewCourseForm;
