import SectionHeading from '../../../components/SectionHeading';
import Link from 'next/link';
import AdminNavbar from '../../../components/admin/adminNavbar';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { BiEdit, BiTrashAlt, BiShow } from 'react-icons/bi';
import buildClient from '../../../hooks/build';
import { toast } from 'react-toastify';

export default function courses() {
  const router = useRouter();

  const [courses, setCourses] = useState([]);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [deleteId, setDeleteId] = useState('');

  useEffect(() => {
    const getCourses = async () => {
       const client = buildClient('');
      const res = await client.get('/api/admin/course');
      setCourses(res.data);
    };
    getCourses();
  }, []);

  const deleteCourse = (id) => {
    setDeleteId(id);
    setConfirmDelete(true);
  };

  const confirmDeleteCourse = async () => {
    try {
       const client = buildClient('');
      const { data } = await client.delete('/api/admin/course/' + deleteId);
      const updatedCourses = courses.filter(
        (course) => course._id !== deleteId
      );
      setCourses(updatedCourses);
      console.log(data.message);
      toast.success('Course has been deleted successfully', {
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

    setConfirmDelete(false);
    setDeleteId('');
  };

  const cancelDeleteCourse = () => {
    setConfirmDelete(false);
    setDeleteId('');
  };

  if (!courses || courses.length === 0) {
    return (
      <>
        <SectionHeading text="courses List" />
        <AdminNavbar />
        <div className="bg-blue-200 pt-20 pb-20 min-h-screen">
          <div className="w-1/2 m-auto mt-20">
            <SectionHeading text="No courses Yet" />
          </div>
        </div>
      </>
    );
  } else {
    return (
      <>
        <SectionHeading text="courses List" />
        <AdminNavbar />
        <div className="bg-blue-200 pt-20 pb-20 min-h-screen w-full ">
          <div className="mr-10 items-baseline space-x-4 flex flex-col justify-center ml-96">
            <table className=" mt-10 table-auto bg-black">
              <thead>
                <tr className="bg-gray-800">
                  <th className="px-24 py-2">
                    <span className="text-gray-200">Name</span>
                  </th>
                  <th className="px-28 py-2">
                    <span className="text-gray-200">course ID</span>
                  </th>
                  <th scope="col" className="px-24 py-2"></th>
                </tr>
              </thead>
              <tbody>
                {courses.map((course, index) => (
                  <tr
                    key={course._id}
                    className={`text-center ${
                      index % 2 === 0 ? 'bg-gray-50' : 'bg-gray-200'
                    }`}
                  >
                    <th
                      scope="row"
                      className="px-2 py-4 text-center text-xl font-normal"
                    >
                      {course.name}
                    </th>
                    <td className="px-6 py-4 text-center text-xl">
                      {course.course_code}
                    </td>
                    <td className="px-6 py-4 text-center ">
                      <div>
                        <Link href={`/admin/course/update/${course._id}`}>
                          <button className="cursor px-6">
                            <BiEdit size={35} color={'rgb(34,197,94)'}></BiEdit>
                          </button>
                        </Link>
                        <button
                          className="cursor px-6 ml-12"
                          onClick={() => deleteCourse(course._id)}
                        >
                          <BiTrashAlt
                            size={35}
                            color={'rgb(244,63,94)'}
                          ></BiTrashAlt>
                        </button>
                        <Link href={`/admin/course/view/${course._id}`}>
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

        {confirmDelete && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white rounded-lg p-4">
              <p className="text-center text-gray-800 mb-4">
                Are you sure you want to delete this course?
              </p>
              <div className="flex justify-center">
                <button
                  className="text-red-500 hover:text-red-700 mr-10"
                  onClick={confirmDeleteCourse}
                >
                  Yes
                </button>
                <button
                  className="text-blue-500 hover:text-blue-700"
                  onClick={cancelDeleteCourse}
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
