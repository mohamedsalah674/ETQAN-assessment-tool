import express from "express";
import {
  viewSpecsController,
  viewreport,
} from "../controllers/viewSpecsController.js";

const viewSpecsRouter = express.Router();
viewSpecsRouter.route("/1").get(viewSpecsController);
viewSpecsRouter.route("/1/:id").get(viewreport);

export default viewSpecsRouter;
