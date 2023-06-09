const mongoose = require('mongoose');
const univeristySchema = require('../models/university');
const Universitydb = mongoose.model('universitydb', univeristySchema);
const facultySchema = require('../models/faculty');
const Facultydb = mongoose.model('facultydb', facultySchema);
const BadRequestError = require('salahorg/errors/bad-request-error');
const NotFoundError=require('salahorg/errors/not-found-error');

const create_faculty = async (req, res) => {
  // handel req.param error
  const university_Id = mongoose.Types.ObjectId(
    req.params.university_id.trim()
  );

  // if user did not enter faculty  id
  if (!university_Id) {
    throw new NotFoundError();
  }

  // handel error if faculty_Id is not ObjectId
  if (!mongoose.Types.ObjectId.isValid(university_Id)) {
    throw new BadRequestError('Faculty id is not valid');
  }

  // if user does not enter faculty code as input
  const Faculty_id = req.body.faculty_code;

  // if user does not enter faculty code as input
  if (!Faculty_id) {
    throw new BadRequestError('Faculty code must be provided');
  }

  // Check if faculty is already exist in faculty database
  const existing_faculty_in_faculty_database = await Facultydb.findOne({
    faculty_code: Faculty_id,
  });

  if (existing_faculty_in_faculty_database) {
    {
      throw new BadRequestError(
        'This faculty is added before to add it use another faculty with another code '
      );
    }
  }

  // faculty added for the first time
  if (!existing_faculty_in_faculty_database) {
    // add faculty to faculty database and faculty database

    const create_Faculty = function (university_Id, faculty) {
      return Facultydb.create(faculty).then((docFaculty) => {
        console.log('\n>> Created faculty:\n');

        // add reference to faculty from faculty
        //facuclty ----> faculty_id

        return Universitydb.findByIdAndUpdate(
          university_Id,
          { $push: { faculties: docFaculty._id } },
          { new: true, useFindAndModify: false }
        );
      });
    };

    create_Faculty(university_Id, req.body);
    res
      .status(200)
      .send(
        'Faculty has been created in faculties database and in database of this faculty'
      );
    return;
  }
};

module.exports = { create_faculty };
