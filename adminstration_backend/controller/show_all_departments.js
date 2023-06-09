const mongoose = require('mongoose');
const departmentSchema = require('../models/department');
const Departmentdb = mongoose.model('departmentdb', departmentSchema);
const BadRequestError = require('salahorg/errors/bad-request-error');

const get_all_departments = async (req, res) => {
  // Check if there are departments to display them
  const exist_departments = await Departmentdb.findOne({}, { name: 1 });

  // when there are no departments
  if (!exist_departments) {
    throw new BadRequestError('There is no departments');
  }

  const department = await Departmentdb.find(
    {},
    { name: 1, department_code: 1 }
  );

  console.log(department);
  res.send(department);
};

module.exports = { get_all_departments };
