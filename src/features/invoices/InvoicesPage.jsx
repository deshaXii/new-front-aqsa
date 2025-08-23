import { useEffect, useMemo, useState } from "react";
import API from "../../lib/api";
import formatDate from "../../utils/formatDate";

function ymdLocal(d) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export default function InvoicesPage() {
  const today = useMemo(() => ymdLocal(new Date()), []);
  const yesterday = useMemo(() => {
    const d = new Date();
    d.setDate(d.getDate() - 1);
    return ymdLocal(d);
  }, []);

  const [quick, setQuick] = useState("today");
  const [startDate, setStartDate] = useState(today);
  const [endDate, setEndDate] = useState(today);

  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState([]);
  const [byVendor, setByVendor] = useState([]);
  const [totals, setTotals] = useState({ totalParts: 0, count: 0 });
  const [err, setErr] = useState("");
  const [toggling, setToggling] = useState(null); // partId الجاري تحديثه

  // فلتر المدفوع/غير المدفوع/الكل — افتراضيًا الكل علشان الصف ما يختفيش بعد التعليم
  const [paidFilter, setPaidFilter] = useState("all"); // 'all' | 'unpaid' | 'paid'

  // خريطة أسماء الفنيين
  const [techMap, setTechMap] = useState({});
  useEffect(() => {
    (async () => {
      try {
        const techs = await API.get("/technicians").then((r) => r.data || []);
        const map = {};
        techs.forEach((t) => (map[t._id] = t.name || t.username || "—"));
        setTechMap(map);
      } catch {
        setTechMap({});
      }
    })();
  }, []);

  function applyQuick(k) {
    setQuick(k);
    if (k === "today") {
      setStartDate(today);
      setEndDate(today);
    } else if (k === "yesterday") {
      setStartDate(yesterday);
      setEndDate(yesterday);
    } else if (k === "all") {
      setStartDate("");
      setEndDate("");
    }
  }

  // تحميل العناصر وفق paidFilter
  async function loadItems() {
    const params = {};
    if (quick !== "all") {
      if (startDate) params.startDate = startDate;
      if (endDate) params.endDate = endDate;
    }
    if (paidFilter) params.paid = paidFilter; // all | unpaid | paid
    const { data } = await API.get("/invoices/parts", { params });
    setItems(data.items || []);
    return data;
  }

  // تحميل الملخص/الإجماليات دائمًا بناءً على "غير المدفوع"
  async function loadAggregatesUnpaid() {
    const params = {};
    if (quick !== "all") {
      if (startDate) params.startDate = startDate;
      if (endDate) params.endDate = endDate;
    }
    params.paid = "unpaid";
    const { data } = await API.get("/invoices/parts", { params });
    setByVendor(data.byVendor || []);
    setTotals(data.totals || { totalParts: 0, count: 0 });
    return data;
  }

  // تحميل الكل (عناصر + ملخّص)
  async function load() {
    setLoading(true);
    setErr("");
    try {
      await Promise.all([loadItems(), loadAggregatesUnpaid()]);
    } catch (e) {
      setErr(e?.response?.data?.message || "تعذر تحميل البيانات");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quick, startDate, endDate, paidFilter]);

  async function togglePaid(item, next) {
    // منع ضغطات متتابعة على نفس القطعة
    if (toggling === item.part.id) return;

    // خُزن الحالة القديمة للرجوع في حال الفشل
    const prev = {
      paid: !!item.part.paid,
      paidAt: item.part.paidAt || null,
      paidBy: item.part.paidBy || null,
    };

    // عَلم أننا بنحدّث القطعة دي
    setToggling(item.part.id);

    // 1) تحديث تفاؤلي فوري في الواجهة
    setItems((prevList) =>
      prevList.map((it) =>
        it.part.id === item.part.id
          ? {
              ...it,
              part: {
                ...it.part,
                paid: next,
                paidAt: next ? new Date().toISOString() : null,
                // مجرد placeholder محلي؛ السيرفر هيرجع القيمة الصحيحة
                paidBy: next ? "me" : null,
              },
            }
          : it
      )
    );

    try {
      // 2) نداء السيرفر
      const { data } = await API.post(
        `/invoices/parts/${item.repair}/${item.part.id}/mark-paid`,
        { paid: next }
      );

      // 3) ثبّت بالبيانات القادمة من السيرفر (تضمن الدقة)
      setItems((prevList) =>
        prevList.map((it) =>
          it.part.id === item.part.id
            ? {
                ...it,
                part: {
                  ...it.part,
                  paid: data?.part?.paid ?? next,
                  paidAt:
                    data?.part?.paidAt ??
                    (next ? new Date().toISOString() : null),
                  paidBy: data?.part?.paidBy ?? (next ? it.part.paidBy : null),
                },
              }
            : it
        )
      );

      // 4) حدّث ملخص الموردين (غير المدفوع فقط) عشان يتخصم/يرجع المبلغ صح
      await loadAggregatesUnpaid();
    } catch (e) {
      // 5) فشل؟ ارجع للحالة القديمة وأظهر رسالة
      setItems((prevList) =>
        prevList.map((it) =>
          it.part.id === item.part.id
            ? {
                ...it,
                part: {
                  ...it.part,
                  paid: prev.paid,
                  paidAt: prev.paidAt,
                  paidBy: prev.paidBy,
                },
              }
            : it
        )
      );
      alert(e?.response?.data?.message || "تعذر تحديث حالة الدفع");
    } finally {
      setToggling(null);
    }
  }

  return (
    <div className="space-y-4">
      <header className="flex items-center justify-between">
        <h1 className="text-xl font-bold">الفواتير (قطع الغيار)</h1>
      </header>

      {/* فلاتر الزمن + حالة الدفع */}
      <section className="p-3 rounded-2xl bg-white dark:bg-gray-800 shadow-sm space-y-2">
        <div className="flex flex-wrap gap-2">
          <Btn
            label="اليوم"
            active={quick === "today"}
            onClick={() => applyQuick("today")}
          />
          <Btn
            label="أمس"
            active={quick === "yesterday"}
            onClick={() => applyQuick("yesterday")}
          />
          <Btn
            label="كل الأوقات"
            active={quick === "all"}
            onClick={() => applyQuick("all")}
          />
          <span className="opacity-60 self-center hidden sm:inline">أو</span>
          <input
            type="date"
            value={startDate}
            onChange={(e) => {
              setStartDate(e.target.value);
              setQuick("custom");
            }}
            className="px-3 py-2 rounded-xl bg-gray-100 dark:bg-gray-700"
          />
          <input
            type="date"
            value={endDate}
            onChange={(e) => {
              setEndDate(e.target.value);
              setQuick("custom");
            }}
            className="px-3 py-2 rounded-xl bg-gray-100 dark:bg-gray-700"
          />

          {/* فلتر حالة الدفع */}
          <select
            value={paidFilter}
            onChange={(e) => setPaidFilter(e.target.value)}
            className="px-3 py-2 rounded-xl bg-gray-100 dark:bg-gray-700"
            title="تصفية حسب حالة الدفع"
          >
            <option value="all">الكل (مدفوع + غير مدفوع)</option>
            <option value="unpaid">غير المدفوع فقط</option>
            <option value="paid">المدفوع فقط</option>
          </select>

          <button
            onClick={load}
            className="px-4 py-2 rounded-xl bg-blue-600 text-white"
          >
            تطبيق
          </button>
        </div>
      </section>

      {err && (
        <div className="p-3 rounded-xl bg-red-50 text-red-800">{err}</div>
      )}

      {/* ملخص الموردين — دائمًا يعرض غير المدفوع */}
      <section className="p-3 rounded-2xl bg-white dark:bg-gray-800 shadow-sm">
        <h2 className="font-semibold mb-1">ملخص لكل مورد (غير المدفوع)</h2>
        <div className="text-xs opacity-70 mb-2">
          الإجمالي هنا يعكس المتبقي غير المدفوع فقط، حتى لو الجدول يعرض الكل.
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-right">
                <Th>المورد</Th>
                <Th>المصدر</Th>
                <Th>عدد القطع</Th>
                <Th>إجمالي السعر</Th>
              </tr>
            </thead>
            <tbody>
              {byVendor.map((v, i) => (
                <tr key={i} className="odd:bg-gray-50 dark:odd:bg-gray-700/40">
                  <Td>{v._id.vendor || "—"}</Td>
                  <Td>{v._id.source || "—"}</Td>
                  <Td>{v.count || 0}</Td>
                  <Td>{v.total || 0}</Td>
                </tr>
              ))}
              {!byVendor.length && (
                <tr>
                  <td colSpan={4} className="p-3 text-center opacity-70">
                    لا توجد بيانات
                  </td>
                </tr>
              )}
            </tbody>
            <tfoot>
              <tr className="font-bold border-t">
                <Td>الإجمالي</Td>
                <Td>—</Td>
                <Td>{totals.count}</Td>
                <Td>{totals.totalParts}</Td>
              </tr>
            </tfoot>
          </table>
        </div>
      </section>

      {/* كل القطع داخل الفترة */}
      <section className="p-3 rounded-2xl bg-white dark:bg-gray-800 shadow-sm">
        <h2 className="font-semibold mb-3">كل قطع الغيار داخل الفترة</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-right">
                <Th># الصيانة</Th>
                <Th>الجهاز</Th>
                <Th>العميل</Th>
                <Th>الفني</Th>
                <Th>القطعة</Th>
                <Th>المورد</Th>
                <Th>المصدر</Th>
                <Th>السعر</Th>
                <Th>مدفوع؟</Th>
                <Th>تاريخ الشراء</Th>
                <Th>حالة الصيانة</Th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={11} className="p-3">
                    جارِ التحميل…
                  </td>
                </tr>
              ) : items.length ? (
                items.map((it, i) => (
                  <tr
                    key={i}
                    className="odd:bg-gray-50 dark:odd:bg-gray-700/40"
                  >
                    <Td>{it.repairId}</Td>
                    <Td>{it.deviceType || "—"}</Td>
                    <Td>{it.customerName || "—"}</Td>
                    <Td>{techMap[it.technician] || "—"}</Td>
                    <Td>{it.part?.name || "—"}</Td>
                    <Td>{it.part?.vendor || "—"}</Td>
                    <Td>{it.part?.source || "—"}</Td>
                    <Td>{it.part?.price ?? "—"}</Td>
                    <Td>
                      <label className="inline-flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={!!it.part.paid}
                          onChange={(e) => {
                            // لو طلب سابق لسه شغال على نفس القطعة، تجاهل الضغط
                            if (toggling === it.part.id) return;
                            togglePaid(it, e.target.checked);
                          }}
                        />
                        <span className="text-xs opacity-70">
                          {it.part.paid
                            ? `مدفوع منذ ${new Date(
                                it.part.paidAt || Date.now()
                              ).toLocaleString()}`
                            : "غير مدفوع"}
                        </span>
                      </label>
                    </Td>
                    <Td>{it.part?.date ? formatDate(it.part.date) : "—"}</Td>
                    <Td>
                      <span
                        className={`px-2 py-0.5 rounded-full text-xs ${
                          it.status === "تم التسليم" || it.status === "مكتمل"
                            ? "bg-emerald-100 text-emerald-800"
                            : "bg-amber-100 text-amber-800"
                        }`}
                      >
                        {it.status === "تم التسليم" || it.status === "مكتمل"
                          ? "تم التسليم/مكتملة"
                          : "غير مُسلّمة بعد"}
                      </span>
                    </Td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={11} className="p-3 text-center opacity-70">
                    لا توجد قطع غيار داخل هذه الفترة
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

function Btn({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-2 rounded-xl border ${
        active
          ? "bg-blue-600 text-white border-blue-600"
          : "bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700"
      }`}
    >
      {label}
    </button>
  );
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
