import NewFacultyForm from '../../../../components/admin/faculties/addFaculty';
function addFaculty({ university }) {
  console.log('university', university);
  return (
    <div className="bg-gray-900 flex flex-col items-center w-full lg:pl-20 md:pl-20 xl:pl-20 sm:pl-20">
      {' '}
      <NewFacultyForm universityUpdateData={university} />;
    </div>
  );
}

export default addFaculty;
