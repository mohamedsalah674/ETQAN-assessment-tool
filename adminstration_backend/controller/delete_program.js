const mongoose = require("mongoose")
const programSchema = require("../models/program")
const Programdb= mongoose.model('programdb' , programSchema);
const BadRequestError = require('salahorg/errors/bad-request-error');
const NotFoundError=require('salahorg/errors/not-found-error');
 const produce_program_deleted = require("../events/producer/program-deleted-event")
    const delete_program = async (req, res)=>{

    const program_Id = req.params.program_id;
    
    // handel eq.param error
    const program_id = mongoose.Types.ObjectId(program_Id.trim());
  

    //if user does not enter program id
    if(!program_id)
    {throw new BadRequestError("Program id must be provided")}

    
    // handel error if program_id is not ObjectId
    if(!mongoose.Types.ObjectId.isValid(program_id))
    {throw new BadRequestError("Program id is not valid")}


    //check if program is not exist
    const program_exist = await Programdb.findByIdAndDelete(program_id) 
    if(!program_exist)
    {throw new NotFoundError()}     
     produce_program_deleted(program_exist)
            
    res.status(200).send("Program was deleted successfully!")      
             
 
        };

    module.exports = { delete_program }

   
