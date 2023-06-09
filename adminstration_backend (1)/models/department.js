const mongoose = require('mongoose');

const departmentSchema = mongoose.Schema({
    name: { type : String, required: true } ,
    
    department_code : {type : Number, required: true},


    programs: [ {
      //FK to faulty
      type: mongoose.Schema.Types.ObjectId,
      ref: "programdb",
       
    }],
 
});

const 
Departmentdb = mongoose.model('departmentdb', departmentSchema);
  
 module.exports = departmentSchema ;
