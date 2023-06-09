import { Topic } from "../models/Topic.js";
import Course from "../models/Course.js";

export const getAllTopics = async (req, res) => {
  const courseId = req.params.courseId; // Get the courseId from request parameters
  try {
    console.log("Course id is : ", courseId);
    const course = await Course.findById(courseId); // Find the course by _id

    if (!course) {
      return res.status(404).send("Course not found");
    }

    const topics = course.topics; // Get the topics from the course

    res.status(200).json({
      status: "Here is your topics:",
      data: {
        topics,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal Server Error");
  }
};

export const getTopic = async (req, res) => {
  const courseId = req.params.courseId; // Get the courseId from request parameters
  const topicId = req.params.topicId; // Get the topicId from request parameters
  try {
    // Find the Course document by ID
    // Find the Topic document by ID within the Course's topics array
    const course = await Course.findById(courseId).populate("topics");

    if (!course) {
      return res.status(404).send("Course not found");
    }

    const topic = course.topics.id(topicId);
    if (!topic) {
      throw new Error(
        `Topic with ID ${topicId} not found in course with ID ${courseId}`
      );
    }

    res.status(200).json({
      status: "Here is your topic:",
      data: {
        topic,
      },
    });
  } catch (err) {
    console.error(
      `Error getting topic with ID ${topicId} for course with ID ${courseId}:`,
      err
    );
    throw err;
  }
};

export const createTopic = async (req, res) => {
  const courseId = req.params.courseId; // Get the courseId from request parameters
  const topicId = req.params.topicId; // Get the courseId from request parameters
  const topicData = req.body;
  try {
    // Find the Course document by ID
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).send("Course not found");
    }
    // Create a new Topic document
    const topic = new Topic(topicData);
    console.log(topic);

    // Add the topic to the Course's topics array
    course.topics.push(topic);

    // Save the updated Course document to the database
    const savedCourse = await course.save();
    res.status(200).json({
      status: "Topic Created Successfully",
      data: {
        topic,
      },
    });
  } catch (err) {
    console.error(`Error creating topic for course with ID ${courseId}:`, err);
    throw err;
  }
};

export const editTopic = async (req, res) => {
  const courseId = req.params.courseId; // Get the courseId from request parameters
  const topicId = req.params.topicId; // Get the courseId from request parameters
  const topicData = req.body;
  try {
    // Find the Course document by ID
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).send("Course not found");
    }
    // Find the Topic document by ID within the Course's topics array
    let topic = course.topics.id(topicId);
    if (!topic) {
      throw new Error(
        `Topic with ID ${topicId} not found in course with ID ${courseId}`
      );
    }
    // Update the topic with the new data
    topic = topic.set(topicData);

    // Save the updated Course document to the database
    const savedCourse = await course.save();

    res.status(200).json({
      status: "Here is your modified topic:",
      data: {
        topic,
      },
    });
  } catch (err) {
    console.error(
      `Error updating topic with ID ${topicId} for course with ID ${courseId}:`,
      err
    );
    throw err;
  }
};

export const deleteTopic = async (req, res) => {
  const courseId = req.params.courseId; // Get the courseId from request parameters
  const topicId = req.params.topicId; // Get the courseId from request parameters
  try {
    // Find the Course document by ID
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).send("Course not found");
    }

    const topic = course.topics.id(topicId);
    if (!topic) {
      throw new Error(
        `Topic with ID ${topicId} not found in course with ID ${courseId}`
      );
    }
    // Find the Topic document by ID within the Course's topics array and remove it
    course.topics.pull(topicId);
    const topics = course.topics;
    // Save the updated Course document to the database
    const savedCourse = await course.save();

    res.status(200).json({
      status: "Topic has been deleted!",
      data: {
        topic,
      },
    });
  } catch (err) {
    console.error(
      `Error deleting topic with ID ${topicId} for course with ID ${courseId}:`,
      err
    );
    throw err;
  }
};
