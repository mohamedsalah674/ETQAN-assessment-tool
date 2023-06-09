import NewCourseForm from "../../../../../components/NewCourseForm";
export default function addCourse() {
  return (
    <>
      {" "}
      <div className="bg-gray-900 flex flex-col items-center w-full px-2 py-2">
        <NewCourseForm />
      </div>{" "}
    </>
  );
}
