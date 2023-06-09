const mongoose = require("mongoose")
const all_users_Schema = require("../models/user")
const Allusersdb = mongoose.model('allusersdb' ,all_users_Schema);
const NotFoundError=require('salahorg/errors/not-found-error');
const BadRequestError = require('salahorg/errors/bad-request-error');

    
    const get_user = async (req, res)=>{
        
    const user_Id = req.params.user_id

    // if user id is missed
    if(!user_Id)
    {throw new BadRequestError("user id should be provided") }


    // handel req.param error
    const user_id = mongoose.Types.ObjectId(user_Id.trim());
    
    // handel error if course_id is not ObjectId
    if(!mongoose.Types.ObjectId.isValid(user_id))
    {throw new BadRequestError("User id is not valid")}
 
    // check is user does not exist
    const is_exist = await Allusersdb.findById(user_id ) 
    if (!is_exist)  {throw new BadRequestError("This user does not exist")}
    console.log(is_exist);
    
    
    // show the user     
     res.status(200).send(is_exist) 
                    
                
     
                
        
        }


    module.exports = { get_user }
    
       
   