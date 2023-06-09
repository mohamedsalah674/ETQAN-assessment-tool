const mongoose = require("mongoose");
const quizSchema = require("../models/marksSubdocuments/quiz");
const midtermSchema = require("../models/marksSubdocuments/midterm");
const progressExamSchema = require("../models/marksSubdocuments/progress_exam");
const projectSchema = require("../models/marksSubdocuments/project");
const labSchema = require("../models/marksSubdocuments/lab");
const assignmentSchema = require("../models/marksSubdocuments/assignment");
const finalExamSchema = require("../models/marksSubdocuments/final_exam");

const marks = new mongoose.Schema({
  student_name: { type: "String", default: "OO" },
  quizzes: [quizSchema],
  midterms: [midtermSchema],
  progress_exams: [progressExamSchema],
  projects: [projectSchema],
  labs: [labSchema],
  assignments: [assignmentSchema],
  final_exam: finalExamSchema,
  total_marks: { type: Number },
});

export default mongoose.models.Marks || mongoose.model("Marks", marks);
