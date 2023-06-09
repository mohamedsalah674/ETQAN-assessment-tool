import ItemCard from "../../../components/ItemCard";
import { useRouter } from "next/router";
import SideNavbar from "../../../components/SideNavbar";
import buildClient from '../../../hooks/build'

function Instructor({
  instructorData,
  instructorProgramsData,
  loading,
  error,
}) {
  const router = useRouter();
  const { instructorId, programId } = router.query;
  const role = "instructor";
  const links = [
    {
      text: "Profile",
      href: `/instructor/${instructorId}/profile`,
      icon: "/icons/profile.svg",
      alt: "programs",
    },
  ];
  if (loading) {
    // Display a loading spinner or skeleton UI while fetching data
    return <div>Loading...</div>;
  }

  if (error) {
    // Display an error message if an error occurred
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <div className="flex flex-col items-center w-full pl-20 min-h-screen bg-cover bg-[url('/backg.svg')]">
        <SideNavbar links={links} />
        {/* <WelcomeSection instructor={instructorData} /> */}
        <div className="flex flex-col mt-5 p-8 w-[72%] bg-white border-4 border-[#00b4ba] rounded-2xl justify-center">
          <h1 className="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
            <span className="text-transparent bg-clip-text bg-gradient-to-r to-blue-500 from-sky-300">
              Welcome back
            </span>{" "}
            Dr. {instructorData.name}
          </h1>
          <p className="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">
            Here you can find all your courses and prossgrams:
          </p>
        </div>
        <div className="flex flex-row space-x-20 mt-12 justify-center text-center w-[72%]">
          {instructorProgramsData.map((program) => (
            <ItemCard
              key={program._id}
              topText=""
              caption={"Courses: " + program.coursesIds.length}
              cardTitle={program.name}
              cardDescription=''
              buttonText="Visit Program Page"
              href={`/instructor/${instructorId}/programs/${program._id}`}
              isCoordinator={role === "coordinator"}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  const instructorId = context.query.instructorId;
  const client=buildClient(context)

  try {
    const [instructorResponse, instructorProgramsResponse] = await Promise.all([
      client.get(
        `/api/assessment/instructors/${instructorId}`
      ),
      client.get(
        `/api/assessment/instructors/${instructorId}/programs/`
      ),
    ]);

    const instructorData = instructorResponse.data.data;
    const instructorProgramsData = instructorProgramsResponse.data.data;

    const programPromises = instructorProgramsData.map(async (program) => {
      const prgoramCoursesResponse = await client.get(
        `/api/assessment/programs/${program._id}/courses`
      );
      const programCoursesData = prgoramCoursesResponse.data.data;

      const coursesNames = programCoursesData.map((course) => course.name);
      program.coursesNames = coursesNames;

      return program;
    });

    const programsData = await Promise.all(programPromises);

    return {
      props: {
        instructorData,
        instructorProgramsData: programsData,
        loading: false,
        error: null,
      },
    };
  } catch (error) {
    return {
      props: {
        instructorData: null,
        instructorProgramsData: null,
        loading: false,
        error: "Error occurred while fetching instructor data",
      },
    };
  }
}

export default Instructor;
