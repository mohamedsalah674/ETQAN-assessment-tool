import express from "express";
import {
  getAllStudents,
  getStudent,
  createStudent,
  editStudent,
  deleteStudent,
} from "../controllers/studentController.js";

const studentRouter = express.Router();
studentRouter.route("/").get(getAllStudents).post(createStudent);
studentRouter
  .route("/:id")
  .get(getStudent)
  .put(editStudent)
  .delete(deleteStudent);

export default studentRouter;
