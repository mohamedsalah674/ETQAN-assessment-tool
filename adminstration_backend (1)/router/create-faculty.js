const express = require('express');
const route = express.Router();
const { create_faculty } = require('../controller/create_faculty');
const validateRequest = require('salahorg/middlewares/validate-request');
const { body } = require('express-validator');
const currentUser = require('salahorg/middlewares/current-user');
const requireAuth = require('salahorg/middlewares/require-auth');
const { isAuthorizedUser } = require('salahorg/middlewares/checkRole');

route.post(
  '/api/admin/faculty/:university_id',

  [
    body('name').not().isEmpty().withMessage('name must be provided'),

    body('faculty_code')
      .not()
      .isEmpty()
      .withMessage('faculty code must be provided')
      .isNumeric()
      .withMessage('faculty code must be number'),
  ],
  validateRequest,
  currentUser,
  requireAuth,
  isAuthorizedUser('admin'),
  create_faculty
);

module.exports = route;
