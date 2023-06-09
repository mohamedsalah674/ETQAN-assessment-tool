const mongoose = require('mongoose');
const univeristySchema = require('../models/university');
const Universitydb = mongoose.model('universitydb', univeristySchema);
const NotFoundError=require('salahorg/errors/not-found-error');
const BadRequestError = require('salahorg/errors/bad-request-error');

const get_all_universities = async (req, res) => {
  // Check if there are universities to display them
  const exist_universities = await Universitydb.findOne({}, { name: 1 });

  // when there are no universities
  if (!exist_universities) {
    throw new BadRequestError('There is no universities');
  }

  const university = await Universitydb.find(
    {},
    { name: 1, university_code: 1 }
  );
  res.status(200).send(university);
};

module.exports = { get_all_universities };
