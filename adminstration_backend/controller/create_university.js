const express = require('express');
require('express-async-errors');
const mongoose = require('mongoose');
const univeristySchema = require('../models/university');
const Universitydb = mongoose.model('universitydb', univeristySchema);
const BadRequestError = require('salahorg/errors/bad-request-error');

const create_university = async (req, res) => {
  const { name, university_code } = req.body;

  // Check if the university code is already reserved
  const existingUniversity = await Universitydb.findOne({ university_code });

  if (existingUniversity) {
    throw new BadRequestError('This university already exists');
  }

  // Create a new university
  const university = new Universitydb({
    name,
    university_code,
  });

  // Save the university in the database
  await university.save();

  res.status(200).send('University created');
};

module.exports = { create_university };
