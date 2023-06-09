// Test Shcema
const mongoose = require('mongoose');

var shcemaCourses= new mongoose.Schema({

        name: {
          type: String,
          required: true,
        },
        course_code: {
          type: "String",
          required: true,
        } 
    })
      
      

 
module.exports = shcemaCourses;


