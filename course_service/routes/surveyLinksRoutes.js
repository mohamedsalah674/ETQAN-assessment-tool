//sendSurveyLinksController
import express from "express";
import { sendMail } from "../controllers/sendSurveyLinksController.js";

const surveyLinksRouter = express.Router();

surveyLinksRouter.route("/").post(sendMail);

export default surveyLinksRouter;
