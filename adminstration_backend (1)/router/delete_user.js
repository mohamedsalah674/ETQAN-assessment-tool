const express = require('express');
const route = express.Router();
const { delete_user } = require('../controller/delete_user');
const validateRequest = require('salahorg/middlewares/validate-request');
const currentUser = require('salahorg/middlewares/current-user');
const requireAuth = require('salahorg/middlewares/require-auth');
const { isAuthorizedUser } = require('salahorg/middlewares/checkRole');

route.delete(
  '/api/admin/users/:user_id',
  validateRequest,
  currentUser,
  requireAuth,
  isAuthorizedUser('admin'),
  delete_user
);

module.exports = route;
