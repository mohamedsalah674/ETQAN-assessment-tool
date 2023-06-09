import NewuserForm from '../../../components/admin/users/adduser';
export default function addUser() {
  return (
    <>
      <div className="bg-gray-900 flex flex-col items-center w-full lg:pl-20 md:pl-20 xl:pl-20 sm:pl-20">
        <NewuserForm />
      </div>
    </>
  );
}
