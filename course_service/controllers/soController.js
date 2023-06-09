import SO from "../models/SO.js";

export const getAllSOs = async (req, res) => {
  try {
    const so = await SO.find();
    res.status(200).json({ data: so });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
    console.log(error);
  }
};

export const getSO = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    const so = await SO.findById(id);
    res.json({ status: 200, data: so });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
    console.log(error);
  }
};

export const createSO = async (req, res) => {
  try {
    const so = await SO.create(req.body);
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
  const { id } = req.params;
  try {
    const result = await SO.findByIdAndUpdate(
      id,
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
  const { id } = req.params;
  try {
    const so = await SO.findByIdAndDelete(id);
    res.status(200).json({ message: "SO is now deleted Successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
    console.log(error);
  }
};
