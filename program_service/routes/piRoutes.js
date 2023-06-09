import express from "express";
import {
  getAllPIs,
  getPI,
  createPI,
  editPI,
  deletePI,
} from "../controllers/piController.js";

const piRouter = express.Router();
piRouter.route("/:programId/sos/:soId/pis").get(getAllPIs).post(createPI);
piRouter
  .route("/:programId/sos/:soId/pis/:piId")
  .get(getPI)
  .put(editPI)
  .delete(deletePI);

export default piRouter;
