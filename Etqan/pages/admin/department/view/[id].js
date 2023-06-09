import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import SectionHeading from '../../../../components/SectionHeading';
import AdminNavbar from '../../../../components/admin/adminNavbar';
import Link from 'next/link';
import { BiEdit, BiTrashAlt, BiShow } from 'react-icons/bi';
import buildClient from '../../../../hooks/build';
import { toast } from 'react-toastify';

function viewDepartment({ department }) {
  console.log('department', department);
  const router = useRouter();

  const [program, setPrograms] = useState([]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [programIdToDelete, setProgramIdToDelete] = useState('');

  useEffect(() => {
    const getPrograms = async () => {
       const client = buildClient('');
      const res = await client.get(`/api/admin/department/${department._id}`);

      const getdata = await res.data;
      setPrograms(getdata.programs);
    };
    getPrograms();
  }, []);

  const deleteProgram = async (id) => {
    setProgramIdToDelete(id);
    setShowConfirmation(true);
  };

  const confirmDeleteProgram = async () => {
    try {
       const client = buildClient('');
      const { data } = await client.delete(`/api/admin/program/${programIdToDelete}`);

      const currentprograms = program.filter(
        (program) => program._id !== programIdToDelete
      );
      setPrograms(currentprograms);
      console.log(currentprograms, program);

      console.log(data.message);
      toast.success('Program has been deleted successfully', {
        duration: 1000,
        position: 'top-center',
        style: {
          background: '#2E7D32',
          color: '#fff',
          fontSize: '20px',
        },
      });
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.errors[0].message, {
        duration: 3000,
        position: 'top-center',
        style: {
          background: '#D32F2F',
          color: '#fff',
          fontSize: '20px',
        },
      });
    }
    setShowConfirmation(false);
    setProgramIdToDelete('');
  };
  const cancelDeleteDepartment = () => {
    setShowConfirmation(false);
    setProgramIdToDelete('');
  };
  return (
    <>
      <SectionHeading text={department.name + ' Department'} />
      <AdminNavbar />

      <div className="bg-blue-200 pt-20 pb-20 min-h-screen ">
        <div className="mr-10 items-baseline space-x-4 flex flex-col justify-center ml-96">
          <div>
            <Link
              href={`/admin/program/addprogram/${router.query.id}`}
              className="text-white bg-gradient-to-r from-black to-blue-600 hover:bg-gradient-to-bl  focus:outline-none dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
            >
              ADD program
            </Link>
          </div>
          <table className="w-4/5 mt-4 table-auto bg-black">
            <thead>
              <tr className="bg-gray-800">
                <th className="px-24 py-2">
                  <span className="text-gray-200">Name</span>
                </th>
                <th className=" px-28 py-2">
                  <span className="text-gray-200">program Id</span>
                </th>

                <th scope="col" className="px-24 py-2"></th>
              </tr>
            </thead>
            <tbody className="bg-gray-200">
              {program.map((programs, index) => (
                <tr
                  key={programs._id}
                  className={`text-center ${
                    index % 2 === 0 ? 'bg-gray-50' : 'bg-gray-200'
                  }`}
                >
                  <th
                    scope="row"
                    className="px-2 py-4 text-center text-xl font-normal"
                  >
                    {programs.name}
                  </th>
                  <td className="px-6 py-4 text-center text-xl">
                    {programs.Program_Id}
                  </td>

                  <td className="px-6 py-4 text-center ">
                    <div>
                      <Link href={`/admin/program/update/${programs._id}`}>
                        <button className="cursor px-6">
                          <BiEdit size={35} color={'rgb(34,197,94)'}></BiEdit>
                        </button>
                      </Link>
                      <button
                        className="cursor px-6 ml-12"
                        onClick={() => deleteProgram(programs._id)}
                      >
                        <BiTrashAlt
                          size={35}
                          color={'rgb(244,63,94)'}
                        ></BiTrashAlt>
                      </button>
                      <Link href={`/admin/program/view/${programs._id}`}>
                        <button className="cursor px-6 ml-12">
                          <BiShow size={35} color={'rgb(50,60,140)'}></BiShow>
                        </button>
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showConfirmation && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-4">
            <p className="text-center text-gray-800 mb-4">
              Are you sure you want to delete this university?
            </p>
            <div className="flex justify-center">
              <button
                className="text-red-500 hover:text-red-700 mr-10"
                onClick={confirmDeleteProgram}
              >
                Yes
              </button>
              <button
                className="text-blue-500 hover:text-blue-700"
                onClick={cancelDeleteDepartment}
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export async function getServerSideProps(context) {
  const id = context.params.id;
  const client = buildClient(context, 'http://localhost:4000');
  const res = await client.get(`/api/admin/department/${id}`);
  const department = await res.data;

  return {
    props: {
      department,
    },
  };
}

export default viewDepartment;
