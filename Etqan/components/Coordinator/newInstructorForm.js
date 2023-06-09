import { useRef, useState } from "react";
import { useRouter } from "next/router";
import buildClient from "../../hooks/build";
import { BiPlus } from "react-icons/bi";

// import classes from "./NewInstructorForm.module.css";
function NewInstructorForm(props) {
  const client = buildClient('')
  const params = props.params;
  const router = useRouter();
  console.log("propppps", props);
  console.log("id", params.courseId);
  const InstructorName = useRef();
  const InstructorEmail = useRef();
  const EmployeeID = useRef();
  const InstructorCourses = useRef();
  const AcademicTitle = useRef();
  const InstructorProgram = useRef();
  const InstructorPassword = useRef();
  const InstructorRole = useRef();

  async function submitHandler(event) {
    event.preventDefault();

    const enteredName = InstructorName.current.value;
    const enteredEmail = InstructorEmail.current.value;
    const enteredEmployeeID = EmployeeID.current.value;
    const enteredAcademicTitle = AcademicTitle.current.value;
    const enteredProgram = InstructorProgram.current.value;
    const enteredCourses = InstructorCourses.current.value;
    const enteredPassword = InstructorPassword.current.value;
    const enteredRole = InstructorRole.current.value;

    const instructorData = {
      role: enteredRole,
      name: enteredName,
      program: enteredProgram,
      email: enteredEmail,
      password: enteredPassword,
      employee_id: enteredEmployeeID,
      courses: enteredCourses,
      academic_title: enteredAcademicTitle,
    };
    await console.log(instructorData);
    const response = await client
      .post(
        `api/assessment/courses/${params.courseId}/instructors`,
        instructorData
      )
      .then(console.log(response));
    // .then(alert(response._id.toString()));
    //  props.onAddMeetup(meetupData);
    router.push("/instructor");
  }
  return (
    <>
      <div className="min-h-screen w-full sm:w-9/12 md:w-7/12 lg:w-5/12 xl:w-5/12 p-0 sm:p-12 sm:px-16 mx-auto overflow-x-auto">
        <div className="mx-auto px-8 py-12 bg-white border-0 shadow-lg rounded-3xl sm:rounded-3xl md:rounded-4xl lg:rounded-5xl xl:rounded-6xl">
          {/*   
      <div className="min-h-screen w-[40%] p-0 sm:p-12">
        <div className="mx-auto  px-8 py-12 bg-white border-0 shadow-lg sm:rounded-3xl"> */}
          <div className="">
            <h1 className="pb-20  text-4xl font-bold text-slate-900 ">
              Please Enter Instructor Info
            </h1>
          </div>
          <form
            className="p-4 bg-white rounded w-full"
            onSubmit={submitHandler}
          >
            <div className="mb-2">
              <label className="font-semibold mb-2 block" htmlFor="name">
                1- Instuctor name:
              </label>
              <input
                className="block font-inherit rounded-lg border-2 border-[#ccc] border-solid p-1 w-full"
                type="text"
                required
                id="name"
                placeholder="Enter instructor name"
                ref={InstructorName}
              />
            </div>

            <div className="mb-2">
              <label className="font-semibold mb-2 block" htmlFor="role">
                2- Instructor role:
              </label>
              <input
                className="block font-inherit rounded-lg border-2 border-[#ccc] border-solid p-1 w-full"
                type="text"
                required
                placeholder="Enter instructor role"
                id="role"
                ref={InstructorRole}
              />
            </div>
            <div className="mb-2">
              <label className="font-semibold mb-2 block" htmlFor="email">
                3- Instuctor email:
              </label>
              <input
                className="block font-inherit rounded-lg border-2 border-[#ccc] border-solid p-1 w-full"
                type="text"
                required
                placeholder="Enter instructor email"
                id="email"
                ref={InstructorEmail}
              />
            </div>
            <div className="mb-2">
              <label className="font-semibold mb-2 block" htmlFor="password">
                4- Instuctor password:
              </label>
              <input
                className="block font-inherit rounded-lg border-2 border-[#ccc] border-solid p-1 w-full"
                type="text"
                required
                placeholder="Enter instructor password"
                id="password"
                ref={InstructorPassword}
              />
            </div>
            <div className="mb-2">
              <label className="font-semibold mb-2 block" htmlFor="employee_id">
                5- Employee id:
              </label>
              <input
                className="block font-inherit rounded-lg border-2 border-[#ccc] border-solid p-1 w-full"
                type="text"
                required
                placeholder="Enter instructor id"
                id="employee_id"
                ref={EmployeeID}
              />
            </div>
            <div className="mb-2">
              <label className="font-semibold mb-2 block" htmlFor="year">
                6-Instuctor courses:
              </label>
              <input
                className="block font-inherit rounded-lg border-2 border-[#ccc] border-solid p-1 w-full"
                type="number"
                required
                placeholder="Enter instructor year"
                id="year"
                ref={InstructorCourses}
              />
            </div>
            <div className="mb-2">
              <label className="font-semibold mb-2 block" htmlFor="marks">
                7- Academic title:
              </label>
              <input
                className="block font-inherit rounded-lg border-2 border-[#ccc] border-solid p-1 w-full"
                type="text"
                placeholder="Enter instructor marks"
                required
                id="marks"
                ref={AcademicTitle}
              />
            </div>
            <div className="mb-2 border-solid border-black border-2 rounded p-1">
              <div className="mb-2">
                <label className="font-semibold mb-2 block" htmlFor="address">
                  8- Insturctor Program:
                </label>
                <textarea
                  className="block font-inherit h-32 rounded-lg border-2 border-[#ccc] border-solid p-1 w-full"
                  type="text"
                  required
                  placeholder="Enter instructor address"
                  id="address"
                  ref={InstructorProgram}
                />
              </div>
            </div>

            <button className="w-full cursor-pointer flex justify-center text-center text-md text-white px-4 py-2 border rounded-md hover:border-gray-700 hover:text-black bg-gradient-to-r to-blue-700 from-sky-400">
              Add Instructor{" "}
              <span className="">
                <BiPlus size={24}></BiPlus>
              </span>
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default NewInstructorForm;
