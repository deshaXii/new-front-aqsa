// src/features/backup/BackupPage.jsx
import { useEffect, useState } from "react";
import API from "../../lib/api";

export default function BackupPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    try {
      const r = await API.get("/backup/stats").then((r) => r.data);
      setData(r);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    load();
  }, []);

  async function clearAll() {
    if (!confirm("تحذير: سيتم مسح كل البيانات! هل أنت متأكد؟")) return;
    await API.delete("/backup/clear");
    await load();
  }

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold">النسخ الاحتياطي / إدارة البيانات</h1>
      <section className="p-3 rounded-xl bg-white dark:bg-gray-800">
        {loading ? (
          <div>جارِ التحميل...</div>
        ) : !data ? (
          <div>لا يوجد بيانات.</div>
        ) : (
          <div className="space-y-2">
            <div>
              حجم قاعدة البيانات:{" "}
              <b>{(data.dbSizeMB || 0).toFixed?.(2) || data.dbSizeMB}</b>{" "}
              ميجابايت
            </div>
            <div>
              عدد التجميعات (Collections): <b>{data.collectionsCount}</b>
            </div>
            {data.warning && (
              <div className="text-amber-600">
                تحذير: اقتربت من الحد المجاني
              </div>
            )}
            <div className="flex items-center gap-2 mt-2">
              <button
                onClick={load}
                className="px-3 py-2 rounded-xl bg-gray-200 dark:bg-gray-700"
              >
                تحديث
              </button>
              <button
                onClick={clearAll}
                className="px-3 py-2 rounded-xl bg-red-600 text-white"
              >
                مسح الكل
              </button>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
