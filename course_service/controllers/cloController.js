import { CLO } from "../models/CLO.js";
import Course from "../models/Course.js";
import Survey from "../models/survey.js";
import { v4 as uuidv4 } from "uuid";
export const getAllClos = async (req, res) => {
  const courseId = req.params.courseId; // Get the courseId from request parameters
  try {
    console.log("Course id is : ", courseId);
    const course = await Course.findById(courseId); // Find the course by _id

    if (!course) {
      return res.status(404).send("Course not found");
    }

    const clos = course.clos; // Get the clos from the course

    res.status(200).json({
      status: "Here is your clos:",
      data: {
        clos,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
    console.log(error);
  }
};
export const getClo = async (req, res) => {
  const courseId = req.params.courseId; // Get the courseId from request parameters
  const cloId = req.params.cloId; // Get the cloId from request parameters
  try {
    const course = await Course.findById(courseId).populate("clos");

    if (!course) {
      return res.status(404).send("Course not found");
    }

    const clo = course.clos.id(cloId);
    if (!clo) {
      throw new Error(
        `CLO with ID ${cloId} not found in course with ID ${courseId}`
      );
    }

    res.status(200).json({
      status: "Here is your clo:",
      data: {
        clo,
      },
    });
  } catch (err) {
    console.error(
      `Error getting clo with ID ${cloId} for course with ID ${courseId}:`,
      err
    );
    throw err;
  }
};

export const createClo = async (req, res) => {
  const courseId = req.params.courseId; // Get the courseId from request parameters
  const cloId = req.params.cloId; // Get the cloId from request parameters
  const cloDescription = req.body.description;

  try {
    // Find the Course document by ID
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).send("Course not found");
    }

    const generate = await function generateUniqueRandomNumber() {
      let randomNumber;
      do {
        randomNumber = Math.floor(Math.random() * 900) + 100; // Generates a random 3-digit number
      } while (course.clos_codes.includes(randomNumber));

      course.clos_codes.push(randomNumber);

      return randomNumber;
    };

    const cloCode = await (course.code + `-${generate()}`);
    const randomSurveyId = await uuidv4();

    const survey = await Survey.create({
      description: `Survey for CLO ${cloCode}`,
      students_responses: [],
      target_rate: 70,
      survey_id: String(randomSurveyId),
    });
    // Create a new CLO document
    const clo = new CLO({
      description: cloDescription,
      CLO_number: cloCode,
      surveyId: String(randomSurveyId),
    });
    console.log("NEW CLO IS: ", clo);

    // Add the clo to the Course's clos array
    course.clos.push(clo);

    // Save the updated Course document to the database
    const savedCourse = await course.save();
    res.status(200).json({
      status: "CLO Created Successfully",
      data: {
        clo,
      },
    });
  } catch (err) {
    console.error(`Error creating clo for course with ID ${courseId}:`, err);
    throw err;
  }
};
export const editClo = async (req, res) => {
  const courseId = req.params.courseId; // Get the courseId from request parameters
  const cloId = req.params.cloId; // Get the cloId from request parameters
  const cloData = req.body;
  try {
    // Find the Course document by ID
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).send("Course not found");
    }
    // Find the CLO document by ID within the Course's clos array
    let clo = course.clos.id(cloId);
    if (!clo) {
      throw new Error(
        `CLO with ID ${cloId} not found in course with ID ${courseId}`
      );
    }
    // Update the clo with the new data
    clo = clo.set(cloData);

    // Save the updated Course document to the database
    const savedCourse = await course.save();

    res.status(200).json({
      status: "Here is your modified clo:",
      data: {
        clo,
      },
    });
  } catch (err) {
    console.error(
      `Error updating clo with ID ${cloId} for course with ID ${courseId}:`,
      err
    );
    throw err;
  }
};
export const deleteClo = async (req, res) => {
  const courseId = req.params.courseId; // Get the courseId from request parameters
  const cloId = req.params.cloId; // Get the courseId from request parameters
  try {
    // Find the Course document by ID
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).send("Course not found");
    }

    const clo = course.clos.id(cloId);
    if (!clo) {
      throw new Error(
        `CLO with ID ${cloId} not found in course with ID ${courseId}`
      );
    }
    await Survey.findOneAndDelete({ survey_id: clo.surveyId });

    // Find the CLO document by ID within the Course's clos array and remove it
    course.clos.pull(cloId);
    const clos = course.clos;
    // Save the updated Course document to the database
    const savedCourse = await course.save();

    res.status(200).json({
      status: "CLO has been deleted!",
      data: {
        clo,
      },
    });
  } catch (err) {
    console.error(
      `Error deleting clo with ID ${cloId} for course with ID ${courseId}:`,
      err
    );
    throw err;
  }
};
