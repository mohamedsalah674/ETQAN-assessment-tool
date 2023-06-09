import express from "express";
import {
  getAllClos,
  getClo,
  createClo,
  editClo,
  deleteClo,
} from "../controllers/cloController.js";

const cloRouter = express.Router();
cloRouter.route("/:courseId/clos").get(getAllClos).post(createClo);
cloRouter
  .route("/:courseId/clos/:cloId")
  .get(getClo)
  .put(editClo)
  .delete(deleteClo);

export default cloRouter;
