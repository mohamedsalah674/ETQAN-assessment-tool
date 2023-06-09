const mongoose = require("mongoose")
const departmentSchema = require("../models/department")
const Departmentdb = mongoose.model('departmentdb' , departmentSchema);
const BadRequestError = require('salahorg/errors/bad-request-error');
const NotFoundError=require('salahorg/errors/not-found-error');
const produce = require("../events/producer/department-deleted-event")

    const delete_department = async (req, res)=>{

    const department_id = req.params.department_id;

    //if user does not enter department id
    if(!department_id)
    {throw new BadRequestError("department id must be provided")}

    
    // handel error if department_id is not ObjectId
    if(!mongoose.Types.ObjectId.isValid(department_id))
    {throw new BadRequestError("department id is not valid")}

    
    //check if department is not exist
    const department_exist = await Departmentdb.findByIdAndDelete(department_id) 
    if(!department_exist)
    {throw new NotFoundError()}     

    produce(department_exist)
    res.status(200).send("department was deleted successfully!")      
             

        };

    module.exports = { delete_department }

   
