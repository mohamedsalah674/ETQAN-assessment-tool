import React, { useState } from "react";
import buildClient from "../../../../../hooks/build";
import { useRouter } from "next/router";
import SideNavbar from "../../../../../components/SideNavbar";
import { toast } from "react-toastify";
function Coordinator({
  user,
  // programAndCourses,
  userCourses,
  differentCourses,
  programData,
}) {
  const router = useRouter();
  const instructorId = router.query.instructorId;
  const roleInQuery = "instructor";
  const { coordinatorId, programId } = router.query;
  const links = [
    {
      text: "Back to Instructors ",
      href: `/coordinator/${coordinatorId}/programs/${programId}/instructors`,
      icon: "/icons/back.svg",
      alt: "programs",
    },
  ];
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [role, setRole] = useState(user.role);
  const [selectedCourses, setSelectedCourses] = useState(userCourses);
  const [password, setPassword] = useState("");

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };

  const handleCourseSelect = (event) => {
    const courseId = event.target.value;
    // const programIndex = programAndCourses.findIndex(
    //   (item) => item.program._id === event.target.name
    // );
    const course = programData.courses.find((item) => item._id === courseId);
    if (!selectedCourses.includes(course)) {
      setSelectedCourses([...selectedCourses, course]);
    }
  };

  const handleCourseRemove = (courseId) => {
    const updatedCourses = selectedCourses.filter(
      (course) => course._id !== courseId
    );
    setSelectedCourses([...updatedCourses]);
  };

  const handleSubmit = async (event) => {
    const client = buildClient('')
    event.preventDefault();
    const userId = instructorId;
    const newCourses = await selectedCourses.map((course) => course._id);
    const courses = [...differentCourses, ...newCourses];
    console.log("difffff", courses);
    const updatedInstructor = { name, email, role, courses, password };
    try {
      client.put(
        `/api/assessment/instructors/${instructorId}`,
        updatedInstructor
      );
      toast.success("Instructor Updated Successfully");
    } catch {
      toast.error(
        "Error Updating Instructor. Please check your internet connection!"
      );
    }
  };

  return (
    <div className="min-h-screen pt-12 bg-slate-300 bg-[url('/backgrounds/profile.svg')]">
      <SideNavbar links={links} />
      <div className="max-w-md mx-auto bg-white shadow-md text-white font-bold rounded-lg p-6 my-4 bg-[url('/backgrounds/editprofile.svg')]">
        <div>
          <h2 className="text-xl font-medium mb-4">
            Update Instructor Profile
          </h2>
          <form>
            <div className="space-y-4 text-white font-bold">
              <div>
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-bold dark:text-white"
                >
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={name}
                  onChange={handleNameChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                />
              </div>
              <div>
                <label
                  htmlFor="role"
                  className="block mb-2 text-sm dark:text-white"
                >
                  Role
                </label>
                <input
                  readOnly
                  type="text"
                  name="role"
                  id="role"
                  value={role}
                  onChange={handleRoleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium dark:text-white"
                >
                  Email
                </label>
                <input
                  type="text"
                  name="email"
                  id="email"
                  value={email}
                  onChange={handleEmailChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                />{" "}
              </div>
              <div>
                {" "}
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium dark:text-white"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={password}
                  onChange={handlePasswordChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                />
              </div>{" "}
              <div>
                <h3 className="text-lg font-medium mb-2">
                  Assign Courses to This Instructor:
                </h3>
                <div key={programData._id}>
                  <label
                    htmlFor={programData._id}
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    {programData.name}
                  </label>
                  <select
                    name={programData._id}
                    id={programData._id}
                    onChange={handleCourseSelect}
                    value=""
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  >
                    <option value="" disabled>
                      Select a course
                    </option>
                    {programData.courses.map((course) => (
                      <option key={course._id} value={course._id}>
                        {course.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Selected Courses
                </label>
                <ul>
                  {selectedCourses.map((course) => (
                    <li key={course._id} className="flex items-center">
                      <span className="mr-2">{course.name}</span>
                      <button
                        type="button"
                        onClick={() => handleCourseRemove(course._id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        Remove
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <button
                  // type="submit"
                  onClick={handleSubmit}
                  className="bg-gray-600 text-white px-4 py-2 rounded-md font-medium"
                >
                  Update Profile
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const client = buildClient(context)
  const { instructorId, programId } = context.query;
  const role = "instructor";
  let user;
  user = await client.get(
    `/api/assessment/instructors/${instructorId}`
  );
  const userCoursesIds = user.data.data.courses;

  const programResponse = await client.get(
    `/api/prgservice/programs/${programId}`
  );
  const programData = programResponse.data.data;

  const programcoursesResponse = await client.get(
    `/api/assessment/programs/${programId}/courses`
  );
  const oneprogramCourses = programcoursesResponse.data.data;
  programData.courses = oneprogramCourses;

  const differentCourses = userCoursesIds.filter(
    (c) => !programData.coursesIds.includes(c)
  );

  const userCourses = oneprogramCourses.filter((course) =>
    userCoursesIds.includes(course._id)
  );

  console.log("aop", differentCourses);
  return {
    props: {
      user: user.data.data,
      differentCourses,
      userCourses,
      role,
      programData,
    },
  };
}

export default Coordinator;
