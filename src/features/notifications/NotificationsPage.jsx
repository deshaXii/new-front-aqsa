// frontend/src/pages/NotificationsPage.jsx
import { useEffect, useState } from "react";
import {
  fetchNotifications,
  markAsRead,
  clearNotifications,
} from "../../features/notifications/api.js";
import useAuthStore from "../../features/auth/authStore.js";
import Button from "../../components/Button.jsx";

const NotificationsPage = () => {
  const { token } = useAuthStore();
  const [notifications, setNotifications] = useState([]);

  const load = async () => {
    const data = await fetchNotifications(token);
    setNotifications(data);
  };

  const handleRead = async (id) => {
    await markAsRead(id, token);
    load();
  };

  const handleClear = async () => {
    if (!window.confirm("هل أنت متأكد من حذف كل الإشعارات؟")) return;
    await clearNotifications(token);
    load();
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">الإشعارات</h2>
        <Button onClick={handleClear}>🗑️ مسح الكل</Button>
      </div>

      <div className="space-y-3">
        {notifications.map((n) => (
          <div
            key={n._id}
            className={`p-3 rounded border ${
              n.read
                ? "bg-gray-100 dark:bg-gray-700"
                : "bg-white dark:bg-gray-800 border-lime-600 border-l-4"
            }`}
          >
            <p>{n.message}</p>
            <div className="text-xs text-gray-500 flex justify-between">
              <span>{new Date(n.createdAt).toLocaleString()}</span>
              {!n.read && (
                <button
                  onClick={() => handleRead(n._id)}
                  className="text-blue-600 dark:text-blue-300"
                >
                  تعليم كمقروء
                </button>
              )}
            </div>
          </div>
        ))}
        {notifications.length === 0 && (
          <p className="text-center text-gray-500">لا توجد إشعارات حاليًا</p>
        )}
      </div>
    </div>
  );
};

export default NotificationsPage;
