const mongoose = require('mongoose');
const shcemaCourses = require('../models/course');
const Coursedb = mongoose.model('coursedb', shcemaCourses);
const programSchema = require('../models/program');
const programdb = mongoose.model('programdb', programSchema);
const BadRequestError = require('salahorg/errors/bad-request-error');
const NotFoundError = require('salahorg/errors/not-found-error');

 const produce = require('../events/producer/course-created-event');
// const producer = require('../events/producer/course-created-event');

const create_course = async (req, res) => {
  // get id of program where course will be created
  const program_id = req.params.program_id;

  // if url does not contains :/program_id
  if (!program_id) {
    throw new NotFoundError();
  }

  //check if program is exist
  const exist_program = await programdb.findById(program_id);

  // get program code to send it in event to course service
  const program__id = exist_program.Program_Id;

  console.log(program__id);

  // if program not exist ,return error
  if (!exist_program) {
    throw new NotFoundError();
  }

  // handel error if program_id is not ObjectId
  if (!mongoose.Types.ObjectId.isValid(program_id)) {
    throw new BadRequestError('Program id is not valid');
  }

  // Course_code is a unique value
  const Course_code = req.body.course_code;

  // if user does not enter course code return error
  if (!Course_code) {
    throw new BadRequestError('course code must be provided');
  }

  // check if th course is added before , so it will not be added with the same course code (because it is unquie)
  const existing_course_in_course_database = await Coursedb.findOne({
    course_code: Course_code,
  });

  // apply check
  if (existing_course_in_course_database) {
    {
      throw new BadRequestError(
        'This course is added before to add it use another course with another code '
      );
    }
  }

  // course doen not exist (added for the first time)
  if (!existing_course_in_course_database) {
    // add course to courses database and program database
    const Create_Course = function (program_id, course) {
      return Coursedb.create(course).then((docCourse) => {
        console.log('\n>> Created Course:\n');

        // add reference to course from program
        //program ----> course_id
        return programdb.findByIdAndUpdate(
          program_id,
          { $push: { courses: docCourse._id } },
          { new: true, useFindAndModify: false }
        );
      });
    };

    // call the function to be excuted
    Create_Course(program_id, req.body);

    // create event schema to send it to course service
    const event = {
      name: req.body.name ,
      course_code : req.body.course_code ,
      Program_id : program__id
    }

    console.log(event);

    //    Actucally send event
     produce(event)
    console.log("producer is disconnected now");

    res
      .status(200)
      .send(
        'Course has been created in courses database and in database of this program'
      );
    return;
  }
  //  producer.disconnect()
};

module.exports = { create_course };
