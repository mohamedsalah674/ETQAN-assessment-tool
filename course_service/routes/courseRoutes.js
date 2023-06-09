import express from "express";
import {
  getCourse,
  createCourse,
  editCourse,
  deleteCourse,
  getAllCourses,
} from "../controllers/courseController.js";

const courseRouter = express.Router();

courseRouter.route("/").get(getAllCourses).post(createCourse);
courseRouter
  .route("/:courseId")
  .get(getCourse)
  .put(editCourse)
  .delete(deleteCourse);

export default courseRouter;
