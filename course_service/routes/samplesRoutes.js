import express from "express";
// import {
//   getAllSOs,
//   getSO,
//   createSO,
//   editSO,
//   deleteSO,
// } from "../controllers/soController.js";
import {
  getAllSamples,
  createSample,
  deleteSample,
  getSample,
} from "../controllers/sampleController.js";

const samplesRouter = express.Router();
samplesRouter.route("/:courseId/samples").get(getAllSamples).post(createSample);
samplesRouter
  .route("/:courseId/samples/:sampleId")
  .get(getSample)
  .delete(deleteSample);

export default samplesRouter;
