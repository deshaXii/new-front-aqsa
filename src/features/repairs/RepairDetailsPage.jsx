// src/features/repairs/SingleRepairPage.jsx
import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import useAuthStore from "../auth/authStore";
import { getRepair, updateRepair, updateRepairStatus } from "./repairsApi";
import formatDate from "../../utils/formatDate";
import statusOptions from "../../utils/statusOptions";
import DeliveryModal from "../../components/DeliveryModal";
import StatusSelect from "../../components/StatusSelect";
import QrAfterCreateModal from "../../components/QrAfterCreateModal";

export default function SingleRepairPage() {
  const { id } = useParams();
  const nav = useNavigate();
  const { user } = useAuthStore();

  const [qrOpen, setQrOpen] = useState(false);

  const isAdmin = user?.role === "admin" || user?.permissions?.adminOverride;
  const canEditAll = isAdmin || user?.permissions?.editRepair;

  const [loading, setLoading] = useState(true);
  const [repair, setRepair] = useState(null);
  const [error, setError] = useState("");

  const trackingUrl = useMemo(() => {
    const token = repair?.publicTracking?.token;
    return token ? `${window.location.origin}/t/${token}` : "";
  }, [repair]);

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
      // توحيد شكل الأجزاء + التواريخ
      const parts = (payload.parts || []).map((p) => ({
        name: p.name || "",
        cost: p.cost ? Number(p.cost) : 0,
        supplier: p.supplier || undefined,
        source: p.source || undefined,
        purchaseDate: p.purchaseDate
          ? new Date(p.purchaseDate).toISOString()
          : undefined,
      }));

      const body = {
        status: "تم التسليم",
        finalPrice: payload.finalPrice ? Number(payload.finalPrice) : 0,
        parts,
        ...(payload.password ? { password: payload.password } : {}),
      };

      // مهم: استخدم updateRepair (مش updateRepairStatus)
      const updated = await updateRepair(id, body);

      setRepair(updated);
      setDeliverOpen(false);

      // حدّث الحقول الظاهرة مباشرة
      setTimeout(() => {
        // لو عندك ستايت محلي للعرض
        // (لو بتستخدم form هنا، حدّثه بنفسك)
      }, 0);
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
          <button
            onClick={() => {
              if (!trackingUrl) {
                alert("لم يتم تفعيل التتبّع بعد.");
                return;
              }
              setQrOpen(true);
            }}
            className="px-3 py-2 rounded-xl bg-emerald-600 text-white"
          >
            تتبُّع/QR
          </button>
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
      <section className="p-3 rounded-xl bg-white dark:bg-gray-800">
        <h2 className="font-semibold mb-2">التتبّع (QR)</h2>
        <div className="grid md:grid-cols-3 gap-3 items-end">
          <Info
            label="مرّات فتح رابط التتبّع"
            value={repair?.publicTracking?.views ?? 0}
          />
          <Info
            label="آخر فتح"
            value={
              repair?.publicTracking?.lastViewedAt
                ? formatDate(repair.publicTracking.lastViewedAt)
                : "—"
            }
          />
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                const token = repair?.publicTracking?.token;
                const url = token ? `${window.location.origin}/t/${token}` : "";
                if (!url) return;
                navigator.clipboard.writeText(url);
              }}
              className="px-3 py-2 rounded-xl bg-gray-200 dark:bg-gray-700"
            >
              نسخ رابط التتبّع
            </button>
            <a
              className="px-3 py-2 rounded-xl bg-blue-600 text-white"
              href={
                repair?.publicTracking?.token
                  ? `${window.location.origin}/t/${repair.publicTracking.token}`
                  : "#"
              }
              target="_blank"
              rel="noreferrer"
            >
              فتح صفحة التتبّع
            </a>
          </div>
        </div>
      </section>
      {/* الحالة + التواريخ */}
      <section className="p-3 rounded-xl bg-white dark:bg-gray-800">
        <div className="grid md:grid-cols-4 gap-3 items-end">
          <label className="space-y-1">
            <div className="text-sm opacity-80">الحالة</div>
            <StatusSelect
              value={repair.status || ""}
              onChange={(v) => onStatusChange(v)}
              disabled={!canEditAll && !isAssigned}
            />
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
          <Info
            label="تاريخ الإستلام"
            value={formatDate(repair.deliveryDate)}
          />
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
        <Info label="السعر المتفق عليه" value={repair.price ?? "—"} />
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
      <QrAfterCreateModal
        open={qrOpen}
        onClose={() => setQrOpen(false)}
        trackingUrl={trackingUrl}
        repair={repair}
      />
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

