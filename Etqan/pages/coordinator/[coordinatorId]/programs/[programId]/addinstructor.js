import React, { useState } from "react";
import buildClient from "../../../../../hooks/build";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import SideNavbar from "../../../../../components/SideNavbar";

function AddInstructor({ programAndCourses }) {
  const router = useRouter();
  const { coordinatorId, programId } = router.query;
  const roleInQuery = "instructor";
  const links = [
    {
      text: "Back to Instructors ",
      href: `/coordinator/${coordinatorId}/programs/${programId}/instructors`,
      icon: "/icons/back.svg",
      alt: "programs",
    },
  ];
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("instructor");
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [password, setPassword] = useState("");
  const [employeeId, setEmployeeId] = useState(""); // New state variable for employee_id
  const [academicTitle, setAcademicTitle] = useState(""); // New state variable for academic_title

  // Handle form input changes
  const handleNameChange = (event) => {
    setName(event.target.value);
  };
  const handleEmployeeIdChange = (event) => {
    setEmployeeId(event.target.value);
  };

  const handleAcademicTitleChange = (event) => {
    setAcademicTitle(event.target.value);
  };
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleCourseSelect = (event) => {
    const courseId = event.target.value;
    const programIndex = programAndCourses.findIndex(
      (item) => item.program._id === programId
    );
    const course = programAndCourses[programIndex].courses.find(
      (item) => item._id === courseId
    );

    // Check if the course is already selected
    const isCourseSelected = selectedCourses.some(
      (selectedCourse) => selectedCourse._id === course._id
    );

    if (!isCourseSelected) {
      setSelectedCourses([...selectedCourses, course]);
    }
  };

  const handleCourseRemove = (courseId) => {
    const client = buildClient('')
    const updatedCourses = selectedCourses.filter(
      (course) => course._id !== courseId
    );
    setSelectedCourses(updatedCourses);
    console.log("firsss", updatedCourses);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (name.trim() === "") {
      toast.warning("Please enter a name");
      return;
    }
    if (email.trim() === "") {
      toast.warning("Please enter an email");
      return;
    }
    if (employeeId.trim() === "") {
      toast.warning("Please enter an employee ID");
      return;
    }
    if (academicTitle.trim() === "") {
      toast.warning("Please enter an academic title");
      return;
    }
    if (password.trim() === "") {
      toast.warning("Please enter a password");
      return;
    }
    if (selectedCourses.length === 0) {
      toast.warning("Please select at least one course");
      return;
    }
    const courses = selectedCourses.map((course) => course._id);
    const program = 5;
    const employee_id = "123456";
    const academic_title = "Assoc prof";
    const newInstructor = {
      name,
      email,
      role,
      courses,
      program,
      employee_id,
      academic_title,
      password,
      employee_id: employeeId,
      academic_title: academicTitle,
    };
    console.log("firstm", newInstructor);
    try {
      await axios.post(
        `/api/assessment/instructors`,
        newInstructor
      );
      toast.success("Instructor Added Successfully");
      // Redirect to the instructor list page or other desired destination
      router.push(
        `/coordinator/${coordinatorId}/programs/${programId}/instructors`
      );
    } catch (error) {
      toast.error(
        "Error Adding Instructor. Please check your internet connection!"
      );
    }
  };

  return (
    <div className="min-h-screen pt-12 bg-slate-300 bg-[url('/backgrounds/profile.svg')]">
      <SideNavbar links={links} />
      <div className="max-w-md mx-auto bg-white shadow-md text-white font-bold rounded-lg p-6 my-4 bg-[url('/backgrounds/editprofile.svg')]">
        <h2 className="text-xl font-medium mb-4">Add Instructor</h2>
        <form
          onSubmit={handleSubmit}
          className="space-y-4 text-white font-bold"
        >
          {/* Instructor form inputs */}
          <div>
            <label
              htmlFor="name"
              className="block mb-2 text-sm font-bold dark:text-white"
            >
              Name:
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={handleNameChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium dark:text-white"
            >
              Email:
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={handleEmailChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            />
          </div>
          <div>
            <label
              htmlFor="employeeId"
              className="block mb-2 text-sm font-medium dark:text-white"
            >
              Employee ID:
            </label>
            <input
              type="text"
              id="employeeId"
              value={employeeId}
              onChange={handleEmployeeIdChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            />
          </div>

          {/* Academic title input */}
          <div>
            <label
              htmlFor="academicTitle"
              className="block mb-2 text-sm font-medium dark:text-white"
            >
              Academic Title:
            </label>
            <input
              type="text"
              id="academicTitle"
              value={academicTitle}
              onChange={handleAcademicTitleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium dark:text-white"
            >
              Password:
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={handlePasswordChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            />
          </div>

          {/* Course selection */}
          <div>
            <label
              htmlFor="courses"
              className="block mb-2 text-sm font-medium dark:text-white"
            >
              Select Courses:
            </label>
            <select
              id="courses"
              onChange={handleCourseSelect}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            >
              <option value="" disabled>
                Select a course
              </option>
              {programAndCourses
                .filter(({ program }) => program._id === programId)
                .map(({ program, courses }) =>
                  courses.map((course) => (
                    <option key={course._id} value={course._id}>
                      {course.name}
                    </option>
                  ))
                )}
            </select>
          </div>

          {/* Selected courses */}
          <div>
            <label className="block mb-2 text-sm font-medium text-black dark:text-white">
              Selected Courses:
            </label>
            <ul>
              {selectedCourses.map((course) => (
                <li className="text-black" key={course._id}>
                  {course.name}
                  <button
                    className="text-red-500 ml-12 mx-auto"
                    type="button"
                    onClick={() => handleCourseRemove(course._id)}
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Submit button */}
          <button
            type="submit"
            className="bg-green-600 flex ml-32 text-white rounded-lg py-2 px-4 hover:bg-green-700"
          >
            Add Instructor
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddInstructor;
export async function getServerSideProps(context) {
  const client = buildClient()
  const { instructorId, programId } = context.query;
  const role = "instructor";

  const programsResponse = await axios.get(
    `/api/prgservice/programs/`
  );
  const programsData = programsResponse.data.data;

  const programAndCourses = [];

  for (const program of programsData) {
    const coursesResponse = await axios.get(
      `/api/assessment/programs/${program._id}/courses`
    );
    const programCourses = coursesResponse.data.data;
    programAndCourses.push({ program, courses: programCourses });
  }

  return {
    props: {
      role,
      programsData,
      programAndCourses,
    },
  };
}
