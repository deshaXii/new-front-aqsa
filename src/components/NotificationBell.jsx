import React, { useEffect, useState } from "react";
import axios from "axios";
import useAuthStore from "../features/auth/authStore.js";
import { useNavigate } from "react-router-dom";

const NotificationBell = () => {
  const { token } = useAuthStore();
  const [count, setCount] = useState(0);
  const navigate = useNavigate();

  const fetchNotifications = async () => {
    const { data } = await axios.get(
      "http://localhost:5000/api/notifications",
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const unread = data.filter((n) => !n.read).length;
    setCount(unread);
  };

  useEffect(() => {
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 10000); // تحديث كل 10 ثواني
    return () => clearInterval(interval);
  }, []);

  return (
    <button onClick={() => navigate("/notifications")} className="relative p-2">
      🔔
      {count > 0 && (
        <span className="absolute top-0 right-0 bg-red-500 text-white text-xs px-1 rounded-full">
          {count}
        </span>
      )}
    </button>
  );
};

export default NotificationBell;
