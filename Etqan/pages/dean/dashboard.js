import SideNavbar from "../../components/SideNavbar";
import React from "react";
import Link from "next/link";
import buildClient from "../../hooks/build";
import { useRouter } from "next/router";
const FacultyDeanPage = ({ departments }) => {
  const router = useRouter();
  const { headId } = router.query;
  const links = [
    {
      text: "Departments Report",
         href: `/dean/deanreport`,
      icon: "/icons/report.svg",
      alt: "departments",
    },
  ];
  return (
    <>
      <>
        <SideNavbar links={links} />
        <div className="bg-sky-900 min-h-screen flex flex-col items-center w-full pl-20">
          
          <div
            id="programs"
            className="flex  mb-10 flex-col mt-20  p-8 w-2/3 bg-white border-4 border-[#00b4ba] rounded-2xl justify-center"
          >
            <h1 className="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
              All departments
            </h1>
            <div className="flex flex-wrap  justify-around text-center">
              {departments.map((department) => (
                <div
                  key={department._id}
                  className=" md:w-[40%]  sm:w-full p-10 m-5 bg-gray-200 p-6 bg-white border-2 border-blue-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
                >
                  <div>
                    <Link href="#" passHref>
                      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        {department.name}
                      </h5>
                    </Link>
                    <h6 className="text-bold italic text-2xl text-sky">
                      Programs:
                    </h6>
                    {department.programsIds.map((program) => (
          
                    
                    <p key={program._id}>◾ {program.name}</p>

                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </>
    </>
  );
};

export async function getServerSideProps(context) {
  const client = buildClient(context)
     const response = await client.get(
      `/api/prgservice/departments`
    );
  
  const departments = await response.data.data;

  return {
    props: {
      departments,
    },
  };
}

export default FacultyDeanPage;
