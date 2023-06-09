const mongoose = require("mongoose")
const facultySchema = require("../models/faculty")
const Facultydb = mongoose.model('facultydb' , facultySchema);
const BadRequestError = require('salahorg/errors/bad-request-error');
 

    const delete_all_faculties =  async (req, res)=>{
    
    // check if there are no  to delete
    const exist_faculties = await Facultydb.findOne()
    if(!exist_faculties)
    {throw new BadRequestError("There are no faculties to delete")}

    // delete all courses
    await Facultydb.deleteMany() 

    res.status(200).send("All faculties have been deleted sucessfully")
       
 
    };
  

    module.exports = {delete_all_faculties} 

     
    