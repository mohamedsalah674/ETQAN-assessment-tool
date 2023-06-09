import Student from "../models/student.js";
import Marks from "../models/marks.js";
import Course from "../models/Course.js";

export const getAllMarks = async (req, res) => {
  const courseId = req.params.courseId; // Get the courseId from request parameters
  try {
    const course = await Course.findById(courseId).populate("marks"); // Find the course by _id

    if (!course) {
      return res.status(404).send("Course not found");
    }

    const studentMarks = course.marks; // Get the marks from the course

    res.status(200).json({ data: studentMarks });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
    console.log(error);
  }
};

export const getStudentMarks = async (req, res) => {
  const marksId = req.params.marksId; // Get the courseId from request parameters
  const courseId = req.params.courseId; // Get the courseId from request parameters
  try {
    const course = await Course.findById(courseId).populate("marks");

    if (!course) {
      return res.status(404).send("Course not found");
    }
    const marks = course.marks.find((mark) => mark._id.toString() === marksId);

    if (!marks) {
      return res.status(404).json({ error: "Student marks not found" });
    }

    res.json({ status: 200, data: marks });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
    console.log(error);
  }
};

export const createStudentMarks = async (req, res) => {
  const courseId = req.params.courseId;
  const marksId = req.params.marksId;
  const marksData = req.body;

  try {
    // Find the Course document by ID
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).send("Course not found");
    }
    // Create a new marks document
    const studentMarks = await Marks.create(marksData);

    // Add the marks to the Course's marks array
    course.marks.push(studentMarks._id);

    // Save the updated Course document to the database
    const savedCourse = await course.save();

    res.status(200).json({
      status: "Marks Created Successfully",
      data: {
        studentMarks,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({ success: false });
  }
};

export const editStudentMarks = async (req, res) => {
  const courseId = req.params.courseId;
  const marksId = req.params.marksId;
  const marksData = req.body;
  try {
    // Find the Course document by ID
    const course = await Course.findById(courseId).populate("marks");
    if (!course) {
      return res.status(404).send("Course not found");
    }
    // Update the marks using findByIdAndUpdate
    const updatedMarks = await Marks.findByIdAndUpdate(marksId, marksData);

    if (!updatedMarks) {
      return res.status(404).json({ error: "Marks not found" });
    }

    res.status(200).json({
      data: updatedMarks,
      message: "Marks Updated Successfully",
    });
  } catch (error) {
    res.status(500).json({ message: "Error updating marks" });
    console.log(error);
  }
};

export const deleteStudentMarks = async (req, res) => {
  const courseId = req.params.courseId; // Get the courseId from request parameters
  const marksId = req.params.marksId; // Get the courseId from request parameters
  try {
    // Find the marks and delete it
    const deletedMarks = await Marks.findByIdAndDelete(marksId);

    if (!deletedMarks) {
      return res.status(404).json({ error: "Marks not found" });
    }

    // Remove the marks ID from the marks IDs array inside the course
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }

    const marksIndex = course.marks.indexOf(marksId);

    if (marksIndex !== -1) {
      course.marks.splice(marksIndex, 1);
    }

    // Save the updated course
    await course.save();

    res.status(200).json({
      status: "Marks has been deleted!",
      data: {
        deletedMarks,
      },
    });
  } catch (err) {
    console.error(
      `Error deleting marks with ID ${marksId} for course with ID ${courseId}:`,
      err
    );
    throw err;
  }
};
