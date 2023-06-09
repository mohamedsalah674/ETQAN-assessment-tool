import mongoose from "mongoose";
import app from "./app.js";
const port = process.env.PORT || 8080;
// var cors = require('cors');

import {program_created_consumer} from "./events/consumer/program-created-event.js"

import {program_updated_consumer} from "./events/consumer/program-updated-event.js"

import {program_deleted_consumer} from "./events/consumer/program-deleted-event.js"

import { coordinator_added_consumer } from "./events/consumer/add-corrdinator-to-program-event.js";

import { Head_added_consumer } from "./events/consumer/add-head-to-department.js";

program_created_consumer()
program_deleted_consumer()
program_updated_consumer()
coordinator_added_consumer()
Head_added_consumer()

import cors from "cors";
app.use(cors());
app.listen(port, () => {
  console.log(`Program App running on port ${port}...`);
});
