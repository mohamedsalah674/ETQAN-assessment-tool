const express = require('express');
const route = express.Router();
const { show_course } = require('../controller/show_course');
const validateRequest = require('salahorg/middlewares/validate-request');
const currentUser = require('salahorg/middlewares/current-user');
const requireAuth = require('salahorg/middlewares/require-auth');
const { isAuthorizedUser } = require('salahorg/middlewares/checkRole');

route.get(
  '/api/admin/course/:course_id',
  validateRequest,
  currentUser,
  requireAuth,
  isAuthorizedUser('admin'),
  show_course
);

module.exports = route;
