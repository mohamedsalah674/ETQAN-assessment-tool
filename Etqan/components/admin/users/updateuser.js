import { useRef, useEffect } from 'react';
import { useRouter } from 'next/router';
import { BiPlus } from 'react-icons/bi';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import buildClient from '../../../hooks/build';
import { ToastContainer, toast } from 'react-toastify';

const UpdateUser = () => {
  const router = useRouter();
  const formRef = useRef(null);

  const roles = [
    { label: 'Admin', value: 'admin' },
    { label: 'Instructor', value: 'instructor' },
    { label: 'Head of Department', value: 'head_of_department' },
    { label: 'Dean', value: 'dean' },
    { label: 'Coordinator', value: 'coordinator' },
  ];

  useEffect(() => {
    const fetchUserData = async () => {
      try {
         const client = buildClient('');
        const response = await client.get(`/api/admin/users/${router.query.id}`);
        const { name, role, email, academicPosition, URL } = response.data;
        const userData = { name, role, email, academicPosition, URL };
        formRef.current.setValues(userData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUserData();
  }, [router.query.id]);

  const handleSubmit = async (values) => {
    const { name, role, email, academicPosition, URL } = values;

    const payload = {
      name,
      role,
      email,
      academicPosition,
      URL,
    };

    try {
       const client = buildClient('');
      const response = await client.put(
        `/api/admin/users/${router.query.id}`,
        payload
      );
      console.log(response.data); // handle success response

      toast.success('User has been updated successfully', {
        duration: 1000,
        position: 'top-center',
        style: {
          background: '#2E7D32',
          color: '#fff',
          fontSize: '20px',
        },
      });

      router.push(`/admin/users`);
    } catch (error) {
      console.log(error); // handle error

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

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('User Name is required'),
    role: Yup.string().required('User Role is required'),
    email: Yup.string()
      .email('Invalid email address')
      .required('User Email is required'),
    academicPosition: Yup.string().required(
      'User Academic Position is required'
    ),
    URL: Yup.string().url('Invalid URL').required('User URL is required'),
  });

  return (
    <>
      <div className="min-h-screen w-full sm:w-9/12 md:w-7/12 lg:w-5/12 xl:w-5/12 p-0 sm:p-12 sm:px-16 mx-auto overflow-x-auto">
        <div className="mx-auto px-8 py-12 bg-white border-0 shadow-lg rounded-3xl sm:rounded-3xl md:rounded-4xl lg:rounded-5xl xl:rounded-6xl">
          <div className="">
            <h1 className="pb-20 text-4xl font-bold text-slate-900 ">
              Please Enter User Info
            </h1>
          </div>
          <Formik
            innerRef={formRef}
            initialValues={{
              name: '',
              role: '',
              email: '',
              academicPosition: '',
              URL: '',
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            <Form className="p-4 bg-white rounded w-full">
              <div className="mb-2">
                <label className="font-semibold mb-2 block" htmlFor="name">
                  User Name:
                </label>
                <Field
                  className="block font-inherit rounded-lg border-2 border-[#ccc] border-solid p-1 w-full"
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Enter User Name"
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="text-red-500"
                />
              </div>

              <div className="mb-2">
                <label className="font-semibold mb-2 block" htmlFor="role">
                  User Role:
                </label>
                <Field
                  as="select"
                  className="block font-inherit rounded-lg border-2 border-[#ccc] border-solid p-1 w-full"
                  id="role"
                  name="role"
                  placeholder="Select User Role"
                >
                  <option value="">Select User Role</option>
                  {roles.map((role) => (
                    <option key={role.value} value={role.value}>
                      {role.label}
                    </option>
                  ))}
                </Field>
                <ErrorMessage
                  name="role"
                  component="div"
                  className="text-red-500"
                />
              </div>

              <div className="mb-2">
                <label className="font-semibold mb-2 block" htmlFor="email">
                  User Email:
                </label>
                <Field
                  className="block font-inherit rounded-lg border-2 border-[#ccc] border-solid p-1 w-full"
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter User Email"
                  disabled
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500"
                />
              </div>

              <div className="mb-2">
                <label
                  className="font-semibold mb-2 block"
                  htmlFor="academicPosition"
                >
                  User Academic Position:
                </label>
                <Field
                  className="block font-inherit rounded-lg border-2 border-[#ccc] border-solid p-1 w-full"
                  type="text"
                  id="academicPosition"
                  name="academicPosition"
                  placeholder="Enter User Academic Position"
                />
                <ErrorMessage
                  name="academicPosition"
                  component="div"
                  className="text-red-500"
                />
              </div>

              <div className="mb-2">
                <label className="font-semibold mb-2 block" htmlFor="URL">
                  User URL:
                </label>
                <Field
                  className="block font-inherit rounded-lg border-2 border-[#ccc] border-solid p-1 w-full"
                  type="text"
                  id="URL"
                  name="URL"
                  placeholder="Enter User URL"
                />
                <ErrorMessage
                  name="URL"
                  component="div"
                  className="text-red-500"
                />
              </div>

              <div className="mt-4">
                <button
                  className="flex items-center justify-center px-8 py-2 font-semibold text-white transition duration-200 ease-in bg-indigo-500 rounded-lg hover:bg-indigo-700"
                  type="submit"
                >
                  <BiPlus className="mr-2" />
                  Update User
                </button>
              </div>
            </Form>
          </Formik>
        </div>
      </div>
    </>
  );
};

export default UpdateUser;
