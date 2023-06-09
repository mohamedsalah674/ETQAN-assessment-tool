const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = require('./app');
const user_created_consumer = require("./events/consumer/user_created_event")
const user_deleted_consumer = require("./events/consumer/user_deleted_event")
const user_updated_consumer = require("./events/consumer/user_updated_event")

mongoose.set('strictQuery', false);
dotenv.config();


const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error('JWT_KEY must be defined');
  }
  if (!process.env.MONGO_URL) {
    throw new Error('MONGO_URI must be defined');
  }

  try {
    await mongoose.connect(process.env.MONGO_URL, {});
    console.log('Connected to MongoDb');
  } catch (err) {
    console.error(err);
  }

  user_created_consumer()
  user_deleted_consumer()
  user_updated_consumer()

  app.listen(4001, () => {
    console.log('Listening on port 4001!!!!!!!!');
  });
};

start();
