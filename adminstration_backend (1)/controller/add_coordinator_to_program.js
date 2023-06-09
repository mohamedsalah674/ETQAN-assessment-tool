const mongoose = require('mongoose');
const shcemaCourses = require('../models/course');
const Coursedb = mongoose.model('coursedb', shcemaCourses);
const programSchema = require('../models/program');
const programdb = mongoose.model('programdb', programSchema);
const BadRequestError = require('salahorg/errors/bad-request-error');
const NotFoundError = require('salahorg/errors/not-found-error');
const all_users_Schema = require('../models/user');
const Allusersdb = mongoose.model('allusersdb', all_users_Schema);

 const produce = require('../events/producer/add-coordinator-to-program');
// const producer = require('../events/producer/course-created-event');

const add_coordinator = async (req, res) => {
  // get id of program where course will be created
  const program_id = req.params.program_id;

  const {email} = req.body
  

    if (!email){
        throw new BadRequestError("User email must be provided")
    }

  // if url does not contains :/program_id
  if (!program_id) {
    throw new BadRequestError("Program id must be provided");
  }

  
  const user_exist = await Allusersdb.findOne({email : email}) 

  console.log(user_exist.role);

  if (!user_exist || user_exist.role != 'coordinator'){
    throw new BadRequestError("This user is does not exist and its role is Coordinator")
  }


  //check if program is exist
  const exist_program = await programdb.findById(program_id);

 
  // if program not exist ,return error

  if (!exist_program) {
    throw new BadRequestError("This is program is not exist");
  }

  // get program code to send it in event to course service
  const program__id = exist_program.Program_Id;

  console.log(program__id);


  // handel error if program_id is not ObjectId
  if (!mongoose.Types.ObjectId.isValid(program_id)) {
    throw new BadRequestError('Program id is not valid');
  }

    // create event schema to send it to course service
    const event = {
      program_code: exist_program.Program_Id ,
      program_name : exist_program.name,

     user : user_exist ,
      
      Program_Id : program__id
    }

    console.log(event);

    //    Actucally send event
     produce(event)
    console.log("producer is disconnected now");

    res.status(200).send("Coordinator has been added sucessfully")


};

module.exports = { add_coordinator };
