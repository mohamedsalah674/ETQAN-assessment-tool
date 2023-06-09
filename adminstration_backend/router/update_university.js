const express = require('express');
const route = express.Router();
const { update_university } = require('../controller/update_university');
const { body } = require('express-validator');
const validateRequest = require('salahorg/middlewares/validate-request');
const currentUser = require('salahorg/middlewares/current-user');
const requireAuth = require('salahorg/middlewares/require-auth');
const { isAuthorizedUser } = require('salahorg/middlewares/checkRole');

route.put(
  '/api/admin/university/:university_id',

  [
    body('name')
      .trim()
      .notEmpty()
      .isString()
      .matches(/^[a-zA-Z\s]+$/)
      .withMessage('you must add a name'),

    body('university_code')
      .notEmpty()
      .trim()
      .withMessage('university code is required'),
  ],

  validateRequest,
  currentUser,
  requireAuth,
  isAuthorizedUser('admin'),
  update_university
);

module.exports = route;
