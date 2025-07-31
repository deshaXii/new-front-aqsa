import React, { useEffect, useState } from "react";
import axios from "axios";
import useAuthStore from "../auth/authStore.js";
import Notification from "../../components/Notification.jsx";

const InvoicesPage = () => {
  const [stats, setStats] = useState(null);
  const [error, setError] = useState("");
  const { token } = useAuthStore();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await axios.get("http://localhost:5000/api/invoices", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setStats(data);
      } catch (err) {
        setError("فشل في تحميل الإحصائيات");
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h2 className="text-xl font-bold mb-4">صفحة الفواتير والإحصائيات</h2>
      {error && <Notification type="error" message={error} />}
      {stats && (
        <div className="space-y-4">
          <div>إجمالي الأرباح اليوم: {stats.totalProfitToday} ج</div>
          <div>إجمالي تكلفة قطع الغيار: {stats.totalPartsCostToday} ج</div>
          <div>أرباح الفنيين:</div>
          <ul className="list-disc list-inside">
            {Array.isArray(stats.technicianProfits) &&
            stats.technicianProfits.length > 0 ? (
              stats.technicianProfits.map((tp, i) => (
                <li key={i}>
                  {tp.technicianName}: {tp.profit} ج
                </li>
              ))
            ) : (
              <li>لا توجد بيانات أرباح فنيين</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default InvoicesPage;
