import React, { useEffect, useState } from "react";
import axios from "axios";
import useAuthStore from "../auth/authStore.js";
import Notification from "../../components/Notification.jsx";

const NotificationsPage = () => {
  const [notifications, setNotifications] = useState([]);
  const [error, setError] = useState("");
  const { token } = useAuthStore();

  const fetchNotifications = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:5000/api/notifications",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setNotifications(data);
    } catch {
      setError("فشل في تحميل الإشعارات");
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">الإشعارات</h2>
      {error && <Notification type="error" message={error} />}

      <div className="space-y-4">
        {notifications.length === 0 && (
          <p className="text-gray-500">لا توجد إشعارات</p>
        )}
        {notifications.map((n) => (
          <div
            key={n._id}
            className="bg-white dark:bg-gray-800 border p-3 rounded shadow-sm"
          >
            <p className="font-semibold">{n.message}</p>
            <p className="text-xs text-gray-500 mt-1">
              {new Date(n.createdAt).toLocaleString("ar-EG")}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationsPage;
