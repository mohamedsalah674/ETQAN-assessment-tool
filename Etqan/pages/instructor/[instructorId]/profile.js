import ViewProfile from "../../../components/instructor/InstructorProfile";
import SideNavbar from "../../../components/SideNavbar";
import buildClient from "../../../hooks/build";

function Instructor({ user, instructorId }) {
  const links = [
    {
      text: "Back to Dashboard",
      href: `/instructor/${instructorId}/dashboard`,
      icon: "/icons/back.svg",
      alt: "programs",
    },
  ];
  return (
    <>
      <div className="flex flex-col items-center bg-[url('/backgrounds/editprofile.svg')]">
        <SideNavbar links={links} />

        <div className="my-8">
          <h1 className="text-gray-50 text-center text-5xl font-bold">
            Profile
          </h1>
        </div>
        <div className="w-[40%] bg-white  rounded mb-20">
          <ViewProfile user={user} role="instructor" userId={instructorId} />
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  const client=buildClient(context)
  const { instructorId } = context.query;

  let userData;

  const response = await client.get(
    `/api/assessment/instructors/${instructorId}`
  );
  userData = response.data;

  return {
    props: {
      user: userData.data,
      instructorId: instructorId,
    },
  };
}

export default Instructor;
