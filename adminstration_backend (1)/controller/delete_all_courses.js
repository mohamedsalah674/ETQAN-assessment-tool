const mongoose = require("mongoose")
const shcemaCourses = require("../models/course")
const Coursedb= mongoose.model('coursedb' , shcemaCourses);
const BadRequestError = require('salahorg/errors/bad-request-error');



    const delete_all_courses =  async (req, res)=>{
    
    // check if there are no courses to delete
    const exist_courses = await Coursedb.findOne()
    if(!exist_courses)
    {throw new BadRequestError("There are no courses to delete")}

    // delete all courses
    await Coursedb.deleteMany() 

    res.status(200).send("All courses have been deleted sucessfully")
       
 
    };
  

    module.exports = {delete_all_courses} 

     
    