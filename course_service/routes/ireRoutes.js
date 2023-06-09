import express from "express";
import {
  getAllIreForAllCourses,
  getIreOfOneCourse,
  createIre,
  editIre,
  deleteIre,
} from "../controllers/ireAssessmentController.js";

const ireRouter = express.Router();
ireRouter.route("/:courseId/ires").get(getAllIreForAllCourses).post(createIre);
ireRouter
  .route("/:courseId/ires/:ireId")
  .get(getIreOfOneCourse)
  .put(editIre)
  .delete(deleteIre);

export default ireRouter;
