import express from "express";
import {
  getAllSOs,
  getSO,
  createSO,
  editSO,
  deleteSO,
} from "../controllers/soController.js";

const soRouter = express.Router();
soRouter.route("/:programId/sos").get(getAllSOs).post(createSO);
soRouter.route("/:programId/sos/:soId").get(getSO).put(editSO).delete(deleteSO);

export default soRouter;
