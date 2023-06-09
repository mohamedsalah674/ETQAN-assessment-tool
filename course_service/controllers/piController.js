import PI from "../models/PI.js";
import SO from "../models/SO.js";
import Students from "../models/student.js";
export const getAllPIs = async (req, res) => {
  const { soId } = req.params;
  try {
    const currentSO = await SO.findById(soId);
    res.status(200).json({ data: currentSO.PIs });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
    console.log(error);
  }
};

export const getPI = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    const pi = await PI.findById(id);
    res.json({ status: 200, data: pi });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
    console.log(error);
  }
};

export const createPI = async (req, res) => {
  const { soId } = req.params;

  try {
    const newPI = await new PI(req.body);

    const currentSO = await SO.findById(soId).then(async (so) => {
      so.PIs.push(newPI);
      so.save();
      // Students.PI_marks.push({ PI_Id: newPI._id });
      await Students.updateMany(
        {},
        { $push: { PI_marks: { PI_Id: newPI._id } } }
      );
      console.log("PI LOG", req.body);
      console.log("PI :::", newPI);
    });
    res.status(201).json({ data: newPI, message: "PI added successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
    console.log(error);
  }
};

export const editPI = async (req, res) => {
  const { soId, piId } = req.params;
  let result = {};
  try {
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
    const { soId, piId } = req.params;
    const currentSO = await SO.findById(soId);
    PI_index = await currentSO.PIs.findIndex((PI) => PI._id == piId);
    currentSO.PIs.splice(PI_index, 1);
    currentSO.save();
    res.status(200).json({ message: "PI Deleted Successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
    console.log(error);
  }
};
