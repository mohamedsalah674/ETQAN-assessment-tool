const mongoose = require("mongoose")
const shcemaCourses = require("../models/course")
const Coursedb= mongoose.model('coursedb' , shcemaCourses);
const BadRequestError = require('salahorg/errors/bad-request-error');


    const show_course =  async (req, res)=>{
       

    const courseId = req.params.course_id;
    
    
    // handel req.param error
    const course_id = mongoose.Types.ObjectId(courseId.trim());
    // if course_id is missed
    if(!course_id)
    {throw new BadRequestError("Course id must be provided")}   


    
    // handel error if course_id is not ObjectId
    if(!mongoose.Types.ObjectId.isValid(course_id))
    {throw new BadRequestError("User id is not valid")}
 
    // Display course by id   
    const course = await Coursedb.findById(course_id ) 
    if (!course)
    {throw new BadRequestError("There is Course does not exist")}

                
    res.status(200).send(course)
     
    }
    module.exports = {show_course}


   