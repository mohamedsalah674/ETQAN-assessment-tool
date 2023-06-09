const mongoose = require('mongoose')
 const facultydb = require('./faculty')
const univeristySchema = mongoose.Schema({

    name: {type: String },
    university_code :  {type: String },
    faculties : [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "facultydb"  
    }] ,
   
   
   
});

   



module.exports = univeristySchema;
 