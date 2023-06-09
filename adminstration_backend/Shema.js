const mongoose = require("mongoose");

const quizSchema = new Schema(
  { percent: Number, required: true },
  { CLOs: [Number], required: true },
  { quiz_number: Number, required: true },
  { c_topics: [Number], required: true },
  { std_mark: Number, required: true }
);

const midtermSchema = new Schema(
  { percent: Number, required: true },
  { CLOs: [Number], required: true },
  { midterm_number: Number, required: true },
  { c_topics: [Number], required: true },
  { std_mark: Number, required: true }
);

const progress_examSchema = new Schema(
  { exam_name: string, required: true },
  { percent: Number, required: true },
  { CLOs: [Number], required: true },
  { c_topics: [Number], required: true },
  { std_mark: Number, required: true }
);

const projectSchema = new Schema(
  { project_name: string, required: true },
  { percent: Number, required: true },
  { CLOs: [Number], required: true },
  { c_topics: [Number], required: true },
  { std_mark: Number, required: true }
);

const labsSchema = new Schema(
  { lab_name: string, required: true },
  { percent: Number, required: true },
  { lab_number: [Number], required: true },
  { CLOs: [Number], required: true },
  { c_topics: [Number], required: true },
  { std_mark: Number, required: true }
);

const assignmentsSchema = new Schema(
  { name: string, required: true },
  { percent: Number, required: true },
  { assignment_no: [Number], required: true },
  { CLOs: [Number], required: true },
  { c_topics: [Number], required: true },
  { std_mark: Number, required: true }
);

const final_examSchema = new Schema(
  { percent: Number, required: true },
  { CLOs: [Number], required: true },
  { c_topics: [Number], required: true },
  { std_mark: Number, required: true }
);

const marksSchema = mongoose.Schema({
  quizzes: [quizSchema],
  midterms: [midtermsSchema],
  progress_exam: [progress_examSchema],
  projects: [projectSchema],
  labs: [labsSchema],
  assignments: [assignmentsSchema],
  total_mark: { Number, required: true },
  final_exam: final_examSchema,
});

const studentSchema = mongoose.Schema({
  marks: { type: mongoose.Schema.Types.ObjectId, ref: "Marks" }, //FK to marks document
  name: { String, required: true },
  year: { Number, required: true },
  depart_name: { String, required: true },
  date_of_birth: { Date, required: true },
  email: { String, required: true },
  password: { String, required: true },
  student_id: { String, required: true },
  phone: { String, required: true },
  address: { String, required: true },
  role: { String, required: true },
});

const adminSchema = mongoose.Schema({
  role: { String, required: true },
  name: { String, required: true },
  email: { String, required: true },
  password: { String, required: true },
});

const c_topicSchema = mongoose.Schema({
  name: { String, required: true },
  weeks: { Number, required: true },
  CLOs: { type: [Number], required: true },
});

const PISchema = mongoose.Schema({
  name: { String, required: true },
  PI_number: { type: [Number], required: true },
});

const courseSchema = mongoose.Schema({
  name: { String, required: true },
  code: { String, required: true },
  credits: { Number, required: true },
  instruc_id: {
    //FK to Instructor
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Instructor",
    required: true,
  },
  text_books: { String, required: true },
  course_info: { String, required: true },
  CLOs: {
    //FK to CLOs
    type: [mongoose.Schema.Types.ObjectId],
    ref: "CLOs",
    required: true,
  },
  SOs: {
    //FK to  SOs
    type: [mongoose.Schema.Types.ObjectId],
    ref: "SOs",
    required: true,
  },
  c_topics: { type: [c_topicSchema], required: true },
  PI: { type: [PISchema], required: true },
  teaching_methods: { type: [String], required: true },
  marks: {
    //FK to Marks
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Marks",
    required: true,
  },
  abet_cri: { type: [Number], required: true },
});

const surveySchema = mongoose.Schema({
  name: { String, required: true },
  student_rate: { type: [Number], required: true },
  avg_rate: { type: Number, required: true },
  target_rate: { type: Number, required: true },
});

const CLOSchema = mongoose.Schema({
  description: { String, required: true },
  CLO_number: { Number, required: true },
  teaching_methods: { type: [String], required: true },
  SOs: { type: [Number], required: true },
  ABET_criteria: { type: [Number], required: true },
  PI: { type: [Number], required: true },
  suvery: { type: surveySchema, required: true },
});

const SOSchema = mongoose.Schema({
  description: { String, required: true },
  SO_number: { Number, required: true },
  teaching_methods: { type: [String], required: true },
  CLOs: { type: [Number], required: true },
  ABET_criteria: { type: [Number], required: true },
  PI: { type: [Number], required: true },
});

const instructorSchema = mongoose.Schema({
  role: { String, required: true },
  name: { String, required: true },
  program: { Number, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  employee_id: { type: String, required: true },
  courses: { type: [String], required: true },
  academic_title: { type: String, required: true },
});

const presidentSchema = mongoose.Schema({
  name: { String, required: true },
  email: { String, required: true },
  password: { String, required: true },
  employee_id: { String, required: true },
});

const deanSchema = mongoose.Schema({
  role: { String, required: true },
  name: { String, required: true },
  faculty_name: { Number, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  employee_id: { type: String, required: true },
  academic_title: { type: String, required: true },
});

const facultySchema = mongoose.Schema({
  name: { String, required: true },
  departments: {
    type: [departmentSchema],
    required: true,
  },
  faculty_dean: {
    type: [deanSchema],
    required: true,
  },
});

const univeristySchema = mongoose.Schema({
  name: { String, required: true },
  faculties: {
    //FK to faulty
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Faculty",
    required: true,
  },
  president: presidentSchema,
});

const head_of_departmentSchema = mongoose.Schema({
  role: { String, required: true },
  name: { String, required: true },
  email: { String, required: true },
  password: { String, required: true },
  employee_id: { String, required: true },
  depart_name: { String, required: true },
  academic_title: { String, required: true },
});

const departmentSchema = mongoose.Schema({
  name: { String, required: true },
  programs: {
    //FK to faulty
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Program",
    required: true,
  },
  head: { type: head_of_departmentSchema, required: true },
  name: { String, required: true },
});

const coordinatorSchema = mongoose.Schema({
  role: { String, required: true },
  name: { String, required: true },
  email: { String, required: true },
  password: { String, required: true },
  employee_id: { String, required: true },
  program_name: { String, required: true },
  academic_title: { String, required: true },
});

const abet_criSchema = mongoose.Schema({
  version: { String, required: true },
  description: { String, required: true },  
  number: { String, required: true },
});

const programSchema = mongoose.Schema({
  name: { String, required: true },
  courses: {
    //FK to courses
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Courses",
    required: true,
  },
  abet_criteria: { type: [abet_criSchema], required: true },
  SOs: {
    //FK to SOs
    type: [mongoose.Schema.Types.ObjectId],
    ref: "SOs",
    required: true,
  },
  coordinator: { type: [coordinatorSchema], required: true },
});
module.exports = mongoose.model("Sub", subSchema);
