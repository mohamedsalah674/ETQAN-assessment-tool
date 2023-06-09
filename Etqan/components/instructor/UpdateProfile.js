import Link from "next/link";
function UpdateProfile(props) {
  const user = props.user.data;
  return (
    <div className="mt-40 mb-20">
      <form action="#">
        <div className="space-y-4 ">
          <div>
            <label
              for="name"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Name
            </label>
            <input
              type="text"
              name="title"
              id="name"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              placeholder={user.name}
              required=""
            />
          </div>
          <div>
            <label
              for="role"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Role
            </label>
            <input
              type="text"
              name="title"
              id="role"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              placeholder={user.role}
              required=""
            />
          </div>

          <div>
            <label
              for="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Email
            </label>
            <input
              type="text"
              name="title"
              id="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              placeholder={user.email}
              required=""
            />
          </div>
          <div>
            <label
              for="passowrd"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Password
            </label>
            <div className="flex flex-row ">
              <input
                type="text"
                name="title"
                id="passowrd"
                className="mx-12 w-[400px] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Enter your old Password"
                required=""
              />
              <input
                type="text"
                name="title"
                id="passowrd"
                className="mx-12 w-[400px] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Enter your new Password"
                required=""
              />
            </div>
          </div>
          <div>
            <label
              for="name"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Employee id
            </label>
            <label
              type="text"
              name="title"
              id="employee_id"
              className="bg-gray-50 text-black-900 text-sm focus:ring-primary-600 hover:bg-gray-200 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 placeholder-black shadow dark:border-gray-600 dark:placeholder-gray-800 dark:text-white dark:focus:ring-primary-800 dark:focus:border-primary-800"
              placeholder={user.employee_id}
              value={user.employee_id}
              required=""
            >
              {user.employee_id}
            </label>
          </div>
          <div>
            <label
              for="program"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Program:
            </label>
            <label
              type="text"
              name="program"
              id="program"
              className="bg-gray-50 text-black-900 text-sm focus:ring-primary-600 hover:bg-gray-200 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 placeholder-black shadow dark:border-gray-600 dark:placeholder-gray-800 dark:text-white dark:focus:ring-primary-800 dark:focus:border-primary-800"
            >
              {user.program}
            </label>
          </div>
          <div>
            <label
              for="academic_title"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Academic Title
            </label>
            <label
              type="text"
              name="title"
              id="academic_title"
              className="bg-gray-50 text-black-900 text-sm focus:ring-primary-600 hover:bg-gray-200 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 placeholder-black shadow dark:border-gray-600 dark:placeholder-gray-800 dark:text-white dark:focus:ring-primary-800 dark:focus:border-primary-800"
              required=""
            >
              {user.academic_title}
            </label>
          </div>
          <div>
            <label
              for="courses"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Employee id
            </label>
            <label
              type="text"
              name="title"
              id="courses"
              className="bg-gray-50 text-black-900 text-sm focus:ring-primary-600 hover:bg-gray-200 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 placeholder-black shadow dark:border-gray-600 dark:placeholder-gray-800 dark:text-white dark:focus:ring-primary-800 dark:focus:border-primary-800"
            >
              {user.courses.map((course) => (
                <div>{course}</div>
              ))}{" "}
            </label>
          </div>
        </div>
      </form>
      <div className="my-20 mx-[40%]">
        <Link
          href="/instructor/updateprofile"
          className="text-center ml-auto center focus:outline-none text-white bg-green-700 hover:bg-green-800 font-medium rounded-lg text-m px-5 py-2.5 mr-2 mb-2 "
        >
          Update
        </Link>
      </div>
    </div>
  );
}

export default UpdateProfile;
