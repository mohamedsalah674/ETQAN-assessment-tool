import Student from "../models/student.js";
import Program from "../models/Program.js";

export const getAllStudents = async (req, res) => {
  const { programId } = req.params;
  try {
    const program = await Program.findById(programId).populate("studentIds");

    if (!program) {
      return res.status(404).json({ message: "Program not found" });
    }

    const allStudents = await program.studentIds;
    res.json({
      status: 200,
      data: allStudents,
      message: "Here are students of this program:",
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({ success: false });
  }
};

export const getStudent = async (req, res) => {
  const { programId, studentId } = req.params;
  try {
    const program = await Program.findById(programId).populate("studentIds");

    if (!program) {
      return res.status(404).json({ message: "Program not found" });
    }
    const student = program.studentIds.find(
      (student) => student._id.toString() === studentId
    );

    if (!student) {
      return res.status(404).json({ error: "student not found" });
    }

    res.json({ status: 200, data: student, message: "student data:" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
    console.log(error);
  }
};

export const createStudent = async (req, res) => {
  const { programId } = req.params;

  try {
    const program = await Program.findById(programId).populate("sosIds");

    if (!program) {
      return res.status(404).json({ message: "Program not found" });
    }

    let stdObject = req.body;
    const PI_marks = [];
    // Iterate over each SO in the program
    for (const so of program.sosIds) {
      // Iterate over each PI in the SO
      const SO_Id = so._id;
      for (const pi of so.PIs) {
        const PI_Id = pi._id;
        const PI_mark = 0;
        const PI_markObj = { PI_Id, PI_mark, SO_Id };
        PI_marks.push(PI_markObj);
      }
    }

    stdObject = { ...stdObject, PI_marks };

    let newStudent = await Student.create(stdObject);
    await program.studentIds.push(newStudent._id);
    const updatedProgram = await program.save();

    res
      .status(201)
      .json({ data: newStudent, message: "Student added successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
    console.log(error);
  }
};

export const editStudent = async (req, res) => {
  const { programId, studentId } = req.params;
  try {
    const program = await Program.findById(programId);

    if (!program) {
      return res.status(404).json({ message: "Program not found" });
    }

    const result = await Student.findByIdAndUpdate(
      studentId,
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
  const { programId, studentId } = req.params;
  try {
    const program = await Program.findById(programId);

    if (!program) {
      return res.status(404).json({ message: "Program not found" });
    }

    await Student.findByIdAndDelete(studentId);
    await Program.findByIdAndUpdate(programId, {
      $pull: { studentIds: studentId },
    });

    res.status(200).json({ message: "STUDENT Deleted Successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
    console.log(error);
  }
};
