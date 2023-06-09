const mongoose = require('mongoose');
const shcemaCourses = require('../models/course');
const Coursedb = mongoose.model('coursedb', shcemaCourses);
const BadRequestError = require('salahorg/errors/bad-request-error');
const NotFoundError=require('salahorg/errors/not-found-error');
 const producer = require("../events/producer/course-updated-event")
const update_course = async (req, res) => {
  const courseId = req.params.course_id;

  // handle error from req.param
  const Course_id = courseId.trim();

  // if user does not enter course id
  if (!Course_id) {
    throw new BadRequestError('Course code must be provided');
  }

  // handle error if course_id is not a valid ObjectId
  if (!mongoose.Types.ObjectId.isValid(Course_id)) {
    throw new BadRequestError('Course id is not valid');
  }

  // Check if the course exists to update it
  const exist_course = await Coursedb.findOne({ _id: Course_id });

  // if the course does not exist
  if (!exist_course) {
    throw new BadRequestError('Course does not exist');
  }

  // Fields must not be empty
  if (!req.body) {
    throw new BadRequestError('Fields must not be empty');
  }

  // Update course data
  Coursedb.findByIdAndUpdate(Course_id, req.body, {
    useFindAndModify: false,
  })
    .then((data) => {
      if (!data) {
        throw new NotFoundError();
      } else {
       producer(data)
        res.status(200).send('Course updated');
      }
    })
    .catch((error) => {
      console.log(error);
      throw new BadRequestError('Failed to update course');
    });
};

module.exports = { update_course };
