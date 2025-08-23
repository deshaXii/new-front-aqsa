// src/features/repairs/SingleRepairPage.jsx
import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import useAuthStore from "../auth/authStore";
import { getRepair, updateRepair, updateRepairStatus } from "./repairsApi";
import formatDate from "../../utils/formatDate";
import statusOptions from "../../utils/statusOptions";
import DeliveryModal from "../../components/DeliveryModal";

export default function SingleRepairPage() {
  const { id } = useParams();
  const nav = useNavigate();
  const { user } = useAuthStore();

  const isAdmin = user?.role === "admin" || user?.permissions?.adminOverride;
  const canEditAll = isAdmin || user?.permissions?.editRepair;

  const [loading, setLoading] = useState(true);
  const [repair, setRepair] = useState(null);
  const [error, setError] = useState("");

  // مودال التسليم
  const [deliverOpen, setDeliverOpen] = useState(false);
  const [requirePassword, setRequirePassword] = useState(false);

  const isAssigned = useMemo(() => {
    if (!repair) return false;
    const techId = repair?.technician?._id || repair?.technician;
    const uid = user?.id || user?._id;
    return techId && uid && String(techId) === String(uid);
  }, [repair, user]);

  async function load() {
    setLoading(true);
    setError("");
    try {
      const r = await getRepair(id);
      setRepair(r);
    } catch (e) {
      setError(e?.response?.data?.message || "حدث خطأ أثناء التحميل");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load(); /* eslint-disable-next-line */
  }, [id]);

  function onStatusChange(nextStatus) {
    if (!repair) return;
    if (nextStatus === "تم التسليم") {
      setRequirePassword(!canEditAll && isAssigned);
      setDeliverOpen(true);
      return;
    }
    if (nextStatus === "مرفوض") {
      // نغيّر الحالة فقط الآن، والمكان من السلكت أسفلها
      const body = { status: "مرفوض" };
      if (!canEditAll && isAssigned) {
        const password = window.prompt("ادخل كلمة السر لتأكيد تغيير الحالة");
        if (!password) return;
        body.password = password;
      }
      changeStatus(body);
      return;
    }
    // باقي الحالات
    const body = { status: nextStatus };
    if (!canEditAll && isAssigned) {
      const password = window.prompt("ادخل كلمة السر لتأكيد تغيير الحالة");
      if (!password) return;
      body.password = password;
    }
    changeStatus(body);
  }

  async function changeStatus(body) {
    try {
      const updated = await updateRepairStatus(id, body);
      setRepair(updated);
    } catch (e) {
      alert(e?.response?.data?.message || "فشل تغيير الحالة");
    }
  }

  async function changeRejectedLocation(loc) {
    try {
      const body = { status: "مرفوض", rejectedDeviceLocation: loc };
      if (!canEditAll && isAssigned) {
        const password = window.prompt(
          "ادخل كلمة السر لتأكيد تغيير مكان الجهاز"
        );
        if (!password) return;
        body.password = password;
      }
      const updated = await updateRepairStatus(id, body);
      setRepair(updated);
    } catch (e) {
      alert(e?.response?.data?.message || "فشل تحديث مكان الجهاز");
    }
  }

  async function submitDelivery(payload) {
    try {
      // payload = { finalPrice, parts, password? }
      const updated = await updateRepair(id, {
        status: "تم التسليم",
        ...payload,
      });
      setRepair(updated);
      setDeliverOpen(false);
    } catch (e) {
      alert(e?.response?.data?.message || "خطأ أثناء إتمام التسليم");
    }
  }

  if (loading) return <div>جارِ التحميل...</div>;
  if (error)
    return <div className="p-3 rounded-xl bg-red-50 text-red-800">{error}</div>;
  if (!repair) return <div>الصيانة غير موجودة.</div>;

  return (
    <div className="space-y-6">
      <header className="flex items-center justify-between">
        <h1 className="text-xl font-bold">صيانة #{repair.repairId || "—"}</h1>
        <div className="flex items-center gap-2">
          {canEditAll && (
            <Link
              to={`/repairs/${id}/edit`}
              className="px-3 py-2 rounded-xl bg-blue-600 text-white"
            >
              تعديل
            </Link>
          )}
          <Link
            to="/repairs"
            className="px-3 py-2 rounded-xl bg-gray-200 dark:bg-gray-700"
          >
            رجوع
          </Link>
        </div>
      </header>

      {/* الحالة + التواريخ */}
      <section className="p-3 rounded-xl bg-white dark:bg-gray-800">
        <div className="grid md:grid-cols-4 gap-3 items-end">
          <label className="space-y-1">
            <div className="text-sm opacity-80">الحالة</div>
            <select
              value={repair.status || ""}
              onChange={(e) => onStatusChange(e.target.value)}
              className="px-3 py-2 rounded-xl bg-gray-100 dark:bg-gray-700"
              disabled={!canEditAll && !isAssigned}
            >
              {statusOptions.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
            {!canEditAll && isAssigned && (
              <div className="text-xs opacity-70 mt-1">
                عند اختيار “تم التسليم” سيُطلب كلمة السر.
              </div>
            )}

            {/* خانة مكان الجهاز تظهر فقط عند الرفض */}
            {repair.status === "مرفوض" && (
              <div className="mt-2">
                <div className="text-sm opacity-80 mb-1">
                  مكان الجهاز عند الرفض
                </div>
                <select
                  value={repair.rejectedDeviceLocation || "بالمحل"}
                  onChange={(e) => changeRejectedLocation(e.target.value)}
                  className="px-3 py-2 rounded-xl bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-200"
                  disabled={!canEditAll && !isAssigned}
                >
                  <option value="بالمحل">بالمحل</option>
                  <option value="مع العميل">مع العميل</option>
                </select>
                <div className="text-xs opacity-70 mt-1">
                  اختيار "مع العميل" يسجّل وقت التسليم تلقائيًا.
                </div>
              </div>
            )}
          </label>

          <Info label="تاريخ الإنشاء" value={formatDate(repair.createdAt)} />
          <Info label="الفني" value={repair?.technician?.name || "—"} />
        </div>
      </section>

      {/* بيانات العميل والجهاز */}
      <section className="p-3 rounded-xl bg-white dark:bg-gray-800 grid md:grid-cols-2 gap-3">
        <Info label="العميل" value={repair.customerName || "—"} />
        <Info label="الهاتف" value={repair.phone || "—"} />
        <Info label="الجهاز" value={repair.deviceType || "—"} />
        <Info label="اللون" value={repair.color || "—"} />
        <Info label="العطل" value={repair.issue || "—"} />
        <Info label="السعر المبدئي" value={repair.price ?? "—"} />
        <Info
          label="السعر النهائي"
          value={
            typeof repair.finalPrice === "number" ? repair.finalPrice : "—"
          }
        />
        <Info label="ملاحظات" value={repair.notes || "—"} />
      </section>

      {/* قطع الغيار */}
      <section className="p-3 rounded-xl bg-white dark:bg-gray-800">
        <h2 className="font-semibold mb-2">قطع الغيار</h2>
        {(repair.parts || []).length === 0 ? (
          <div className="opacity-70">لا توجد قطع</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-right">
                  <th className="p-2">الاسم</th>
                  <th className="p-2">بواسطة</th>
                  <th className="p-2">المورد</th>
                  <th className="p-2">تاريخ الشراء</th>
                  <th className="p-2">التكلفة</th>
                </tr>
              </thead>
              <tbody>
                {repair.parts.map((p, i) => (
                  <tr
                    key={i}
                    className="odd:bg-gray-50 dark:odd:bg-gray-700/40"
                  >
                    <td className="p-2">{p.name || "—"}</td>
                    <td className="p-2">{p.source || "—"}</td>
                    <td className="p-2">{p.supplier || "—"}</td>
                    <td className="p-2">
                      {p.purchaseDate ? formatDate(p.purchaseDate) : "—"}
                    </td>
                    <td className="p-2">
                      {typeof p.cost === "number" ? p.cost : "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {isAdmin && repair?.logs?.length > 0 && (
        <ActivityLog logs={repair.logs} />
      )}

      {/* مودال التسليم */}
      <DeliveryModal
        open={deliverOpen}
        onClose={() => setDeliverOpen(false)}
        onSubmit={submitDelivery}
        initialFinalPrice={repair.finalPrice ?? repair.price ?? 0}
        initialParts={repair.parts || []}
        requirePassword={requirePassword}
      />
    </div>
  );
}

function Info({ label, value }) {
  return (
    <div className="p-3 rounded-lg bg-gray-100 dark:bg-gray-700">
      <div className="text-xs opacity-70">{label}</div>
      <div className="font-semibold break-words">{value}</div>
    </div>
  );
}

function ActivityLog({ logs = [] }) {
  const ordered = [...logs].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  return (
    <section className="mt-4 p-3 rounded-2xl bg-white dark:bg-gray-800 shadow-sm">
      <h2 className="font-semibold mb-3">سجلّ العمليات</h2>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-right">
              <Th>الوقت</Th>
              <Th>المستخدم</Th>
              <Th>الإجراء</Th>
              <Th>التفاصيل</Th>
            </tr>
          </thead>
          <tbody>
            {ordered.map((l) => (
              <tr
                key={l._id}
                className="odd:bg-gray-50 dark:odd:bg-gray-700/40 align-top"
              >
                <Td>{formatDate(l.createdAt)}</Td>
                <Td>{l?.changedBy?.name || "—"}</Td>
                <Td>
                  {l.action === "create"
                    ? "إنشاء"
                    : l.action === "update"
                    ? "تعديل"
                    : l.action === "delete"
                    ? "حذف"
                    : l.action === "part_paid"
                    ? "دفع قطعة غيار"
                    : l.action === "part_unpaid"
                    ? "إلغاء دفع قطعة غيار"
                    : l.action || "—"}
                </Td>
                <Td>
                  {l.details && <div className="mb-1">{l.details}</div>}
                  {Array.isArray(l.changes) && l.changes.length > 0 && (
                    <ul className="list-disc pr-4 space-y-1">
                      {l.changes.map((c, i) => (
                        <li key={i}>
                          <span className="opacity-70">الحقل:</span>{" "}
                          <span className="font-medium">
                            {friendlyField(c.field)}
                          </span>{" "}
                          <span className="opacity-70">من</span>{" "}
                          <code className="px-1 rounded bg-gray-100 dark:bg-gray-700">
                            {renderVal(c.from)}
                          </code>{" "}
                          <span className="opacity-70">إلى</span>{" "}
                          <code className="px-1 rounded bg-gray-100 dark:bg-gray-700">
                            {renderVal(c.to)}
                          </code>
                        </li>
                      ))}
                    </ul>
                  )}
                </Td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function friendlyField(key = "") {
  const map = {
    status: "الحالة",
    price: "السعر",
    finalPrice: "السعر النهائي",
    color: "اللون",
    deviceType: "نوع الجهاز",
    issue: "العطل",
    technician: "الفني",
    deliveryDate: "تاريخ التسليم",
    partPaid: "دفع قطعة الغيار", // 👈 جديد
    rejectedDeviceLocation: "مكان الجهاز عند الرفض",
  };
  return map[key] || key;
}
function renderVal(v) {
  if (v === null || v === undefined || v === "") return "—";
  if (typeof v === "string" || typeof v === "number") return String(v);
  try {
    return JSON.stringify(v);
  } catch {
    return "—";
  }
}
function Th({ children }) {
  return (
    <th className="p-2 text-xs font-semibold text-gray-600 dark:text-gray-300 border-b">
      {children}
    </th>
  );
}
function Td({ children }) {
  return <td className="p-2">{children}</td>;
}
