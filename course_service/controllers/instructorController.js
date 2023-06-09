import Instructor from "../models/instructor.js";
import Course from "../models/Course.js";

export const getAllInstructors = async (req, res) => {
  // const courseId = req.params.courseId; // Get the courseId from request parameters
  try {
    // const course = await Course.findById(courseId).populate("instructors"); // Find the course by _id

    // if (!course) {
    //   return res.status(404).send("Course not found");
    // }

    const instructors = await Instructor.find();
    // const instructors = course.instructors; // Get the instructors from the course

    res.status(200).json({ data: instructors });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
    console.log(error);
  }
};
export const getInstructor = async (req, res) => {
  // const courseId = req.params.courseId; // Get the courseId from request parameters
  const instructorId = req.params.instructorId; // Get the courseId from request parameters
  try {
    // const course = await Course.findById(courseId).populate("instructors");

    // if (!course) {
    //   return res.status(404).send("Course not found");
    // }

    // const instructor = course.instructors.find(
    //   (instructor) => instructor._id.toString() === instructorId
    // );

    const instructors = await Instructor.findById(instructorId);

    if (!instructors) {
      return res.status(404).json({ error: "Instructor not found" });
    }

    res.json({ status: 200, data: instructors });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
    console.log(error);
  }
};
export const createInstructor = async (req, res) => {
  // const courseId = req.params.courseId;
  // const instructorId = req.params.instructor;
  const instructorData = req.body;
  try {
    // // Find the Course document by ID
    // const course = await Course.findById(courseId);
    // if (!course) {
    //   return res.status(404).send("Course not found");
    // }
    // Create a new instructor document
    const instructor = await Instructor.create(instructorData);
    // console.log("ss", instructor);

    // // Add the instructor to the Course's instructors array
    // course.instructors.push(instructor._id);

    // // Save the updated Course document to the database
    // const savedCourse = await course.save();
    res
      .status(201)
      .json({ data: instructor, message: "Instructor added successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
    console.log(error);
  }
};
export const editInstructor = async (req, res) => {
  // const courseId = req.params.courseId;
  const instructorId = req.params.instructorId;
  const instructorData = req.body;
  try {
    // // Find the Course document by ID
    // const course = await Course.findById(courseId).populate("instructors");
    // if (!course) {
    //   return res.status(404).send("Course not found");
    // }
    // Update the instructor using findByIdAndUpdate
    const updatedInstructor = await Instructor.findByIdAndUpdate(
      instructorId,
      instructorData
    );

    if (!updatedInstructor) {
      return res.status(404).json({ error: "Instructor not found" });
    }

    res.status(200).json({
      data: updatedInstructor,
      message: "Instructor Updated Successfully",
    });
  } catch (error) {
    console.error(
      `Error updating instructor with ID ${instructorId} for course with ID ${courseId}:`,
      error
    );
    throw error;
  }
};
export const deleteInstructor = async (req, res) => {
  // const courseId = req.params.courseId; // Get the courseId from request parameters
  const instructorId = req.params.instructorId; // Get the courseId from request parameters
  try {
    // Find the instructor and delete it
    const deletedInstructor = await Instructor.findByIdAndDelete(instructorId);

    if (!deletedInstructor) {
      return res.status(404).json({ error: "Instructor not found" });
    }

    // // Remove the instructor's ID from the instructors IDs array inside the course
    // const course = await Course.findById(courseId);
    // if (!course) {
    //   return res.status(404).json({ error: "Course not found" });
    // }

    // const instructorIndex = course.instructors.indexOf(instructorId);

    // if (instructorIndex !== -1) {
    //   course.instructors.splice(instructorIndex, 1);
    // }

    // // Save the updated course
    // await course.save();

    res.status(200).json({
      status: "Instructor has been deleted!",
      data: {
        deletedInstructor,
      },
    });
  } catch (err) {
    console.error(
      `Error deleting instructor with ID ${instructorId} for course with ID ${courseId}:`,
      err
    );
    throw err;
  }
};
