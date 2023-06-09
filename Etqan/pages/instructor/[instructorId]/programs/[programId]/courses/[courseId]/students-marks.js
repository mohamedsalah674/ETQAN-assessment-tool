import buildClient from "../../../../../../../hooks/build";
import { useState, useEffect } from "react";
import SideNavbar from "../../../../../../../components/SideNavbar";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

const InteractivePage = ({
  students,
  assessmentMethods,
  programId,
  courseId,
  initialMarks,
}) => {
  // Handle change
  const router = useRouter();
  const { instructorId } = router.query;
  const [marks, setMarks] = useState(initialMarks || {});
  const [searchQuery, setSearchQuery] = useState("");

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
    const updatedMarks = { ...marks };

    for (const studentId in updatedMarks) {
      for (const methodId in updatedMarks[studentId]) {
        if (!assessmentMethods.some((method) => method._id === methodId)) {
          delete updatedMarks[studentId][methodId];
        }
      }
    }

    setMarks(updatedMarks);
  }, [assessmentMethods]);

  // Function to handle changes in student marks
  const handleMarksChange = (studentId, methodId, value) => {
    setMarks((prevMarks) => ({
      ...prevMarks,
      [studentId]: {
        ...(prevMarks[studentId] || {}),
        [methodId]: value,
      },
    }));
  };

  const calculatePIMarks = (studentMarks) => {
    const piMarks = {};

    for (const assessmentMethod of assessmentMethods) {
      const methodId = assessmentMethod._id;
      const methodMark = assessmentMethod.methodMark;
      const studentMark = parseFloat(studentMarks[methodId]);

      if (methodMark && !isNaN(studentMark)) {
        const targetPIs = assessmentMethod.targetPIs || [];

        for (const piId of targetPIs) {
          if (piMarks[piId]) {
            // Update existing PI_mark by adding the quotient to the array
            piMarks[piId].quotients.push(studentMark / methodMark);
          } else {
            // Create new PI_mark object with initial quotient
            piMarks[piId] = {
              PI_Id: piId,
              quotients: [studentMark / methodMark],
            };
          }
        }
      }
    }

    const piMarksWithAverage = [];

    for (const piId in piMarks) {
      const piMark = piMarks[piId];
      const average =
        piMark.quotients.reduce((sum, quotient) => sum + quotient, 0) /
        piMark.quotients.length;
      piMarksWithAverage.push({ PI_Id: piId, PI_mark: average * 100 });
    }

    return piMarksWithAverage;
  };

  const handleSaveMarks = async () => {
    const client = buildClient('')

    try {
      for (const studentId in marks) {
        const studentMarks = marks[studentId];
        const marksComplete = assessmentMethods.every((method) => {
          const methodId = method._id;
          return (
            studentMarks[methodId] !== undefined &&
            studentMarks[methodId] !== ""
          );
        });

        if (!marksComplete) {
          toast.error("Please enter marks for all assessment methods.");
          return;
        }
        const validMark = assessmentMethods.every((method) => {
          const methodId = method._id;
          const studentMark = parseFloat(studentMarks[methodId]);
          return !isNaN(studentMark) && studentMark >= 0;
        });

        if (!validMark) {
          toast.error("Please enter positive numbers for all marks.");
          return;
        }

        const payload = {
          courseId: courseId,
          marks: Object.entries(studentMarks).map(
            ([methodId, studentMark]) => ({
              assessmentMethodId: methodId,
              studentMark: parseFloat(studentMark),
            })
          ),
        };

        const studentResponse = await client.get(
          `/api/prgservice/programs/${programId}/students/${studentId}`
        );
        const student = studentResponse.data.data;

        let updatedCoursesMarks = student.courseMarks || [];
        const existingCourseIndex = updatedCoursesMarks.findIndex(
          (course) => course.courseId === courseId
        );

        if (existingCourseIndex !== -1) {
          updatedCoursesMarks[existingCourseIndex].marks = payload.marks;
        } else {
          updatedCoursesMarks.push(payload);
        }

        const updatedPIMarks = await calculatePIMarks(studentMarks);

        // Validate marks against methodMark
        const marksValid = Object.entries(studentMarks).every(
          ([methodId, studentMark]) => {
            const method = assessmentMethods.find(
              (method) => method._id === methodId
            );
            return parseFloat(studentMark) <= method.methodMark;
          }
        );

        if (!marksValid) {
          toast.error("Marks cannot be greater than the full mark.");
          return;
        }

        await client.put(
          `/api/prgservice/programs/${programId}/students/${studentId}`,
          { coursesMarks: updatedCoursesMarks, PI_marks: updatedPIMarks }
        );
      }

      console.log("Marks saved successfully!");
      toast.success("Marks saved successfully!");
    } catch (error) {
      toast.error("Marks couldn't be saved. Check your internet connection.");
      console.error("Error saving marks:", error);
    }
  };

  // Function to filter students based on search query
  const filteredStudents = students.filter((student) => {
    const lowerCaseSearchQuery = searchQuery.toLowerCase();
    return (
      student._id.toLowerCase().includes(lowerCaseSearchQuery) ||
      student.name.toLowerCase().includes(lowerCaseSearchQuery)
    );
  });

  // Function to handle search query change
  const handleSearchQueryChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="min-h-screen bg-[url('/backgrounds/marks.svg')]">
      <SideNavbar links={links} />
      <h2 className="pt-3 text-center font-bold text-4xl  italic text-white pb-8">
        Student Marks
      </h2>
      <div className="container mx-auto p-4 flex justify-center">
        <div className="overflow-x-auto">
          <div className="mb-4 flex justify-center">
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchQueryChange}
              placeholder="Search by ID or name"
              className="border rounded-full px-4 py-2 focus:outline-none focus:border-blue-500"
            />
          </div>
          <table className="table-auto bg-white shadow-md rounded-lg ml-32">
            <thead className="bg-blue-300">
              <tr>
                <th className="px-4 py-2 border-b">Student ID</th>
                <th className="w-full px-4 py-2 border-b">Student Name</th>
                {assessmentMethods.map((method) => (
                  <th
                    key={method._id}
                    className="px-2 py-2 border-b text-center"
                  >
                    <div>{method.assessmentMethod}</div>
                    <div className="text-gray-500 text-sm">
                      {method.methodMark}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {filteredStudents.map((student) => (
                <tr key={student._id}>
                  <td className="px-4 py-2 border-b text-center">
                    {student.student_id}
                  </td>
                  <td className="px-4 py-2 border-b text-center">
                    {student.name}
                  </td>
                  {assessmentMethods.map((method) => (
                    <td
                      key={method._id}
                      className="px-2 py-2 border-b text-center"
                    >
                      <input
                        type="number"
                        value={marks[student._id]?.[method._id] || ""}
                        onChange={(e) =>
                          handleMarksChange(
                            student._id,
                            method._id,
                            e.target.value
                          )
                        }
                        className="border rounded-full px-2 py-1 w-12 h-12 focus:outline-none focus:border-blue-500 text-center"
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="container mx-auto p-4">
        <button
          className="bg-green-600 hover:bg-green-800 flex m-auto text-white font-bold py-2 px-4 rounded"
          onClick={handleSaveMarks}
        >
          Save Marks
        </button>
      </div>
    </div>
  );
};

export async function getServerSideProps(context) {
  const client = buildClient(context)
  const { programId, courseId } = context.query;

  try {
    const [courseResponse, studentsResponse] = await Promise.all([
      client.get(`/api/assessment/courses/${courseId}`),
      client.get(
        `/api/prgservice/programs/${programId}/students`
      ),
    ]);

    const course = courseResponse.data.data;
    const students = studentsResponse.data.data;
    const assessmentMethods = course.assessmentMethods || [];
    const initialMarks = {};

    await Promise.all(
      students.map(async (student) => {
        const studentResponse = await client.get(
          `/api/prgservice/programs/${programId}/students/${student._id}`
        );
        const studentData = studentResponse.data.data;
        const courseMarks = studentData.coursesMarks.find(
          (course) => course.courseId === courseId
        );

        if (courseMarks) {
          const studentMarks = {};
          for (const mark of courseMarks.marks) {
            studentMarks[mark.assessmentMethodId] = mark.studentMark;
          }
          initialMarks[student._id] = studentMarks;
        }
      })
    );

    return {
      props: {
        course,
        students,
        assessmentMethods,
        programId,
        courseId,
        initialMarks,
      },
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      props: {
        course: null,
        students: [],
        assessmentMethods: [],
        programId,
        courseId,
      },
    };
  }
}

export default InteractivePage;
