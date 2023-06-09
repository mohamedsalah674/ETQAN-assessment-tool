const express = require('express');
const route = express.Router();
const { get_all_programs } = require('../controller/show_all_programs');
const validateRequest = require('salahorg/middlewares/validate-request');
const currentUser = require('salahorg/middlewares/current-user');
const requireAuth = require('salahorg/middlewares/require-auth');
const { isAuthorizedUser } = require('salahorg/middlewares/checkRole');

route.get(
  '/api/admin/program',
  validateRequest,
  currentUser,
  requireAuth,
  isAuthorizedUser('admin'),
  get_all_programs
);

module.exports = route;
