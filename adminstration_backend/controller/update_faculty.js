const mongoose = require("mongoose");
const facultySchema = require("../models/faculty");
const Facultydb = mongoose.model('facultydb', facultySchema);
const BadRequestError = require('salahorg/errors/bad-request-error');
const NotFoundError = require('salahorg/errors/not-found-error');

const update_faculty = async (req, res) => {
  const faculty_Id = req.params.faculty_id;
  const { faculty_code } = req.body;

  // Handle error from req.param
  let faculty_id;
  try {
    faculty_id = mongoose.Types.ObjectId(faculty_Id);
  } catch (error) {
    throw new BadRequestError('Invalid faculty ID');
  }

  // Check if faculty ID is valid
  if (!mongoose.Types.ObjectId.isValid(faculty_id)) {
    throw new BadRequestError('Invalid faculty ID');
  }

  // Check if faculty exists
  const exist_faculty = await Facultydb.findById(faculty_id);
  if (!exist_faculty) {
    throw new NotFoundError('Faculty not found');
  }

  // Check if there is a duplicate faculty code
  const duplicate_faculty = await Facultydb.findOne({
    faculty_code: faculty_code,
    _id: { $ne: faculty_id },
  });
  if (duplicate_faculty) {
    throw new BadRequestError('Duplicate faculty code');
  }

  // Update faculty data
  try {
    const updatedFaculty = await Facultydb.findByIdAndUpdate(
      faculty_id,
      req.body,
      { useFindAndModify: false, new: true }
    );
    res.status(200).send('Faculty updated');
  } catch (error) {
    throw new BadRequestError('Failed to update faculty');
  }
};

module.exports = { update_faculty };
