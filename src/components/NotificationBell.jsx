import React, { useEffect, useState } from "react";
import axios from "axios";
import useAuthStore from "../pages/auth/authStore";

const NotificationBell = () => {
  const [notifications, setNotifications] = useState([]);
  const [open, setOpen] = useState(false);
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
    } catch {}
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        title="الإشعارات"
        className="relative"
      >
        🔔
        {notifications.length > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1 rounded-full">
            {notifications.length}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 top-8 bg-white dark:bg-gray-800 border p-2 rounded w-64 shadow">
          {notifications.length === 0 ? (
            <p className="text-sm">لا توجد إشعارات</p>
          ) : (
            <ul className="text-sm max-h-60 overflow-y-auto">
              {notifications.map((n) => (
                <li key={n._id} className="border-b p-2">
                  <div className="font-bold">{n.title}</div>
                  <div>{n.message}</div>
                  <div className="text-xs text-gray-500">
                    {new Date(n.createdAt).toLocaleString("ar-EG")}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationBell;
