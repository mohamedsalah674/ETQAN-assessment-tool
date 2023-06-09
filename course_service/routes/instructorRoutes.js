import express from "express";
import {
  getAllInstructors,
  getInstructor,
  createInstructor,
  editInstructor,
  deleteInstructor,
} from "../controllers/instructorController.js";

const instructorRouter = express.Router();
// instructorRouter
//   .route("/:courseId/instructors")
//   .get(getAllInstructors)
//   .post(createInstructor);
// instructorRouter
//   .route("/:courseId/instructors/:instructorId")
//   .get(getInstructor)
//   .put(editInstructor)
//   .delete(deleteInstructor);

instructorRouter.route("/").get(getAllInstructors).post(createInstructor);
instructorRouter
  .route("/:instructorId")
  .get(getInstructor)
  .put(editInstructor)
  .delete(deleteInstructor);
export default instructorRouter;
