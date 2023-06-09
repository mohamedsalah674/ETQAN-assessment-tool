const express = require('express');
const route = express.Router();
const { update_faculty } = require('../controller/update_faculty');
const validateRequest = require('salahorg/middlewares/validate-request');
const currentUser = require('salahorg/middlewares/current-user');
const requireAuth = require('salahorg/middlewares/require-auth');
const { isAuthorizedUser } = require('salahorg/middlewares/checkRole');

route.put(
  '/api/admin/faculty/:faculty_id',
  validateRequest,
  currentUser,
  requireAuth,
  isAuthorizedUser('admin'),
  update_faculty
);

module.exports = route;
