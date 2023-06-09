const express = require('express');
const route = express.Router();
const { body } = require('express-validator');
const validateRequest = require('salahorg/middlewares/validate-request');
const { create_user } = require('../controller/create_user');
const currentUser = require('salahorg/middlewares/current-user');
const requireAuth = require('salahorg/middlewares/require-auth');
const { isAuthorizedUser } = require('salahorg/middlewares/checkRole');

route.post(
  '/api/admin/users',
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

    body('password')
      .notEmpty()
      .withMessage('Password is required')
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage('Password must be between 4 and 20 characters'),

    body('role').notEmpty().withMessage('role is required'),

    body('URL').notEmpty().withMessage('URL is required'),
    body('academicPosition')
      .notEmpty()
      .withMessage('academicPosition title is required'),
  ],
  validateRequest,
    currentUser,
  requireAuth,
  isAuthorizedUser('admin'),
  create_user
);

module.exports = route;
