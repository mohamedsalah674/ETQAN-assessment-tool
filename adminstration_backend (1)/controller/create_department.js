const mongoose = require("mongoose")
const departmentSchema = require("../models/department")
const Departmentdb = mongoose.model('departmentdb' , departmentSchema);
const facultySchema = require("../models/faculty")
const Facultydb = mongoose.model('facultydb' , facultySchema);
const BadRequestError = require('salahorg/errors/bad-request-error');
const NotFoundError=require('salahorg/errors/not-found-error');
const produce = require("../events/producer/department-created-event")
 
  const  create_department = async (req,res)=>{
  
  // handel req.param error
  const faculty_Id = mongoose.Types.ObjectId(req.params.faculty_id.trim());

  // Check is faculty is already exist
  const exist_faculty = await Facultydb.findById( faculty_Id );
  
  // if faculty not exist
  if(!exist_faculty)
  {throw new NotFoundError() }

  // if user did not enter faculty  id
   if(!exist_faculty)
  {throw new NotFoundError()};

  // handel error if faculty_Id is not ObjectId
  if (!mongoose.Types.ObjectId.isValid(faculty_Id))
  {throw new BadRequestError('Faculty id is not valid')};

  // if user does not enter department id as input
  const Department_id  = req.body.department_code;

  // if user does not enter department id as input
  if(!Department_id)
  {throw new BadRequestError("Department id must be provided")}
  

  // Check if department is already exist in department database
  const existing_department_in_department_database = await Departmentdb.findOne({department_code : Department_id})

  
  if(existing_department_in_department_database)
  {{throw new BadRequestError("This department is added before to add it use another department with another code ")}}
    
              
   
  // department added for the first time
  if (!existing_department_in_department_database) 

  { 

  // add department to department database and faculty database

  const create_Departmen=  function (faculty_Id, department) {
  return  Departmentdb.create(department).then(docDepartment => {
    console.log(docDepartment);
  console.log("\n>> Created department:\n");
  
  // add reference to department from faculty
  //facuclty ----> department_id
  
  return Facultydb.findByIdAndUpdate(
    faculty_Id,
  { $push: { departments: docDepartment._id } },
  { new: true, useFindAndModify: false }) });;
  };                            
  const event = {
    name: req.body.name ,
    department_code : req.body.department_code ,
  }   
   produce(event)

    
  create_Departmen(faculty_Id  , req.body)   
  res.status(200).send("Department has been created in departments database and in database of this department")  
  return ;

  }



  }
 
  


  module.exports = {create_department}
  