import React from 'react';
import SectionHeading from '../../../components/SectionHeading';

import Link from 'next/link';
import AdminNavbar from '../../../components/admin/adminNavbar';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { BiEdit, BiTrashAlt, BiShow } from 'react-icons/bi';
import { ToastContainer, toast } from 'react-toastify';

import buildClient from '../../../hooks/build';
import UserInformationWindow from '../../../components/admin/users/userinfo';

const url = 'api/users';

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

export default function Users() {
  const router = useRouter();

  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [deleteUserId, setDeleteUserId] = useState('');

  useEffect(() => {
    const getUsers = async () => {
       const client = buildClient('');
      const res = await client.get('api/admin/users');
      setUsers(res.data);
    };
    getUsers();
  }, []);

  const deleteUser = async (id) => {
    setShowConfirmation(true);
    setDeleteUserId(id);
  };

  const confirmDelete = async () => {
    try {
       const client = buildClient('');
      const res = await client.delete(`/api/admin/users/${deleteUserId}`);
      const currentUsers = users.filter((user) => user._id !== deleteUserId);
      setUsers(currentUsers);
      toast.success('User has been deleted successfully', {
        duration: 1000,
        position: 'top-center',
        style: {
          background: '#2E7D32',
          color: '#fff',
          fontSize: '20px',
        },
      });
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.errors[0].message, {
        duration: 3000,
        position: 'top-center',
        style: {
          background: '#D32F2F',
          color: '#fff',
          fontSize: '20px',
        },
      });
    }

    setShowConfirmation(false);
    setDeleteUserId('');
  };

  const cancelDelete = () => {
    setShowConfirmation(false);
    setDeleteUserId('');
  };

  if (!users || users.length === 0) {
    return (
      <>
        <SectionHeading text="Users List" />
        <AdminNavbar />
        <div className="bg-blue-200 pt-20 pb-20 min-h-screen">
          <div className="mr-10 items-baseline space-x-4 flex justify-start ml-96">
            <Link
              href="/admin/users/adduser"
              className="text-white bg-gradient-to-r from-black to-blue-600 hover:bg-gradient-to-bl focus:outline-none dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
            >
              ADD user
            </Link>
          </div>
          <div className="w-1/2 m-auto mt-20">
            <SectionHeading text="No users yet" />
          </div>
        </div>
      </>
    );
  } else {
    return (
      <>
        <SectionHeading text="Users List" />
        <AdminNavbar />
        <div className="bg-blue-200 pt-20 pb-20 min-h-screen">
          <div className="mr-10 items-baseline space-x-4 flex flex-col justify-center ml-96">
            <div className="w-36">
              <Link
                href="/admin/users/adduser"
                className="text-white bg-gradient-to-r from-black to-blue-600 hover:bg-gradient-to-bl focus:outline-none dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
              >
                ADD user
              </Link>
            </div>
            <div className="overflow-x-auto ">
              <table className="w-full mt-4  table-auto bg-black">
                <thead>
                  <tr className="bg-gray-800 text-gray-200">
                    <th className="px-4 py-2">ID</th>
                    <th className="px-4 py-2">Name</th>
                    <th className="px-4 py-2">Email</th>
                    <th className="px-4 py-2">Academic Position</th>
                    <th className="px-4 py-2">Role</th>
                    <th className="px-4 py-2"></th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user, index) => (
                    <tr
                      key={user._id}
                      className={index % 2 === 0 ? 'bg-white' : 'bg-gray-100'}
                    >
                      <td className="px-4 py-2 text-center">{index + 1}</td>
                      <td className="px-4 py-2 text-center">{user.name}</td>
                      <td className="px-4 py-2 text-center">{user.email}</td>
                      <td className="px-4 py-2 text-center">
                        {user.academicPosition}
                      </td>
                      <td className="px-4 py-2 text-center">
                        {mapRoleLabel(user.role)}
                      </td>
                      <td className="px-4 py-2 text-center">
                        <div>
                          <Link href={`/admin/users/update/${user._id}`}>
                            <button className="cursor px-6">
                              <BiEdit size={25} color="rgb(34, 197, 94)" />
                            </button>
                          </Link>
                          <button
                            className="cursor px-6 ml-4"
                            onClick={() => deleteUser(user._id)}
                          >
                            <BiTrashAlt size={25} color="rgb(244, 63, 94)" />
                          </button>

                          <button
                            className="cursor px-6 ml-4"
                            onClick={() => setSelectedUser(user)}
                          >
                            <BiShow size={25} color="rgb(50, 60, 140)" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {showConfirmation && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white rounded-lg p-4">
              <p className="text-center text-gray-800 mb-4">
                Are you sure you want to delete this user?
              </p>
              <div className="flex justify-center">
                <button
                  className="text-red-500 hover:text-red-700 mr-10"
                  onClick={confirmDelete}
                >
                  Yes
                </button>
                <button
                  className="text-blue-500 hover:text-blue-700"
                  onClick={cancelDelete}
                >
                  No
                </button>
              </div>
            </div>
          </div>
        )}

        {selectedUser && (
          <UserInformationWindow
            user={selectedUser}
            onClose={() => setSelectedUser(null)}
          />
        )}
      </>
    );
  }
}
