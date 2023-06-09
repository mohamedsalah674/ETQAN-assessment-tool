import express from "express";
import {
  getAllCoordinators,
  getCoordinator,
  createCoordinator,
  editCoordinator,
  deleteCoordinator,
} from "../controllers/coordinatorController.js";

const coordinatorRouter = express.Router();
coordinatorRouter.route("/").get(getAllCoordinators).post(createCoordinator);
coordinatorRouter
  .route("/:id")
  .get(getCoordinator)
  .put(editCoordinator)
  .delete(deleteCoordinator);

export default coordinatorRouter;
