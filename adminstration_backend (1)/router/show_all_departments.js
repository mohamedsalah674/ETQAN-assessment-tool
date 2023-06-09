const express = require('express');
const route = express.Router();
const { get_all_departments } = require('../controller/show_all_departments');
const validateRequest = require('salahorg/middlewares/validate-request');
const currentUser = require('salahorg/middlewares/current-user');
const requireAuth = require('salahorg/middlewares/require-auth');
const { isAuthorizedUser } = require('salahorg/middlewares/checkRole');

route.get(
  '/api/admin/department',
  validateRequest,
  currentUser,
  requireAuth,
  isAuthorizedUser('admin'),
  get_all_departments
);

module.exports = route;
