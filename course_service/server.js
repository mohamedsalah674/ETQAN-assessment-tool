import mongoose from "mongoose";
import app from "./app.js";
const port = process.env.PORT || 8000;
// var cors = require('cors');
import cors from "cors";

import { course_created_consumer } from "./events/consumer/course-created-event.js";
import { course_deleted_consumer } from "./events/consumer/course-deleted-event.js";
import { course_updated_consumer } from "./events/consumer/course-updated-event.js";
import {user_created_consumer}     from "./events/consumer/user-created-event.js"
import { user_deleted_consumer } from "./events/consumer/user-deleted-event.js";
import { user_updated_consumer } from "./events/consumer/user-updated-event.js";
import {user_created_consumer_src_auth} from "./events/consumer/user-created-event-auth.js"
import { department_created_consumer } from "./events/consumer/department-created-event.js";
import { department_deleted_consumer } from "./events/consumer/department-deleted-event.js";
import { department_updated_consumer } from "./events/consumer/department-updated-event.js";


course_created_consumer()
course_deleted_consumer()
course_updated_consumer()
user_created_consumer()
user_deleted_consumer()
user_updated_consumer()
user_created_consumer_src_auth()
department_created_consumer()
department_deleted_consumer()
department_updated_consumer()

app.use(cors());
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
