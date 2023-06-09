import UpdateCourseForm from '../../../../components/admin/courses/update';
function updateCourse({ course }) {
  console.log('course', course);
  return <UpdateCourseForm courseUpdateData={course} />;
}

export default updateCourse;
