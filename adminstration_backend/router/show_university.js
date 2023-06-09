const express = require('express');
const route = express.Router();
const { get_university } = require('../controller/show_university');
const validateRequest = require('salahorg/middlewares/validate-request');
const currentUser = require('salahorg/middlewares/current-user');
const requireAuth = require('salahorg/middlewares/require-auth');
const { isAuthorizedUser } = require('salahorg/middlewares/checkRole');

route.get(
  '/api/admin/university/:university_id',
  validateRequest,
  currentUser,
  requireAuth,
  isAuthorizedUser('admin'),
  get_university
);

module.exports = route;
