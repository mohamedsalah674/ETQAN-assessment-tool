import { useRouter } from "next/router";
import ItemCard from "../ItemCard";
function ProgramsSection(props) {
  const programs = props.programs;
  const router = useRouter();
  const userId = router.query.instructorId;
  const { programId, role } = router.query;
  const handleVisitProgram = (programId, role, userId) => {
    router.push(`/instructor/${userId}/programs/${programId}`);
  };

  return (
    <>
      <div
        id="programs"
        className=" mb-10 mt-5 p-8 w-7/10 bg-[url('/h.svg')] border-4 border-[#00b4ba] rounded-2xl justify-center"
      >
        <div className="flex flex-wrap justify-around text-center">
          {programs.map((program) => (
            <ItemCard
              key={program._id}
              topText=""
              caption={"Courses: " + program.coursesIds.length}
              cardTitle={program.name}
              cardDescription={program.coursesNames}
              buttonText="Visit Program Page"
              href={`/instructor/${userId}/programs/${program._id}`}
              isCoordinator={role === "coordinator"}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default ProgramsSection;
