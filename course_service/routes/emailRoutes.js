import express from "express";
import { sendMail } from "./../controllers/emailController.js";

const emailRouter = express.Router();

emailRouter.route("/").post(sendMail);

export default emailRouter;
