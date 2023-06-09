import UpdateUniversityForm from '../../../../components/admin/universities/update';

function updateUniversity({ university }) {
  console.log('university', university);
  return <UpdateUniversityForm universityUpdateData={university} />;
}

export default updateUniversity;
