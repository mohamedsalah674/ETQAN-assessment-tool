const mongoose = require('mongoose');
const facultySchema = require('../models/faculty');
const Facultydb = mongoose.model('facultydb', facultySchema);
const BadRequestError = require('salahorg/errors/bad-request-error');
const NotFoundError=require('salahorg/errors/not-found-error');

const delete_faculty = async (req, res) => {
  const faculty_id = req.params.faculty_id;

  //if user does not enter faculty id
  if (!faculty_id) {
    throw new BadRequestError('faculty id must be provided');
  }

  // handel error if faculty is not ObjectId
  if (!mongoose.Types.ObjectId.isValid(faculty_id)) {
    throw new BadRequestError('faculty id is not valid');
  }

  //check if faculty is not exist
  const faculty_exist = await Facultydb.findByIdAndDelete(faculty_id);
  if (!faculty_exist) {
    throw new NotFoundError();
  }

  res.status(200).send('faculty was deleted successfully!');
};

module.exports = { delete_faculty };
