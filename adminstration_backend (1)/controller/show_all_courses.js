const mongoose = require('mongoose');
const shcemaCourses = require('../models/course');
const Coursedb = mongoose.model('coursedb', shcemaCourses);
const BadRequestError = require('salahorg/errors/bad-request-error');

const get_all_courses = async (req, res) => {
  // Check if there are courses to display them
  const exist_courses = await Coursedb.findOne({}, { name: 1 });

  // when there are no courses
  if (!exist_courses) {
    throw new BadRequestError('There is no courses');
  }

  // Display courses
  const courses = await Coursedb.find({}, { name: 1, course_code: 1 });
  res.send(courses);
};

module.exports = { get_all_courses };
