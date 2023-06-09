import SO from "../models/SO.js";
import Program from "../models/Program.js";

export const getAllSOs = async (req, res) => {
  const { programId } = req.params;
  try {
    const program = await Program.findById(programId).populate("sosIds");

    if (!program) {
      return res.status(404).json({ message: "Program not found" });
    }

    const sos = program.sosIds;
    console.log("P", sos);
    res.status(200).json({ data: sos });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
    console.log(error);
  }
};

export const getSO = async (req, res) => {
  const { programId, soId } = req.params;
  try {
    const program = await Program.findById(programId).populate("sosIds");

    if (!program) {
      return res.status(404).json({ message: "Program not found" });
    }

    const so = program.sosIds.find((so) => so._id.toString() === soId);

    if (!so) {
      return res.status(404).json({ error: "so not found" });
    }

    res.json({ status: 200, data: so });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
    console.log(error);
  }
};

export const createSO = async (req, res) => {
  const { programId } = req.params;
  try {
    const program = await Program.findById(programId);

    if (!program) {
      return res.status(404).json({ message: "Program not found" });
    }

    const so = await SO.create(req.body);
    await Program.findByIdAndUpdate(programId, {
      $addToSet: { sosIds: so._id },
    });
    res.status(200).json({
      status: "SO Created Successfully",
      data: {
        so,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({ success: false });
  }
};

export const editSO = async (req, res) => {
  const { programId, soId } = req.params;
  const program = await Program.findById(programId);

  if (!program) {
    return res.status(404).json({ message: "Program not found" });
  }
  try {
    const result = await SO.findByIdAndUpdate(
      soId,
      { $set: req.body },
      { new: true }
    );

    res.status(200).json({ data: result, message: "SO Updated Successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
    console.log(error);
  }
};

export const deleteSO = async (req, res) => {
  const { soId } = req.params;
  try {
    const { courseId, programId } = req.params;
    const program = await Program.findById(programId);

    if (!program) {
      return res.status(404).json({ message: "Program not found" });
    }
    // Find the course by ID
    const so = await SO.findById(soId);

    if (!so) {
      return res.status(404).json({ message: "SO not found" });
    }
    await Program.findByIdAndUpdate(programId, {
      $pull: { sosIds: so._id },
    });

    const deletedSo = await SO.findByIdAndDelete(soId);
    res
      .status(200)
      .json({ message: "SO is now deleted Successfully", deletedSo });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
    console.log(error);
  }
};
