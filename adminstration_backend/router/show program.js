const express = require('express');
const route = express.Router();
const { get_program } = require('../controller/show_program');
const validateRequest = require('salahorg/middlewares/validate-request');
const currentUser = require('salahorg/middlewares/current-user');
const requireAuth = require('salahorg/middlewares/require-auth');
const { isAuthorizedUser } = require('salahorg/middlewares/checkRole');

route.get(
  '/api/admin/program/:program_id',
  validateRequest,
  currentUser,
  requireAuth,
  isAuthorizedUser('admin'),
  get_program
);

module.exports = route;
