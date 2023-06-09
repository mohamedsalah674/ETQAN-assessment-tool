const express = require('express');
const route = express.Router();
const { body } = require('express-validator');
const validateRequest = require('salahorg/middlewares/validate-request');
const { add_coordinator } = require('../controller/add_coordinator_to_program');
const currentUser = require('salahorg/middlewares/current-user');
const requireAuth = require('salahorg/middlewares/require-auth');
const { isAuthorizedUser } = require('salahorg/middlewares/checkRole');

route.post(
  '/api/admin/add_coordinator_program/:program_id',

  [
    body('email')
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Email must be valid')

  ],

  validateRequest,
//   currentUser,
//   requireAuth,
//   isAuthorizedUser('admin'),
  add_coordinator
);

module.exports = route;
