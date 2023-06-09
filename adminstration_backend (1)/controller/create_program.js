const mongoose = require('mongoose');
const departmentSchema = require('../models/department');
const Departmentdb = mongoose.model('departmentdb', departmentSchema);
const programSchema = require('../models/program');
const programdb = mongoose.model('programdb', programSchema);
const BadRequestError = require('salahorg/errors/bad-request-error');
const NotFoundError = require('salahorg/errors/not-found-error');
 const produce_program_created = require("../events/producer/program-created-event")

const create_program = async (req, res) => {
  // handel req.param error
  const department_id = mongoose.Types.ObjectId(
    req.params.department_id.trim()
  );

  // Check is department is already exist
  const exist_department = await Departmentdb.findById(department_id);

  const {name , Program_Id} = req.body

  // if department not exist
  if (!exist_department) {
    throw new NotFoundError();
  }

  // if user did not enter department id
  if (!department_id) {
    throw new NotFoundError();
  }

  // handel error if department_id is not ObjectId
  if (!mongoose.Types.ObjectId.isValid(department_id)) {
    throw new BadRequestError('department id is not valid');
  }

  const Program_id = req.body.Program_Id;

  // if user does not enter program id as input
  if (!Program_id) {
    throw new BadRequestError('program id must be provided');
  }

  // Check if program is already exist in program database
  const existing_program_in_program_database = await programdb.findOne({
    Program_Id: Program_id,
  });

  if (existing_program_in_program_database) {
    {
      throw new BadRequestError(
        'This program is added before to add it use another program with another code '
      );
    }
  }

  // program added for the first time
  if (!existing_program_in_program_database) {
    // add program to program database and program database

    const create_Program = function (department_id, program) {
      return programdb.create(program).then((docProgram) => {
        console.log(program);
        console.log('\n>> Created Progarm:\n');

        // add reference to program from department
        //department ----> program_id

        return Departmentdb.findByIdAndUpdate(
          department_id,
          { $push: { programs: docProgram._id } },
          { new: true, useFindAndModify: false }
        );
      });
    };

    const program_event =await create_Program(department_id, req.body);
    const department = await Departmentdb.findById(department_id)
    const department_code = department.department_code

    const event = {
      name ,Program_Id , 
      department_code
    }
     produce_program_created(event)

    res
      .status(200)
      .send(
        'Program has been created in programs database and in database of this program'
      );
    return;
  }
};

module.exports = { create_program };
