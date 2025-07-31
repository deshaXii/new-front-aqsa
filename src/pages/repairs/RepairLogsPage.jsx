import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import useAuthStore from "../auth/authStore.js";
import Notification from "../../components/Notification.jsx";

const RepairLogsPage = () => {
  const { id } = useParams();
  const { token } = useAuthStore();
  const [logs, setLogs] = useState([]);
  const [error, setError] = useState("");

  const fetchLogs = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:5000/api/logs/repair/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setLogs(data);
    } catch (err) {
      setError("فشل في تحميل سجلات الجهاز");
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h2 className="text-xl font-bold mb-4">سجلات الجهاز</h2>
      {error && <Notification type="error" message={error} />}

      <ul className="space-y-2">
        {logs.map((log) => (
          <li
            key={log._id}
            className="border p-2 rounded bg-white dark:bg-gray-800"
          >
            <div>
              <strong>الحدث:</strong> {log.action}
            </div>
            <div>
              <strong>بواسطة:</strong> {log.user?.name || "غير معروف"}
            </div>
            <div>
              <strong>التاريخ:</strong>{" "}
              {new Date(log.timestamp).toLocaleString()}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RepairLogsPage;
