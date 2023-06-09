const express = require('express');
const route = express.Router();
const { body } = require('express-validator');
const validateRequest = require('salahorg/middlewares/validate-request');
const currentUser = require('salahorg/middlewares/current-user');
const requireAuth = require('salahorg/middlewares/require-auth');
const { isAuthorizedUser } = require('salahorg/middlewares/checkRole');

const { update_department } = require('../controller/update_department');

route.put(
  '/api/admin/department/:department_id',
  [
    body('name')
      .trim()
      .notEmpty()
      .isString()
      .matches(/^[a-zA-Z\s]+$/)
      .withMessage('you must add a name'),

    body('department_code')
      .notEmpty()
      .withMessage('department code is required')
      .trim()
      .isNumeric()
      .withMessage('department code must be number'),
  ],
  validateRequest,
  currentUser,
  requireAuth,
  isAuthorizedUser('admin'),
  update_department
);

module.exports = route;
