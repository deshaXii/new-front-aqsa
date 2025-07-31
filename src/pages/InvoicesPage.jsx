import React, { useEffect, useState } from "react";
import axios from "axios";
import useAuthStore from "../auth/authStore.js";
import Notification from "../../components/Notification.jsx";
import Button from "../../components/Button.jsx";

const InvoicesPage = () => {
  const { token } = useAuthStore();
  const [stats, setStats] = useState([]);
  const [error, setError] = useState("");
  const [date, setDate] = useState("");

  const fetchStats = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/invoices/stats", {
        headers: { Authorization: `Bearer ${token}` },
        params: date ? { date } : {},
      });
      setStats(res.data);
    } catch (err) {
      setError("فشل في تحميل إحصائيات الفواتير");
    }
  };

  useEffect(() => {
    fetchStats();
  }, [date]);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">إحصائيات الفواتير</h2>
      {error && <Notification type="error" message={error} />}

      <div className="mb-4 flex gap-2 items-center">
        <label>فلترة حسب التاريخ:</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="border px-2 py-1 rounded"
        />
        <Button onClick={fetchStats}>تحديث</Button>
      </div>

      {stats.length > 0 && (
        <div className="overflow-auto text-sm">
          <table className="min-w-full bg-white dark:bg-gray-800 border">
            <thead>
              <tr className="bg-gray-200 dark:bg-gray-700">
                <th className="p-2 border">اسم الفني</th>
                <th className="p-2 border">عدد الصيانات</th>
                <th className="p-2 border">إجمالي السعر</th>
                <th className="p-2 border">إجمالي الجملة</th>
                <th className="p-2 border">الربح</th>
                <th className="p-2 border">ربح الفني</th>
                <th className="p-2 border">ربح المحل</th>
              </tr>
            </thead>
            <tbody>
              {stats.map((s, idx) => (
                <tr key={idx}>
                  <td className="p-2 border">{s.technician}</td>
                  <td className="p-2 border">{s.repairs}</td>
                  <td className="p-2 border">{s.totalPrice} ج</td>
                  <td className="p-2 border">{s.totalCost} ج</td>
                  <td className="p-2 border">{s.totalProfit} ج</td>
                  <td className="p-2 border">{s.technicianShare} ج</td>
                  <td className="p-2 border">{s.shopShare} ج</td>
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
