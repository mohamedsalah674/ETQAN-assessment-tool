import express from "express";
import {
  getAllPrograms,
  getProgram,
  createProgram,
  editProgram,
  deleteProgram,
} from "../controllers/programController.js";

const programRouter = express.Router();
programRouter.route("/").get(getAllPrograms).post(createProgram);
programRouter
  .route("/:id")
  .get(getProgram)
  .put(editProgram)
  .delete(deleteProgram);

export default programRouter;
