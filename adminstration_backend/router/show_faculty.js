const express = require('express');
const route = express.Router();
const { get_faculty } = require('../controller/show_faculty');
const validateRequest = require('salahorg/middlewares/validate-request');
const currentUser = require('salahorg/middlewares/current-user');
const requireAuth = require('salahorg/middlewares/require-auth');
const { isAuthorizedUser } = require('salahorg/middlewares/checkRole');

route.get(
  '/api/admin/faculty/:faculty_id',
  validateRequest,
  currentUser,
  requireAuth,
  isAuthorizedUser('admin'),
  get_faculty
);

module.exports = route;
