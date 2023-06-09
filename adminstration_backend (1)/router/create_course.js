const express = require('express');
const route = express.Router();
const { body } = require('express-validator');
const validateRequest = require('salahorg/middlewares/validate-request');
const { create_course } = require('../controller/create_course');
const currentUser = require('salahorg/middlewares/current-user');
const requireAuth = require('salahorg/middlewares/require-auth');
const { isAuthorizedUser } = require('salahorg/middlewares/checkRole');

route.post(
  '/api/admin/course/:program_id',

  [
    body('name').not().isEmpty().withMessage('name must be provided'),

    body('course_code')
      .not()
      .isEmpty()
      .withMessage('Course code must be provided'),
  ],

  validateRequest,
  currentUser,
  requireAuth,
  isAuthorizedUser('admin'),
  create_course
);

module.exports = route;
