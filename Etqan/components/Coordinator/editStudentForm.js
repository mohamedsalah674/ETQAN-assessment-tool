import { useRef, useState, useEffect } from "react";
import { useRouter } from "next/router";
import buildClient from "../../hooks/build";
import { BiPlus } from "react-icons/bi";
import { toast } from "react-toastify";

export default function EditStudentForm(props) {
  const client = buildClient('')
  const router = useRouter();
  const { programId, coordinatorId, studentId } = router.query;
  const [studentData, setStudentData] = useState(null);

  const StudentName = useRef();
  const StudentEmail = useRef();
  const StudentId = useRef();
  const StudentYear = useRef();
  const Studentaddress = useRef();
  const StudentDepart = useRef();
  const StudentDOB = useRef();
  const StudentPhone = useRef();

  useEffect(() => {
    // Fetch student data using the studentId
    async function fetchStudentData() {
      try {
        const response = await client.get(
          `/api/prgservice/programs/${programId}/students/${studentId}`
        );
        const student = response.data.data;
        console.log("first", student);
        setStudentData(student);
      } catch (error) {
        console.error("Error fetching student data:", error);
      }
    }

    fetchStudentData();
  }, [programId, studentId]);

  useEffect(() => {
    if (studentData) {
      // Pre-fill the form fields with the fetched student data
      StudentName.current.value = studentData.name;
      StudentEmail.current.value = studentData.email;
      StudentId.current.value = studentData.student_id;
      StudentYear.current.value = studentData.year;
      Studentaddress.current.value = studentData.address;
      StudentDepart.current.value = studentData.depart_name;
      StudentDOB.current.value = studentData.date_of_birth;
      StudentPhone.current.value = studentData.phone;
    }
  }, [studentData]);

  const [isLoading, setIsLoading] = useState(false);

  async function submitHandler(event) {
    const client = buildClient('')
    event.preventDefault();

    const enteredName = StudentName.current.value;
    const enteredEmail = StudentEmail.current.value;
    const enteredStudentId = StudentId.current.value;
    const enteredaddress = Studentaddress.current.value;
    const enteredYear = StudentYear.current.value;
    const enteredDepart = StudentDepart.current.value;
    const enteredDOB = StudentDOB.current.value;
    const enteredPhone = StudentPhone.current.value;

    // Validation and error handling logic

    setIsLoading(true);

    const updatedStudentData = {
      name: enteredName,
      email: enteredEmail,
      student_id: enteredStudentId,
      marks: studentData.marks,
      address: enteredaddress,
      year: enteredYear,
      depart_name: enteredDepart,
      date_of_birth: enteredDOB,
      password: studentData.password,
      phone: enteredPhone,
      role: studentData.role,
    };

    try {
      const response = await client.put(
        `/api/prgservice/programs/${programId}/students/${studentId}`,
        updatedStudentData
      );
      console.log(response);
      toast.success("Student updated successfully!");
      router.push(
        `/coordinator/${coordinatorId}/programs/${programId}/students`
      );
    } catch (error) {
      console.error("Error updating student:", error);
      toast.error("Failed to update student. Check your internect connection.");
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
              Please Edit Student Info
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
              Edit Student{" "}
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
