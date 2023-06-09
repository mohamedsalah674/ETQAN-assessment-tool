const express = require('express');
const route = express.Router();
const { delete_University } = require('../controller/delete_university');
const validateRequest = require('salahorg/middlewares/validate-request');
const currentUser = require('salahorg/middlewares/current-user');
const requireAuth = require('salahorg/middlewares/require-auth');
const { isAuthorizedUser } = require('salahorg/middlewares/checkRole');

route.delete(
  '/api/admin/university/:university_id',
  validateRequest,
  currentUser,
  requireAuth,
  isAuthorizedUser('admin'),
  delete_University
);

module.exports = route;