function Info({ label, value, children }) {
  const v = value ?? children ?? "—";
  return (
    <div className="p-3 rounded-lg bg-gray-100 dark:bg-gray-700">
      <div className="text-xs opacity-70">{label}</div>
      <div className="font-semibold break-words">{v}</div>
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
                    : l.action || "—"}
                </Td>
                <Td>
                  {/* نص عام لو موجود */}
                  {l.details && <div className="mb-2">{l.details}</div>}

                  {/* تغييرات مفصّلة */}
                  {Array.isArray(l.changes) && l.changes.length > 0 && (
                    <ul className="pr-4 space-y-2">
                      {l.changes.map((c, i) => {
                        if (c.field === "parts") {
                          return (
                            <PartsChange
                              key={i}
                              fromVal={c.from}
                              toVal={c.to}
                            />
                          );
                        }
                        if (c.field === "partPaid") {
                          return (
                            <li
                              key={i}
                              className="p-2 rounded-lg bg-gray-50 dark:bg-gray-700/40"
                            >
                              <span className="opacity-70">
                                دفع قطعة غيار:{" "}
                              </span>
                              <span className="font-medium">
                                {c?.to === true ? "تم الدفع" : "أُلغي الدفع"}
                              </span>
                            </li>
                          );
                        }
                        // باقي الحقول التقليدية
                        return (
                          <li
                            key={i}
                            className="p-2 rounded-lg bg-gray-50 dark:bg-gray-700/40"
                          >
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
                        );
                      })}
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

/* ====== عرض وديف لقطع الغيار بشكل مفهوم ====== */
function PartsChange({ fromVal, toVal }) {
  const oldParts = toArray(fromVal);
  const newParts = toArray(toVal);

  const diff = diffParts(oldParts, newParts);

  // لو مفيش فرق فعلي، اعرض “بدون تغييرات جوهرية”
  if (
    diff.added.length === 0 &&
    diff.removed.length === 0 &&
    diff.updated.length === 0
  ) {
    return (
      <li className="p-2 rounded-lg bg-gray-50 dark:bg-gray-700/40">
        لا تغييرات جوهرية على قطع الغيار
      </li>
    );
  }

  const F = FIELD_LABELS;

  return (
    <li className="p-2 rounded-lg bg-gray-50 dark:bg-gray-700/40 space-y-2">
      <div className="font-semibold">تعديلات قطع الغيار:</div>

      {/* المضاف */}
      {diff.added.length > 0 && (
        <div>
          <div className="text-sm font-medium text-emerald-700 dark:text-emerald-300">
            + تمت إضافة {diff.added.length} قطعة:
          </div>
          <ul className="list-disc pr-5 mt-1 space-y-1">
            {diff.added.map((p, i) => (
              <li key={`a-${i}`}>{prettyPart(p)}</li>
            ))}
          </ul>
        </div>
      )}

      {/* المحذوف */}
      {diff.removed.length > 0 && (
        <div>
          <div className="text-sm font-medium text-red-700 dark:text-red-300">
            − تم حذف {diff.removed.length} قطعة:
          </div>
          <ul className="list-disc pr-5 mt-1 space-y-1">
            {diff.removed.map((p, i) => (
              <li key={`r-${i}`}>{prettyPart(p)}</li>
            ))}
          </ul>
        </div>
      )}

      {/* المعدّل */}
      {diff.updated.length > 0 && (
        <div>
          <div className="text-sm font-medium text-blue-700 dark:text-blue-300">
            ✎ تم تعديل {diff.updated.length} قطعة:
          </div>
          <ul className="list-disc pr-5 mt-1 space-y-2">
            {diff.updated.map((u, i) => (
              <li key={`u-${i}`}>
                <div className="font-medium">
                  {u.newer.name || u.older.name || "قطعة بدون اسم"}
                </div>
                <div className="mt-1 grid sm:grid-cols-2 gap-2">
                  {u.changes.map((chg, j) => (
                    <div
                      key={`c-${j}`}
                      className="rounded-lg bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 p-2"
                    >
                      <div className="text-xs opacity-70">
                        {F[chg.field] || chg.field}
                      </div>
                      <div className="text-sm">
                        <del className="opacity-70 mr-2">
                          {simpleVal(chg.from, chg.field)}
                        </del>
                        <span className="mx-1">→</span>
                        <strong>{simpleVal(chg.to, chg.field)}</strong>
                      </div>
                    </div>
                  ))}
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </li>
  );
}

/* ====== Helpers لقطع الغيار ====== */
const FIELD_LABELS = {
  name: "الاسم",
  source: "بواسطة",
  supplier: "المورد",
  cost: "التكلفة",
  purchaseDate: "تاريخ الشراء",
  qty: "الكمية",
  paid: "مدفوع؟",
};

function toArray(v) {
  try {
    if (!v) return [];
    if (Array.isArray(v)) return v;
    if (typeof v === "string") return JSON.parse(v);
    return [];
  } catch {
    return [];
  }
}

function keyOf(p) {
  // هوية مقارنة مرنة: استخدم _id إن وُجد، وإلا استخدم بصمة من الاسم+التاريخ+السعر
  if (p && p._id) return String(p._id);
  const name = (p?.name || "").trim();
  const date = p?.purchaseDate
    ? new Date(p.purchaseDate).toISOString().slice(0, 10)
    : "";
  const cost = Number(p?.cost || 0);
  const sup = (p?.supplier || "").trim();
  const src = (p?.source || "").trim();
  return `${name}|${date}|${cost}|${sup}|${src}`;
}

function normalizePart(p) {
  return {
    _id: p?._id,
    name: p?.name || "",
    source: p?.source || "",
    supplier: p?.supplier || "",
    cost: Number(p?.cost ?? 0),
    purchaseDate: p?.purchaseDate || null,
    qty: Number(p?.qty ?? 1),
    paid: !!p?.paid,
  };
}

function diffParts(oldArr, newArr) {
  const oldMap = new Map(oldArr.map((x) => [keyOf(x), normalizePart(x)]));
  const newMap = new Map(newArr.map((x) => [keyOf(x), normalizePart(x)]));

  const added = [];
  const removed = [];
  const updated = [];

  // Added
  for (const [k, v] of newMap) {
    if (!oldMap.has(k)) added.push(v);
  }
  // Removed
  for (const [k, v] of oldMap) {
    if (!newMap.has(k)) removed.push(v);
  }
  // Updated (same key exists في الاثنين لكن في فروق داخلية)
  for (const [k, newP] of newMap) {
    if (!oldMap.has(k)) continue;
    const oldP = oldMap.get(k);
    const fields = [
      "name",
      "source",
      "supplier",
      "cost",
      "purchaseDate",
      "qty",
      "paid",
    ];
    const changes = [];
    fields.forEach((f) => {
      const a = oldP[f];
      const b = newP[f];
      const aStr =
        f === "purchaseDate" ? (a ? new Date(a).toISOString() : null) : a;
      const bStr =
        f === "purchaseDate" ? (b ? new Date(b).toISOString() : null) : b;
      if (JSON.stringify(aStr) !== JSON.stringify(bStr)) {
        changes.push({ field: f, from: oldP[f], to: newP[f] });
      }
    });
    if (changes.length) updated.push({ older: oldP, newer: newP, changes });
  }

  return { added, removed, updated };
}

function simpleVal(v, field) {
  if (field === "purchaseDate") {
    return v ? formatDate(v) : "—";
  }
  if (field === "cost") {
    return Number.isFinite(v) ? Math.round(Number(v)) : v ?? "—";
  }
  if (field === "paid") {
    return v ? "مدفوع" : "غير مدفوع";
  }
  if (field === "qty") {
    return Number.isFinite(v) ? v : "—";
  }
  return v ?? "—";
}

function prettyPart(p) {
  // سطر مختصر لطيف عن القطعة
  const bits = [];
  if (p.name) bits.push(p.name);
  if (p.supplier) bits.push(`المورد: ${p.supplier}`);
  if (p.source) bits.push(`بواسطة: ${p.source}`);
  if (Number.isFinite(p.cost)) bits.push(`التكلفة: ${Math.round(p.cost)}`);
  if (p.purchaseDate) bits.push(`التاريخ: ${formatDate(p.purchaseDate)}`);
  if (Number.isFinite(p.qty)) bits.push(`الكمية: ${p.qty}`);
  if (typeof p.paid === "boolean")
    bits.push(`الحالة: ${p.paid ? "مدفوع" : "غير مدفوع"}`);
  return bits.join(" • ");
}

/* ====== بقية الدوال العامة (مُحدّثة) ====== */
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
    returnDate: "تاريخ المرتجع",
    rejectedDeviceLocation: "مكان الجهاز (مرفوض)",
    parts: "قطع الغيار",
    partPaid: "دفع قطعة غيار",
    notes: "ملاحظات",
    phone: "الهاتف",
    customerName: "اسم العميل",
  };
  return map[key] || key;
}

function renderVal(v) {
  // لا نعرض JSON ضخم؛ نلخّص بس
  if (Array.isArray(v)) {
    return `(${v.length} عنصر)`;
  }
  if (v === null || v === undefined || v === "") return "—";
  if (typeof v === "boolean") return v ? "نعم" : "لا";
  if (typeof v === "number") return String(v);
  if (typeof v === "string") return v.length > 50 ? v.slice(0, 50) + "…" : v;
  try {
    const s = JSON.stringify(v);
    return s.length > 60 ? s.slice(0, 60) + "…" : s;
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

function Td({ children, className = "" }) {
  return <td className={`p-2 align-top ${className}`}>{children}</td>;
}
