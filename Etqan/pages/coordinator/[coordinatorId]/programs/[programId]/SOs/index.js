import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState, useEffect } from "react";
import SideNavbar from "../../../../../../components/SideNavbar";
import { useRouter } from "next/router";
import "react-toastify/dist/ReactToastify.css";
import buildClient from "../../../../../../hooks/build";
// import ConfirmationToast from "../../../../../../components/Confirmation";

export default function Home(props) {
  const router = useRouter();
  const { programId, coordinatorId } = router.query;

  const links = [
    {
      text: "Back to your program",
      href: `/coordinator/${coordinatorId}/dashboard`,
      icon: "/icons/back.svg",
      alt: "programs",
    },
  ];
  const url = `/api/prgservice/programs/${programId}/sos`;

  const [SOs, setSOs] = useState(props.SOs);
  const [SO, setSO] = useState("");
  const [description, setDescription] = useState("");
  const [SO_number, setSoNumber] = useState("");
  const [teaching_methods, setTeachingMethods] = useState("");
  // const [CLOs, setCLOs] = useState([]);
  const [currentCLOs, setCurrentCLOs] = useState([]);
  const [PIs, setPIs] = useState([]);
  const [PI, setPI] = useState("");
  const [abetChecked, setAbetChecked] = useState([]);
  const [PI_description, setPI_description] = useState("");
  const [PI_target, setPI_target] = useState("");
  // const [currentPI, setCurrentPI] = useState("");
  const [inEdit, setInEdit] = useState(0);
  const [piEdit, setPiEdit] = useState(0);

  var variable = "id";
  function handleClick(id, programId, coordinatorId) {
    variable = id;
    router.push(
      `/coordinator/${coordinatorId}/programs/${programId}/SOs/${id}`
    );
  }

  const handleChange = ({ currentTarget: input }) => {
    // console.log(input);
    if (input.name === "description") setDescription(input.value);
    if (input.name === "SO_number") setSoNumber(input.value);
    if (input.name === "teaching_methods") setTeachingMethods(input.value);
    if (input.name === "CLOs") setCurrentCLOs(input.value);
    if (input.name === "PI_description") setPI_description(input.value);
    if (input.name === "PI_target") setPI_target(input.value);
  };

  let updatedAbetList = [];
  const handleAbetCheck = (event) => {
    event.target.defaultChecked = !inEdit;
    updatedAbetList = [...abetChecked];
    if (event.target.checked) {
      updatedAbetList = [...abetChecked, +event.target.value[0]];
    } else {
      updatedAbetList.splice(abetChecked.indexOf(event.target.value), 1);
    }
    setAbetChecked(updatedAbetList);
    console.log(updatedAbetList);
    // let selectedAbetCri = updatedList.map(el=>+el);
  };

  const addSO = async (e) => {
    const client=buildClient('')
    e.preventDefault();
    try {
      setAbetChecked([]);
      if (description.trim() === "") {
        toast.error("SO description can't be empty");
        return;
      }
      if (description.length < 4) {
        toast.warning("Description is too short! ");
        return;
      }
      if (!SO_number) {
        toast.error("SO number can't be empty");
        return;
      }

      if (isNaN(SO_number)) {
        toast.error("SO number must be a number");
        return;
      }
      if (Number(SO_number) <= 0) {
        toast.error("SO number must be a positive number");
        return;
      }
      if (SO._id) {
        const { data } = await client.put(url + "/" + SO._id, {
          description: description,
          SO_number: SO_number,
          teaching_methods: teaching_methods,
          CLOs: abetChecked,
          PIs: PIs,
        });
        const originalSOs = [...SOs];
        const index = originalSOs.findIndex((t) => t._id === SO._id);
        originalSOs[index] = data.data;
        setSOs(originalSOs);
        toast.success("SO has been updated successfully");
        setDescription("");
        setSoNumber("");
        setTeachingMethods([]);
        setCurrentCLOs([]);
        setPIs([]);
        setSO("");

        console.log(data.message);
      } else {
        setAbetChecked([]);
        const { data } = await client.post(url, {
          description: description,
          SO_number: SO_number,
          teaching_methods: teaching_methods,
          CLOs: abetChecked,
          PIs: PIs,
        });

        console.log("aaaasss", data.data.so);
        setSOs((prev) => [...prev, data.data.so]);
        setDescription("");
        setSoNumber("");
        setTeachingMethods([]);
        setCurrentCLOs([]);
        setPIs([]);
        setAbetChecked([]);
        setSO("");

        console.log(data.message);
      }

      // Router.reload(window.location.pathname);
      setCurrentCLOs([]);
      setStateForm(0);
      toast.success("SO has been added successfully");
    } catch (error) {
      console.log(error);
      // toast.error("An Error has occurred. Check your internet connection!");
    }
  };

  const editSO = (id) => {
    const currentSO = SOs.filter((SO) => SO._id === id);
    setSO(currentSO[0]);
    console.log("CurrentCLOS96", currentSO[0].CLOs);
    setDescription(currentSO[0].description);
    setSoNumber(currentSO[0].SO_number);
    setCurrentCLOs(currentSO[0].CLOs);
    setPIs(currentSO[0].PIs);
    setStateForm(true);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const deleteSO = async (id) => {
    const client=buildClient('')
    try {
      const { data } = await client
        .delete(url + "/" + id)
        .then((response) => {
          console.log("IRE values updated:", response.data);
          setSOs((prev) => prev.filter((SO) => SO._id !== id));
          toast.success("SO has been deleted successfully");
        })
        .catch((error) => {
          console.error("Error updating IRE values:", error);
          // toast.error("An Error has occurred. Check your internet connection!");
        });

      console.log(data.message);
    } catch (error) {
      console.log(error);
    }
  };

  const addPI = async (id) => {
    const client = buildClient('')
    try {
      if (PI_description.trim() === "") {
        toast.error("PI description can't be empty!");
        return;
      }
      if (!PI_target) {
        toast.error("PI Target can't be empty!");
        return;
      }
      if (isNaN(PI_target)) {
        toast.error("PI Target must be a number");
        return;
      }
      const numericTarget = Number(PI_target);
      if (numericTarget <= 0) {
        toast.error("PI Target must be a positive number");
        return;
      }
      if (numericTarget > 100) {
        toast.error("PI Target cannot be larger than 100");
        return;
      }

      if (PI._id) {
        console.log("mm", PI._id);
        const { data } = await client.put(
          url + "/" + SO._id + "/pis/" + PI._id,
          {
            description: PI_description,
            target: PI_target,
            number: PIs.length + 1,
          }
        );
        setPIs((prev) => [...prev, data.data]);
        const originalPIs = [...PIs];
        const index = originalPIs.findIndex((t) => t._id === PI._id);
        originalPIs[index] = data.data;
        setPIs(originalPIs);
        setPI_description("");
        setPI_target("");
        setPI("");
        toast.success("PI has been updated successfully");
        console.log(data.message);
      } else {
        const { data } = await client.post(url + "/" + id + "/pis/", {
          description: PI_description,
          target: PI_target,
          number: PIs.length + 1,
        });
        console.log(data.data);
        setPIs((prev) => [...prev, data.data]);
        console.log(data.message);
        toast.success("PI has been added successfully");
        // }
      }
    } catch (error) {
      console.log(error);
      toast.error("An error has occurred. Check your internet connection!");
    }
  };

  const editPI = async (id) => {
    // const currentPI = await PIs.find((PI) => PI._id == id)
    const currentPI = PIs.filter((pi) => pi._id === id);
    setPI(currentPI[0]);
    setPI_description(currentPI[0].description);
    setPI_target(currentPI[0].target);
    window.scrollTo({
      top: 700,
      behavior: "smooth",
    });
    setPiEdit(true);
  };

  const deletePI = async (id) => {
    const client = buildClient('')
    try {
      const { data } = await client.delete(url + "/" + SO._id + "/pis/" + id);
      toast.success("PI has been deleted successfully");
      setPIs((prev) => prev.filter((PI) => PI._id !== id));
      console.log(data.message);
    } catch (error) {
      console.log(error);
      // toast.error("An Error has occurred. Check your internet connection!");
    }
  };

  const [stateForm, setStateForm] = useState(false);
  const showForm = () => {
    if (stateForm == true)
      return (
        <form
          onSubmit={addSO}
          className="flex items-center  h-3/4 justify-center w-full  mb-8 flex-col border-2 border-[#00b4ba] rounded border-dashed animation-spin"
        >
          <div className="w-3/4">
            <label className="mr-2 block">Description</label>
            <input
              className="w-full p-5 flex-1 h-[40px] border border-1 border-[#00b4ba] rounded bg-white shadow-md outline-none"
              type="text"
              placeholder="Description ..."
              onChange={handleChange}
              value={description}
              name="description"
            />
          </div>
          <div className="w-3/4">
            <label className="mr-2 block">SO Number</label>
            <input
              className="w-full p-5 flex-1 h-[40px] border border-1 border-[#00b4ba] rounded bg-white shadow-md outline-none"
              type="text"
              placeholder="SO number ..."
              onChange={handleChange}
              value={SO_number}
              name="SO_number"
            />
          </div>
          {/* <div className="w-3/4">
            <label className="mr-2 block">Teaching methods</label>
            <input
              className="w-full p-5 flex-1 h-[40px] border border-1 border-[#00b4ba] rounded bg-white shadow-md outline-none"
              type="text"
              placeholder="SO number ..."
              onChange={handleChange}
              value={teaching_methods}
              name="teaching_methods"
            />
          </div> */}
          {/* <div className="w-3/4">
            <label className="mr-2 block">PIs</label>
            <input
              className="w-full p-5 flex-1 h-[40px] border border-1 border-[#00b4ba] rounded bg-white shadow-md outline-none"
              type="number"
              placeholder="PIs ..."
              onChange={handleChange}
              value={PIs}
              name="PIs"
            />
          </div> */}
          {/* <div className="p-3">
            <span className="font-bold italic">
              Current CLOs covered by this SO:{" "}
            </span>
            {currentCLOs.join(",")}
          </div> */}
          <div>
            {/* {criteria.map((el, index) => {
              return (
                <div
                  className="flex flex-row m-4 abet-criteria"
                  key={index + 1}
                >
                  <div>
                    <input
                      className="mr-2 w-8 h-8 rounded-xl"
                      type="checkbox"
                      value={el}
                      data-id={index + 1}
                      onChange={handleAbetCheck}
                    />
                  </div>
                  <p> {el}</p>
                </div>
              );
            })} */}

            {SO._id ? (
              <div className="mt-7 flex items-center justify-center flex-col">
                <span className="font-bold italic bg-white p-1 rounded-lg  text-center mr-2 items-center">
                  PIs:{" "}
                </span>
                <div className="w-3/4">
                  <div>
                    <label className="mr-2 block">PI Description</label>
                    <input
                      className="w-full p-5 flex-1 h-[40px] border border-1 border-[#00b4ba] rounded bg-white shadow-md outline-none"
                      type="text"
                      placeholder="PI Description ..."
                      onChange={handleChange}
                      value={PI_description}
                      name="PI_description"
                    />
                  </div>
                  <div>
                    <label className="mr-2 block">PI Target</label>
                    <input
                      className="w-full p-5 flex-1 h-[40px] border border-1 border-[#00b4ba] rounded bg-white shadow-md outline-none"
                      type="text"
                      placeholder="PI Target ..."
                      onChange={handleChange}
                      value={PI_target}
                      name="PI_target"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => addPI(SO._id)}
                    className="outline-none border-none mx-auto px-7 mt-2 py-1 text-center text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl  focus:outline-none dark:focus:ring-cyan-800  rounded-lg text-sm text-center"
                  >
                    {piEdit ? "Update" : "Add"}
                  </button>
                </div>

                <div className="m-5 p-5 w-full">
                  Current Performance Indicators:
                  {PIs.map((PI, index) => (
                    <div
                      key={index + 1}
                      className="flex flex-row items-center border border-black rounded-xl bg-white mb-2"
                    >
                      <div className="w-full break-words px-5">
                        {SO.SO_number}.{index + 1}- {PI.description}
                      </div>
                      <div className="flex space-x-2 px-4 mx-4">
                        <button
                          type="button"
                          onClick={() => {
                            editPI(PI._id);
                          }}
                          className="outline-none border-none text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl  focus:outline-none dark:focus:ring-cyan-800 rounded-lg text-sm text-center"
                        >
                          &#9998;
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            deletePI(PI._id);
                          }}
                          className="outline-none border-none  p-0 text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl  focus:outline-none dark:focus:ring-cyan-800 rounded-lg text-sm text-center"
                        >
                          &#10006;
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <span></span>
            )}
            <div className="flex items-center justify-center">
              <button
                type="submit"
                className="text-white bg-gradient-to-r from-cyan-500 my-2 to-blue-500 hover:bg-gradient-to-bl  focus:outline-none dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
              >
                {SO._id ? "Update" : "Add"}
              </button>
            </div>
          </div>
        </form>
      );
    else return null;
  };
  useEffect(() => console.log("The value of PI after update", PI), [PI]);

  return (
    <>
      <SideNavbar links={links} />
      <main className="bg-gray-900 h-auto min-h-screen w-full flex flex-col items-center justify-center">
        <div className="lg:w-1/2 flex flex-col items-center p-10 border rounded-xl bg-white mt-10 w-[90%] my-8">
          <h1 className="mb-5 text-4xl text-transparent bg-clip-text bg-gradient-to-r to-blue-500 from-sky-300">
            Student Outcomes
          </h1>
          <button
            className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl  focus:outline-none dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
            onClick={() => setStateForm(!stateForm)}
          >
            Add SO
          </button>
          {showForm()}
          {SOs.map((SO) => (
            <div
              className="w-full flex justify-between bg-sky-100 shadow-md m-1 p-5 rounded-xl  items-center hover:bg-sky-300 cursor-pointer"
              key={SO._id}
            >
              <div className="text-center w-full">
                <div>
                  <span className="pt-3 text-center font-bold text-3xl  italic text-transparent bg-clip-text bg-gradient-to-b to-sky-500 from-gray-600 pb-8">
                    SO:{" "}
                  </span>
                  <p className="font-bold  p-5 text-center ">
                    {SO.SO_number}-{SO.description}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    handleClick(SO._id, programId, coordinatorId);
                  }}
                  className="outline-none border-none px-8 py-2 text-center text-white bg-black hover:bg-gray-800 rounded-lg text-sm text-center"
                >
                  View Assessment Page
                </button>
                {/* <div className="flex flex-row justify-around">
                  <div>
                    <span className="font-bold italic bg-white p-1 rounded-lg  text-center mr-2">
                      CLOs:{" "}
                    </span>
                    {SO.CLOs.join(",")}
                  </div>
                </div> */}
                <div className="mt-7">
                  <span className="font-bold italic bg-white p-1 rounded-lg  text-center mr-2 ">
                    PIs:{" "}
                  </span>

                  <div className="mt-5">
                    {SO.PIs ? (
                      SO.PIs.map((PI, index) => (
                        <div
                          key={PI._id}
                          className=" flex items-center justify-center text-center break-words border border-black rounded-xl bg-white mb-2"
                        >
                          {SO.SO_number}.{index + 1}- {PI.description}
                        </div>
                      ))
                    ) : (
                      <div>ok</div>
                    )}
                  </div>
                </div>
              </div>
              <div>
                <div className="">
                  <button
                    onClick={() => editSO(SO._id)}
                    className="outline-none border-none h-[20px] w-[20px] text-center text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl  focus:outline-none dark:focus:ring-cyan-800  rounded-lg text-sm text-center"
                  >
                    &#9998;
                  </button>
                </div>
                <button
                  onClick={() => deleteSO(SO._id)}
                  className="outline-none border-none h-[20px] w-[20px] text-center text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl  focus:outline-none dark:focus:ring-cyan-800  rounded-lg text-sm text-center"
                >
                  &#10006;
                </button>
              </div>
            </div>
          ))}
          {SOs.length === 0 && (
            <h2 className="w-full text-3xl flex items-center justify-center border-5 text-black">
              No SOs
            </h2>
          )}
        </div>
      </main>
    </>
  );
}

export const getServerSideProps = async (context) => {
  const client=buildClient(context)
  const { programId } = context.query;
  const { data } = await client.get(`/api/prgservice/programs/${programId}/sos`);
  console.log(data);
  return {
    props: {
      SOs: data.data,
    },
  };
};