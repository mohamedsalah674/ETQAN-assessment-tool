import dbConnect from "./utils/dbConnect.js";
import express from "express";
import path from "path";
import morgan from "morgan";
import dotenv from "dotenv";
import cors from "cors";
const app = express();
import courseRouter from "./routes/courseRoutes.js";
import studentRouter from "./routes/studentRoutes.js";
import markRouter from "./routes/markRoutes.js";
import cloRouter from "./routes/cloRoutes.js";
import topicRouter from "./routes/topicRoutes.js";
import ireRouter from "./routes/ireRoutes.js";
import viewSpecsRouter from "./routes/viewSpecsRoutes.js";
import coordinatorRouter from "./routes/coordinatorRoutes.js";
import instructorRouter from "./routes/instructorRoutes.js";
import instructorProgramsRouter from "./routes/instructorProgramsRoutes.js";
import programRouter from "./routes/programRoutes.js";
import soRouter from "./routes/soRoutes.js";
import piRouter from "./routes/piRoutes.js";
import samplesRouter from "./routes/samplesRoutes.js";
import surveyLinksRouter from "./routes/surveyLinksRoutes.js";
import surveyResponseRouter from "./routes/surveyResponseRoutes.js";
import surveyRouter from "./routes/surveyRoutes.js";
import overallSurveyRouter from "./routes/overallSurveyRoutes.js";
import courseInProgramRouter from "./routes/courseInProgramRoutes.js";
import sendMail from "./routes/emailRoutes.js";
// import { createRequire } from "module"; //auth
// const require = createRequire(import.meta.url);
// const currentUser = require("salahorg/middlewares/current-user.js");
// const requireAuth = require("salahorg/middlewares/require-auth.js");
// const { isAuthorizedUser } = require("salahorg/middlewares/checkRole.js");
// 1) MIDDLEWARES
app.use(cors());
dotenv.config();
dbConnect();
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());
const __dirname = path.dirname(new URL(import.meta.url).pathname);
app.use(
  express.static(`${__dirname}/puimport { sendMail } from './controllers/emailController';
blic`)
);

// 2) ROUTES
app.use("/api/assessment/courses", courseRouter);
app.use(
  "/api/assessment/programs",
  // requireAuth,
  // isAuthorizedUser("instructor"),
  courseInProgramRouter
);
app.use("/api/assessment/courses", topicRouter);
app.use("/api/assessment/courses", ireRouter);
// app.use("/api/assessment/students", studentRouter);
app.use("/api/assessment/courses", markRouter);
app.use("/api/assessment/courses", cloRouter);
// app.use("/api/assessment/coordinators", coordinatorRouter);
app.use("/api/assessment/instructors", instructorRouter);
// app.use("/api/assessment/programs", programRouter);
// app.use("/api/assessment/sos", soRouter);
// app.use("/api/assessment/sos", piRouter);
app.use("/api/assessment/", viewSpecsRouter);
app.use("/api/assessment/courses", samplesRouter);
app.use("/api/assessment/surveyLinks", surveyLinksRouter);
app.use("/api/assessment/surveys", surveyResponseRouter);
app.use("/api/assessment/surveys", surveyRouter);
app.use("/api/assessment/overallsurveys", overallSurveyRouter);
app.use("/api/assessment/mail", sendMail);
app.use("/api/assessment/instructors", instructorProgramsRouter);

export default app;
