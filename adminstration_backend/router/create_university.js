const express = require('express');
const route = express.Router();
const { body } = require('express-validator');
const validateRequest = require('salahorg/middlewares/validate-request');
const { create_university } = require('../controller/create_university');
const currentUser = require('salahorg/middlewares/current-user');
const requireAuth = require('salahorg/middlewares/require-auth');
const { isAuthorizedUser } = require('salahorg/middlewares/checkRole');

route.post(
  '/api/admin/university',
  [
    body('name').not().isEmpty().withMessage('name must be provided'),

    body('university_code')
      .not()
      .isEmpty()
      .withMessage('university code must be provided'),
  ],

  validateRequest,
  currentUser,
  requireAuth,
  isAuthorizedUser('admin'),
  create_university
);

module.exports = route;
