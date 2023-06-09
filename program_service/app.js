import dbConnect from "./utils/dbConnect.js";
import express from "express";
import path from "path";
import morgan from "morgan";
import dotenv from "dotenv";
import cors from "cors";
const app = express();

import coordinatorRouter from "./routes/coordinatorRoutes.js";
import programRouter from "./routes/programRoutes.js";
import soRouter from "./routes/soRoutes.js";
import studentRouter from "./routes/studentRoutes.js";
import piRouter from "./routes/piRoutes.js";

import AlldepartmentRouter from "./routes/show_all_departments.js";
import departmentRouter from "./routes/show_department.js";

// 1) MIDDLEWARES
app.use(cors());
dotenv.config();
dbConnect();
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());
const __dirname = path.dirname(new URL(import.meta.url).pathname);
app.use(express.static(`${__dirname}/public`));

// 2) ROUTES

app.use("/api/prgservice/coordinators", coordinatorRouter);
app.use("/api/prgservice/programs", programRouter);
app.use("/api/prgservice/programs", soRouter);
app.use("/api/prgservice/programs", studentRouter);
app.use("/api/prgservice/programs", piRouter);
app.use("/api/prgservice/departments", AlldepartmentRouter);
app.use("/api/prgservice/departments", departmentRouter);

export default app;
