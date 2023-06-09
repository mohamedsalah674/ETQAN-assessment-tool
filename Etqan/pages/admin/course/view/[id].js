import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import SectionHeading from '../../../../components/SectionHeading';
import AdminNavbar from '../../../../components/admin/adminNavbar';
import buildClient from '../../../../hooks/build';

function ViewCourse({ course }) {
  const router = useRouter();
  console.log('course', course);

  return (
    <>
      <SectionHeading text={`${course.name} course`} />
      <AdminNavbar />
      <div className="min-h-screen flex items-center justify-center bg-blue-200">
        <div className="w-1/2 bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold mb-8 text-center">
            Course Information
          </h1>
          <div className="mx-auto w-3/4">
            <div className="mb-8">
              <h1 className="text-xl text-center">
                Course Name: {course.name}
              </h1>
              <h1 className="text-xl text-center">
                Course Code: {course.course_code}
              </h1>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  const id = context.params.id;
  const client = buildClient(context, 'http://localhost:4000');
  const res = await client.get('/api/admin/course/' + id);
  const course = await res.data;

  return {
    props: {
      course,
    },
  };
}

export default ViewCourse;
