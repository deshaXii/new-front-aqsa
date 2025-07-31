import React, { useEffect, useState } from "react";
import axios from "axios";
import useAuthStore from "../auth/authStore.js";
import Notification from "../../components/Notification.jsx";
import Button from "../../components/Button.jsx";

const BackupPage = () => {
  const [stats, setStats] = useState(null);
  const [error, setError] = useState("");
  const { token } = useAuthStore();

  const fetchStats = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:5000/api/backup/stats",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setStats(data);

      if (data.dbSizeMB >= 460) {
        alert("⚠️ اقتربت من الحد الأقصى لمساحة قاعدة البيانات!");
      }
    } catch (err) {
      setError("فشل في تحميل البيانات");
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h2 className="text-xl font-bold mb-4">النسخ الاحتياطي</h2>
      {error && <Notification type="error" message={error} />}

      {stats && (
        <div className="space-y-2 mb-6">
          <div>عدد الصيانات: {stats.repairsCount}</div>
          <div>عدد الفنيين: {stats.techniciansCount}</div>
          <div>حجم قاعدة البيانات: {stats.dbSizeMB.toFixed(2)} MB</div>
        </div>
      )}

      <div className="space-x-2">
        <Button onClick={fetchStats}>تحديث</Button>
        <Button className="bg-blue-500">تصدير نسخة</Button>
        <Button className="bg-green-500">استيراد نسخة</Button>
        <Button className="bg-red-500">مسح الكل</Button>
      </div>
    </div>
  );
};

export default BackupPage;
