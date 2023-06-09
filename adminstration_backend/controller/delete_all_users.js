
const mongoose = require("mongoose")
const all_users_Schema = require("../models/user")
const Allusersdb = mongoose.model('allusersdb' ,all_users_Schema);




    const delete_all_users = async (req, res)=>{
 
    // check if there are no users to delete
    const exist_users = await Allusersdb.findOne()


    // delete all users
    if(!exist_users)
    {throw new BadRequestError("There are no users to delete")}
    
    await Allusersdb.deleteMany() 

    res.status(200).send("All users have been deleted sucessfully")
       
 
    };
  
  
    module.exports = {delete_all_users}
