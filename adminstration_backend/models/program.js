const mongoose = require('mongoose');

const programSchema = mongoose.Schema({
  name: { type: String, required: true },
  Program_Id: { type: Number, required: true },
  courses: [
    {
      //FK to courses
      type: mongoose.Schema.Types.ObjectId,
      ref: 'coursedb',
    },
  ],

  /*
    abet_criteria: { type: [abet_criSchema], required: true },
    SOs: {
      //FK to SOs
      type: [mongoose.Schema.Types.ObjectId],
      ref: "SOs",
      required: true,
    },
    coordinator: { type: [coordinatorSchema], required: true },
*/
});

Programdb = mongoose.model('programdb', programSchema);

module.exports = programSchema;
