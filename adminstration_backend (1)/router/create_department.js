const express = require('express');
const route = express.Router();
const validateRequest = require('salahorg/middlewares/validate-request');
const { create_department } = require('../controller/create_department');
const { body } = require('express-validator');
const currentUser = require('salahorg/middlewares/current-user');
const requireAuth = require('salahorg/middlewares/require-auth');
const { isAuthorizedUser } = require('salahorg/middlewares/checkRole');

route.post(
  '/api/admin/department/:faculty_id',

  [
    body('name').not().isEmpty().withMessage('name must be provided'),

    body('department_code')
      .not()
      .isEmpty()
      .withMessage('department code must be provided')
      .isNumeric()
      .withMessage('department code must be number'),
  ],

  validateRequest,
  currentUser,
  requireAuth,
  isAuthorizedUser('admin'),
  create_department
);

module.exports = route;
