import express from "express";
import {
  getAllOverallSurveys,
  getOverallSurvey,
  createOverallSurvey,
  editOverallSurvey,
  deleteOverallSurvey,
} from "../controllers/overallSurveyController.js";

const overallSurveyRouter = express.Router();
overallSurveyRouter
  .route("/")
  .get(getAllOverallSurveys)
  .post(createOverallSurvey);
overallSurveyRouter
  .route("/:surveyId")
  .get(getOverallSurvey)
  .put(editOverallSurvey)
  .delete(deleteOverallSurvey);

export default overallSurveyRouter;
