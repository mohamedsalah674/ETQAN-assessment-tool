const { update_program } = require('../controller/update_program');
const express = require('express');
const route = express.Router();
const { body } = require('express-validator');
const validateRequest = require('salahorg/middlewares/validate-request');
const currentUser = require('salahorg/middlewares/current-user');
const requireAuth = require('salahorg/middlewares/require-auth');
const { isAuthorizedUser } = require('salahorg/middlewares/checkRole');

route.put(
  '/api/admin/program/:program_id',

  [
    body('name')
      .trim()
      .notEmpty()
      .isString()
      .matches(/^[a-zA-Z\s]+$/)
      .withMessage('you must add a name'),

    body('Program_Id')
      .notEmpty()
      .withMessage('Program id is required')
      .trim()
      .isNumeric()
      .withMessage('Program id must be number'),
  ],

  validateRequest,
  currentUser,
  requireAuth,
  isAuthorizedUser('admin'),
  update_program
);

module.exports = route;
