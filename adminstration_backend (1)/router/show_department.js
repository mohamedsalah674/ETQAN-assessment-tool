const express = require('express');
const route = express.Router();
const { get_department } = require('../controller/show_department');
const validateRequest = require('salahorg/middlewares/validate-request');
const currentUser = require('salahorg/middlewares/current-user');
const requireAuth = require('salahorg/middlewares/require-auth');
const { isAuthorizedUser } = require('salahorg/middlewares/checkRole');

route.get(
  '/api/admin/department/:department_id',
  validateRequest,
  currentUser,
  requireAuth,
  isAuthorizedUser('admin'),
  get_department
);

module.exports = route;
