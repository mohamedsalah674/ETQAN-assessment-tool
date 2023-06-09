const mongoose = require("mongoose")
const departmentSchema = require("../models/department")
const Departmentdb = mongoose.model('departmentdb' , departmentSchema);
const BadRequestError = require('salahorg/errors/bad-request-error');
 

    const delete_all_departments =  async (req, res)=>{
    
    // check if there are no departments to delete
    const exist_departments = await Departmentdb.findOne()
    if(!exist_departments)
    {throw new BadRequestError("There are no departments to delete")}

    // delete all courses
    await Departmentdb.deleteMany() 

    res.status(200).send("All departments have been deleted sucessfully")
       
 
    };
  

    module.exports = {delete_all_departments} 

     
    