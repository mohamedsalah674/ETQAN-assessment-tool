import { useRef, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { BiPlus, BiTrashAlt } from 'react-icons/bi';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { ToastContainer, toast } from 'react-toastify';
import buildClient from '../../../hooks/build';
import Link from "next/link";


function UpdateCourseForm({ department }) {
  const router = useRouter();
  const formRef = useRef(null);
  const [showConfirmation, setShowConfirmation] = useState(false);

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        const client = buildClient('');
        const response = await client.get(`/api/admin/course/${router.query.id}`);
        const { course_code, name } = response.data;
        const courseData = { course_code, name };
        formRef.current.setValues(courseData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCourseData();
  }, [router.query.id]);

  const handleSubmit = async (values) => {
    const { name, course_code } = values;

    const payload = {
      name,
      course_code,
    };

    try {
       const client = buildClient('');
      const res = await client.put(`/api/admin/course/${router.query.id}`, payload);
      window.history.back();
      toast.success('Course has been updated successfully', {
        duration: 1000,
        position: 'top-center',
        style: {
          background: '#2E7D32',
          color: '#fff',
          fontSize: '20px',
        },
      });
    } catch (error) {
      console.error(error);
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
  };

  const handleDelete = async () => {
    try {
       const client = buildClient('');
      const res = await client.delete(`/api/admin/course/${router.query.id}`);
      window.history.back();
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
      console.error(error);
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
  };

  const confirmDelete = () => {
    setShowConfirmation(true);
  };

  const cancelDelete = () => {
    setShowConfirmation(false);
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('course name is required'),
  });

  return (
    <>
      <div className="bg-gray-900 flex flex-col items-center w-full lg:pl-20 md:pl-20 xl:pl-20 sm:pl-20">
        <div className="min-h-screen mt-40 w-full sm:w-9/12 md:w-7/12 lg:w-5/12 xl:w-5/12 p-0 sm:p-12 sm:px-16 mx-auto overflow-x-auto">
          <div className="mx-auto px-8 py-12 bg-white border-0 shadow-lg rounded-3xl sm:rounded-3xl md:rounded-4xl lg:rounded-5xl xl:rounded-6xl">
            <div className="">
              <h1 className="pb-20 text-4xl font-bold text-slate-900">
                Please Enter course Info
              </h1>
            </div>
            <Formik
              innerRef={formRef}
              initialValues={{
                code: '',
                name: '',
              }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              <Form className="p-4 h-80 bg-white rounded w-full">
                <div className="mb-2">
                  <label className="font-semibold mb-2 block" htmlFor="name">
                    course Name:
                  </label>
                  <Field
                    className="block font-inherit rounded-lg border-2 border-[#ccc] border-solid p-1 w-full"
                    type="text"
                    id="name"
                    name="name"
                    placeholder="course Name"
                  />
                  <ErrorMessage
                    className="text-red-500 text-sm"
                    component="div"
                    name="name"
                  />
                </div>
                <div className="mb-2">
                  <label className="font-semibold mb-2 block" htmlFor="code">
                    course Code:
                  </label>
                  <Field
                    className="block font-inherit rounded-lg border-2 border-[#ccc] border-solid p-1 w-full"
                    type="text"
                    id="course_code"
                    name="course_code"
                    placeholder="course Code"
                    readOnly
                  />
                </div>
                <div className="flex justify-between mt-8">
               
                <button
                type="submit"
                className="bg-green-700 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg"
              >
                Update Course
              </button>
                {showConfirmation ? (
                  <>
                    <button
                      type="button"
                      onClick={cancelDelete}
                      className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-lg"
                    >
                      No
                    </button>
                 
                    <button
                      type="button"
                      onClick={handleDelete}
                      className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg"
                    >
                      Yes
                    </button>
                  </>
                ) : (
                  <button
                    type="button"
                    onClick={confirmDelete}
                    className="bg-red-700 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg"
                  >
                    <BiTrashAlt className="inline-block mr-1 " size={20}/>
                    Delete Course
                  </button>
                )}

               
              </div>
              <Link href="/admin/course">
              <div className= " w-24 flex  text-center mt-14 bg-black hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded-lg">
                Cancel
              </div>
            </Link>

             
              </Form>
            </Formik>
          </div>
        </div>
      </div>
    </>
  );
}

export default UpdateCourseForm;
