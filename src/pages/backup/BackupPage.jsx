import React, { useEffect, useState } from "react";
import axios from "axios";
import useAuthStore from "../auth/authStore";
import Button from "../../components/Button";
import Notification from "../../components/Notification";

const BackupPage = () => {
  const [stats, setStats] = useState(null);
  const [error, setError] = useState("");
  const [warning, setWarning] = useState("");
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
      setWarning("");
      if (data.dbSizeMB >= 460) {
        setWarning(
          "⚠️ اقتربت من الحد الأقصى للمساحة! الرجاء أخذ نسخة احتياطية."
        );
      }
    } catch {
      setError("فشل في تحميل الإحصائيات");
    }
  };

  const handleExport = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/backup/export", {
        headers: { Authorization: `Bearer ${token}` },
        responseType: "blob",
      });
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "backup.json");
      document.body.appendChild(link);
      link.click();
    } catch {
      alert("فشل تصدير البيانات");
    }
  };

  const handleImport = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);

    try {
      await axios.post("http://localhost:5000/api/backup/import", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("تم استيراد البيانات بنجاح");
    } catch {
      alert("فشل استيراد البيانات");
    }
  };

  const handleDeleteAll = async () => {
    if (!window.confirm("هل أنت متأكد أنك تريد مسح كل البيانات؟")) return;
    try {
      await axios.delete("http://localhost:5000/api/backup/delete-all", {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("تم مسح كل البيانات");
    } catch {
      alert("فشل في مسح البيانات");
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">النسخ الاحتياطي</h2>
      {error && <Notification type="error" message={error} />}
      {warning && <Notification type="warning" message={warning} />}

      {stats && (
        <div className="mb-4 bg-white dark:bg-gray-800 p-4 rounded shadow">
          <p>عدد الصيانات: {stats.repairsCount}</p>
          <p>عدد الفنيين: {stats.techsCount}</p>
          <p>حجم قاعدة البيانات: {stats.dbSizeMB.toFixed(2)} MB</p>
        </div>
      )}

      <div className="flex flex-wrap gap-4">
        <Button onClick={fetchStats}>🔄 تحديث</Button>
        <Button onClick={handleExport}>⬇️ تصدير نسخة احتياطية</Button>
        <label className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer">
          ⬆️ استيراد نسخة
          <input
            type="file"
            accept=".json"
            className="hidden"
            onChange={handleImport}
          />
        </label>
        <Button
          onClick={handleDeleteAll}
          className="bg-red-600 hover:bg-red-700"
        >
          🗑️ مسح كل البيانات
        </Button>
      </div>
    </div>
  );
};

export default BackupPage;
