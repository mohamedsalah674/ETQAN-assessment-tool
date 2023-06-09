const express = require('express');
const route = express.Router();
const validateRequest = require('salahorg/middlewares/validate-request');
const currentUser = require('salahorg/middlewares/current-user');
const requireAuth = require('salahorg/middlewares/require-auth');
const { isAuthorizedUser } = require('salahorg/middlewares/checkRole');

const {
  delete_all_departments,
} = require('../controller/delete_all_departments');

route.delete(
  '/api/admin/department',
  validateRequest,
  currentUser,
  requireAuth,
  isAuthorizedUser('admin'),
  delete_all_departments
);

module.exports = route;
