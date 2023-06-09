import SectionHeading from '../../../components/SectionHeading';
import Link from 'next/link';
import AdminNavbar from '../../../components/admin/adminNavbar';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { BiEdit, BiTrashAlt, BiShow } from 'react-icons/bi';
import buildClient from '../../../hooks/build';
import { toast } from 'react-toastify';

export default function programs() {
  const router = useRouter();

  const [programs, setFaculties] = useState([]);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const [deleteId, setDeleteId] = useState('');

  useEffect(() => {
    const getFaculties = async () => {
       const client = buildClient('');
      const res = await client.get('/api/admin/program');
      setFaculties(res.data);
    };
    getFaculties();
  }, []);

  const deleteProgram = (id) => {
    setDeleteId(id);
    setShowConfirmation(true);
  };

  const confirmDeleteProgram = async () => {
    try {
       const client = buildClient('');
      const { data } = await client.delete('/api/admin/program/' + deleteId);
      const updatedFaculties = programs.filter(
        (program) => program._id !== deleteId
      );
      setFaculties(updatedFaculties);
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
    setDeleteId('');
  };

  const cancelDeleteProgram = () => {
    setShowConfirmation(false);
    setDeleteId('');
  };

  if (!programs || programs.length === 0) {
    return (
      <>
        <SectionHeading text="programs List" />
        <AdminNavbar />
        <div className="bg-blue-200 pt-20 pb-20 min-h-screen">
          <div className="w-1/2 m-auto mt-20">
            <SectionHeading text="No programs Yet" />
          </div>
        </div>
      </>
    );
  } else {
    return (
      <>
        <SectionHeading text="programs List" />
        <AdminNavbar />
        <div className="bg-blue-200 pt-20 pb-20 min-h-screen ">
          <div className="mr-10 items-baseline space-x-4 flex flex-col justify-center ml-96">
            <table className="w-4/5  mt-10 table-auto bg-black">
              <thead>
                <tr className="bg-gray-800">
                  <th className="px-24 py-2">
                    <span className="text-gray-200">Name</span>
                  </th>
                  <th className="px-28 py-2">
                    <span className="text-gray-200">program ID</span>
                  </th>
                  <th scope="col" className="px-24 py-2"></th>
                </tr>
              </thead>
              <tbody>
                {programs.map((program, index) => (
                  <tr
                    key={program._id}
                    className={`text-center ${
                      index % 2 === 0 ? 'bg-gray-50' : 'bg-gray-200'
                    }`}
                  >
                    <th
                      scope="row"
                      className="px-2 py-4 text-center text-xl font-normal"
                    >
                      {program.name}
                    </th>
                    <td className="px-6 py-4 text-center text-xl">
                      {program.Program_Id}
                    </td>
                    <td className="px-6 py-4 text-center ">
                      <div>
                        <Link href={`/admin/program/update/${program._id}`}>
                          <button className="cursor px-6">
                            <BiEdit size={35} color={'rgb(34,197,94)'}></BiEdit>
                          </button>
                        </Link>
                        <button
                          className="cursor px-6 ml-12"
                          onClick={() => deleteProgram(program._id)}
                        >
                          <BiTrashAlt
                            size={35}
                            color={'rgb(244,63,94)'}
                          ></BiTrashAlt>
                        </button>
                        <Link href={`/admin/program/view/${program._id}`}>
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
                Are you sure you want to delete this program?
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
                  onClick={cancelDeleteProgram}
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
}
