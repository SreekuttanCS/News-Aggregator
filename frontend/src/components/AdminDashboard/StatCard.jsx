import React from "react";

const StatCard = ({ icon, label, value, bgColor }) => {
  return (
    <div
      className="rounded-lg shadow-md p-6 flex items-center space-x-4"
      style={{ backgroundColor: bgColor }}
    >
      <div
        className="p-3 rounded-full bg-opacity-20"
        style={{ backgroundColor: "rgba(255, 255, 255, 0.1)" }}
      >
        {icon}
      </div>
      <div>
        <p className="text-sm font-medium text-gray-400 uppercase">{label}</p>
        <p className="text-2xl font-semibold">{value}</p>
      </div>
    </div>
  );
};

export default StatCard;
