const express = require('express');
const route = express.Router();
const { body } = require('express-validator');
const validateRequest = require('salahorg/middlewares/validate-request');
const currentUser = require('salahorg/middlewares/current-user');
const requireAuth = require('salahorg/middlewares/require-auth');
const { isAuthorizedUser } = require('salahorg/middlewares/checkRole');

const { update_user } = require('../controller/update_user');

route.put(
  '/api/admin/users/:user_id',
  [
    body('name')
      .trim()
      .notEmpty()
      .isString()
      .matches(/^[a-zA-Z\s]+$/)
      .withMessage('you must add a name'),

    body('email')
      .notEmpty()
      .withMessage('Email is required')
      .isEmail()
      .withMessage('Email must be valid'),

    body('role').notEmpty().withMessage('role is required'),
    // .isIn(['Instructor', 'Coordinator', 'Head of department', 'Dean', 'President', 'Admin', 'Student'])
    // .withMessage('role must be one of the following (Instructor , Coordinator , Head of department , Dean , President , Admin , Student)') ,
    body('URL'),
    body('academicPosition')
      .notEmpty()
      .withMessage('academicPosition is required')
      .isLength({ min: 4 })
      .withMessage('academicPosition must be at least 10 chars long'),
  ],
  validateRequest,
  currentUser,
  requireAuth,
  isAuthorizedUser('admin'),
  update_user
);

module.exports = route;
