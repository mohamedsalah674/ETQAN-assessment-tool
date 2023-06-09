const mongoose = require('mongoose');
const departmentSchema = require('../models/department');
const Departmentdb = mongoose.model('departmentdb', departmentSchema);
const BadRequestError = require('salahorg/errors/bad-request-error');

const get_department = async (req, res) => {
  const department_Id = req.params.department_id;

  // if department id is missed
  if (!department_Id) {
    throw new BadRequestError('department id must be provided');
  }

  // handel req.param error
  const department_id = mongoose.Types.ObjectId(department_Id.trim());

  // handel error if department_id is not ObjectId
  if (!mongoose.Types.ObjectId.isValid(department_id)) {
    throw new BadRequestError('department id is not valid');
  }

  // if department does not exist
  const Department = await Departmentdb.findById(department_id);
  if (!Department) {
    throw new BadRequestError('The department does not exist');
  }

  // show the department
  const department = Departmentdb.findById(department_id)
    .populate({
      path: 'programs', // attribute name of Model
      select: 'name ,  Program_Id', // get only user name & profilePicture
    })

    .then((department) => {
      res.send(department);
    })
    .catch((err) => {
      res.status(500).send('Error database connection');
    });
};

module.exports = { get_department };
