import Coordinator from "../models/coordinator.js";

export const getAllCoordinators = async (req, res) => {
  try {
    const coordinator = await Coordinator.find();
    res.status(200).json({ data: coordinator });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
    console.log(error);
  }
};
export const getCoordinator = async (req, res) => {
  const { id } = req.params;
  try {
    const coordinator = await Coordinator.findById(id);
    res.json({ status: 200, data: coordinator });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
    console.log(error);
  }
};
export const createCoordinator = async (req, res) => {
  try {
    const coordinator = await Coordinator.create(req.body);
    res
      .status(201)
      .json({ data: coordinator, message: "Coordinator added successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
    console.log(error);
  }
};
export const editCoordinator = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await Coordinator.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    );

    res
      .status(200)
      .json({ data: result, message: "Coordinator Updated Successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
    console.log(error);
  }
};
export const deleteCoordinator = async (req, res) => {
  const { id } = req.params;
  try {
    await Coordinator.findByIdAndDelete(id);
    res.status(200).json({ message: "Coordinator Deleted Successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
    console.log(error);
  }
};
