import React, { useEffect, useState } from "react";
import axios from "axios";
import useAuthStore from "../auth/authStore.js";
import Notification from "../../components/Notification.jsx";

const NotificationsPage = () => {
  const { token } = useAuthStore();
  const [notifications, setNotifications] = useState([]);

  const fetchNotifications = async () => {
    const { data } = await axios.get(
      "https://aqsa-serverless.vercel.app/api/notifications",
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    setNotifications(data);
  };

  const clearAll = async () => {
    await axios.delete(
      "https://aqsa-serverless.vercel.app/api/notifications/clear",
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    fetchNotifications();
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">الإشعارات</h2>
      <button
        onClick={clearAll}
        className="bg-red-500 text-white px-3 py-1 rounded mb-2"
      >
        مسح الكل
      </button>

      {notifications.length === 0 && <p>لا توجد إشعارات</p>}

      {notifications.map((n) => (
        <Notification key={n._id} type={n.type} message={n.message} />
      ))}
    </div>
  );
};

export default NotificationsPage;
