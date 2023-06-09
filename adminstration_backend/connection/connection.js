const mongoose = require('mongoose');
const course_created_consumer = require("../events/consumer/course-created-event")
const course_updated_consumer = require("../events/consumer/course-updated-event")
const course_deleted_consumer = require("../events/consumer/course-deleted-event")
const user_created_consumer = require("../events/consumer/user-created-event")
const user_updated_consumer = require("../events/consumer/user-updated-event")
const program_created_consumer = require ("../events/consumer/program-created-event")
const program_deleted_consumer = require("../events/consumer/program-deleted-event")
const program_updated_consumer = require("../events/consumer/program-updated-event")
const dotenv = require('dotenv');
dotenv.config();

const connectDB = async () => {
  try {
    // mongodb connection string
    mongoose.set('useCreateIndex', true);
    const con = await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`MongoDB connected : ${con.connection.host}`);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }

  course_created_consumer()
  course_updated_consumer()
  course_deleted_consumer()
  user_created_consumer()
  user_updated_consumer()
  program_created_consumer()
  program_updated_consumer()
  program_deleted_consumer()
};

module.exports = connectDB;
