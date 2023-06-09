import Link from "next/link";
import { useRouter } from "next/router";
function ViewProfile(props) {
  const router = useRouter();
  const { userId, role } = props;

  const user = props.user;

  return (
    <div className=" py-8 bg-white ">
      <form
        action="#"
        className="max-w-2xl rounded-2xl shadow-2xl mx-auto px-6 w-[65%] "
      >
        <div className="space-y-6 text-center py-8">
          <div className="text-3xl font-semibold  text-gray-800 dark:text-white">
            <label htmlFor="name">Name:</label>
            <div className="text-2xl text-gray-600 dark:text-gray-400">
              {user.name}
            </div>
          </div>
          <div className="text-3xl font-semibold text-gray-800 dark:text-white">
            <label htmlFor="role">Role:</label>
            <div className="text-2xl text-gray-600 dark:text-gray-400">
              {user.role}
            </div>
          </div>
          <div className="text-3xl font-semibold text-gray-800 dark:text-white">
            <label htmlFor="email">Email:</label>
            <div className="text-2xl text-gray-600 dark:text-gray-400">
              {user.email}
            </div>
          </div>
          <div className="text-3xl font-semibold text-gray-800 dark:text-white">
            <label htmlFor="employeeId">Employee ID:</label>
            <div className="text-2xl text-gray-600 dark:text-gray-400">
              {user.employee_id}
            </div>
          </div>
          <div className="text-3xl font-semibold text-gray-800 dark:text-white">
            <label htmlFor="academicTitle">Academic Title:</label>
            <div className="text-2xl text-gray-600 dark:text-gray-400">
              {user.academic_title}
            </div>
          </div>
        </div>
        <div className="flex justify-center mt-12 pb-6">
          <Link
            href={`/${role}/${userId}/updateprofile`}
            className="w-full md:w-40 text-center focus:outline-none text-white bg-blue-700 hover:bg-blue-900 font-semibold rounded-lg text-xs px-5 py-2.5 mx-auto border border-transparent hover:border-green-800"
          >
            Edit
          </Link>
        </div>
      </form>
    </div>
  );
}

export default ViewProfile;
