// src/features/notifications/NotificationsPage.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../lib/api";
import formatDate from "../../utils/formatDate";

export default function NotificationsPage() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const nav = useNavigate();

  async function load() {
    setLoading(true);
    try {
      const res = await API.get("/notifications").then((r) => r.data);
      setList(res);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    load();
  }, []);

  async function open(n) {
    try {
      await API.put(`/notifications/${n._id}/read`);
    } catch {}
    if (n.type === "chat") {
      const to = n?.meta?.from ? `/chat/dm/${n.meta.from}` : "/chat";
      nav(to);
    } else if (n.type === "repair") {
      const id = n?.meta?.repairId;
      if (id) nav(`/repairs/${id}`);
    }
  }
  async function markAllRead() {
    const unread = list.filter((n) => !n.read);
    for (const n of unread) {
      try {
        await API.put(`/notifications/${n._id}/read`);
      } catch {}
    }
    await load();
  }
  async function clearAll() {
    if (!confirm("مسح كل الإشعارات؟")) return;
    await API.delete("/notifications/clear");
    await load();
  }

  return (
    <div className="space-y-4">
      <header className="flex items-center justify-between">
        <h1 className="text-xl font-bold">الإشعارات</h1>
        <div className="flex items-center gap-2">
          <button
            onClick={markAllRead}
            className="px-3 py-2 rounded-xl bg-emerald-600 text-white"
          >
            تحديد الكل كمقروء
          </button>
          <button
            onClick={clearAll}
            className="px-3 py-2 rounded-xl bg-red-600 text-white"
          >
            مسح الكل
          </button>
        </div>
      </header>
      <div className="p-3 rounded-xl bg-white dark:bg-gray-800">
        {loading ? (
          <div>جارِ التحميل...</div>
        ) : list.length === 0 ? (
          <div>لا توجد إشعارات.</div>
        ) : (
          <ul className="space-y-2">
            {list.map((n) => (
              <li
                key={n._id}
                onClick={() => open(n)}
                className={`p-2 rounded-lg cursor-pointer ${
                  n.read
                    ? "bg-gray-100 dark:bg-gray-700/50 opacity-80"
                    : "bg-blue-50 dark:bg-blue-900/20"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm">{n.message}</div>
                    <div className="text-xs opacity-70">
                      {formatDate(n.createdAt)}
                    </div>
                  </div>
                  {!n.read && (
                    <span className="text-xs px-2 py-1 rounded bg-blue-600 text-white">
                      جديد
                    </span>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
