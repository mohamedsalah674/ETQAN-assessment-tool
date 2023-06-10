const express = require('express');
require('express-async-errors');
const dotenv = require('dotenv');
const connectDB = require('./connection/connection');
const cookieSession = require('cookie-session');

const PORT = 4000;
const cookieParser = require('cookie-parser');
const NotFoundError = require('salahorg/errors/not-found-error');
const errorHandler = require('salahorg/middlewares/error-handler');
const cors = require('cors');
const app = express();




app.use (cookieSession({
  signed: false,
  secure: false,
})
)


// const course_created_consumer = require("./events/consumer/course-created-event")
// const course_updated_consumer = require("./events/consumer/course-updated-event")
// const course_deleted_consumer = require("./events/consumer/course-deleted-event")

// const user_created_consumer = require ("./events/consumer/user-created-event")
// const user_updated_consumer = require("./events/consumer/user-updated-event")

dotenv.config({ path: 'config.env' });

// course_created_consumer()
// course_updated_consumer()
// course_deleted_consumer()

// user_created_consumer()
// user_updated_consumer()

connectDB();

app.use(express.json());
app.options('*', cors());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});
app.use(express.urlencoded({ extended: true }));
app.set('trust proxy', true);
app.use(cookieParser());

app.use(
  cookieSession({
    name: 'sessionIdCookie',
    secret: 'thisshouldbeasecret',
    resave: false,
    saveUninitialized: true,
    cookie: {
      httpOnly: true,
      secure: true, // cookie is only accessible over HTTP, requires HTTPS
    },
  })
);

const add_head = require("./router/add_head_to_department")
const add_coordinator = require("./router/add_coordinator_to_program")
const create_user = require('./router/create_user');
const delete_all_users = require('./router/delete_all_users');
const delete_user = require('./router/delete_user');
const show_all_users = require('./router/show_all_users');
const show_user = require('./router/show_user');
const update_user = require('./router/update_user');

const show_course = require('./router/show_course');
const delete_course = require('./router/delete_course');
const update_course = require('./router/update_course');
const create_course = require('./router/create_course');
const show_all_courses = require('./router/show_all_courses');
const delete_all_courses = require('./router/delete_all_courses');

const create_Program = require('./router/create_program');
const delete_Program = require('./router/show program');
const update_Program = require('./router/delete_program');
const show_Program = require('./router/update_program');
const show_all_Program = require('./router/show_all_programs');
const delete_all_Program = require('./router/delete_all_programs');

const delete_department = require('./router/delete_department');
const show_department = require('./router/show_department');
const show_all_department = require('./router/show_all_departments');
const update_department = require('./router/update_department');
const create_department = require('./router/create_department');
const delete_all_departments = require('./router/delete_all_departments');

const delete_faculty = require('./router/delete_faculty');
const show_faculty = require('./router/show_faculty');
const show_all_faculties = require('./router/show_all_fauclties');
const update_faculty = require('./router/update_faculty');
const create_faculty = require('./router/create-faculty');
const delete_all_faculties = require('./router/delete_all_faculties');

const delete_university = require('./router/delete_university');
const show_university = require('./router/show_university');
const show_all_universities = require('./router/show_all_universities');
const update_university = require('./router/update_university');
const create_university = require('./router/create_university');
const delete_all_universities = require('./router/delete_all_universities');

app.use(add_head)
app.use(add_coordinator)

app.use(delete_university);
app.use(show_university);
app.use(show_all_universities);
app.use(update_university);
app.use(create_university);
app.use(delete_all_universities);

app.use(delete_faculty);
app.use(show_faculty);
app.use(show_all_faculties);
app.use(update_faculty);
app.use(create_faculty);
app.use(delete_all_faculties);

app.use(delete_department);
app.use(show_department);
app.use(show_all_department);
app.use(update_department);
app.use(create_department);
app.use(delete_all_departments);

app.use(create_Program);
app.use(delete_Program);
app.use(update_Program);
app.use(show_Program);
app.use(show_all_Program);
app.use(delete_all_Program);

app.use(show_all_courses);
app.use(show_course);
app.use(delete_course);
app.use(update_course);
app.use(create_course);
app.use(delete_all_courses);


app.use(create_user);
app.use(delete_all_users);
app.use(delete_user);
app.use(show_all_users);
app.use(show_user);
app.use(update_user);

app.all('*', async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
