// Table.js
import React from 'react';

const Table = ({ users, editUser, deleteUser }) => {
  return (
    <table className="min-w-full divide-y divide-gray-200">
    <thead className="bg-gray-50">
      <tr>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Gender</th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date of Birth</th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
      </tr>
    </thead>
    <tbody className="bg-white divide-y divide-gray-200">
      {users.map((user, index) => (
        <tr key={index}>
          <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
          <td className="px-6 py-4 whitespace-nowrap">{user.name}</td>
          <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
          <td className="px-6 py-4 whitespace-nowrap">{user.contact}</td>
          <td className="px-6 py-4 whitespace-nowrap">{user.gender}</td>
          <td className="px-6 py-4 whitespace-nowrap">{user.dob ? new Date(user.dob).toLocaleDateString() : ''}</td>
          <td className="px-6 py-4 whitespace-nowrap">
            <button
              type="button"
              className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mt-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
              onClick={() => editUser(index)}
            >
              Edit
            </button>

            <button
              onClick={() => deleteUser(index)}
              type="button"
              className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mt-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
            >
              Delete
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>

  );
};

export default Table;
    