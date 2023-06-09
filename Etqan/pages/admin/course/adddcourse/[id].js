import NewCourseForm from '../../../../components/admin/courses/addcourse';
function addCourse({ course }) {
  console.log('course', course);
  return <NewCourseForm courseUpdateData={course} />;
}

export default addCourse;
