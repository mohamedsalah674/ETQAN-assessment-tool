import { useRouter } from "next/router";
import SideNavbar from "../../../../../components/SideNavbar";
import ItemCard from "../../../../../components/ItemCard";
import buildClient from "../../../../../hooks/build";

function ProgramPage({ courses, programData }) {
  const router = useRouter();
  const userId = router.query.instructorId;
  console.log("kkkkk", router.query);
  const { programId, role } = router.query;
  const authParams = `&userId=${userId}&role=${role}`;
  console.log("ss", authParams);
  const links = [
    {
      text: "Program SOs",
      href: `/instructor/${userId}/programs/${programId}/sos`,
      icon: "/icons/courses.svg",
      alt: "courses",
    },
    {
      text: "Program Students",
      href: `/instructor/${userId}/programs/${programId}/students`,
      icon: "/icons/students.svg",
      alt: "courses",
    },
    {
      text: "Back to your programs",
      href: `/instructor/${userId}/dashboard/`,
      icon: "/icons/back.svg",
      alt: "programs",
    },
    // Add more links as needed
  ];

  const handleVisitCourse = (courseId, programId, userId) => {
    router.push(
      `/instructor/${userId}/programs/${programId}/courses/${courseId}`
    ); // Append programId and courseId to the URL
  };

  if (!courses) {
    return <div>Error...</div>;
  }

  return (
    <div>
      <SideNavbar links={links} />
      <div className="min-h-screen bg-blue-400 bg-[length:600px_300px] bg-right-bottom bg-no-repeat bg-[url('/backgrounds/courses.svg')] flex flex-col items-center w-full pl-20">
        <h1 className="text-5xl font-extrabold font-sans italic text-white mt-8 mb-4 mx-auto">
          Program: {programData.name}
        </h1>
        <div className="flex flex-wrap justify-center gap-10 text-center w-[72%] mx-auto">
          {courses.map((course) => (
            <ItemCard
              key={course._id}
              topText=""
              caption={"Credits: " + course.credits}
              cardTitle={course.name}
              cardDescription={course.code}
              buttonText="Visit Course Page"
              href={`/instructor/${userId}/programs/${programId}/courses/${course._id}`}
              isCoordinator={false}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
const client=buildClient(context)
  const programId = context.query.programId;
  const instructorId = context.query.instructorId;

  try {
    const coursesResponse = await client.get(
      `/api/assessment/instructors/${instructorId}/programs/${programId}`
    );
    const courses = coursesResponse.data.data.courses;
    const programData = coursesResponse.data.data.programData;
    return {
      props: {
        courses,
        programData,
      },
    };
  } catch (error) {
    console.log("Error fetching program data:", error);
    return {
      props: {
        courses: null,
        error,
      },
    };
  }
}

export default ProgramPage;
