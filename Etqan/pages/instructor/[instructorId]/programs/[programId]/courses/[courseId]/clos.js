import { useState } from "react";
import { Router, useRouter } from "next/router";
import SideNavbar from "../../../../../../../components/SideNavbar";
import { toast } from "react-toastify";
import buildClient from "../../../../../../../hooks/build";
export default function Home(props) {
  const router = useRouter();
  const { courseId, programId, instructorId, role } = router.query;

  const links = [
    {
      text: "back to your course",
      href: `/instructor/${instructorId}/programs/${programId}/courses/${courseId}/`,
      icon: "/icons/back.svg",
      alt: "programs",
    },
    // Add more links as needed
  ];
  console.log("props", props);

  const url = `/api/assessment/courses/${courseId}/clos`;

  const [CLOs, setCLOs] = useState(props.clos);
  const [CLO, setCLO] = useState("");
  const [description, setDescription] = useState("");
  const [number, setNumber] = useState("");
  const [inEdit, setInEdit] = useState(0);
  const handleChange = ({ currentTarget: input }) => {
    if (input.name === "description") setDescription(input.value);
    if (input.name === "CLO_number") setNumber(input.value);
  };

  const addCLO = async (e) => {
    
	const client = buildClient('');
    e.preventDefault();
    try {
      if (description.trim() === "") {
        toast.error("CLO description can't be empty");
        return;
      }
      if (description.length < 4) {
        toast.error("CLO description is too short");
        return;
      }
      if (CLO._id) {
        try {
          const { data } = await client.put(url + "/" + CLO._id, {
            description: description,
            CLO_number: number,
          });
          const originalCLOs = [...CLOs];
          const index = originalCLOs.findIndex((t) => t._id === CLO._id);
          console.log("edit", data.data.clo);
          originalCLOs[index] = await data.data.clo;
          setCLOs(originalCLOs);
          setCLO("");
          setDescription("");
          setNumber("");
          toast.success("CLO Updated Successfully");
          console.log(data.message);
        } catch {
          toast.error(
            "An Error has occurred! Check your Internet and try again"
          );
        }
      } else {
        try {
          const { data } = await client.post(url, {
            description: description,
            CLO_number: number,
          });
          console.log("dddd", data);
          setCLOs((prev) => [...prev, data.data.clo]);
          setCLO("");
          setDescription("");
          setNumber("");
          console.log(data.message);
          toast.success("CLO Added Successfully");
        } catch {
          toast.error(
            "An Error has occurred! Check your Internet and try again"
          );
        }
      }

      // Router.reload(window.location.pathname);
      setStateForm(0);
    } catch (error) {
      toast.error("An Error has occurred! Check your Internet and try again");
      console.log(error);
    }
  };

  const editCLO = (id) => {
    const currentCLO = CLOs.filter((CLO) => CLO._id === id);
    setCLO(currentCLO[0]);
    setDescription(currentCLO[0].description);
    setNumber(currentCLO[0].CLO_number);
    setStateForm(true);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const deleteCLO = async (id) => {
    const client=buildClient('')
    try {
      const { data } = await client.delete(url + "/" + id);
      setCLOs((prev) => prev.filter((CLO) => CLO._id !== id));
      toast.success("CLO Deleted Successfully");

      console.log(data.message);
    } catch (error) {
      console.log(error);
      toast.error("An Error has occurred! Check your Internet and try again");
    }
  };

  const [stateForm, setStateForm] = useState(false);
  const showForm = () => {
    if (stateForm == true)
      return (
        <form
          onSubmit={addCLO}
          className="flex items-center  justify-center w-full  mb-8 flex-col border-2 border-[#00b4ba] rounded border-dashed animation-spin"
        >
          <div className="w-3/4">
            <label className="mr-2 block">Enter CLO Description:</label>
            <input
              className="w-full p-5 flex-1 h-[40px] border border-1 border-[#00b4ba] rounded bg-white shadow-md outline-none"
              type="text"
              placeholder="CLO ..."
              onChange={handleChange}
              value={description}
              name="description"
            />
          </div>
          {/* <div className="w-3/4">
            <label className="mr-2 block">Number</label>
            <input
              className="w-full p-5 flex-1 h-[40px] border border-1 border-[#00b4ba] rounded bg-white shadow-md outline-none"
              type="text"
              placeholder="Number ..."
              onChange={handleChange}
              value={number}
              name="CLO_number"
            />
          </div> */}

          <div className="flex items-center justify-center mt-4">
            <button
              type="submit"
              className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl  focus:outline-none dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
            >
              {CLO._id ? "Update" : "Add"}
            </button>
          </div>
        </form>
      );
    else return null;
  };

  return (
    <>
      <SideNavbar links={links} />
      <main className="bg-gray-900 min-h-screen w-full flex flex-col items-center justify-center pb-8">
        <div className="lg:w-1/2 flex flex-col items-center p-10 border rounded-xl bg-white mt-10 w-[90%]">
          <h1 className="mb-5 text-4xl text-transparent bg-clip-text bg-gradient-to-r to-blue-500 from-sky-300">
            Course Learning Objectives (CLOs)
          </h1>
          <button
            className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl  focus:outline-none dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
            onClick={() => setStateForm(!stateForm)}
          >
            Add CLO
          </button>
          {showForm()}
          {CLOs.length ? (
            CLOs.map((CLO) => (
              <div
                className="w-full flex justify-between bg-sky-100 shadow-md m-1 p-5 rounded-xl  items-center hover:bg-sky-300"
                key={CLO._id}
              >
                <div className="text-center w-full">
                  <div>
                    <span className="pt-3 text-center font-bold text-3xl  italic text-transparent bg-clip-text bg-gradient-to-b to-sky-500 from-gray-600 pb-8">
                      CLO:{" "}
                    </span>
                    <p className="font-bold  p-5 m-5 text-center ">
                      [{CLO.CLO_number}]: {CLO.description}
                    </p>
                  </div>
                  <div className="flex flex-row justify-around">
                    {/* <div>
                    <span className="font-bold italic bg-white p-1 rounded-lg  text-center mr-2">
                      #:{" "}
                    </span>
                    {CLO.CLO_number}
                  </div> */}
                  </div>
                </div>
                <div>
                  <div className="">
                    <button
                      onClick={() => editCLO(CLO._id)}
                      className="outline-none border-none h-[20px] w-[20px] text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl  focus:outline-none dark:focus:ring-cyan-800  rounded-lg text-sm text-center"
                    >
                      &#9998;
                    </button>
                  </div>
                  <button
                    onClick={() => deleteCLO(CLO._id)}
                    className="outline-none border-none h-[20px] w-[20px] text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl  focus:outline-none dark:focus:ring-cyan-800  rounded-lg text-sm text-center"
                  >
                    &#10006;
                  </button>
                </div>
              </div>
            ))
          ) : (
            <h2 className="w-full text-3xl flex items-center justify-center border-5 text-black">
              There is no CLOs added yet!
            </h2>
          )}
        </div>
      </main>
    </>
  );
}

export const getServerSideProps = async (context) => {
  const client=buildClient(context)
  const { courseId } = context.query;
  const data = await client.get(
    `/api/assessment/courses/${courseId}/clos`
  );
  console.log("ss", data.data.data);
  return {
    props: data.data.data,
  };
};
