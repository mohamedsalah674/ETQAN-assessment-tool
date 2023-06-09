import React, { useState, useEffect } from "react";
import buildClient from "../../../../../../../hooks/build";
import { useRouter } from "next/router";
import { FaTrash, FaEdit, FaSave } from "react-icons/fa";
import { toast } from "react-toastify";
import SideNavbar from "../../../../../../../components/SideNavbar";
const AssessmentTable = ({ PIs, initialAssessmentMethods }) => {
  const router = useRouter();
  const { courseId, instructorId, programId } = router.query;
  const links = [
    {
      text: "back to your course",
      href: `/instructor/${instructorId}/programs/${programId}/courses/${courseId}/`,
      icon: "/icons/back.svg",
      alt: "programs",
    },
    // Add more links as needed
  ];
  const [formOpen, setFormOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedAssessment, setSelectedAssessment] = useState(null);
  const [assessmentMethods, setAssessmentMethods] = useState(
    initialAssessmentMethods
  );
  const [newAssessmentMethod, setNewAssessmentMethod] = useState({
    assessmentMethod: "",
    methodMark: 0,
    piId: "",
    targetPIs: [],
  });
  const [addedMethods, setAddedMethods] = useState([]); // Added assessment methods

  // useEffect(() => {
  //   const client = buildClient('')
  //   const fetchAssessmentMethods = async () => {
  //     try {
  //       const response = await client.get(
  //         `/api/courses/${courseId}/assessment-methods`
  //       );
  //       setAssessmentMethods(response.data);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };

  //   fetchAssessmentMethods();
  // }, [courseId]);

  const handleAddAssessmentMethod = () => {
    setFormOpen(true);
    setEditMode(false);
    setSelectedAssessment(null);
    setNewAssessmentMethod({
      assessmentMethod: "",
      methodMark: 0,
      piId: "",
      targetPIs: [],
    });
  };

  const handleEditAssessmentMethod = (assessmentMethod) => {
    setFormOpen(true);
    setEditMode(true);
    setSelectedAssessment(assessmentMethod);
    setNewAssessmentMethod({
      assessmentMethod: assessmentMethod.assessmentMethod,
      methodMark: assessmentMethod.methodMark,
      piId: "",
      targetPIs: assessmentMethod.targetPIs,
    });
  };

  const handleFormInputChange = (e) => {
    const { name, value } = e.target;
    setNewAssessmentMethod((prevMethod) => ({
      ...prevMethod,
      [name]: value,
    }));
  };

  const handleAddPI = () => {
    const { piId } = newAssessmentMethod;
    if (piId && !newAssessmentMethod.targetPIs.includes(piId)) {
      setNewAssessmentMethod((prevMethod) => ({
        ...prevMethod,
        targetPIs: [...prevMethod.targetPIs, piId],
      }));
      toast.success("PI added successfully!");
    } else {
      toast.error("An Error has occurred!");
    }
  };

  const handleRemovePI = (piId) => {
    setNewAssessmentMethod((prevMethod) => ({
      ...prevMethod,
      targetPIs: prevMethod.targetPIs.filter((id) => id !== piId),
    }));
    toast.success("PI removed successfully!");
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (newAssessmentMethod.assessmentMethod.trim() === "") {
      toast.error("Name can't be empty");
      return;
    }
    if (newAssessmentMethod.assessmentMethod.length < 3) {
      toast.error("Name is too short");
      return;
    }
    if (
      isNaN(newAssessmentMethod.methodMark) ||
      newAssessmentMethod.methodMark <= 0
    ) {
      toast.error("Mark should be a positive number ");
      return;
    }
    if (newAssessmentMethod.methodMark > 500) {
      toast.error("Mark should be equal or less than 500 ");
      return;
    }
    if (newAssessmentMethod.targetPIs.length === 0) {
      toast.error("Please add at least one PI");
      return;
    }

    if (editMode && selectedAssessment) {
      setAssessmentMethods((prevMethods) =>
        prevMethods.map((method) =>
          method === selectedAssessment
            ? {
                ...newAssessmentMethod,
                targetPIs: [...newAssessmentMethod.targetPIs],
              }
            : method
        )
      );
      toast.success(
        editMode ? "Changes saved successfully!" : "Method added successfully!"
      );
    } else {
      if (newAssessmentMethod.piId === "") {
        toast.error("Please select a PI");
        return;
      }
      setAssessmentMethods((prevMethods) => [
        ...prevMethods,
        {
          ...newAssessmentMethod,
          targetPIs: [...newAssessmentMethod.targetPIs],
        },
      ]);
      toast.success(
        editMode ? "Changes saved successfully!" : "Method added successfully!"
      );
    }

    setFormOpen(false);
    setEditMode(false);
    setSelectedAssessment(null);
    setNewAssessmentMethod({
      assessmentMethod: "",
      methodMark: 0,
      piId: "",
      targetPIs: [],
    });
  };

  const handleDeleteAssessmentMethod = (assessmentMethod) => {
    setAssessmentMethods((prevMethods) =>
      prevMethods.filter((method) => method !== assessmentMethod)
    );
    toast.success("Assessment Method deleted successfully!");
  };
  const handleSaveAssessmentMethods = async () => {
    const assessmentMethodsData = assessmentMethods.map((method) => {
      return {
        assessmentMethod: method.assessmentMethod,
        methodMark: method.methodMark,
        targetPIs: method.targetPIs,
      };
    });
    try {
      const client = buildClient('')
      // Make the PUT request
      await client
        .put(`/api/assessment/courses/${courseId}/`, {
          assessmentMethods: assessmentMethodsData,
        })
        .then(() => {
          toast.success("Assesment Methods saved successfully!");
        });

      console.log("Assessment methods saved successfully!");
      // toast.success("Assessment methods saved successfully!");
      // Reset the addedMethods state
      setAddedMethods([]);
    } catch (error) {
      console.log("Error saving assessment methods:", error);
      toast.error("Error saving assessment methods:", error);
    }
  };
  
  return (
    <>
      <SideNavbar links={links} />
      <div className="bg-gray-800 flex justify-center items-center min-h-screen ">
        <div className="w-[60%] ml-12 bg-white rounded-lg shadow-lg p-6 my-4">
          <h1 className="text-2xl font-bold mb-4">Assessment Methods</h1>
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr>
                <th className="p-2 border border-gray-300">
                  Assessment Method
                </th>
                <th className="p-2 border border-gray-300">Total Mark</th>
                <th className="p-2 border border-gray-300">
                  Performance Indicators
                </th>
                <th className="p-2 border border-gray-300">Actions</th>
              </tr>
            </thead>
            <tbody>

              
              {assessmentMethods.map((method, index) => (
                <tr key={index} className="text-center">
                  <td className="p-2 border border-gray-300">
                    {method.assessmentMethod}
                  </td>
                  <td className="p-2 border border-gray-300">
                    {method.methodMark}
                  </td>
                  <td className="p-2 border border-gray-300">
                    {method.targetPIs.map((piId) => {
                      const pi = PIs.find((pi) => pi._id === piId);
                      return (
                        <span
                          key={piId}
                          className="bg-gray-200 rounded-full px-2 py-1 text-xs mr-1"
                        >
                          {pi ? (
                            `SO.${pi.SO_number} - PI.${pi.number}: ${pi.description}`
                          ) : (
                            <span>This PI has been removed </span>
                          )}
                        </span>
                      );
                    })}
                  </td>
                  <td className="p-2 border border-gray-300">
                    <FaEdit
                      className="text-blue-500 cursor-pointer mr-2"
                      onClick={() => handleEditAssessmentMethod(method)}
                    />
                    <FaTrash
                      className="text-red-500 cursor-pointer"
                      onClick={() => handleDeleteAssessmentMethod(method)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button
            className="bg-blue-500 text-white rounded-lg px-4 py-2 mt-4"
            onClick={handleAddAssessmentMethod}
          >
            Add Assessment Method
          </button>
          {formOpen && (
            <form
              onSubmit={handleFormSubmit}
              className="bg-white rounded-lg p-6"
            >
              <h2 className="text-xl font-bold mb-4">
                {editMode ? "Edit Assessment Method" : "Add Assessment Method"}
              </h2>
              <div className="mb-4">
                <label className="block mb-2" htmlFor="assessmentMethod">
                  Assessment Method:
                </label>
                <input
                  type="text"
                  name="assessmentMethod"
                  id="assessmentMethod"
                  className="w-full border border-gray-300 rounded-lg p-2"
                  value={newAssessmentMethod.assessmentMethod}
                  onChange={handleFormInputChange}
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2" htmlFor="methodMark">
                  Total Mark:
                </label>
                <input
                  type="number"
                  name="methodMark"
                  id="methodMark"
                  className="w-full border border-gray-300 rounded-lg p-2"
                  value={newAssessmentMethod.methodMark}
                  onChange={handleFormInputChange}
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2" htmlFor="piId">
                  Select Performance Indicator:
                </label>
                <select
                  name="piId"
                  id="piId"
                  className="w-full border border-gray-300 rounded-lg p-2"
                  value={newAssessmentMethod.piId}
                  onChange={handleFormInputChange}
                >
                  <option value="">Select PI</option>
                  {PIs.map((pi) => (
                    <option key={pi._id} value={pi._id}>
                      {pi ? (
                        `SO.${pi.SO_number} - PI.${pi.number}: ${pi.description}`
                      ) : (
                        <span>This PI has been removed </span>
                      )}
                    </option>
                  ))}
                </select>
                <button
                  type="button"
                  className="bg-blue-500 text-white rounded-lg px-4 py-2 mt-2"
                  onClick={handleAddPI}
                >
                  Add PI
                </button>
              </div>
              {newAssessmentMethod.targetPIs.map((piId, index) => {
                const pi = PIs.find((pi) => pi._id === piId);
                return (
                  <span
                    key={pi ? pi._id : index}
                    className="bg-gray-200 rounded-full px-2 py-1 text-xs mr-1 flex items-center"
                  >
                    {pi ? (
                      `SO.${pi.SO_number} - PI.${pi.number}: ${pi.description}`
                    ) : (
                      <span>This PI has been removed </span>
                    )}
                    <FaTrash
                      className="text-red-500 cursor-pointer ml-2"
                      onClick={() => handleRemovePI(piId)}
                    />
                  </span>
                );
              })}

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-green-500 text-white rounded-lg px-4 py-2"
                >
                  {editMode ? "Save Changes" : "Add Method"}
                </button>
                <button
                  type="button"
                  className="bg-red-500 text-white rounded-lg px-4 py-2 ml-2"
                  onClick={() => setFormOpen(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
          <button
            type="button"
            className="bg-green-500 text-white rounded-lg px-4 py-2 ml-2"
            onClick={handleSaveAssessmentMethods}
          >
            Save Assessment Methods
          </button>
        </div>
      </div>
    </>
  );
};

export async function getServerSideProps(context) {
  const { programId, courseId } = context.query;
  const client = buildClient(context)

  try {
    const courseResponse = await client.get(
      `/api/assessment/courses/${courseId}/`
    );
    const initialAssessmentMethods = courseResponse.data.data.assessmentMethods;

    const sosResponse = await client.get(
      `/api/prgservice/programs/${programId}/sos`
    );
    const sosData = await sosResponse.data.data;
    const PIs = sosData.flatMap((so) =>
      so.PIs.map((pi) => ({
        ...pi,
        SO_number: so.SO_number,
      }))
    );

    return {
      props: {
        programId,
        PIs,
        initialAssessmentMethods,
      },
    };
  } catch (error) {
    console.log("Error fetching data:", error);

    return {
      props: {
        programId,
        PIs: [],
      },
    };
  }
}

export default AssessmentTable;
