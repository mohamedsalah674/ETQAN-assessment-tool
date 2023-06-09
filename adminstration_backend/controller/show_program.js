const mongoose = require('mongoose');
const programSchema = require('../models/program');
const Programdb = mongoose.model('programdb', programSchema);
const BadRequestError = require('salahorg/errors/bad-request-error');

const get_program = async (req, res) => {
  const program_Id = req.params.program_id;

  // if program id is missed
  if (!program_Id) {
    throw new BadRequestError('program id must be provided');
  }

  // handel req.param error
  const program_id = mongoose.Types.ObjectId(program_Id.trim());

  // handel error if program_id is not ObjectId
  if (!mongoose.Types.ObjectId.isValid(program_id)) {
    throw new BadRequestError('program id is not valid');
  }

  // if program does not exist
  const Program = await Programdb.findById(program_id);
  if (!Program) {
    throw new BadRequestError('The program does not exist');
  }

  // show the program
  const program = Programdb.findById(program_id)
    .populate({
      path: 'courses', // attribute name of Model
      select: 'name  ,  course_code', // get only user name & profilePicture
    })

    .then((program) => {
      res.send(program);
    })
    .catch((err) => {
      res.status(500).send('Error database connection');
    });
};

module.exports = { get_program };