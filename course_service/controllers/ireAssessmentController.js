import IreAssessment from "../models/ireAssessment.js";
import Course from "../models/Course.js";

export const getAllIreForAllCourses = async (req, res) => {
  const courseId = req.params.courseId; // Get the courseId from request parameters
  try {
    const course = await Course.findById(courseId); // Find the course by _id

    if (!course) {
      return res.status(404).send("Course not found");
    }

    const IREs = await IreAssessment.find();

    res.status(200).json({
      status: "Here is your IRE vs SOS values:",
      data: {
        IREs,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal Server Error");
  }
};

export const getIreOfOneCourse = async (req, res) => {
  const courseId = req.params.courseId; // Get the courseId from request parameters
  const ireId = req.params.ireId; // Get the topicId from request parameters
  try {
    // Find the Course document by ID
    // Find the Topic document by ID within the Course's topics array
    const course = await Course.findById(courseId).populate("ireAssessment");

    if (!course) {
      return res.status(404).send("Course not found");
    }

    const ire = course.ireAssessment;
    if (!ireId) {
      throw new Error(
        `Topic with ID ${ireId} not found in course with ID ${courseId}`
      );
    }

    const ireData = await IreAssessment.findById(ireId);
    res.status(200).json({
      status: "Here is your ire vs sos values:",
      data: {
        ireData,
      },
    });
  } catch (err) {
    console.error(
      `Error getting topic with ID ${ireId} for course with ID ${courseId}:`,
      err
    );
    throw err;
  }
};

export const createIre = async (req, res) => {
  const courseId = req.params.courseId; // Get the courseId from request parameters
  const ireId = req.params.ireId; // Get the courseId from request parameters
  const ireData = req.body;
  try {
    // Find the Course document by ID
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).send("Course not found");
    }
    // Create a new ire document
    const ire = await IreAssessment.create(ireData);
    console.log(ireId);

    // Add the topic to the Course's topics array
    course.ireAssessment = await ire._id;

    // Save the updated Course document to the database
    const savedCourse = await course.save();
    res.status(200).json({
      status: "Topic Created Successfully",
      data: {
        ire,
      },
    });
  } catch (err) {
    console.error(`Error creating ire for course with ID ${courseId}:`, err);
    throw err;
  }
};

export const editIre = async (req, res) => {
  const courseId = req.params.courseId; // Get the courseId from request parameters
  const ireId = req.params.ireId; // Get the courseId from request parameters
  const ireData = req.body;
  try {
    // Find the Course document by ID
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).send("Course not found");
    }
    // Find the Topic document by ID within the Course's topics array
    let ire = course.ireAssessment;
    if (!ire) {
      throw new Error(
        `IRE with ID ${ireId} not found in course with ID ${courseId}`
      );
    }
    // Update the topic with the new data
    const ireUpdated = await IreAssessment.findByIdAndUpdate(ireId, ireData);
    res.status(200).json({
      status: "Here is your modified ire:",
      data: {
        ireUpdated,
      },
    });
  } catch (err) {
    console.error(
      `Error updating topic with ID ${ireId} for course with ID ${courseId}:`,
      err
    );
    throw err;
  }
};

export const deleteIre = async (req, res) => {
  const courseId = req.params.courseId; // Get the courseId from request parameters
  const ireId = req.params.ireId; // Get the courseId from request parameters
  try {
    // Find the Course document by ID
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).send("Course not found");
    }

    const ire = course.ireAssessment;
    if (!ireId) {
      throw new Error(
        `Topic with ID ${ireId} not found in course with ID ${courseId}`
      );
    }
    // Find the Topic document by ID within the Course's topics array and remove it
    const deletedIre = await IreAssessment.findByIdAndDelete(ireId);
    // Save the updated Course document to the database
    const savedCourse = await course.save();

    res.status(200).json({
      status: "Ire vs SOs values has been deleted!",
      data: {
        ire,
      },
    });
  } catch (err) {
    console.error(
      `Error deleting topic with ID ${ireId} for course with ID ${courseId}:`,
      err
    );
    throw err;
  }
};
