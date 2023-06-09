import React, { useState } from "react";
import { useRouter } from "next/router";
import SideNavbar from "../../../components/SideNavbar";
import { toast } from "react-toastify";
import buildClient from "../../../hooks/build";
function Coordinator({ user }) {
  const router = useRouter();
  const coordinatorId = router.query.coordinatorId;
  const links = [
    {
      text: `Back to your program`,
      href: `/coordinator/${coordinatorId}/dashboard/`,
      icon: "/icons/back.svg",
      alt: "programs",
    },
  ];
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [role, setRole] = useState(user.role);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const client=buildClient('')
    try {
      const userId = coordinatorId;
      const updatedInstructor = { name, email, role };
      if (name.trim() === "") {
        toast.error("Name can't be empty!");
        return;
      }
      if (role.trim() === "") {
        toast.error("Role can't be empty!");
        return;
      }
      if (email.trim() === "") {
        toast.error("Email can't be empty!");
        return;
      }
      if (!email.match(/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/)) {
        toast.error("Email is not correct!");
        return;
      }
      client
        .put(
          `/api/prgservice/coordinators/${userId}`,
          updatedInstructor
        )
        .then((response) => {
          console.log("Profile updated successfully:", response.data);
          // Handle successful response
        })
        .catch((error) => {
          console.error("Error updating profile:", error);
          // Handle error
        });
      toast.success("Profile updated successfully!");
      console.log("Updated profile:", updatedInstructor);
    } catch {
      toast.error("Profile couldn't be updated");
    }
  };

  return (
    <>
      <SideNavbar links={links} />
      <div className="max-w-md mx-auto bg-white shadow-md rounded-lg p-6 mb-4 min-h-screen">
        <div>
          <h2 className="text-xl font-medium mb-4">
            Update Coordinator Profile
          </h2>
          <form>
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={name}
                  onChange={handleNameChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                />
              </div>
              <div>
                <label
                  htmlFor="role"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Role
                </label>
                <input
                  readOnly
                  type="text"
                  name="role"
                  id="role"
                  value={role}
                  onChange={handleRoleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Email
                </label>
                <input
                  type="text"
                  name="email"
                  id="email"
                  value={email}
                  onChange={handleEmailChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                />
              </div>

              <div>
                <button
                  // type="submit"
                  onClick={handleSubmit}
                  className="bg-gray-600 text-white px-4 py-2 rounded-md font-medium"
                >
                  Update Profile
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  const client=buildClient(context)
  const { coordinatorId } = context.query;
  const coordinator = await client.get(
    `/api/prgservice/coordinators/${coordinatorId}`
  );
  let coordinatorData = coordinator.data.data;
  const program = await client.get(
    `/api/prgservice/programs/${coordinatorData.programId}`
  );

  const programData = program.data.data;

  coordinatorData = { ...coordinatorData, program: programData.name };
  return {
    props: {
      user: coordinatorData,
      programData,
    },
  };
}

export default Coordinator;