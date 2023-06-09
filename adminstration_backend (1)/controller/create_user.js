const express = require('express');
require('express-async-errors');
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
const all_users_Schema = require('../models/user');
const Allusersdb = mongoose.model('allusersdb', all_users_Schema);
const BadRequestError = require('salahorg/errors/bad-request-error');
const produce  = require("../events/producer/user_created_event")
const bcrypt = require('bcrypt');
var id = new mongoose.Types.ObjectId();

const create_user = async (req, res) => {
  // const msg = [name_kafka , email_kafka , password_kafka , role_kafka]

  const { email } = req.body;

 const password = req.body.password
 
 const salt = await bcrypt.genSalt(12);
 const hashedPassword = await bcrypt.hash(password, salt);

 console.log(hashedPassword)

  const existingEmail = await Allusersdb.findOne({ email });

  // check if two fields is all ready reserved so this user is already in our system
  if (existingEmail) {
    throw new BadRequestError('This user is already exist');
  }

  

  // Add new user
  const users = new Allusersdb({
              _id : id,

    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    role: req.body.role,
    academicPosition: req.body.academicPosition,
    isVerified : true ,
    URL : req.body.URL ,
    isAdmin : true
  });

  users.password = hashedPassword
 produce(users)
   console.log("producer is disconnected now");

  // save user in the database
  users.save();

  res.status(200).send('User created');
};

module.exports = { create_user };
