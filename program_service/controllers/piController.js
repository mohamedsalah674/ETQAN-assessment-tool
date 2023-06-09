import PI from "../models/PI.js";
import SO from "../models/SO.js";
import Program from "../models/Program.js";
import Student from "../models/student.js";
export const getAllPIs = async (req, res) => {
  const { soId, programId } = req.params;
  try {
    const program = await Program.findById(programId).populate("sosIds");

    if (!program) {
      return res.status(404).json({ message: "Program not found" });
    }

    const currentSO = program.sosIds.find((so) => so._id.toString() === soId);
    if (!currentSO) {
      return res.status(404).json({ message: "SO not found" });
    }
    res.status(200).json({ data: currentSO.PIs });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
    console.log(error);
  }
};

export const getPI = async (req, res) => {
  const { soId, programId, piId } = req.params;
  try {
    const program = await Program.findById(programId).populate("sosIds");

    if (!program) {
      return res.status(404).json({ message: "Program not found" });
    }

    const currentSO = program.sosIds.find((so) => so._id.toString() === soId);
    if (!currentSO) {
      return res.status(404).json({ message: "SO not found" });
    }

    const pi = currentSO.PIs.find((pi) => pi._id.toString() === piId);
    if (!currentSO) {
      return res.status(404).json({ message: "PI not found" });
    }

    if (!pi) {
      return res.status(404).json({ message: "pi not found" });
    }
    res.json({ status: 200, data: pi });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
    console.log(error);
  }
};

export const createPI = async (req, res) => {
  const { soId, programId } = req.params;

  try {
    const program = await Program.findById(programId).populate("sosIds");

    if (!program) {
      return res.status(404).json({ message: "Program not found" });
    }

    const checkSo = program.sosIds.find((so) => so._id.toString() === soId);
    if (!checkSo) {
      return res.status(404).json({ message: "SO not found in this program" });
    }

    const newPI = await new PI(req.body);

    const currentSO = await SO.findById(soId).then(async (so) => {
      so.PIs.push(newPI);
      so.save();
      // Students.PI_marks.push({ PI_Id: newPI._id });
      await Student.updateMany(
        {},
        { $push: { PI_marks: { PI_Id: newPI._id, PI_mark: 0 } } }
      );
    });
    res.status(201).json({ data: newPI, message: "PI added successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
    console.log(error);
  }
};

export const editPI = async (req, res) => {
  const { soId, piId, programId } = req.params;
  let result = {};

  try {
    const program = await Program.findById(programId).populate("sosIds");

    if (!program) {
      return res.status(404).json({ message: "Program not found" });
    }

    const currentSO = await SO.findById(soId).then(async (so) => {
      const PI_index = await so.PIs.findIndex((PI) => PI._id == piId);
      if (req.body.number) so.PIs[PI_index].number = req.body.number;
      if (req.body.description)
        so.PIs[PI_index].description = req.body.description;
      if (req.body.target) so.PIs[PI_index].target = req.body.target;
      if (req.body.achieved != undefined)
        so.PIs[PI_index].achieved = req.body.achieved;
      result = so.PIs[PI_index];
      so.save();
      console.log("PI updated LOG", req.body);
    });

    res.status(200).json({ data: result, message: "PI Updated Successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
    console.log(error);
  }
};

export const deletePI = async (req, res) => {
  let PI_index;
  try {
    const { soId, piId, programId } = req.params;
    const program = await Program.findById(programId)
      .populate("sosIds")
      .populate("studentIds");

    if (!program) {
      return res.status(404).json({ message: "Program not found" });
    }

    const currentSO = await SO.findById(soId);

    // Iterate over all students
    for (const studentId of program.studentIds) {
      const student = await Student.findById(studentId);
      if (!student) {
        console.log(`Student not found: ${studentId}`);
        continue;
      }

      // Find the matching PI_mark document and remove it
      const piMarkIndex = student.PI_marks.findIndex(
        (piMark) => piMark.PI_Id.toString() === piId
      );
      if (piMarkIndex !== -1) {
        student.PI_marks.splice(piMarkIndex, 1);
        await student.save();
      }
    }

    PI_index = await currentSO.PIs.findIndex((PI) => PI._id == piId);
    currentSO.PIs.splice(PI_index, 1);
    await currentSO.save();
    res.status(200).json({ message: "PI Deleted Successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
    console.log(error);
  }
};
