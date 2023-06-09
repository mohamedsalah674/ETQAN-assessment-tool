import { useRef, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { BiPlus, BiTrashAlt } from 'react-icons/bi';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import buildClient from '../../../hooks/build';
import { toast } from 'react-toastify';
import Link from "next/link";


function UpdateFacultyForm({ faculty }) {
  const router = useRouter();
  const formRef = useRef(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showEmailField, setShowEmailField] = useState(false);
  const [headEmail, setHeadEmail] = useState("");



  useEffect(() => {
    const fetchDepartmentData = async () => {
      try {
         const client = buildClient('');
        const response = await client.get(`/api/admin/department/${router.query.id}`);
        const { department_code, name } = response.data;
        const departmentData = { department_code, name };
        formRef.current.setValues(departmentData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchDepartmentData();
  }, [router.query.id]);

  const handleSubmit = async (values) => {
    const { name, department_code } = values;

    const payload = {
      name,
      department_code,
    };

    try {
       const client = buildClient('');
      const res = await client.put(
        `/api/admin/department/${router.query.id}`,
        payload
      );
      window.history.back();
      toast.success('Department has been updated successfully', {
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
      const res = await client.delete(`/api/admin/department/${router.query.id}`);
      window.history.back();
      toast.success('Department has been deleted successfully', {
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
  const handleAddHead = async () => {
    if (!headEmail) {
      toast.error("Please enter a Head of department email", {
        duration: 3000,
        position: "top-center",
        style: {
          background: "#D32F2F",
          color: "#fff",
          fontSize: "20px",
        },
      });
    } else {
      try {
        const client = buildClient("");
        const response = await client.post(
          `/api/admin/add_head_department/${router.query.id}`,
          { email: headEmail }
        );
        // Display a success message or update the necessary data.
        toast.success("Head of department has been added successfully", {
          duration: 1000,
          position: "top-center",
          style: {
            background: "#2E7D32",
            color: "#fff",
            fontSize: "20px",
          },
        });
      } catch (error) {
        console.error(error);
        // Display an error message if the request fails.
        toast.error(error.response.data.errors[0].message, {
          duration: 3000,
          position: "top-center",
          style: {
            background: "#D32F2F",
            color: "#fff",
            fontSize: "20px",
          },
        });
      }
    }
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('department name is required'),
  });

  return (
    <>
      <div className="bg-gray-900 flex flex-col items-center w-full lg:pl-20 md:pl-20 xl:pl-20 sm:pl-20">
        <div className="min-h-screen mt-40 w-full sm:w-9/12 md:w-7/12 lg:w-5/12 xl:w-5/12 p-0 sm:p-12 sm:px-16 mx-auto overflow-x-auto">
          <div className="mx-auto px-8 py-12 bg-white border-0 shadow-lg rounded-3xl sm:rounded-3xl md:rounded-4xl lg:rounded-5xl xl:rounded-6xl">
            <div className="">
              <h1 className="pb-20 text-4xl font-bold text-slate-900">
                Please Enter department Info
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
              <Form className="p-4  bg-white rounded w-full">
                <div className="mb-2">
                  <label className="font-semibold mb-2 block" htmlFor="name">
                    department Name:
                  </label>
                  <Field
                    className="block font-inherit rounded-lg border-2 border-[#ccc] border-solid p-1 w-full"
                    type="text"
                    id="name"
                    name="name"
                    placeholder="department Name"
                  />
                  <ErrorMessage
                    className="text-red-500 text-sm"
                    component="div"
                    name="name"
                  />
                </div>
                <div className="mb-2">
                  <label className="font-semibold mb-2 block" htmlFor="code">
                    department Code:
                  </label>
                  <Field
                    className="block font-inherit rounded-lg border-2 border-[#ccc] border-solid p-1 w-full"
                    type="text"
                    id="department_code"
                    name="department_code"
                    placeholder="department Code"
                    readOnly
                  />
                </div>
                {showEmailField && (
                  <div className="mb-2">
                    <label
                      className="font-semibold mb-2 block"
                      htmlFor="headEmail"
                    >
                      Head Email:
                    </label>
                    <Field
                      className="block font-inherit rounded-lg border-2 border-[#ccc] border-solid p-1 w-full"
                      type="email"
                      id="headEmail"
                      name="headEmail"
                      placeholder="Head Email"
                      value={headEmail}
                      onChange={(e) => setHeadEmail(e.target.value)}
                    />
                  </div>
                )}

                {showEmailField && (
                  <div className="mb-4">
                    <button
                      type="button"
                      onClick={handleAddHead}
                      className="bg-blue-500 hover:bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg"
                    >
                      <BiPlus className="inline-block" />
                      Add Head Of Department
                    </button>
                  </div>
                )}

                {!showEmailField && (
                  <div className="mb-4">
                    <button
                      type="button"
                      onClick={() => setShowEmailField(true)}
                      className="bg-blue-800 mt-4 hover:bg-blue-900 text-white font-semibold py-2 px-4 rounded-lg"
                    >
                      <BiPlus className="inline-block" />
                      Add Head Of Department
                    </button>
                  </div>
                )}


                <div className="flex justify-between mt-8">
               
                <button
                type="submit"
                className="bg-green-700 w-60 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg"
              >
                Update Department
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
                    Delete Department
                  </button>
                )}

               
              </div>
              <Link href="/admin/department">
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

export async function getServerSideProps(context) {
  const id = context.params.id;
  const res = await fetch('http://localhost:4000/api/admin/faculty/' + id);
  const faculty = await res.json();

  
  return {
    props: {
      faculty,
    },
  };
}

export default UpdateFacultyForm;
