import Link from "next/link";
import SectionHeading from "../../../../../components/SectionHeading";
import buildClient from "../../../../../hooks/build";
import ShowMatrixComponent from "../../../../../components/Matrix2";
import SideNavbar from "../../../../../components/SideNavbar";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function showmatrix(newObj) {
  const router = useRouter();
  const { programId, courseId, coordinatorId, role } = router.query;

  const links = [
    {
      text: "Back to your program",
      href: `/coordinator/${coordinatorId}/dashboard`,
      icon: "/icons/back.svg",
      alt: "programs",
    },
    // Add more links as needed
  ];

  return (
    <>
      <SideNavbar links={links} />
      
      <div className="min-h-screen bg-blue-200 overflow-x-auto pb-16">
        <SectionHeading text="Courses vs SOs matrix" />
       
        <ShowMatrixComponent
          courses={newObj.coursesWithIreData}
          so={newObj.studentoutcomes}
        />
      </div>
    </>
  );
}
export async function getServerSideProps(context) {
  const client = buildClient(context)
  const { programId } = context.query;
  console.log("oooooo", programId);

  try {
    const [sosResponse, programResponse, coursesResponse, studentsResponse] =
      await Promise.all([
        client.get(
          `/api/prgservice/programs/${programId}/sos`
        ),
        client.get(`/api/prgservice/programs/${programId}`),
        client.get(
          `/api/assessment/programs/${programId}/courses`
        ),
        client.get(
          `/api/prgservice/programs/${programId}/students`
        ),
      ]);

    const sos = sosResponse.data;
    const program = programResponse.data.data;
    const courses = coursesResponse.data.data;
    const students = studentsResponse.data;

    const coursesWithIreData = [];
    for (const course of courses) {
      if (course.ireAssessment) {
        const ireResponse = await client.get(
          `/api/assessment/courses/${course._id}/ires/${course.ireAssessment}`
        );
        const ireData = ireResponse.data.data;
        const courseWithIreData = {
          ...course,
          ireData: ireData.ireData,
        };
        coursesWithIreData.push(courseWithIreData);
      }
    }

    const newObj = {
      studentoutcomes: sos,
      Students: students,
      coursesWithIreData,
      program,
    };

    return {
      props: newObj,
    };
  } catch (error) {
    console.error("Error fetching data:", error);

    return {
      props: {
        studentoutcomes: null,
        Students: null,
        coursesWithIreData: [],
        program: null,
      },
    };
  }
}
