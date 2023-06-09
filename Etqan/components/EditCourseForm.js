import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRef, useState } from "react";
import { useRouter } from "next/router";
import buildClient from "../hooks/build";

function NewCourseForm({ course }) {
  const router = useRouter();
  const { courseId, programId, role, userId } = router.query;
  const authParams = `&userId=${userId}&role=${role}`;
  console.log(course);
  const [name, setName] = useState(course.name);
  const [code, setCode] = useState(course.code);
  const [credits, setCredits] = useState(course.credits);
  const [information, setInformation] = useState(course.information);
  const [goals, setGoals] = useState(course.goals);
  const [instructorName, setInstructorName] = useState(course.instructorName);
  const [textBook, setTextBook] = useState(course.textBook);
  const [topics, setTopics] = useState(course.topics);
  const [abetChecked, setAbetChecked] = useState([]);
  const checkList = [];
  const criteria = [
    "1- An ability to identify, formulate, and solve complex engineering problems by applying principles of engineering, science, and mathematics.",
    "2- An ability to apply engineering design to produce solutions that meet specified needs with consideration of public health, safety, and welfare, as well as global, cultural, social, environmental, and economic factors.",
    "3- An ability to communicate effectively with a range of audiences.",
    "4- An ability to recognize ethical and professional responsibilities in engineering situations and make informed judgments, which must consider the impact of engineering solutions in global, economic, environmental, and societal contexts.",
    "5- An ability to function effectively on a team whose members together provide leadership, create a collaborative and inclusive environment, establish goals, plan tasks, and meet objectives.",
    "6- An ability to develop and conduct appropriate experimentation, analyze and interpret data, and use engineering judgment to draw conclusions.",
    "7- An ability to acquire and apply new knowledge as needed, using appropriate learning strategies.",
  ];
  const prog_outcomes = [
    "1- ProgOut ability to identify, formulate, and solve complex engineering problems by applying principles of engineering, science, and mathematics.",
    "2- ProgOut ability to apply engineering design to produce solutions that meet specified needs with consideration of public health, safety, and welfare, as well as global, cultural, social, environmental, and economic factors.",
    "3- ProgOut ability to communicate effectively with a range of audiences.",
    "4- ProgOut ability to recognize ethical and professional responsibilities in engineering situations and make informed judgments, which must consider the impact of engineering solutions in global, economic, environmental, and societal contexts.",
    "5- ProgOut ability to function effectively on a team whose members together provide leadership, create a collaborative and inclusive environment, establish goals, plan tasks, and meet objectives.",
    "6- ProgOut ability to develop and conduct appropriate experimentation, analyze and interpret data, and use engineering judgment to draw conclusions.",
    "7- ProgOut ability to acquire and apply new knowledge as needed, using appropriate learning strategies.",
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
  const handleNameChange = (e) => {
    setName(e.target.value);
  };
  const handleCodeChange = (e) => {
    setCode(e.target.value);
  };
  const handleCreditsChange = (e) => {
    setCredits(e.target.value);
  };
  const handleInformationChange = (e) => {
    setInformation(e.target.value);
  };
  const handleTextBookChange = (e) => {
    setTextBook(e.target.value);
  };
  const handleInstructorName = (e) => {
    setInstructorName(e.target.value);
  };
  const handleTopics = (e) => {
    setTopics(e.target.value);
  };
  const handleGoals = (e) => {
    setGoals(e.target.value);
  };

  const editCourse = async () => {
    try {
      if (name.length < 3 || !isNaN(name)) {
        toast.error("Name must be a string with at least 3 characters");
        return;
      }
      const courseData = {
        name: name,
        code: code,
        credits: credits,
        information: information,
        goals: goals,
        // topics: topics,
        textBook: textBook,
        instructorName: instructorName,
        selectedAbetCri: abetChecked,
      };
      const client=buildClient('')

      const response = await client.put(
        `/api/assessment/programs/${programId}/courses/${courseId}`,
        courseData
      );
      toast.success("Course Updated Successfully!");
    } catch {
      toast.error("Error Updating Course. Check your Internet connection!");
    }
  };

  return (
    <>
      <div className="min-h-screen w-full sm:w-9/12 md:w-7/12 lg:w-6/12 xl:w-8/12 p-0 sm:p-12 mx-auto overflow-x-auto">
        <div className="mx-auto px-8 py-12 bg-white border-0 shadow-lg rounded-3xl sm:rounded-3xl md:rounded-4xl lg:rounded-5xl xl:rounded-6xl">
          <div className="">
            <h1 className="pb-20  text-4xl font-bold ">
              Please Enter Course Info
            </h1>
          </div>
          <form className="p-4 bg-white rounded ">
            <div className="mb-2">
              <label className="font-bold mb-2 block" htmlFor="name">
                1- Course title:
              </label>
              <input
                className="block font-inherit rounded-lg border-4 border-[#ccc] border-solid p-1 w-full"
                type="text"
                required
                id="name"
                //value={name}
                placeholder={course.name}
                onChange={handleNameChange}
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
                //value={code}
                placeholder={course.code}
                onChange={handleCodeChange}
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
                //value={instructorName}
                placeholder={course.instructorName}
                onChange={handleInstructorName}
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
                //value={credits}
                placeholder={course.credits}
                onChange={handleCreditsChange}
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
                //value={information}
                placeholder={course.information}
                onChange={handleInformationChange}
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
                  //value={goals}
                  placeholder={course.goals}
                  onChange={handleGoals}
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
                      </div>{" "}
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
                //value={textBook}
                placeholder={course.textBook}
                onChange={handleTextBookChange}
              />
            </div>
            <button
              className="w-full cursor-pointer text-center bg-blue-600 text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-black"
              onClick={editCourse}
            >
              Edit Course
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default NewCourseForm;
