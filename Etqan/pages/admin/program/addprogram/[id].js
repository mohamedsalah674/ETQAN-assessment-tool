import NewProgramForm from '../../../../components/admin/programs/addprogram';

function addProgram({ department }) {
  console.log('department', department);
  return <NewProgramForm departmentUpdateData={department} />;
}

export default addProgram;
