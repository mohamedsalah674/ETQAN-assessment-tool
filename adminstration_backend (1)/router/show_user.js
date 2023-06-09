const express = require('express');
const route = express.Router();
const { get_user } = require('../controller/show_user');
const validateRequest = require('salahorg/middlewares/validate-request');
const currentUser = require('salahorg/middlewares/current-user');
const requireAuth = require('salahorg/middlewares/require-auth');
const { isAuthorizedUser } = require('salahorg/middlewares/checkRole');

route.get(
  '/api/admin/users/:user_id',
  validateRequest,
  currentUser,
  requireAuth,
  isAuthorizedUser('admin'),
  get_user
);

module.exports = route;
