import UpdateDepartmentForm from '../../../../components/admin/departments/update';
function updateDepartment({ department }) {
  console.log('department', department);
  return <UpdateDepartmentForm departmentUpdateData={department} />;
}

export default updateDepartment;
