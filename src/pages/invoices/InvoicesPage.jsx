import React, { useEffect, useState } from "react";
import axios from "axios";
import useAuthStore from "../auth/authStore.js";
import Notification from "../../components/Notification.jsx";
import Button from "../../components/Button.jsx";

const InvoicesPage = () => {
  const { token } = useAuthStore();
  const [stats, setStats] = useState(null);
  const [date, setDate] = useState(
    () => new Date().toISOString().split("T")[0]
  );
  const [error, setError] = useState("");

  const fetchStats = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/invoices?date=${date}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setStats(res.data);
    } catch (err) {
      setError("فشل في تحميل البيانات");
    }
  };

  useEffect(() => {
    fetchStats();
  }, [date]);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">الفواتير</h2>
      {error && <Notification type="error" message={error} />}

      <div className="flex gap-2 mb-4">
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="border p-2 rounded"
        />
        <Button onClick={fetchStats}>تحديث</Button>
      </div>

      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm bg-white dark:bg-gray-800 p-4 rounded">
          <div>
            <strong>عدد الصيانات:</strong> {stats.repairsCount}
          </div>
          <div>
            <strong>إجمالي سعر الصيانة:</strong> {stats.totalRepairPrice} ج
          </div>
          <div>
            <strong>إجمالي تكلفة قطع الغيار:</strong> {stats.totalPartsCost} ج
          </div>
          <div>
            <strong>إجمالي الربح:</strong> {stats.totalProfit} ج
          </div>
          <div>
            <strong>ربح المحل:</strong> {stats.storeProfit} ج
          </div>
          <div>
            <strong>ربح الفنيين:</strong> {stats.techniciansProfit} ج
          </div>
        </div>
      )}

      {stats?.technicians && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">أرباح الفنيين</h3>
          <table className="w-full text-sm bg-white dark:bg-gray-800 border">
            <thead className="bg-gray-200 dark:bg-gray-700">
              <tr>
                <th className="border p-2">الفني</th>
                <th className="border p-2">الربح</th>
              </tr>
            </thead>
            <tbody>
              {stats.technicians.map((tech) => (
                <tr key={tech.name}>
                  <td className="border p-2">{tech.name}</td>
                  <td className="border p-2">{tech.profit} ج</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default InvoicesPage;
