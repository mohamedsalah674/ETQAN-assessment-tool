import Program from "../models/Program.js";
import {produce_program_created} from "../events/producer/program-created-event.js"
import {produce_program_updated} from "../events/producer/program-updated-event.js"
import {produce_program_deleted} from"../events/producer/program-deleted-event.js"

export const getAllPrograms = async (req, res) => {
  try {
    const prog = await Program.find();
    res.status(200).json({ data: prog });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
    console.log(error);
  }
};
export const getProgram = async (req, res) => {
  const { id } = req.params;
  try {
    const prog = await Program.findById(id);
    res.json({ status: 200, data: prog });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
    console.log(error);
  }
};
export const createProgram = async (req, res) => {
  try {
    const prog = await Program.create(req.body);

      if(prog){
      produce_program_created(prog)
    console.log("program produced from program service");

      }

    res.status(201).json({ data: prog, message: "program added successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
    console.log(error);
  }
};
export const editProgram = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await Program.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    );

       if (result)
    {produce_program_updated(result)
    console.log(("produced from program service !!!"));}

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
  
  
   if(program)
   {produce_program_deleted(program)
   console.log("produced event from Program service");
   } 

  try {
    await Program.findByIdAndDelete(id);
    res.status(200).json({ message: "program Deleted Successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
    console.log(error);
  }
};
