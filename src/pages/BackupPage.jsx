import React, { useEffect, useState } from "react";
import axios from "axios";
import Button from "../../components/Button";
import Notification from "../../components/Notification";
import useAuthStore from "../auth/authStore";

const BackupPage = () => {
  const { token } = useAuthStore();
  const [stats, setStats] = useState(null);
  const [error, setError] = useState("");
  const [warning, setWarning] = useState(false);

  const fetchStats = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/backup/stats", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setStats(res.data);
      const percent = (res.data.size / 512) * 100;
      setWarning(percent >= 90);
    } catch (err) {
      setError("فشل في تحميل إحصائيات النسخ الاحتياطي");
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const handleExport = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/backup/export", {
        responseType: "blob",
        headers: { Authorization: `Bearer ${token}` },
      });
      const url = window.URL.createObjectURL(res.data);
      const a = document.createElement("a");
      a.href = url;
      a.download = "backup.json";
      a.click();
    } catch {
      setError("فشل في تصدير البيانات");
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
      setError("فشل في استيراد البيانات");
    }
  };

  const handleClear = async () => {
    if (!window.confirm("هل أنت متأكد من مسح كل البيانات؟")) return;
    try {
      await axios.delete("http://localhost:5000/api/backup/clear", {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("تم مسح البيانات");
      fetchStats();
    } catch {
      setError("فشل في مسح البيانات");
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">النسخ الاحتياطي</h2>
      {error && <Notification type="error" message={error} />}
      {warning && (
        <Notification type="warning" message="اقتربت من الحد الأقصى للمساحة!" />
      )}

      <div className="mb-4">
        <Button onClick={fetchStats}>تحديث</Button>
      </div>

      {stats && (
        <div className="mb-4 space-y-2 text-sm">
          <p>عدد الصيانات: {stats.repairsCount}</p>
          <p>عدد الفنيين: {stats.techniciansCount}</p>
          <p>حجم القاعدة: {stats.size} MB</p>
        </div>
      )}

      <div className="space-x-2">
        <Button onClick={handleExport}>تصدير نسخة احتياطية</Button>
        <label className="inline-block">
          <span className="sr-only">استيراد</span>
          <input
            type="file"
            onChange={handleImport}
            className="hidden"
            accept=".json"
          />
          <Button>استيراد نسخة</Button>
        </label>
        <Button onClick={handleClear} className="bg-red-500 hover:bg-red-600">
          مسح كل البيانات
        </Button>
      </div>
    </div>
  );
};

export default BackupPage;
