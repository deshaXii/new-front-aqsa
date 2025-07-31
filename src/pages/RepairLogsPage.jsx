import React, { useEffect, useState } from "react";
import axios from "axios";
import useAuthStore from "../auth/authStore";
import Notification from "../../components/Notification";

const RepairLogsPage = () => {
  const { token } = useAuthStore();
  const [logs, setLogs] = useState([]);
  const [error, setError] = useState("");

  const fetchLogs = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/api/logs", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setLogs(data);
    } catch {
      setError("فشل في تحميل السجل");
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">سجل التعديلات والإجراءات</h2>
      {error && <Notification type="error" message={error} />}

      <div className="overflow-auto">
        <table className="min-w-full bg-white dark:bg-gray-800 border text-sm">
          <thead className="bg-gray-200 dark:bg-gray-700">
            <tr>
              <th className="p-2 border">الإجراء</th>
              <th className="p-2 border">اسم المستخدم</th>
              <th className="p-2 border">وقت التنفيذ</th>
              <th className="p-2 border">تفاصيل</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log) => (
              <tr key={log._id}>
                <td className="p-2 border">{log.action}</td>
                <td className="p-2 border">{log.user?.name}</td>
                <td className="p-2 border">
                  {new Date(log.createdAt).toLocaleString("ar-EG")}
                </td>
                <td className="p-2 border">{log.details}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RepairLogsPage;
