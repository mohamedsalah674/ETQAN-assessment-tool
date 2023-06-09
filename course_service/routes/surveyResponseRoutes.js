import express from "express";
import {
  getAllResponses,
  getResponse,
  createResponse,
  editResponse,
  deleteResponse,
} from "../controllers/surveyResponseController.js";

const surveyResponseRouter = express.Router();
surveyResponseRouter
  .route("/:surveyId/responses")
  .get(getAllResponses)
  .post(createResponse);
surveyResponseRouter
  .route("/:surveyId/responses/:responseId")
  .get(getResponse)
  .put(editResponse)
  .delete(deleteResponse);

export default surveyResponseRouter;
