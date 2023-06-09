const express = require('express');
const route = express.Router();
const { update_course } = require('../controller/update_course');
const validateRequest = require('salahorg/middlewares/validate-request');
const currentUser = require('salahorg/middlewares/current-user');
const requireAuth = require('salahorg/middlewares/require-auth');
const { isAuthorizedUser } = require('salahorg/middlewares/checkRole');

route.put(
  '/api/admin/course/:course_id',
  validateRequest,
  currentUser,
  requireAuth,
  isAuthorizedUser('admin'),
  update_course
);

module.exports = route;
