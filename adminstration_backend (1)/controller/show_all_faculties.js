const mongoose = require('mongoose');
const facultySchema = require('../models/faculty');
const Facultydb = mongoose.model('facultydb', facultySchema);
const BadRequestError = require('salahorg/errors/bad-request-error');
const NotFoundError=require('salahorg/errors/not-found-error');

const get_all_fucalities = async (req, res) => {
  // Check if there are fucalities to display them
  const exist_fucalities = await Facultydb.findOne({}, { name: 1 });

  // when there are no fucalities
  if (!exist_fucalities) {
    throw new BadRequestError('There is no fucalities');
  }

  const faculty = await Facultydb.find({}, { name: 1, faculty_code: 1 });
  res.send(faculty);
};

module.exports = { get_all_fucalities };
