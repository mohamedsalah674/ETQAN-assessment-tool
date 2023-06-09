import { useRef } from 'react';
import { useRouter } from 'next/router';
import { Field, Formik, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { BiPlus } from 'react-icons/bi';
import buildClient from '../../../hooks/build';
import { ToastContainer, toast } from 'react-toastify';

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  role: Yup.string().required('Role is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  academicPosition: Yup.string().required('Academic Position is required'),
  password: Yup.string().required('Password is required'),
  url: Yup.string().required('URL is required'),
});

const NewUserForm = () => {
  const router = useRouter();
  const roles = [
    { label: 'Admin', value: 'admin' },
    { label: 'Instructor', value: 'instructor' },
    { label: 'Head of Department', value: 'head_of_department' },
    { label: 'Dean', value: 'dean' },
    { label: 'Coordinator', value: 'coordinator' },
  ];

  const handleSubmit = async (values, { setSubmitting }) => {
    const { name, role, email, academicPosition, password, url } = values;

    const payload = {
      role,
      password,
      name,
      email,
      URL: url,
      academicPosition,
    };

    try {
      const client = buildClient('');
      const response = await client.post(`/api/admin/users/`, payload);
      console.log(response.data); // handle success response

      toast.success('add user success', {
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
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen w-full sm:w-9/12 md:w-7/12 lg:w-5/12 xl:w-5/12 p-0 sm:p-12 sm:px-16 mx-auto overflow-x-auto">
      <div className="mx-auto px-8 py-12 bg-white border-0 shadow-lg rounded-3xl sm:rounded-3xl md:rounded-4xl lg:rounded-5xl xl:rounded-6xl">
        <div className="">
          <h1 className="pb-20 text-4xl font-bold text-slate-900 ">
            Please Enter User Info
          </h1>
        </div>

        <Formik
          initialValues={{
            name: '',
            role: '',
            email: '',
            academicPosition: '',
            password: '',
            url: '',
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ handleSubmit, values, isSubmitting }) => (
            <form
              className="p-4 bg-white rounded w-full"
              onSubmit={handleSubmit}
            >
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
                  className="text-red-500 text-sm"
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
                >
                  <option value="">Select Role</option>
                  {roles.map((role) => (
                    <option key={role.value} value={role.value}>
                      {role.label}
                    </option>
                  ))}
                </Field>
                <ErrorMessage
                  name="role"
                  component="div"
                  className="text-red-500 text-sm"
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
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <div className="mb-2">
                <label
                  className="font-semibold mb-2 block"
                  htmlFor="academicPosition"
                >
                  Academic Position:
                </label>
                <Field
                  className="block font-inherit rounded-lg border-2 border-[#ccc] border-solid p-1 w-full"
                  type="text"
                  id="academicPosition"
                  name="academicPosition"
                  placeholder="Enter Academic Position"
                />
                <ErrorMessage
                  name="academicPosition"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <div className="mb-2">
                <label className="font-semibold mb-2 block" htmlFor="password">
                  Password:
                </label>
                <Field
                  className="block font-inherit rounded-lg border-2 border-[#ccc] border-solid p-1 w-full"
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Enter Password"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <div className="mb-2">
                <label className="font-semibold mb-2 block" htmlFor="url">
                  User URL:
                </label>
                <Field
                  className="block font-inherit rounded-lg border-2 border-[#ccc] border-solid p-1 w-full"
                  type="text"
                  id="url"
                  name="url"
                  placeholder="Enter User URL"
                />
                <ErrorMessage
                  name="url"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <button
                type="submit"
                className="w-full cursor-pointer flex justify-center text-center text-md text-white px-4 py-2 border rounded-md hover:border-gray-700 hover:text-black bg-gradient-to-r to-blue-700 from-sky-400"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Adding User...' : 'Add User'}
                <span className="">
                  <BiPlus size={24} />
                </span>
              </button>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default NewUserForm;
