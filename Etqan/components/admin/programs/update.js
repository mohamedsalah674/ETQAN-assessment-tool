import { useRef, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { BiPlus, BiTrashAlt } from "react-icons/bi";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import buildClient from "../../../hooks/build";
import { ToastContainer, toast } from "react-toastify";
import Link from "next/link";

function UpdateProgramForm({ department }) {
  const router = useRouter();
  const formRef = useRef(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showEmailField, setShowEmailField] = useState(false);
  const [coordinatorEmail, setCoordinatorEmail] = useState("");

  useEffect(() => {
    const fetchProgramData = async () => {
      try {
        const client = buildClient("");
        const response = await client.get(
          `/api/admin/program/${router.query.id}`
        );
        const { Program_Id, name } = response.data;
        const programData = { Program_Id, name };
        formRef.current.setValues(programData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProgramData();
  }, [router.query.id]);

  const handleSubmit = async (values) => {
    const { name, Program_Id } = values;

    const payload = {
      name,
      Program_Id,
    };

    try {
      const client = buildClient("");
      const response = await client.put(
        `/api/admin/program/${router.query.id}`,
        payload
      );
      router.back();
      toast.success("Program has been updated successfully", {
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
  };

  const handleDelete = async () => {
    try {
      const client = buildClient("");
      await client.delete(`/api/admin/program/${router.query.id}`);
      router.push("/admin/program");
      toast.success("Program has been deleted successfully", {
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
  };

  const confirmDelete = () => {
    setShowConfirmation(true);
  };

  const cancelDelete = () => {
    setShowConfirmation(false);
  };

  const handleAddCoordinator = async () => {
    if (!coordinatorEmail) {
      toast.error("Please enter a coordinator email", {
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
          `/api/admin/add_coordinator_program/${router.query.id}`,
          { email: coordinatorEmail }
        );
        // Display a success message or update the necessary data.
        toast.success("Coordinator has been added successfully", {
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
    name: Yup.string().required("Program name is required"),
  });

  return (
    <>
      <div className="bg-gray-900 flex flex-col items-center w-full lg:pl-20 md:pl-20 xl:pl-20 sm:pl-20">
        <div className="min-h-screen mt-40 w-full sm:w-9/12 md:w-7/12 lg:w-5/12 xl:w-5/12 p-0 sm:p-12 sm:px-16 mx-auto overflow-x-auto">
          <div className="mx-auto px-8 py-12 bg-white border-0 shadow-lg rounded-3xl sm:rounded-3xl md:rounded-4xl lg:rounded-5xl xl:rounded-6xl">
            <div className="">
              <h1 className="pb-20 text-4xl font-bold text-slate-900">
                Please Enter Program Info
              </h1>
            </div>
            <Formik
              innerRef={formRef}
              initialValues={{
                code: "",
                name: "",
              }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              <Form className="p-4  bg-white rounded w-full">
                <div className="mb-2">
                  <label className="font-semibold mb-2 block" htmlFor="name">
                    Program Name:
                  </label>
                  <Field
                    className="block font-inherit rounded-lg border-2 border-[#ccc] border-solid p-1 w-full"
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Program Name"
                  />
                  <ErrorMessage
                    className="text-red-500 text-sm"
                    component="div"
                    name="name"
                  />
                </div>
                <div className="mb-2">
                  <label className="font-semibold mb-2 block" htmlFor="code">
                    Program Code:
                  </label>
                  <Field
                    className="block font-inherit rounded-lg border-2 border-[#ccc] border-solid p-1 w-full"
                    type="text"
                    id="Program_Id"
                    name="Program_Id"
                    placeholder="Program Code"
                    readOnly
                  />
                </div>

                {showEmailField && (
                  <div className="mb-2">
                    <label
                      className="font-semibold mb-2 block"
                      htmlFor="coordinatorEmail"
                    >
                      Coordinator Email:
                    </label>
                    <Field
                      className="block font-inherit rounded-lg border-2 border-[#ccc] border-solid p-1 w-full"
                      type="email"
                      id="coordinatorEmail"
                      name="coordinatorEmail"
                      placeholder="Coordinator Email"
                      value={coordinatorEmail}
                      onChange={(e) => setCoordinatorEmail(e.target.value)}
                    />
                  </div>
                )}

                {showEmailField && (
                  <div className="mb-4">
                    <button
                      type="button"
                      onClick={handleAddCoordinator}
                      className="bg-blue-500 hover:bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg"
                    >
                      <BiPlus className="inline-block" />
                      Add Coordinator
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
                      Add Coordinator
                    </button>
                  </div>
                )}

                <div className="flex mt-6 justify-between">
                 
                  <button
                  type="submit"
                  className="bg-green-700 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg"
                >
                  Update Program
                </button>
                  {showConfirmation ? (
                    <>
                      <button
                        type="button"
                        onClick={cancelDelete}
                        className="bg-gray-600 hover:bg-gray-500 text-white font-semibold py-2 px-4 rounded-lg"
                      >
                        No
                      </button>
                   
                      <button
                        type="button"
                        onClick={handleDelete}
                        className="bg-red-800 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg"
                      >
                        Yes
                      </button>
                    </>
                  ) : (
                    <button
                      type="button"
                      onClick={confirmDelete}
                      className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg"
                    >
                      <BiTrashAlt className="inline-block " size={25}/>
                      Delete Program
                    </button>
                  )}

                 
                </div>
                <Link href="/admin/program">
                <div className="w-24 mt-6 text-center bg-slate-900  hover:bg-slate-700 text-white font-semibold py-2 px-2 rounded-lg">
                  Cancel
                </div>
              </Link>
              </Form>
            </Formik>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default UpdateProgramForm;
