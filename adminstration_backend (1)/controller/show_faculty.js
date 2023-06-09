const mongoose = require('mongoose');
const univeristySchema = require('../models/university');
const Universitydb = mongoose.model('universitydb', univeristySchema);
const facultySchema = require('../models/faculty');
const Facultydb = mongoose.model('facultydb', facultySchema);
const BadRequestError = require('salahorg/errors/bad-request-error');
const NotFoundError=require('salahorg/errors/not-found-error');

const get_faculty = async (req, res) => {
  const faculty_Id = req.params.faculty_id;

  // if faculty id is missed
  if (!faculty_Id) {
    throw new BadRequestError('facultyt id must be provided');
  }

  // handel req.param error
  const faculty_id = mongoose.Types.ObjectId(faculty_Id.trim());

  // handel error if faculty is not ObjectId
  if (!mongoose.Types.ObjectId.isValid(faculty_id)) {
    throw new BadRequestError('faculty id is not valid');
  }

  // if faculty does not exist
  const Faculty = await Facultydb.findById(faculty_id);
  if (!Faculty) {
    throw new BadRequestError('The faculty does not exist');
  }

  // show the faculty
  const faculty = Facultydb.findById(faculty_id)
    .populate({
      path: 'departments', // attribute name of Model
      select: 'name  , department_code', // get only user name & profilePicture
    })

    .then((faculty) => {
      res.send(faculty);
    })
    .catch((err) => {
      res.status(500).send('Error database connection');
    });
};

module.exports = { get_faculty };
