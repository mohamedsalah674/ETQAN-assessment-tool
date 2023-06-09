import Course from "../models/Course.js";
import Instructor from "../models/instructor.js";
import Marks from "../models/marks.js";
import IreAssessment from "../models/ireAssessment.js";

import { produce_course_created } from "../events/producer/course-created-event.js";
import { produce_course_deleted } from "../events/producer/course-deleted-event.js";
import { produce_course_updated } from "../events/producer/course-updated-event.js";

export const getAllCourses = async (req, res) => {
  try {
    const allCourses = await Course.find();
    res.json({ status: 200, data: allCourses });
  } catch (err) {
    console.log(err);
    res.status(400).json({ success: false });
  }
};

export const getCourse = async (req, res) => {
  const courseId = req.params.courseId; // Get the courseId from request parameters
  try {
    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }

    res.json({ status: 200, data: course });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
    console.log(error);
  }
};

export const createCourse = async (req, res) => {
  try {
    let course = await Course.create(req.body);

    if (course)
    {produce_course_created(course)}

    const initialIre = {
      ireSosArray: program.sosIds.map((so) => ({
        soId: so._id,
        pis: so.PIs.map((pi) => ({
          piId: pi._id,
          piValue: "I", // Initial value "I"
        })),
      })),
    };
    const ire = await IreAssessment.create(initialIre);
    course = await Course.findByIdAndUpdate(course._id, {
      ireAssessment: ire._id,
    });


    res.status(201).json({
      status: "Course created successfully",
      data: {
        course,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({ success: false });
  }
};

export const editCourse = async (req, res) => {
  const { courseId } = req.params;

  try {
    const result = await Course.findByIdAndUpdate(
      courseId,
      { $set: req.body },
      { new: true }
    );

    console.log(result);

    if(result)
    {produce_course_updated(result)}
    res
      .status(200)
      .json({ data: result, message: "Course Updated Successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
    console.log(error);
  }
};

export const deleteCourse = async (req, res) => {
  const { courseId } = req.params;
  try {
    // Find the course by ID
    const course = await Course.findById(courseId);
    
    if(course)
    {produce_course_deleted(course)}

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    // Find and delete the associated instructors
    const instructorIds = course.instructors;
    await Instructor.deleteMany({ _id: { $in: instructorIds } });

    // Find and delete the associated marks
    const marksIds = course.marks;
    await Marks.deleteMany({ _id: { $in: marksIds } });

    // Find and delete the associated images
    const imagesIds = course.samples;
    await Image.deleteMany({ _id: { $in: imagesIds } });

    // Remove the course ID from the associated program
    await Program.findByIdAndUpdate(programId, {
      $pull: { coursesIds: course._id },
    });

    // Delete the course itself
    await Course.findByIdAndDelete(courseId);

    res
      .status(200)
      .json({ message: "Course and associated data deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
    console.log(error);
  }
};
