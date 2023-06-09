import SideNavbar from "../../../components/SideNavbar";
import NewInstructorForm from "../../../components/coordinator/newInstructorForm";
export default function addInstructor({ params }) {
  return (
    <>
      <div className="bg-gray-900 px-2 py-2 flex flex-col items-center w-full lg:pl-20 md:pl-20 xl:pl-20 sm:pl-20">
        <SideNavbar />
        <NewInstructorForm params={params} />
      </div>
    </>
  );
}

export async function getServerSideProps({ params }) {
  return {
    props: {
      params,
    },
  };
}
