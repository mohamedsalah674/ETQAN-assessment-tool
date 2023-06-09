const mongoose = require('mongoose');

const usersSchema = mongoose.Schema({
  name: { type :String, required: true },
  email: { type : String, required: true },
  password: { type :String, required: true },
  role: { type : String, required: true },
  employee_id: { type :Number,required: true },
  academic_title: {type : String,required: true },

/*
    head: { type: head_of_departmentSchema, required: true },
    name: { String, required: true },
    */
});

  
Users = mongoose.model('users', usersSchema);
  
 module.exports = usersSchema ;
