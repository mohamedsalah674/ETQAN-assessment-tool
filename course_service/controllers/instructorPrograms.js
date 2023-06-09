import Instructor from "../models/instructor.js";
import Program from "../models/Program.js";
import Course from "../models/Course.js";
export const getInstructorPrograms = async (req, res) => {
  const instructorId = req.params.instructorId; // Get the courseId from request parameters
  try {
    // Fetch the instructor by ID
    const instructor = await Instructor.findById(instructorId);

    if (!instructor) {
      return res.status(404).send("Instructor not found");
    }

    // Get the programs that the instructor teaches in
    const programs = await Program.find({
      coursesIds: { $in: instructor.courses },
    });

    res
      .status(200)
      .json({ data: programs, message: "Here is the instructor programs:" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
    console.log(error);
  }
};

export const getInstructorCoursesForOneProgram = async (req, res) => {
  const instructorId = req.params.instructorId;
  const programId = req.params.programId;

  try {
    const instructor = await Instructor.findById(instructorId);

    if (!instructor) {
      return res.status(404).send("Instructor not found");
    }

    const program = await Program.findById(programId)
      .populate("coursesIds")
      .populate("sosIds");

    if (!program) {
      return res.status(404).send("Program not found");
    }

    console.log("aa7", instructor.courses);
    console.log("aa8", program.coursesIds);

    const instructorCourseIds = instructor.courses;
    const programCourseIds = program.coursesIds.map((course) => course._id);

    const courses = await Course.find({
      _id: { $in: instructorCourseIds, $in: programCourseIds },
    });

    const filteredCourses = courses.filter((course) => {
      return instructorCourseIds.includes(course._id.toString());
    });

    const programData = program;
    res.status(200).json({
      data: { programData, courses: filteredCourses },
      message: "Here are the instructor's courses for the program",
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
    console.log(error);
  }
};
