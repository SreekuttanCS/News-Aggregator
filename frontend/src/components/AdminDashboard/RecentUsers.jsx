import React from "react";

const RecentUsers = ({ users, bgColor }) => {
  return (
    <div
      className="rounded-lg shadow-md p-6 mb-8"
      style={{ backgroundColor: bgColor }}
    >
      <h2 className="text-xl font-semibold mb-4 border-b border-gray-700 pb-2 text-gray-300">
        Recent 5 Users
      </h2>
      {users && users.length > 0 ? (
        <ul className="space-y-3">
          {users.map((user) => (
            <li
              key={user.id ?? user.name}
              className="flex items-center space-x-3"
            >
              <div className="w-8 h-8 bg-blue-700 text-white rounded-full flex items-center justify-center font-semibold">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <span className="text-gray-200">{user.name}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500 italic">No recent users found.</p>
      )}
    </div>
  );
};

export default RecentUsers;
