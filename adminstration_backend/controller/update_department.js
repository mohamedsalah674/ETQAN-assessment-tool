const mongoose = require('mongoose');
const departmentSchema = require('../models/department');
const Departmentdb = mongoose.model('departmentdb', departmentSchema);
const BadRequestError = require('salahorg/errors/bad-request-error');
const NotFoundError = require('salahorg/errors/not-found-error');
 const produce = require("../events/producer/department-updated-event")
const update_department = async (req, res) => {
  const department_Id = req.params.department_id;
  const { department_code } = req.body;

  // handle error from req.param
  const department_id = department_Id.trim();

  // if user does not enter department id
  if (!department_id) {
    throw new BadRequestError('Department code must be provided');
  }

  // handle error if department_id is not a valid ObjectId
  if (!mongoose.Types.ObjectId.isValid(department_id)) {
    throw new BadRequestError('Department id is not valid');
  }

  // Check if the department exists to update it
  const exist_department = await Departmentdb.findOne({ _id: department_id });

  // if the department does not exist
  if (!exist_department) {
    throw new NotFoundError('Department does not exist');
  }

  // Check if there is a department with the same department code
  const duplicate_department = await Departmentdb.findOne({
    department_code: department_code,
    _id: { $ne: department_id },
  });

  // if there is a department with the same code
  if (duplicate_department) {
    throw new BadRequestError('There is a department with the same department code');
  }

  // Update department data
  Departmentdb.findByIdAndUpdate(department_id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        throw new NotFoundError('Department not found');
      } else {
        produce(data)
        res.status(200).send('Department updated');
      }
    })
    .catch((err) => {
      console.log(err);
      throw new BadRequestError('Failed to update department');
    });
};

module.exports = { update_department };
