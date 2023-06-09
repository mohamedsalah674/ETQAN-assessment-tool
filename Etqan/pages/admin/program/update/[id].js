import UpdateProgramForm from '../../../../components/admin/programs/update';
function updateProgram({ program }) {
  console.log('program', program);
  return <UpdateProgramForm programUpdateData={program} />;
}

export default updateProgram;
