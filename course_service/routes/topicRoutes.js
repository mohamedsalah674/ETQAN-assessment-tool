import express from "express";
import {
  getAllTopics,
  getTopic,
  createTopic,
  editTopic,
  deleteTopic,
} from "../controllers/topicController.js";

const topicRouter = express.Router();
topicRouter.route("/:courseId/topics").get(getAllTopics).post(createTopic);
topicRouter
  .route("/:courseId/topics/:topicId")
  .get(getTopic)
  .put(editTopic)
  .delete(deleteTopic);

export default topicRouter;
