import NewDepartmentForm from '../../../../components/admin/departments/addDepartment';

function addDepartment({ faculty }) {
  console.log('university', faculty);
  return <NewDepartmentForm facultyUpdateData={faculty} />;
}

export default addDepartment;
