import { useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { BiPlus } from 'react-icons/bi';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { ToastContainer, toast } from 'react-toastify';
import buildClient from '../../../hooks/build';

function NewUniversityForm(props) {
  const router = useRouter();

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('University name is required'),
    university_code: Yup.string().required('University code is required'),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
       const client = buildClient('');
      const res = await client.post('/api/admin/university', values);

      toast.success('University has been added successfully  ');
      router.push('/admin/university', {
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
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <div className="bg-gray-900 flex flex-col items-center w-full lg:pl-20 md:pl-20 xl:pl-20 sm:pl-20"></div>
      <div className="min-h-screen w-full items-center mt-40 sm:w-9/12 md:w-7/12 lg:w-5/12 xl:w-5/12 p-0 sm:p-12 sm:px-16 mx-auto overflow-x-auto">
        <div className="mx-auto px-8 py-12 bg-white border-0 shadow-lg rounded-3xl sm:rounded-3xl md:rounded-4xl lg:rounded-5xl xl:rounded-6xl">
          <div className="">
            <h1 className="pb-20 text-4xl font-bold text-slate-900">
              Please Enter University Info
            </h1>
          </div>
          <Formik
            initialValues={{
              name: '',
              university_code: '',
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="p-4 bg-white rounded w-full">
                <div className="mb-2">
                  <label className="font-semibold mb-2 block" htmlFor="name">
                    University name:
                  </label>
                  <Field
                    className="block font-inherit rounded-lg border-2 border-[#ccc] border-solid p-1 w-full"
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Enter University name"
                  />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="text-red-500"
                  />
                </div>

                <div className="mb-2">
                  <label
                    className="font-semibold mb-2 block"
                    htmlFor="university_code"
                  >
                    University code:
                  </label>
                  <Field
                    className="block font-inherit rounded-lg border-2 border-[#ccc] border-solid p-1 w-full"
                    type="text"
                    id="university_code"
                    name="university_code"
                    placeholder="Enter University code"
                  />
                  <ErrorMessage
                    name="university_code"
                    component="div"
                    className="text-red-500"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full cursor-pointer flex justify-center text-center text-md text-white px-4 py-2 border rounded-md hover:border-gray-700 hover:text-black bg-gradient-to-r to-blue-700 from-sky-400"
                >
                  Add University{' '}
                  <span className="">
                    <BiPlus size={24}></BiPlus>
                  </span>
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
}

export default NewUniversityForm;
