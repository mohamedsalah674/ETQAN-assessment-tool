import { useState } from "react";
import Router from "next/router";
import { useRouter } from "next/router";
import SideNavbar from "../../../../../../../components/SideNavbar";
import { toast } from "react-toastify";
import buildClient from "../../../../../../../hooks/build";


export default function Home(props) {
  const router = useRouter();
  const { courseId, programId, instructorId } = router.query;

  const links = [
    {
      text: "back to your course",
      href: `/instructor/${instructorId}/programs/${programId}/courses/${courseId}/`,
      icon: "/icons/back.svg",
      alt: "programs",
    },
    // Add more links as needed
  ];
  const url = `/api/assessment/courses/${courseId}/topics`;

  const [topics, setTopics] = useState(props.topics);
  const [topic, setTopic] = useState(0);
  const [name, setName] = useState("");
  const [weeks, setWeeks] = useState("");
  const [abetChecked, setAbetChecked] = useState([]);
  const [CLOs, setCLOs] = useState([]);
  const [inEdit, setInEdit] = useState(0);

  const handleChange = ({ currentTarget: input }) => {
    // console.log(input);
    if (input.name === "name") setName(input.value);
    if (input.name === "weeks") setWeeks(input.value);
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

  const addTopic = async (e) => {
    e.preventDefault();
    const client = buildClient('')
    if (name.trim() === "") {
      toast.error("Topic name can't be empty");
      return;
    }
    if (!weeks) {
      toast.error("Weeks must not be empty");
      return;
    }
    if (name.length < 3) {
      toast.error("Topic name too short");
      return;
    }
    if (isNaN(weeks)) {
      toast.error("Weeks must be a number");
      return;
    }
    try {
      if (topic._id) {
        try {
          const { data } = await client.put(url + "/" + topic._id, {
            name: name,
            weeks: weeks,
            CLOs: abetChecked,
          });
          console.log("ddaaa", data);
          const originalTopics = [...topics];
          const index = originalTopics.findIndex((t) => t._id === topic._id);
          originalTopics[index] = data.data.topic;
          console.log("QQQ", originalTopics);
          setTopics(originalTopics);
          setTopic(topic);
          setName("");
          setWeeks("");
          setAbetChecked([]);
          toast.success("Topic Updated Successfully");
          console.log(data.message);
        } catch {
          toast.error(
            "An Error has occurred. Check your Internet and try again"
          );
        }
      } else {
        try {
          const { data } = await client.post(url, {
            name: name,
            weeks: weeks,
            CLOs: abetChecked,
          });
          setTopics((prev) => [...prev, data.data.topic]);
          setTopic("");
          setName("");
          setWeeks("");
          toast.success("Topic Updated Successfully");
          console.log(data.message);
        } catch {
          toast.error(
            "An Error has occurred. Check your Internet and try again"
          );
        }
      }
      // Router.reload(window.location.pathname);
      setStateForm(0);
    } catch (error) {
      console.log(error);
    }
  };

  const editTopic = (id) => {
    // console.log(topics);
    const currentTopic = topics.filter((topic) => topic._id === id);
    console.log("currentTopic", currentTopic);
    console.log(currentTopic[0].CLOs);
    setTopic(currentTopic[0]);
    setName(currentTopic[0].name);
    setWeeks(currentTopic[0].weeks);
    setStateForm(true);
    setCLOs(currentTopic[0].CLOs);
    console.log("EEEEWWWW", currentTopic[0].CLOs);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const deleteTopic = async (id) => {
    const client=buildClient('')
    try {
      const { data } = await client.delete(url + "/" + id);
      toast.success("Topic deleted successfully");
      setTopics((prev) => prev.filter((topic) => topic._id !== id));
      setTopic("");
      console.log(data.message);
    } catch (error) {
      toast.error("An error has occured. Check your connection");
      console.log(error);
    }
  };

  const criteria = [
    "1- an ability to identify, formulate, and solve complex engineering problems by applying principles of engineering, science, and mathematics.",
    "2- an ability to apply engineering design to produce solutions that meet specified needs with consideration of public health, safety, and welfare, as well as global, cultural, social, environmental, and economic factors.",
    "3- an ability to communicate effectively with a range of audiences.",
    "4- an ability to recognize ethical and professional responsibilities in engineering situations and make informed judgments, which must consider the impact of engineering solutions in global, economic, environmental, and societal contexts.",
    "5- an ability to function effectively on a team whose members together provide leadership, create a collaborative and inclusive environment, establish goals, plan tasks, and meet objectives.",
    "6- an ability to develop and conduct appropriate experimentation, analyze and interpret data, and use engineering judgment to draw conclusions.",
    "7- an ability to acquire and apply new knowledge as needed, using appropriate learning strategies.",
  ];

  const [stateForm, setStateForm] = useState(false);
  const showForm = () => {
    if (stateForm == true)
      return (
        <form
          onSubmit={addTopic}
          className="flex items-center  justify-center w-full  mb-8 flex-col border-2 border-[#00b4ba] rounded border-dashed animation-spin"
        >
          <div className="w-3/4">
            <label className="mr-2 block">Topic </label>
            <input
              className="w-full p-5 flex-1 h-[40px] border border-1 border-[#00b4ba] rounded bg-white shadow-md outline-none"
              type="text"
              placeholder="Topic ..."
              onChange={handleChange}
              value={name}
              name="name"
            />
          </div>
          <div className="w-3/4">
            <label className="mr-2 block">Weeks</label>
            <input
              className="w-full p-5 flex-1 h-[40px] border border-1 border-[#00b4ba] rounded bg-white shadow-md outline-none"
              type="text"
              placeholder="Weeks ..."
              onChange={handleChange}
              value={weeks}
              name="weeks"
            />
          </div>
          <div className="p-3">
            <span className="font-bold italic">
              Current SOs covered by this topic:{" "}
            </span>
            {topic.CLOs ? topic.CLOs.join(",") : topic.CLOs}
          </div>
          <div>
            {criteria.map((el, index) => {
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
            })}
            <div className="flex items-center justify-center">
              <button
                type="submit"
                className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl  focus:outline-none dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
              >
                {topic._id ? "Update" : "Add"}
              </button>
            </div>
          </div>
        </form>
      );
    else return null;
  };

  return (
    <>
      <SideNavbar links={links} />
      <main className="bg-gray-900 min-h-screen w-full flex flex-col items-center justify-center">
        <div className="lg:w-1/2 flex flex-col items-center p-10 border rounded-xl bg-white my-10 w-[90%]">
          <h1 className="mb-5 text-4xl text-transparent bg-clip-text bg-gradient-to-r to-blue-500 from-sky-300">
            Course Topics
          </h1>
          <button
            className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl  focus:outline-none dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
            onClick={() => setStateForm(!stateForm)}
          >
            Add Topic
          </button>
          {showForm()}
          {topics.map((topic) => (
            <div
              className="w-full flex justify-between bg-sky-100 shadow-md m-1 p-5 rounded-xl  items-center hover:bg-sky-300"
              key={topic._id}
            >
              <div className="text-center w-full">
                <div>
                  <span className="pt-3 text-center font-bold text-3xl  italic text-transparent bg-clip-text bg-gradient-to-b to-sky-500 from-gray-600 pb-8">
                    Topic:{" "}
                  </span>
                  <p className="font-bold  p-5 m-5 text-center ">
                    {topic.name}
                  </p>
                </div>
                <div className="flex flex-row justify-around">
                  <div>
                    <span className="font-bold italic bg-white p-1 rounded-lg  text-center mr-2">
                      Weeks:{" "}
                    </span>
                    {topic.weeks}
                  </div>
                  <div>
                    <span className="font-bold italic bg-white p-1 rounded-lg  text-center mr-2">
                      CLOs:{" "}
                    </span>
                    {topic.CLOs.join(",")}
                  </div>
                </div>
              </div>
              <div>
                <div className="">
                  <button
                    onClick={() => editTopic(topic._id)}
                    className="outline-none border-none h-[20px] w-[20px] text-center text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl  focus:outline-none dark:focus:ring-cyan-800  rounded-lg text-sm text-center"
                  >
                    &#9998;
                  </button>
                </div>
                <button
                  onClick={() => deleteTopic(topic._id)}
                  className="outline-none border-none h-[20px] w-[20px] text-center text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl  focus:outline-none dark:focus:ring-cyan-800  rounded-lg text-sm text-center"
                >
                  &#10006;
                </button>
              </div>
            </div>
          ))}
          {topics.length === 0 && (
            <h2 className="w-full text-3xl flex items-center justify-center border-5 text-black">
              No topics
            </h2>
          )}
        </div>
      </main>
    </>
  );
}

export const getServerSideProps = async (context) => {
  const client =buildClient(context)
  const { courseId } = context.query;
  const url = `/api/assessment/courses/${courseId}/topics/`;
  const { data } = await client.get(url);
  // console.log([...data.CLOs]);
  return {
    props: {
      topics: data.data.topics,
    },
  };
};
