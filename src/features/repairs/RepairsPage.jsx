// src/features/repairs/RepairsPage.jsx
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import API from "../../lib/api";
import { listRepairs, updateRepairStatus } from "./repairsApi";
import formatDate from "../../utils/formatDate";
import statusOptions from "../../utils/statusOptions";
import useAuthStore from "../auth/authStore";
import DeliveryModal from "../../components/DeliveryModal";

// Helpers
function startOfDay(d) {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  return x;
}
function endOfDay(d) {
  const x = new Date(d);
  x.setHours(23, 59, 59, 999);
  return x;
}
function toISODate(d) {
  return d.toISOString().slice(0, 10);
}

export default function RepairsPage() {
  const { user } = useAuthStore();
  const canViewAll =
    user?.role === "admin" ||
    user?.permissions?.adminOverride ||
    user?.permissions?.addRepair ||
    user?.permissions?.receiveDevice;

  const isAdmin = user?.role === "admin" || user?.permissions?.adminOverride;
  const canEditAll = isAdmin || user?.permissions?.editRepair;

  const today = useMemo(() => new Date(), []);
  const yesterday = useMemo(() => {
    const d = new Date();
    d.setDate(d.getDate() - 1);
    return d;
  }, []);
  const [quick, setQuick] = useState("today"); // today | yesterday | all | custom
  const [q, setQ] = useState("");
  const [status, setStatus] = useState("");
  const [technician, setTechnician] = useState("");
  const [startDate, setStartDate] = useState(toISODate(today));
  const [endDate, setEndDate] = useState(toISODate(today));
  const [techs, setTechs] = useState([]);
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);

  // Modal (تسليم)
  const [deliverOpen, setDeliverOpen] = useState(false);
  const [deliverTarget, setDeliverTarget] = useState(null);
  const [deliverRequirePassword, setDeliverRequirePassword] = useState(false);

  // UX: عداد بسيط للتحديث + أخطاء
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const t = await API.get("/technicians").then((r) => r.data);
        setTechs(t);
      } catch {}
    })();
  }, []);

  function applyQuick(qk) {
    setQuick(qk);
    if (qk === "today") {
      setStartDate(toISODate(startOfDay(today)));
      setEndDate(toISODate(endOfDay(today)));
    } else if (qk === "yesterday") {
      setStartDate(toISODate(startOfDay(yesterday)));
      setEndDate(toISODate(endOfDay(yesterday)));
    } else if (qk === "all") {
      setStartDate("");
      setEndDate("");
    }
    // طبّق فورًا لتحسين التجربة
    setTimeout(load, 0);
  }

  async function load() {
    setLoading(true);
    setError("");
    try {
      const params = {};
      if (q) params.q = q;
      if (status) params.status = status;
      if (canViewAll && technician) params.technician = technician;
      if (quick !== "all") {
        if (startDate) params.startDate = `${startDate}T00:00:00`;
        if (endDate) params.endDate = `${endDate}T23:59:59.999`;
      }
      const data = await listRepairs(params);
      setList(data);
    } catch (e) {
      setError(e?.response?.data?.message || "تعذر تحميل البيانات");
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    load();
  }, []);

  function openDeliverModal(r) {
    const isAssigned =
      r.technician &&
      (r.technician._id || r.technician) === (user?.id || user?._id);
    setDeliverRequirePassword(!canEditAll && isAssigned);
    setDeliverTarget(r);
    setDeliverOpen(true);
  }
  async function submitDeliver(payload) {
    try {
      await updateRepairStatus(deliverTarget._id, {
        status: "تم التسليم",
        ...payload,
      });
      setDeliverOpen(false);
      setDeliverTarget(null);
      await load();
    } catch (e) {
      alert(e?.response?.data?.message || "خطأ أثناء إتمام التسليم");
    }
  }

  async function changeStatusInline(r, nextStatus) {
    try {
      if (nextStatus === "تم التسليم") {
        openDeliverModal(r);
        return;
      }
      if (nextStatus === "مرفوض") {
        const ans = window.prompt(
          "مكان الجهاز؟ اكتب: بالمحل أو مع العميل",
          "بالمحل"
        );
        if (!ans) return;
        await updateRepairStatus(r._id, {
          status: nextStatus,
          rejectedDeviceLocation: ans,
        });
        await load();
        return;
      }
      const isAssigned =
        r.technician &&
        (r.technician._id || r.technician) === (user?.id || user?._id);
      let body = { status: nextStatus };
      if (!canEditAll && isAssigned) {
        const password = window.prompt("ادخل كلمة السر لتأكيد تغيير الحالة");
        if (!password) return;
        body.password = password;
      }
      await updateRepairStatus(r._id, body);
      await load();
    } catch (e) {
      alert(e?.response?.data?.message || "حدث خطأ أثناء تحديث الحالة");
    }
  }

  // ====== UI Components ======
  const QuickBtn = ({ value, label, icon, active, onClick }) => (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-3 py-2 rounded-xl border transition
      ${
        active
          ? "bg-blue-600 text-white border-blue-600"
          : "bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
      }`}
      aria-pressed={active}
    >
      <span aria-hidden="true">{icon}</span>
      <span>{label}</span>
    </button>
  );

  const StatusPill = ({ s }) => {
    const map = {
      "في الانتظار": "bg-gray-100 text-gray-800 dark:bg-gray-700",
      "جاري العمل":
        "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-200",
      مكتمل:
        "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-200",
      "تم التسليم":
        "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-200",
      مرفوض: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-200",
      مرتجع:
        "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-200",
    };
    return (
      <span
        className={`px-2 py-0.5 rounded-full text-xs font-medium ${
          map[s] || "bg-gray-100 dark:bg-gray-700"
        }`}
      >
        {s}
      </span>
    );
  };

  const SkeletonRow = () => (
    <tr className="animate-pulse">
      {Array.from({ length: 13 }).map((_, i) => (
        <td key={i} className="p-2">
          <div className="h-3 rounded bg-gray-200 dark:bg-gray-700 w-full" />
        </td>
      ))}
    </tr>
  );

  const EmptyState = () => (
    <div className="p-6 rounded-2xl bg-white dark:bg-gray-800 text-center">
      <div className="text-3xl mb-2">🔍</div>
      <div className="font-semibold mb-1">لا توجد نتائج لهذا الفلتر</div>
      <div className="opacity-70 mb-3 text-sm">
        جرّب توسيع المدى الزمني أو إزالة بعض الفلاتر.
      </div>
      <Link
        to="/repairs/new"
        className="inline-block px-4 py-2 rounded-xl bg-blue-600 text-white"
      >
        + إضافة صيانة
      </Link>
    </div>
  );

  return (
    <div className="space-y-4">
      {/* رأس الصفحة */}
      <header className="flex items-center justify-between sticky top-0 z-20 bg-gradient-to-b from-white/80 to-white/0 dark:from-gray-900/80 backdrop-blur py-2">
        <h1 className="text-xl font-bold">الصيانات</h1>
        <div className="flex items-center gap-2">
          <button
            onClick={load}
            className="px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
          >
            تحديث
          </button>
          <Link
            to="/repairs/new"
            className="px-3 py-2 rounded-xl bg-blue-600 text-white hover:opacity-90"
          >
            + إضافة صيانة
          </Link>
        </div>
      </header>

      {/* الفلاتر — مصممة للموبايل والديسكتوب */}
      <section className="p-3 rounded-2xl bg-white dark:bg-gray-800 shadow-sm space-y-3">
        {/* سطر 1: أزرار الزمن السريع */}
        <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-2">
          <QuickBtn
            value="today"
            label="اليوم"
            icon="📅"
            active={quick === "today"}
            onClick={() => applyQuick("today")}
          />
          <QuickBtn
            value="yesterday"
            label="أمس"
            icon="🕓"
            active={quick === "yesterday"}
            onClick={() => applyQuick("yesterday")}
          />
          <QuickBtn
            value="all"
            label="جميع الأوقات"
            icon="∞"
            active={quick === "all"}
            onClick={() => applyQuick("all")}
          />
          <div className="hidden sm:block opacity-60 self-center">أو</div>
          {/* مدى زمني */}
          <div className="col-span-2 sm:flex sm:items-center sm:gap-2">
            <input
              type="date"
              value={startDate}
              onChange={(e) => {
                setStartDate(e.target.value);
                setQuick("custom");
              }}
              className="px-3 py-2 rounded-xl bg-gray-100 dark:bg-gray-700 w-full sm:w-auto"
              aria-label="بداية المدى الزمني"
            />
            <span className="mx-1 opacity-60 hidden sm:inline">—</span>
            <input
              type="date"
              value={endDate}
              onChange={(e) => {
                setEndDate(e.target.value);
                setQuick("custom");
              }}
              className="px-3 py-2 rounded-xl bg-gray-100 dark:bg-gray-700 w-full sm:w-auto"
              aria-label="نهاية المدى الزمني"
            />
            <button
              onClick={load}
              className="mt-2 sm:mt-0 sm:ml-2 px-4 py-2 rounded-xl bg-blue-600 text-white w-full sm:w-auto"
            >
              تطبيق
            </button>
          </div>
        </div>

        {/* سطر 2: بحث + حالة + فني (إن وُجد) */}
        <div className="grid md:grid-cols-4 gap-2">
          <div className="md:col-span-2">
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") load();
              }}
              placeholder="بحث (اسم/هاتف/جهاز/عطل)"
              className="px-3 py-2 rounded-xl bg-gray-100 dark:bg-gray-700 w-full"
              aria-label="بحث"
            />
          </div>
          <div>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="px-3 py-2 rounded-xl bg-gray-100 dark:bg-gray-700 w-full"
              aria-label="تصفية بالحالة"
            >
              <option value="">كل الحالات</option>
              {statusOptions.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
          {canViewAll && (
            <div>
              <select
                value={technician}
                onChange={(e) => setTechnician(e.target.value)}
                className="px-3 py-2 rounded-xl bg-gray-100 dark:bg-gray-700 w-full"
                aria-label="تصفية بالفني"
              >
                <option value="">كل الفنيين</option>
                {techs.map((t) => (
                  <option key={t._id} value={t._id}>
                    {t.name}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>
      </section>

      {/* خطأ عام إن وجد */}
      {error && (
        <div className="p-3 rounded-xl bg-red-50 text-red-800">{error}</div>
      )}

      {/* الديسكتوب: جدول كامل */}
      <section className="hidden md:block p-3 rounded-2xl bg-white dark:bg-gray-800 shadow-sm overflow-x-auto">
        <div className="flex items-center justify-between mb-2">
          <div className="text-sm opacity-70">
            النتائج: {loading ? "…" : list.length}
          </div>
        </div>
        <table className="w-full text-sm border-separate [border-spacing:0]">
          <thead className="sticky top-[0] bg-white dark:bg-gray-800 shadow-sm">
            <tr className="text-right">
              <Th>#</Th>
              <Th>العميل</Th>
              <Th>الهاتف</Th>
              <Th>الجهاز</Th>
              <Th>العطل</Th>
              <Th>اللون</Th>
              <Th>الفني</Th>
              <Th>المستلم/المسجّل</Th>
              <Th>الحالة</Th>
              <Th>السعر</Th>
              <Th>تاريخ الإنشاء</Th>
              <Th>تاريخ التسليم</Th>
              <Th>إجراءات</Th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <>
                <SkeletonRow />
                <SkeletonRow />
                <SkeletonRow />
              </>
            ) : list.length === 0 ? (
              <tr>
                <td colSpan={13} className="p-0">
                  <EmptyState />
                </td>
              </tr>
            ) : (
              list.map((r) => (
                <tr
                  key={r._id}
                  className="odd:bg-gray-50 dark:odd:bg-gray-700/40 hover:bg-gray-100/60 dark:hover:bg-gray-700/60 transition"
                >
                  <Td>{r.repairId}</Td>
                  <Td>{r.customerName}</Td>
                  <Td>{r.phone || "—"}</Td>
                  <Td className="font-medium">{r.deviceType}</Td>
                  <Td className="max-w-[220px] truncate" title={r.issue || ""}>
                    {r.issue || "—"}
                  </Td>
                  <Td>{r.color || "—"}</Td>
                  <Td>{r?.technician?.name || "—"}</Td>
                  <Td>{r?.createdBy?.name || r?.recipient?.name || "—"}</Td>
                  <Td>
                    <div className="flex items-center gap-2">
                      <StatusPill s={r.status} />
                      <select
                        value={r.status}
                        onChange={(e) => changeStatusInline(r, e.target.value)}
                        className="px-2 py-1 rounded-lg bg-gray-100 dark:bg-gray-700"
                        aria-label={`تغيير حالة الصيانة رقم ${r.repairId}`}
                      >
                        {statusOptions.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                    </div>
                  </Td>
                  <Td>{typeof r.price === "number" ? r.price : "—"}</Td>
                  <Td>{formatDate(r.createdAt)}</Td>
                  <Td>{r.deliveryDate ? formatDate(r.deliveryDate) : "—"}</Td>
                  <Td>
                    <div className="flex items-center gap-2">
                      <Link
                        to={`/repairs/${r._id}`}
                        className="px-2 py-1 rounded-lg bg-gray-200 dark:bg-gray-700"
                      >
                        فتح
                      </Link>
                      {canEditAll && (
                        <Link
                          to={`/repairs/${r._id}/edit`}
                          className="px-2 py-1 rounded-lg bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-200"
                        >
                          تعديل
                        </Link>
                      )}
                    </div>
                  </Td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </section>

      {/* الموبايل: كروت سهلة */}
      <section className="md:hidden space-y-2">
        {loading ? (
          <div className="p-3 rounded-2xl bg-white dark:bg-gray-800 animate-pulse h-24" />
        ) : list.length === 0 ? (
          <EmptyState />
        ) : (
          list.map((r) => (
            <div
              key={r._id}
              className="p-3 rounded-2xl bg-white dark:bg-gray-800 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <div className="font-bold">
                  #{r.repairId} — {r.deviceType}
                </div>
                <StatusPill s={r.status} />
              </div>
              <div className="text-sm opacity-80">
                {r.customerName} • {r.phone || "—"}
              </div>
              <div className="text-xs opacity-70 mt-1">
                {r?.technician?.name
                  ? `الفني: ${r.technician.name}`
                  : "الفني: —"}{" "}
                • المسجّل: {r?.createdBy?.name || r?.recipient?.name || "—"}
              </div>

              <div className="grid grid-cols-2 gap-2 mt-3 text-sm">
                <Info label="العطل" value={r.issue || "—"} />
                <Info label="اللون" value={r.color || "—"} />
                <Info
                  label="السعر"
                  value={typeof r.price === "number" ? r.price : "—"}
                />
                <Info label="إنشاء" value={formatDate(r.createdAt)} />
                <Info
                  label="التسليم"
                  value={r.deliveryDate ? formatDate(r.deliveryDate) : "—"}
                />
              </div>

              <div className="mt-3 flex flex-wrap items-center gap-2">
                <select
                  value={r.status}
                  onChange={(e) => changeStatusInline(r, e.target.value)}
                  className="px-2 py-1 rounded-lg bg-gray-100 dark:bg-gray-700"
                  aria-label={`تغيير حالة الصيانة رقم ${r.repairId}`}
                >
                  {statusOptions.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
                <Link
                  to={`/repairs/${r._id}`}
                  className="px-3 py-1 rounded-lg bg-gray-200 dark:bg-gray-700"
                >
                  فتح
                </Link>
                {canEditAll && (
                  <Link
                    to={`/repairs/${r._id}/edit`}
                    className="px-3 py-1 rounded-lg bg-blue-600 text-white"
                  >
                    تعديل
                  </Link>
                )}
              </div>
            </div>
          ))
        )}
      </section>

      {/* مودال التسليم */}
      <DeliveryModal
        open={deliverOpen}
        onClose={() => {
          setDeliverOpen(false);
          setDeliverTarget(null);
        }}
        onSubmit={submitDeliver}
        initialFinalPrice={
          deliverTarget
            ? deliverTarget.finalPrice ?? deliverTarget.price ?? 0
            : 0
        }
        initialParts={deliverTarget ? deliverTarget.parts || [] : []}
        requirePassword={deliverRequirePassword}
      />
    </div>
  );
}

// ====== Sub Components ======
function Th({ children }) {
  return (
    <th className="p-2 text-xs font-semibold text-gray-600 dark:text-gray-300 border-b border-gray-200 dark:border-gray-700">
      {children}
    </th>
  );
}
function Td({ children, className = "" }) {
  return <td className={`p-2 align-top ${className}`}>{children}</td>;
}
function Info({ label, value }) {
  return (
    <div className="p-2 rounded-xl bg-gray-50 dark:bg-gray-700/40">
      <div className="text-[11px] opacity-70">{label}</div>
      <div className="font-medium">{value}</div>
    </div>
  );
}
