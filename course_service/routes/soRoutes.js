import express from "express";
import {
  getAllSOs,
  getSO,
  createSO,
  editSO,
  deleteSO,
} from "../controllers/soController.js";

const soRouter = express.Router();
soRouter.route("/").get(getAllSOs).post(createSO);
soRouter.route("/:id").get(getSO).put(editSO).delete(deleteSO);

export default soRouter;
