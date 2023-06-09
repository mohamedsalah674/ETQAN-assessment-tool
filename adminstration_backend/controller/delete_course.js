const mongoose = require('mongoose');
const shcemaCourses = require('../models/course');
const Coursedb = mongoose.model('coursedb', shcemaCourses);
const BadRequestError = require('salahorg/errors/bad-request-error');
const NotFoundError = require('salahorg/errors/not-found-error');
 const produce  = require("../events/producer/course-deleted-event")
//  const producer  = require("../events/producer/course-deleted-event")

const delete_course = async (req, res) => {
  const course_id = req.params.course_id;

  //if user does not enter course id
  if (!course_id) {
    throw new BadRequestError('Course id must be provided');
  }

  // handel error if course_id is not ObjectId
  if (!mongoose.Types.ObjectId.isValid(course_id)) {
    throw new BadRequestError('Course id is not valid');
  }

  const course = await Coursedb.findById(course_id);

  if (!course) {
    throw new BadRequestError('Course does not exist');
  }

  const Course_code = course.course_code;

  //check if course is not exist
  const course_exist = await Coursedb.findByIdAndDelete(course_id);

  const event = {
    name: req.body.name,
    course_code: Course_code,
  };

  // // Actucally send event
    produce(event)
  // console.log("producer is disconnected now");

  // console.log(event);

  res.status(200).send('Course was deleted successfully!');
};

module.exports = { delete_course };
