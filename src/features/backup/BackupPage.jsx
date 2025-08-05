import React, { useEffect, useState } from "react";
import axios from "axios";
import useAuthStore from "../auth/authStore.js";
import Notification from "../../components/Notification.jsx";

const BackupPage = () => {
  const { token } = useAuthStore();
  const [stats, setStats] = useState(null);
  const [error, setError] = useState("");

  const fetchStats = async () => {
    try {
      const { data } = await axios.get(
        "https://aqsa-serverless.vercel.app/api/backup/stats",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setStats(data);
      setError("");
    } catch {
      setError("فشل في جلب إحصائيات النظام");
    }
  };

  const clearData = async () => {
    if (!window.confirm("هل أنت متأكد أنك تريد مسح كل البيانات؟")) return;
    try {
      await axios.delete(
        "https://aqsa-serverless.vercel.app/api/backup/clear",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert("تم مسح البيانات بنجاح");
      fetchStats();
    } catch {
      alert("فشل في مسح البيانات");
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h2 className="text-xl font-bold mb-4">صفحة النسخ الاحتياطي</h2>
      {error && <Notification type="error" message={error} />}

      {stats && (
        <div className="bg-white dark:bg-gray-800 p-4 rounded shadow mb-4">
          <p>عدد الصيانات: {stats.repairs}</p>
          <p>عدد الفنيين: {stats.technicians}</p>
          <p>حجم قاعدة البيانات: {stats.dbSizeMB} MB</p>
          {stats.warning && (
            <p className="text-red-500 font-bold">
              ⚠️ تحذير: وصلت لاستخدام 90% من المساحة
            </p>
          )}
        </div>
      )}

      <div className="flex gap-3">
        <button
          onClick={fetchStats}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          تحديث الإحصائيات
        </button>

        <button
          onClick={clearData}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          مسح كل البيانات
        </button>
      </div>
    </div>
  );
};

export default BackupPage;
