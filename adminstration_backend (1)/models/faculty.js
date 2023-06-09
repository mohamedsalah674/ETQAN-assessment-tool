const mongoose = require('mongoose');
const departmentdb = require('./department');

const facultySchema = mongoose.Schema({
  name: { type: String, required: true },

  faculty_code: { type: Number, required: true },

  departments: [
    {
      //FK to faulty
      type: mongoose.Schema.Types.ObjectId,
      ref: 'departmentdb',
      // required: true
    },
  ],
});

module.exports = facultySchema;
