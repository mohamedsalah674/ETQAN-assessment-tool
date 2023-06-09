import express from "express";
import {
  getInstructorCoursesForOneProgram,
  getInstructorPrograms,
} from "../controllers/instructorPrograms.js";

const instructorProgramsRouter = express.Router();
instructorProgramsRouter
  .route("/:instructorId/programs")
  .get(getInstructorPrograms);

instructorProgramsRouter
  .route("/:instructorId/programs/:programId")
  .get(getInstructorCoursesForOneProgram);
export default instructorProgramsRouter;
