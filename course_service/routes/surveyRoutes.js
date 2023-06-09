import express from "express";
import {
  getAllSurveys,
  getSurvey,
  createSurvey,
  editSurvey,
  deleteSurvey,
} from "../controllers/surveyController.js";

const surveyRouter = express.Router();
surveyRouter.route("/").get(getAllSurveys).post(createSurvey);
surveyRouter
  .route("/:surveyId")
  .get(getSurvey)
  .put(editSurvey)
  .delete(deleteSurvey);

export default surveyRouter;
