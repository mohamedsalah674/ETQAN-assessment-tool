const express = require('express');
const route = express.Router();

const { delete_faculty } = require('../controller/delete_faculty');
const validateRequest = require('salahorg/middlewares/validate-request');
const currentUser = require('salahorg/middlewares/current-user');
const requireAuth = require('salahorg/middlewares/require-auth');
const { isAuthorizedUser } = require('salahorg/middlewares/checkRole');

route.delete(
  '/api/admin/faculty/:faculty_id',
  validateRequest,
  currentUser,
  requireAuth,
  isAuthorizedUser('admin'),
  delete_faculty
);

module.exports = route;
