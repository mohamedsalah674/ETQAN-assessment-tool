import UpdateFacultyForm from '../../../../components/admin/faculties/update';

function updateFaculty({ faculty }) {
  console.log('university', faculty);
  return <UpdateFacultyForm facultyUpdateData={faculty} />;
}

export default updateFaculty;
