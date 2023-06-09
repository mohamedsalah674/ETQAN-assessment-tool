import Link from 'next/link';
import React from 'react';

const UserInformationWindow = ({ user, onClose }) => {
  // const url = JSON.parse(user.URL)
  const mapRoleLabel = (role) => {
    switch (role) {
      case 'admin':
        return 'Admin';
      case 'instructor':
        return 'Instructor';
      case 'head_of_department':
        return 'Head of Department';
      case 'dean':
        return 'Dean';
      case 'coordinator':
        return 'Coordinator';
      default:
        return '';
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-md p-6 w-96">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">User Information </h2>
          <button
            className="text-gray-500 hover:text-gray-700"
            onClick={onClose}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div className="flex flex-col space-y-4">
          <div>
            <p className="text-gray-600">Name</p>
            <p className="font-medium">{user.name}</p>
          </div>
          <div>
            <p className="text-gray-600">Email</p>
            <p className="font-medium">{user.email}</p>
          </div>
          <div>
            <p className="text-gray-600">Academic Position</p>
            <p className="font-medium">{user.academicPosition}</p>
          </div>
          <div>
            <p className="text-gray-600">Role</p>
            <p className="font-medium">{mapRoleLabel(user.role)}</p>
          </div>
          {/* <div>
            <p className="text-gray-600">Link to Profile</p>
            {user.URL ? (
                
              <Link href= {url}>
                <a className="text-blue-500 hover:text-blue-700 underline cursor-pointer">
                  Click here to redirect
                </a>
              </Link>
            ) : (
              <p className="text-gray-500">Profile URL not available</p>
            )}
          </div> */}
        </div>
        <div className="mt-6">
          <button
            className="text-white bg-blue-500 hover:bg-blue-700 px-4 py-2 rounded-md"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserInformationWindow;
