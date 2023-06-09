import express from "express";
import {
  getAllMarks,
  createStudentMarks,
  getStudentMarks,
  editStudentMarks,
  deleteStudentMarks,
} from "../controllers/markController.js";

const markRouter = express.Router();
markRouter.route("/:courseId/marks").get(getAllMarks).post(createStudentMarks);
markRouter
  .route("/:courseId/marks/:marksId")
  .get(getStudentMarks)
  .put(editStudentMarks)
  .delete(deleteStudentMarks);

export default markRouter;
