const mongoose = require("mongoose")
const programSchema = require("../models/program")
const Programdb= mongoose.model('programdb' , programSchema);
const BadRequestError=require('../errors/bad-request-error');


 
    const get_all_programs =  async (req, res)=>{


    // Check if there are programs to display them
    const exist_programs = await Programdb.findOne({}, {"name" : 1})

    // when there are no programs
    if (!exist_programs)
    {throw new BadRequestError("There is no programs")}
    
    // Display courses
    const programs = await Programdb.find({}, {"name" : 1 , "Program_Id" : 1})
    res.send(programs)
           
            

    }
    

    module.exports = {get_all_programs}

     
