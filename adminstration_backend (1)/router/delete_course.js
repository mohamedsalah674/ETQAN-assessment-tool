const express = require('express');
const route = express.Router();
const { delete_course } = require('../controller/delete_course');
const validateRequest = require('salahorg/middlewares/validate-request');
const currentUser = require('salahorg/middlewares/current-user');
const requireAuth = require('salahorg/middlewares/require-auth');
const { isAuthorizedUser } = require('salahorg/middlewares/checkRole');

route.delete(
  '/api/admin/course/:course_id',
  validateRequest,
  currentUser,
  requireAuth,
  isAuthorizedUser('admin'),
  delete_course
);

module.exports = route;
