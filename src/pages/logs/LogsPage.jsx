import React, { useEffect, useState } from "react";
import axios from "axios";
import useAuthStore from "../auth/authStore.js";
import Notification from "../../components/Notification.jsx";

const LogsPage = () => {
  const [logs, setLogs] = useState([]);
  const [error, setError] = useState("");
  const { token } = useAuthStore();

  const fetchLogs = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/api/logs", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setLogs(data);
    } catch {
      setError("فشل في تحميل السجلات");
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">سجل التحركات</h2>
      {error && <Notification type="error" message={error} />}
      <div className="overflow-auto text-sm bg-white dark:bg-gray-800 rounded shadow">
        <table className="min-w-full">
          <thead className="bg-gray-200 dark:bg-gray-700">
            <tr>
              <th className="p-2 border">النوع</th>
              <th className="p-2 border">الوصف</th>
              <th className="p-2 border">المستخدم</th>
              <th className="p-2 border">الوقت</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log) => (
              <tr key={log._id}>
                <td className="p-2 border">{log.actionType}</td>
                <td className="p-2 border">{log.description}</td>
                <td className="p-2 border">{log.user?.name || "?"}</td>
                <td className="p-2 border">
                  {new Date(log.timestamp).toLocaleString("ar-EG")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LogsPage;
