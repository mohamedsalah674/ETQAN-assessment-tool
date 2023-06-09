import express from "express";

import { getAllDepartments } from "../controllers/show_all_departments.js";
const AlldepartmentRouter = express.Router()

AlldepartmentRouter.route("/").get(getAllDepartments)

export default AlldepartmentRouter