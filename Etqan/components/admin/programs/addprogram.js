import { useRouter } from 'next/router';
import { BiPlus } from 'react-icons/bi';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import buildClient from '../../../hooks/build';

function NewProgramForm() {
  const router = useRouter();
  const validationSchema = Yup.object().shape({
    name: Yup.string().required('program name is required'),
    Program_Id: Yup.string().required('program code is required'),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
       const client = buildClient('');
      const response = await client.post(
        `/api/admin/program/${router.query.id}`,
        values
      );
      toast.success('program has been added successfully', {
        duration: 1000,
        position: 'top-center',
        style: {
          background: '#2E7D32',
          color: '#fff',
          fontSize: '20px',
        },
      });
      window.history.back();
    } catch (error) {
      console.error(error);

      toast.error(err.response.data.errors[0].message, {
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
      <div className="bg-gray-900 flex flex-col items-center w-full lg:pl-20 md:pl-20 xl:pl-20 sm:pl-20">
        <div className="min-h-screen mt-40 w-full sm:w-9/12 md:w-7/12 lg:w-5/12 xl:w-5/12 p-0 sm:p-12 sm:px-16 mx-auto overflow-x-auto">
          <div className="mx-auto px-8 py-12 bg-white border-0 shadow-lg rounded-3xl sm:rounded-3xl md:rounded-4xl lg:rounded-5xl xl:rounded-6xl">
            <div className="">
              <h1 className="pb-20 text-4xl font-bold text-slate-900">
                Please Enter program Info
              </h1>
            </div>
            <Formik
              initialValues={{
                name: '',
                Program_Id: '',
              }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting }) => (
                <Form className="p-4 bg-white rounded w-full">
                  <div className="mb-2">
                    <label className="font-semibold mb-2 block" htmlFor="name">
                      program Name:
                    </label>
                    <Field
                      className="block font-inherit rounded-lg border-2 border-[#ccc] border-solid p-1 w-full"
                      type="text"
                      id="name"
                      name="name"
                      placeholder="Enter program name"
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
                      htmlFor="Program_Id"
                    >
                      program Code:
                    </label>
                    <Field
                      className="block font-inherit rounded-lg border-2 border-[#ccc] border-solid p-1 w-full"
                      type="text"
                      id="Program_Id"
                      name="Program_Id"
                      placeholder="Enter program code"
                    />
                    <ErrorMessage
                      name="Program_Id"
                      component="div"
                      className="text-red-500"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full cursor-pointer flex justify-center text-center text-md text-white px-4 py-2 border rounded-md hover:border-gray-700 hover:text-black bg-gradient-to-r to-blue-700 from-sky-400"
                  >
                    Add program <BiPlus size={24} />
                  </button>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default NewProgramForm;
