import program from "../models/Program.js";

export const getAllPrograms = async (req, res) => {
  try {
    const prog = await program.find();
    res.status(200).json({ data: prog });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
    console.log(error);
  }
};
export const getProgram = async (req, res) => {
  const { id } = req.params;
  try {
    const prog = await program.findById(id);
    res.json({ status: 200, data: prog });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
    console.log(error);
  }
};
export const createProgram = async (req, res) => {
  try {
    const prog = await program.create(req.body);
    res.status(201).json({ data: prog, message: "program added successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
    console.log(error);
  }
};
export const editProgram = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await program.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    );

    res
      .status(200)
      .json({ data: result, message: "program Updated Successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
    console.log(error);
  }
};
export const deleteProgram = async (req, res) => {
  const { id } = req.params;
  try {
    await program.findByIdAndDelete(id);
    res.status(200).json({ message: "program Deleted Successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
    console.log(error);
  }
};
