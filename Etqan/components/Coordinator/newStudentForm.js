import { useRef, useState } from "react";
import { useRouter } from "next/router";
import buildClient from "../../hooks/build";
import { BiPlus } from "react-icons/bi";
import { toast } from "react-toastify";
// import Coordinator from "../../pages/coordinator/[coordinatorId]/updateprofile";

function NewStudentForm(props) {
  const router = useRouter();
  const { programId, coordinatorId } = router.query;
  console.log("first", coordinatorId);
  const StudentName = useRef();
  const StudentEmail = useRef();
  const StudentId = useRef();
  const StudentYear = useRef();
  const Studentaddress = useRef();
  const StudentDepart = useRef();
  const StudentDOB = useRef();
  const StudentPhone = useRef();

  const [isLoading, setIsLoading] = useState(false);

  async function submitHandler(event) {
    const client =buildClient('')
    event.preventDefault();

    const enteredName = StudentName.current.value;
    const enteredEmail = StudentEmail.current.value;
    const enteredStudentId = StudentId.current.value;
    const enteredaddress = Studentaddress.current.value;
    const enteredYear = StudentYear.current.value;
    const enteredDepart = StudentDepart.current.value;
    const enteredDOB = StudentDOB.current.value;
    const enteredPhone = StudentPhone.current.value;

    // Validation
    if (
      enteredName.trim() === "" ||
      enteredEmail.trim() === "" ||
      enteredStudentId.trim() === "" ||
      enteredaddress.trim() === "" ||
      enteredYear.trim() === "" ||
      enteredDepart.trim() === "" ||
      enteredDOB.trim() === "" ||
      enteredPhone.trim() === ""
    ) {
      toast.error("All fields are required !");
      return;
    }
    if (enteredName.length < 2) {
      toast.error("Name is too short");
      return;
    }

    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    if (!emailRegex.test(enteredEmail)) {
      toast.error("Invalid email format!");
      return;
    }

    setIsLoading(true);

    const studentData = {
      name: enteredName,
      email: enteredEmail,
      student_id: enteredStudentId,
      marks: null,
      address: enteredaddress,
      year: enteredYear,
      depart_name: enteredDepart,
      date_of_birth: enteredDOB,
      password: "123456",
      phone: enteredPhone,
      role: "student",
    };
    console.log(studentData);
    try {
      const response = await client.post(
        `/api/prgservice/programs/${programId}/students`,
        studentData
      );
      console.log(response);
      toast.success("Student added successfully!");
      router.push(
        `/coordinator/${coordinatorId}/programs/${programId}/students`
      );
    } catch (error) {
      console.error("Error adding student:", error);
      toast.error("Failed to add student");
    }

    setIsLoading(false);
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
              Please Enter Student Info
            </h1>
          </div>
          <form
            className="p-4 bg-white rounded w-full"
            onSubmit={submitHandler}
          >
            <div className="mb-2">
              <label className="font-semibold mb-2 block" htmlFor="name">
                1- Student name:
              </label>
              <input
                className="block font-inherit rounded-lg border-2 border-[#ccc] border-solid p-1 w-full"
                type="text"
                id="name"
                placeholder="Enter student name"
                ref={StudentName}
              />
            </div>
            <div className="mb-2">
              <label className="font-semibold mb-2 block" htmlFor="phone">
                2- Student phone:
              </label>
              <input
                className="block font-inherit rounded-lg border-2 border-[#ccc] border-solid p-1 w-full"
                type="text"
                placeholder="Enter student phone number"
                id="phone"
                ref={StudentPhone}
              />
            </div>
            <div className="mb-2">
              <label className="font-semibold mb-2 block" htmlFor="depart_name">
                3- Student department:
              </label>
              <input
                className="block font-inherit rounded-lg border-2 border-[#ccc] border-solid p-1 w-full"
                type="text"
                placeholder="Enter student department"
                id="depart_name"
                ref={StudentDepart}
              />
            </div>
            <div className="mb-2">
              <label className="font-semibold mb-2 block" htmlFor="email">
                4- Student email:
              </label>
              <input
                className="block font-inherit rounded-lg border-2 border-[#ccc] border-solid p-1 w-full"
                type="text"
                placeholder="Enter student email"
                id="email"
                ref={StudentEmail}
              />
            </div>

            <div className="mb-2">
              <label className="font-semibold mb-2 block" htmlFor="student_id">
                5- Student id:
              </label>
              <input
                className="block font-inherit rounded-lg border-2 border-[#ccc] border-solid p-1 w-full"
                type="text"
                placeholder="Enter student id"
                id="student_id"
                ref={StudentId}
              />
            </div>
            <div className="mb-2">
              <label className="font-semibold mb-2 block" htmlFor="year">
                6-Student year:
              </label>
              <input
                className="block font-inherit rounded-lg border-2 border-[#ccc] border-solid p-1 w-full"
                type="number"
                placeholder="Enter student year"
                id="year"
                ref={StudentYear}
              />
            </div>

            <div className="mb-2 border-solid border-black border-2 rounded p-1">
              <div className="mb-2">
                <label className="font-semibold mb-2 block" htmlFor="address">
                  7- Student address:
                </label>
                <textarea
                  className="block font-inherit h-32 rounded-lg border-2 border-[#ccc] border-solid p-1 w-full"
                  type="text"
                  placeholder="Enter student address"
                  id="address"
                  ref={Studentaddress}
                />
              </div>
            </div>
            <div className="mb-2 ">
              <label className="font-semibold mb-2 block">
                8- Date of birth:
              </label>
              <div className="input-type flex justify-center">
                <input
                  type="date"
                  name="date"
                  className="border px-5 py-3 focus:outline-none rounded-md"
                  placeholder="date of birth"
                  ref={StudentDOB}
                />
              </div>
            </div>

            <button className="w-full cursor-pointer flex justify-center text-center text-md text-white px-4 py-2 border rounded-md hover:border-gray-700 hover:text-black bg-gradient-to-r to-blue-700 from-sky-400">
              Add Student{" "}
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

export default NewStudentForm;
