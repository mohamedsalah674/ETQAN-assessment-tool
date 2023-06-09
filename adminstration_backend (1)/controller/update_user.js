const express = require('express');
const mongoose = require('mongoose');
const all_users_Schema = require('../models/user');
const Allusersdb = mongoose.model('allusersdb', all_users_Schema);
const nodemailer = require('nodemailer');
const BadRequestError = require('salahorg/errors/bad-request-error');
const NotFoundError = require('salahorg/errors/not-found-error');
const produce  = require("../events/producer/user_updated_event")
const bcrypt = require('bcrypt');
const update_user = async (req, res) => {
  const user_Id = req.params.user_id;
  const { email } = req.body;

  // handle error if user_id is not ObjectId
  if (!mongoose.Types.ObjectId.isValid(user_Id)) {
    throw new BadRequestError('User id is not valid');
  }

  // handle error from req.param
  const user_id = mongoose.Types.ObjectId(user_Id.trim());

  // if user does not enter user id
  if (!user_Id) {
    throw new BadRequestError('User id must be provided');
  }

  // Fields must not be empty
  if (!req.body) {
    throw new BadRequestError('Fields must not be empty');
  }

  // Check if user is exist
  const user_exist = await Allusersdb.findById(user_id);

  // User does not exist
  if (!user_exist) {
    throw new NotFoundError("User not found");
  }

  const pervious_role = user_exist.role
  // Update data of user
    await Allusersdb.findByIdAndUpdate(user_id, req.body, { useFindAndModify: false })
    .then((data) => {

      if (!data) {
        throw new BadRequestError("Error");
      } else {
        data.role = req.body.role
        const event = {
         data
         ,pervious_role

        }

         produce(event);
        console.log(event);
        res.status(200).send("User updated");
      }
    })
    .catch((error) => {
      // Handle error
      console.log(error);
      throw new BadRequestError("Error");
    });
};

module.exports = { update_user };
