const express = require('express');
require('express-async-errors');
const mongoose = require('mongoose');
const univeristySchema = require('../models/university');
const Universitydb = mongoose.model('universitydb', univeristySchema);
const BadRequestError = require('salahorg/errors/bad-request-error');

const delete_all_Universities = async (req, res) => {
  // check if there are no Universities to delete
  const exist_courses = await Universitydb.findOne();

  // delete all Universities
  if (!exist_courses) {
    throw new BadRequestError('There are no Universities to delete');
  }

  await Universitydb.deleteMany();

  res.status(200).send('All Universities have been deleted sucessfully');
};

module.exports = { delete_all_Universities };
