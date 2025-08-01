import React, { useEffect, useState } from "react";
import axios from "axios";
import useAuthStore from "../auth/authStore.js";
import Notification from "../../components/Notification.jsx";
import DateFilter from "../../components/DateFilter.jsx";

const InvoicesPage = () => {
  const { token } = useAuthStore();
  const [stats, setStats] = useState(null);
  const [error, setError] = useState("");

  const fetchStats = async (start = "", end = "") => {
    try {
      const { data } = await axios.get(
        "http://localhost:5000/api/invoices/stats",
        {
          headers: { Authorization: `Bearer ${token}` },
          params: { start, end },
        }
      );
      setStats(data);
    } catch {
      setError("فشل في تحميل الإحصائيات");
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  if (error) return <Notification type="error" message={error} />;
  if (!stats) return <div className="p-4">جاري التحميل...</div>;

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-xl font-bold">إحصائيات الفواتير</h2>

      <DateFilter onFilter={fetchStats} />

      <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
        <p>إجمالي الربح: {stats.totalProfit} ج</p>
        <p>إجمالي تكلفة قطع الغيار: {stats.totalPartsCost} ج</p>
      </div>

      <h3 className="font-bold mt-4">أرباح الفنيين</h3>
      <ul className="bg-gray-50 dark:bg-gray-900 rounded p-2">
        {stats.technicianProfits?.map((t, idx) => (
          <li key={idx} className="border-b py-1">
            {t.technicianName}: {t.profit} ج
          </li>
        ))}
      </ul>

      <h3 className="font-bold mt-4">تفاصيل الصيانات</h3>
      <div className="overflow-auto">
        <table className="min-w-full bg-white dark:bg-gray-800 border text-sm">
          <thead className="bg-gray-200 dark:bg-gray-700">
            <tr>
              <th className="p-2 border">اسم العميل</th>
              <th className="p-2 border">اسم الفني</th>
              <th className="p-2 border">السعر</th>
              <th className="p-2 border">سعر الجملة</th>
              <th className="p-2 border">الربح</th>
            </tr>
          </thead>
          <tbody>
            {stats.repairs?.map((r) => (
              <tr key={r._id}>
                <td className="p-2 border">{r.customerName}</td>
                <td className="p-2 border">{r.technician?.name || "—"}</td>
                <td className="p-2 border">{r.price} ج</td>
                <td className="p-2 border">{r.totalPartsCost} ج</td>
                <td className="p-2 border">{r.profit} ج</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InvoicesPage;
