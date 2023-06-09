import express from "express";

import { getDepartment } from "../controllers/show_department.js";

const departmentRouter = express.Router()

departmentRouter.route("/show/:id").get(getDepartment)

export default departmentRouter