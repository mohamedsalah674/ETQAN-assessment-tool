const mongoose = require('mongoose');
const shcemaCourses = require('../models/course');
const Coursedb = mongoose.model('coursedb', shcemaCourses);
const depertmentschema = require('../models/department');
const Departmentdb = mongoose.model('departmentdb', depertmentschema);
const BadRequestError = require('salahorg/errors/bad-request-error');
const NotFoundError = require('salahorg/errors/not-found-error');
const all_users_Schema = require('../models/user');
const Allusersdb = mongoose.model('allusersdb', all_users_Schema);

 const produce = require('../events/producer/add-headofdepartmrnt-to-department');
// const producer = require('../events/producer/course-created-event');

const add_head = async (req, res) => {
  // get id of department where course will be created
  const department_id = req.params.department_id;

  const {email} = req.body
  

    if (!email){
        throw new BadRequestError("User email must be provided")
    }

  // if url does not contains :/department_id
  if (!department_id) {
    throw new BadRequestError("Department id must be provided");
  }

  
  const user_exist = await Allusersdb.findOne({email : email}) 

  console.log(user_exist.role);

  if (!user_exist || user_exist.role != 'head_of_department'){
    throw new BadRequestError("This user is does not exist and its role is Head")
  }


  //check if department is exist
  const exist_department = await Departmentdb.findById(department_id);

 
  // if department not exist ,return error

  if (!exist_department) {
    throw new BadRequestError("This is department is not exist");
  }

  // get department code to send it in event to course service
  const department__code= exist_department.department_code;

  console.log(department__code);


  // handel error if department_id is not ObjectId
  if (!mongoose.Types.ObjectId.isValid(department_id)) {
    throw new BadRequestError('Department id is not valid');
  }

    // create event schema to send it to course service
    const event = {
      department_code: exist_department.Department_code ,
      department_name : exist_department.name,

     user : user_exist ,
      
      Department_code : department__code
    }

    console.log(event);

    //    Actucally send event
     produce(event)
    console.log("producer is disconnected now");

    res.status(200).send("Head has been added sucessfully")


};

module.exports = { add_head };
