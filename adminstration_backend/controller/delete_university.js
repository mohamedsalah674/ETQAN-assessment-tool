const mongoose = require("mongoose");
const univeristySchema = require("../models/university");
const Universitydb = mongoose.model('universitydb', univeristySchema);
const NotFoundError = require('salahorg/errors/not-found-error');
const BadRequestError = require('salahorg/errors/bad-request-error');

const delete_University = async (req, res) => {
  const University_Id = req.params.university_id;

  // handle req.param error
  const university_Id = mongoose.Types.ObjectId(University_Id.trim());

  // if university does not enter university id as input
  if (!university_Id) {
    throw new BadRequestError("University id must be provided");
  }

  // handle error if program_id is not ObjectId
  if (!mongoose.Types.ObjectId.isValid(university_Id)) {
    throw new BadRequestError("University id is not valid");
  }

  // check if university exists to delete it
  const university_exist = await Universitydb.findByIdAndDelete(university_Id);

  // university does not exist
  if (!university_exist) {
    throw new NotFoundError("This university does not exist");
  }

  res.status(200).send("University was deleted successfully!");
};

module.exports = { delete_University };
