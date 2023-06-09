import React, { useState } from "react";
import { useRouter } from "next/router";
import SideNavbar from "../../../components/SideNavbar";
import { toast } from "react-toastify";
import buildClient from "../../../hooks/build";
import { Context } from "../../../context";
function Coordinator({ user }) {
  const router = useRouter();
  const instructorId = router.query.instructorId;
  const links = [
    {
      text: "Back to Dashboard",
      href: `/instructor/${instructorId}/dashboard`,
      icon: "/icons/back.svg",
      alt: "programs",
    },
  ];
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [role, setRole] = useState(user.role);
  const [password, setPassword] = useState("");

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

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

    // Check if any field is empty
    if (!name || !email) {
      toast.error("Please fill in all fields");
      return;
    }

    // Email format validation using regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Invalid email format");
      return;
    }

    const userId = instructorId;
    const updatedInstructor = { name, email, role, password };
    const client=buildClient('')

    try {
      await client.put(
        `/api/assessment/instructors/${userId}`,
        updatedInstructor
      );
      toast.success("Instructor Updated Successfully");
    } catch {
      toast.error(
        "Error Updating Instructor. Please check your internet connection!"
      );
    }
  };

  return (
    <div className="min-h-screen pt-12 bg-slate-300 bg-[url('/backgrounds/profile.svg')]">
      <SideNavbar links={links} />
      <div className="max-w-md mx-auto bg-white shadow-md text-white font-bold rounded-lg p-6 my-4 bg-[url('/backgrounds/editprofile.svg')]">
        <div>
          <h2 className="text-xl font-medium mb-4">
            Update Instructor Profile
          </h2>
          <form>
            <div className="space-y-4 text-white font-bold">
              <div>
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-bold dark:text-white"
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
                  className="block mb-2 text-sm dark:text-white"
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
                  className="block mb-2 text-sm font-medium dark:text-white"
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
                />{" "}
              </div>
              <div>
                {" "}
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium dark:text-white"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={password}
                  onChange={handlePasswordChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                />
              </div>{" "}
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
    </div>
  );
}

export async function getServerSideProps(context) {
  const client=buildClient(context)
  const userId = context.query.instructorId;
  const role = "instructor";
  const user = await client.get(
    `/api/assessment/instructors/${userId}`
  );

  return {
    props: {
      user: user.data.data,
    },
  };
}

export default Coordinator;
