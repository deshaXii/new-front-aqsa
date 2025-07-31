import React from "react";

const Notification = ({ type = "info", message }) => {
  const colors = {
    info: "bg-blue-100 text-blue-800",
    success: "bg-green-100 text-green-800",
    error: "bg-red-100 text-red-800",
    warning: "bg-yellow-100 text-yellow-800",
  };

  return (
    <div className={`p-3 rounded mb-4 ${colors[type]} text-sm`}>{message}</div>
  );
};

export default Notification;
