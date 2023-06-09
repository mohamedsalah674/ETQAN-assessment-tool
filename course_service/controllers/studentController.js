import Student from "../models/student.js";
import Marks from "../models/marks.js";
import SO from "../models/SO.js";

export const getAllStudents = async (req, res) => {
  try {
    const allStudents = await Student.find({});
    res.json({ status: 200, data: allStudents });
  } catch (err) {
    console.log(err);
    res.status(400).json({ success: false });
  }
};

export const getStudent = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    const student = await Student.findById(id);
    res.json({ status: 200, data: student });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
    console.log(error);
  }
};

export const createStudent = async (req, res) => {
  let newStudent;
  try {
    let stdObject = req.body;
    // stdObject.PI_marks = []
    const marksOBJ = {
      quizzes: [
        {
          percent: 0,
          CLOs: [],
          quiz_number: 0,
          PI: 0,
          std_mark: 0,
        },
      ],
      midterms: [
        {
          percent: 0,
          CLOs: [],
          midterm_number: 0,
          c_topics: [],
          std_mark: 0,
          PI: 0,
        },
      ],
      progress_exams: [
        {
          exam_name: "",
          percent: 0,
          CLOs: [],
          c_topics: [],
          std_mark: 0,
          PI: 0,
        },
      ],
      projects: [
        {
          name: "",
          percent: 0,
          CLOs: [],
          c_topics: [],
          std_mark: 0,
          PI: 0,
        },
      ],
      labs: [
        {
          name: "",
          percent: 0,
          lab_number: 0,
          CLOs: [0],
          std_mark: 0,
          c_topics: [],
          PI: 0,
        },
      ],
      assignments: [
        {
          name: "",
          percent: 0,
          assignment_no: 0,
          CLOs: [0],
          std_mark: 0,
          c_topics: [],
          PI: 0,
        },
      ],
      final_exam: {
        percent: 0,
        CLOs: [0],
        std_mark: 0,
        c_topics: [0, 0, 0],
        PI: 0,
      },
      total_marks: 0,
    };

    let newStudent;
    let marksId;
    let studentName;
    const newMarks = await Marks.create(marksOBJ)
      .then((marks) => {
        console.log(marks);
        stdObject.marks = marks._id;
        marksId = marks._id.toString();
        newStudent = Student.create(stdObject);
        newStudent.then(function (student) {
          console.log(student);
          console.log("PP", student.marks.toString());
          console.log("XX", student.name);
          studentName = student.name;
        });
      })
      .then(async () => {
        await Marks.findByIdAndUpdate(marksId, {
          student_name: stdObject.name,
          // });
        });
      });

    res
      .status(201)
      .json({ data: stdObject, message: "Student added successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
    console.log(error);
  }
};

export const editStudent = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await Student.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    );

    res
      .status(200)
      .json({ data: result, message: "Student Updated Successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
    console.log(error);
  }
};

export const deleteStudent = async (req, res) => {
  const { id } = req.params;
  try {
    const student = await Student.findById(id);
    await Student.findByIdAndDelete(id);
    await Marks.findByIdAndDelete(student.marks.toString());
    res.status(200).json({ message: "STUDENT Deleted Successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
    console.log(error);
  }
};
