import Department from "../models/department.js";


export const getAllDepartments = async (req, res) => {
    try {
      const dept = await Department.find().populate("programsIds");
      res.status(200).json({ data: dept });
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
      console.log(error);
    }
  };