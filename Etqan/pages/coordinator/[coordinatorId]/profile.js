import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import SideNavbar from "../../../components/SideNavbar";
import ViewProfile from "../../../components/instructor/InstructorProfile";
import buildClient from "../../../hooks/build";


const ProfilePage = ({ coordinator, programData }) => {
  const router = useRouter();
  const { coordinatorId } = router.query;
  const links = [
    {
      text: `Back to your program`,
      href: `/coordinator/${coordinatorId}/dashboard/`,
      icon: "/icons/back.svg",
      alt: "programs",
    },
  ];

  return (
    <>
      <div className="flex flex-col items-center bg-[url('/backgrounds/editprofile.svg')]">
        <SideNavbar links={links} />

        <h2 className="pt-3 text-center font-bold text-4xl  italic text-white pb-8">
          Profile
        </h2>
        <div className="w-[50%] bg-gray-200 border-4 border-blue-300 rounded mb-20">
          <ViewProfile
            user={coordinator}
            role="coordinator"
            userId={coordinatorId}
          />
        </div>
      </div>
    </>
  );
};
export async function getServerSideProps(context) {
  const client=buildClient(context)
  const { coordinatorId } = context.query;
  console.log(coordinatorId,'666666666666666666645555555')
  const coordinator = await client.get(
    `/api/prgservice/coordinators/${coordinatorId}`
  );
  console.log(coordinator,'444444444444444444444444444')
  let coordinatorData = coordinator.data.data;
  const program = await client.get(
    `/api/prgservice/programs/${coordinatorData.programId}`
  );

  const programData = program.data.data;

  coordinatorData = { ...coordinatorData, program: programData.name };
  return {
    props: {
      coordinator: coordinatorData,
      programData,
    },
  };
}

export default ProfilePage;