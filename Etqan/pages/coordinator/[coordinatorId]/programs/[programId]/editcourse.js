import EditCourseForm from "../../../../../components/EditCourseForm";
import SideNavbar from "../../../../../components/SideNavbar";
import { useState } from "react";
import SectionHeading from "../../../../../components/SectionHeading";
import Link from "next/link";
import buildClient from "../../../../../hooks/build";
import { useRouter } from "next/router";

export default function addCourse({ course }) {
  const router = useRouter();
  // const { programId, userId, role } = router.query;
  const { programId, coordinatorId } = router.query;
  // const authParams = `&userId=${userId}&role=${role}`;
  const courseId = course._id;
  const links = [
    {
      text: "back to your dashboard",
      href: `/coordinator/${coordinatorId}/dashboard`,
      icon: "/icons/back.svg",
      alt: "programs",
    },
    // Add more links as needed
  ];
  return (
    <>
      {" "}
      <div className="bg-gray-900 flex flex-col items-center w-full px-2 py-2">
        <SideNavbar links={links} />
        <EditCourseForm course={course} />
      </div>{" "}
    </>
  );
}
export async function getServerSideProps(context) {
  const client = buildClient(context)
  const { courseId, programId } = context.query; // Access the programId from the query object

  const course = await client.get(
    `/api/assessment/programs/${programId}/courses/${courseId}`
  );
  console.log(course);

  return {
    props: {
      course: course.data.data,
      courseid: courseId,
    },
  };
}
