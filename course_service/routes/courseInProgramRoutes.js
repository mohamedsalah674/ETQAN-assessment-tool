import express from "express";
import {
  getCourse,
  createCourse,
  editCourse,
  deleteCourse,
  getAllCourses,
} from "../controllers/courseInProgramController.js";
import topicRouter from "./topicRoutes.js";

const courseInProgramRouter = express.Router();

courseInProgramRouter
  .route("/:programId/courses")
  .get(getAllCourses)
  .post(createCourse);
courseInProgramRouter
  .route("/:programId/courses/:courseId")
  .get(getCourse)
  .put(editCourse)
  .delete(deleteCourse);

export default courseInProgramRouter;
