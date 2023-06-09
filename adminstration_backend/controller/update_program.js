const mongoose = require('mongoose');
const programSchema = require('../models/program');
const Programdb = mongoose.model('programdb', programSchema);
const BadRequestError = require('salahorg/errors/bad-request-error');
const NotFoundError = require('salahorg/errors/not-found-error');
const produce_program_updated = require("../events/producer/program-updated-event")

const update_program = async (req, res) => {
  const program_Id = req.params.program_id;
  const { Program_Id } = req.body;

  // If user does not enter program ID
  if (!program_Id) {
    throw new BadRequestError('Program code must be provided');
  }

  // Handle error from req.param
  let program_id;
  try {
    program_id = mongoose.Types.ObjectId(program_Id);
  } catch (error) {
    throw new BadRequestError('Invalid program ID');
  }

  // Check if program exists
  const exist_program = await Programdb.findById(program_id);
  if (!exist_program) {
    throw new NotFoundError('Program not found');
  }

  // Check if there is a duplicate program ID
  const duplicate_program = await Programdb.findOne({
    Program_Id: Program_Id,
    _id: { $ne: program_id },
  });
  if (duplicate_program) {
    throw new BadRequestError('Duplicate program ID');
  }

  // Update program data
  try {
    const updatedProgram = await Programdb.findByIdAndUpdate(
      program_id,
      req.body,
      { useFindAndModify: false, new: true }
    );
    console.log(updatedProgram)
     await produce_program_updated(updatedProgram)
    res.status(200).send('Program updated');
  } catch (error) {
    throw new BadRequestError('Failed to update program');
  }
};

module.exports = { update_program };
