const mongoose = require("mongoose")
const programSchema = require("../models/program")
const Programdb= mongoose.model('programdb' , programSchema);
const BadRequestError = require('salahorg/errors/bad-request-error');



    const delete_all_programs =  async (req, res)=>{
    
    // check if there are no programs to delete
    const exist_programs = await Programdb.findOne()
    if(!exist_programs)
    {throw new BadRequestError("There are no programs to delete")}
    
    // delete all programs
    await Programdb.deleteMany() 

    res.status(200).send("All programs have been deleted sucessfully")
       

    };
  

    module.exports = {delete_all_programs} 

     
    