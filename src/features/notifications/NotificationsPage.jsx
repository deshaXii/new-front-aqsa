// src/features/notifications/NotificationsPage.jsx
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import API from "../../lib/api";
import formatDate from "../../utils/formatDate";

export default function NotificationsPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");
  const [open, setOpen] = useState({}); // repairId => bool (مفتوح/مقفول)
  const [metaMap, setMetaMap] = useState({}); // repairId => { deviceType, repairIdNum }

  async function load() {
    setLoading(true);
    setErr("");
    try {
      const { data } = await API.get(
        "/notifications?includeLog=true&friendly=true"
      ); // يتوقع: _id, message, type, meta:{repairId, changes?, deviceType?, repairNumber?}, createdAt, read
      setItems(Array.isArray(data) ? data : []);
    } catch (e) {
      setErr(e?.response?.data?.message || "تعذر تحميل الإشعارات");
    } finally {
      setLoading(false);
    }
  }

  async function clearAll() {
    if (!confirm("مسح كل الإشعارات؟")) return;
    await API.delete("/notifications/clear");
    await load();
  }

  // هات بيانات الأجهزة (نوع الجهاز/الرقم) لكل جروب مرة واحدة
  useEffect(() => {
    load();
  }, []);

  const groups = useMemo(() => {
    const map = new Map();
    for (const n of items) {
      const key = n?.meta?.repairId || "—";
      if (!map.has(key)) map.set(key, { key, items: [], unread: 0 });
      map.get(key).items.push(n);
      if (!n.read) map.get(key).unread++;
    }
    // أحدث إشعارات الأول
    const arr = Array.from(map.values()).map((g) => {
      g.items.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      return g;
    });
    // افتح الجروبات اللي فيها غير مقروء تلقائيًا
    const initOpen = {};
    arr.forEach((g) => {
      if (g.unread > 0) initOpen[g.key] = true;
    });
    setOpen((prev) => ({ ...initOpen, ...prev }));
    return arr.sort((a, b) => {
      const at = new Date(a.items[0]?.createdAt || 0).getTime();
      const bt = new Date(b.items[0]?.createdAt || 0).getTime();
      return bt - at;
    });
  }, [items]);

  // اجلب عنوان الجهاز والرقم لكل جروب لو مش متوفر في الميتا
  useEffect(() => {
    (async () => {
      const ids = groups.map((g) => g.key).filter((k) => k && k !== "—");
      const need = ids.filter((id) => !metaMap[id]);
      if (!need.length) return;
      const newMeta = {};
      await Promise.all(
        need.map(async (id) => {
          try {
            const r = await API.get(`/repairs/${id}`).then((x) => x.data);
            newMeta[id] = {
              deviceType: r?.deviceType || "—",
              repairIdNum: r?.repairId || "—",
            };
          } catch {
            newMeta[id] = { deviceType: "—", repairIdNum: "—" };
          }
        })
      );
      setMetaMap((prev) => ({ ...prev, ...newMeta }));
    })();
  }, [groups]);

  async function markRead(id, read = true) {
    try {
      await API.patch(`/notifications/${id}/read`, { read });
      setItems((prev) => prev.map((x) => (x._id === id ? { ...x, read } : x)));
    } catch (e) {
      alert(e?.response?.data?.message || "تعذر تحديث حالة الإشعار");
    }
  }

  async function markGroupRead(repairId) {
    const ids = groups.find((g) => g.key === repairId)?.items.map((n) => n._id);
    if (!ids?.length) return;
    try {
      await API.post(`/notifications/mark-read`, { ids, read: true });
      setItems((prev) =>
        prev.map((n) =>
          n?.meta?.repairId === repairId ? { ...n, read: true } : n
        )
      );
    } catch (e) {
      alert(e?.response?.data?.message || "تعذر تعليم المجموعة كمقروءة");
    }
  }

  return (
    <div className="space-y-4">
      <header className="flex items-center justify-between">
        <h1 className="text-xl font-bold">الإشعارات</h1>
        <div className="flex gap-2">
          <button
            onClick={load}
            className="px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
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
      </header>

      {err && (
        <div className="p-3 rounded-xl bg-red-50 text-red-800">{err}</div>
      )}

      {loading ? (
        <div className="p-4 rounded-2xl bg-white dark:bg-gray-800 animate-pulse h-20" />
      ) : groups.length === 0 ? (
        <div className="p-6 rounded-2xl bg-white dark:bg-gray-800 text-center">
          لا إشعارات
        </div>
      ) : (
        groups.map((g) => {
          const meta = metaMap[g.key] || {};
          const headUnread = g.unread > 0;
          return (
            <div
              key={g.key}
              className={`rounded-2xl border ${
                headUnread
                  ? "bg-blue-50/60 border-blue-200 dark:bg-blue-900/10 dark:border-blue-800"
                  : "bg-white border-gray-200 dark:bg-gray-800 dark:border-gray-700"
              }`}
            >
              {/* عنوان الجروب */}
              <div
                className="flex items-center justify-between p-3 cursor-pointer select-none"
                onClick={() => setOpen((p) => ({ ...p, [g.key]: !p[g.key] }))}
              >
                <div className="flex items-center gap-2">
                  {headUnread && (
                    <span className="inline-block w-2 h-2 rounded-full bg-blue-500" />
                  )}
                  <div className="font-semibold">
                    صيانة جهاز {meta.deviceType || "—"} #
                    {meta.repairIdNum || "—"}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {g.unread > 0 && (
                    <span className="text-xs px-2 py-0.5 rounded-full bg-blue-600 text-white">
                      غير مقروء: {g.unread}
                    </span>
                  )}
                  <Link
                    to={g.key !== "—" ? `/repairs/${g.key}` : "#"}
                    onClick={(e) => e.stopPropagation()}
                    className="px-2 py-1 rounded-lg bg-gray-200 dark:bg-gray-700"
                  >
                    فتح الصيانة
                  </Link>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      markGroupRead(g.key);
                    }}
                    className="px-2 py-1 rounded-lg bg-blue-600 text-white"
                  >
                    تعليم كمقروء
                  </button>
                  <button
                    className="px-2 py-1 rounded-lg bg-gray-100 dark:bg-gray-700"
                    aria-label="toggle"
                  >
                    {open[g.key] ? "إخفاء" : "عرض"}
                  </button>
                </div>
              </div>

              {/* العناصر داخل الجروب */}
              {open[g.key] && (
                <div className="p-3 pt-0">
                  <ul className="space-y-2">
                    {g.items.map((n) => (
                      <li
                        key={n._id}
                        className={`p-3 rounded-xl border ${
                          n.read
                            ? "bg-gray-50 border-gray-200 dark:bg-gray-800/60 dark:border-gray-700"
                            : "bg-white border-blue-200 ring-1 ring-blue-100 dark:bg-gray-800 dark:border-blue-800 dark:ring-blue-900/30"
                        }`}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            {/* لو عندي meta.changes اعرضها كبنود مفهومه */}
                            {Array.isArray(n?.meta?.changes) &&
                            n.meta.changes.length ? (
                              <div>
                                {/* عنوان من نوع الإشعار */}
                                <div className="font-medium mb-1">
                                  {n.message || "تحديث صيانة"}
                                </div>
                                <ul className="list-disc pr-5 space-y-1">
                                  {n.meta.changes.map((c, i) => (
                                    <li key={i}>
                                      تم تغيير{" "}
                                      <strong>{labelOf(c.field)}</strong> من{" "}
                                      <code className="px-1 rounded bg-gray-100 dark:bg-gray-700">
                                        {briefVal(c.from, c.field)}
                                      </code>{" "}
                                      إلى{" "}
                                      <code className="px-1 rounded bg-gray-100 dark:bg-gray-700">
                                        {briefVal(c.to, c.field)}
                                      </code>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            ) : (
                              // fallback: الرسالة القديمة
                              <div className="font-medium">{n.message}</div>
                            )}
                            <div className="text-xs opacity-70 mt-1">
                              {formatDate(n.createdAt)}
                            </div>
                          </div>

                          <div className="shrink-0 flex flex-col items-end gap-2">
                            {!n.read ? (
                              <button
                                onClick={() => markRead(n._id, true)}
                                className="px-2 py-1 rounded-lg bg-blue-600 text-white"
                              >
                                تعليم كمقروء
                              </button>
                            ) : (
                              <button
                                onClick={() => markRead(n._id, false)}
                                className="px-2 py-1 rounded-lg bg-gray-200 dark:bg-gray-700"
                              >
                                إعادة كغير مقروء
                              </button>
                            )}
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          );
        })
      )}
    </div>
  );
}

/* ===== Helpers للعرض الودي ===== */
function labelOf(field) {
  const map = {
    status: "الحالة",
    finalPrice: "السعر النهائي",
    price: "السعر",
    technician: "الفني",
    deliveryDate: "تاريخ التسليم",
    rejectedDeviceLocation: "مكان الجهاز",
    parts: "قطع الغيار",
  };
  return map[field] || field;
}
function briefVal(v, field) {
  if (v === null || v === undefined || v === "") return "—";
  if (field === "deliveryDate") return formatDate(v);
  if (typeof v === "boolean") return v ? "نعم" : "لا";
  if (typeof v === "number") return String(v);
  if (typeof v === "string") return v;
  try {
    const s = JSON.stringify(v);
    return s.length > 50 ? s.slice(0, 50) + "…" : s;
  } catch {
    return "—";
  }
}
