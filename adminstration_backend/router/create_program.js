const express = require('express');
const route = express.Router();
const { body } = require('express-validator');
const validateRequest = require('salahorg/middlewares/validate-request');
const { create_program } = require('../controller/create_program');
const currentUser = require('salahorg/middlewares/current-user');
const requireAuth = require('salahorg/middlewares/require-auth');
const { isAuthorizedUser } = require('salahorg/middlewares/checkRole');

route.post(
  '/api/admin/program/:department_id',

  [
    body('name').not().isEmpty().withMessage('name must be provided'),

    body('Program_Id')
      .not()
      .isEmpty()
      .withMessage('program id must be provided')
      .isNumeric()
      .withMessage('program id must be number'),
  ],

  validateRequest,
  currentUser,
  requireAuth,
  isAuthorizedUser('admin'),
  create_program
);

module.exports = route;
