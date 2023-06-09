import SideNavbar from "../../../../../components/SideNavbar";
import NewStudentForm from "../../../../../components/Coordinator/newStudentForm"
import { useRouter } from "next/router";
export default function addStudent() {
  const router = useRouter();
  const { programId, coordinatorId, role } = router.query;

  const links = [
    {
      text: "Back to students page",
      href: `/coordinator/${coordinatorId}/programs/${programId}/students`,
      icon: "/icons/back.svg",
      alt: "programs",
    },
    // Add more links as needed
  ];
  return (
    <>
      <div className="bg-gray-900 flex flex-col items-center w-full lg:pl-20 md:pl-20 xl:pl-20 sm:pl-20">
        <SideNavbar links={links} />
        <NewStudentForm />
      </div>
    </>
  );
}
