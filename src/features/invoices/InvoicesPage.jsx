// src/features/invoices/InvoicesPage.jsx
import { useEffect, useMemo, useState } from "react";
import API from "../../lib/api";
import formatDate from "../../utils/formatDate";

function toISODate(d) {
  return d.toISOString().slice(0, 10);
}
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

export default function InvoicesPage() {
  const today = useMemo(() => new Date(), []);
  const yesterday = useMemo(() => {
    const d = new Date();
    d.setDate(d.getDate() - 1);
    return d;
  }, []);

  const [quick, setQuick] = useState("today"); // today | yesterday | all | custom
  const [startDate, setStartDate] = useState(toISODate(today));
  const [endDate, setEndDate] = useState(toISODate(today));
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  function applyQuick(qk) {
    setQuick(qk);
    if (qk === "today") {
      setStartDate(toISODate(startOfDay(today)));
      setEndDate(toISODate(endOfDay(today)));
    } else if (qk === "yesterday") {
      setStartDate(toISODate(startOfDay(yesterday)));
      setEndDate(toISODate(endOfDay(yesterday)));
    } else if (qk === "all") {
      // نسيب التاريخ فاضي — ونبعت all=true
      setStartDate("");
      setEndDate("");
    }
  }

  async function load() {
    setLoading(true);
    try {
      const params = {};
      if (quick === "all") {
        params.all = true;
      } else {
        if (startDate) params.startDate = `${startDate}T00:00:00`;
        if (endDate) params.endDate = `${endDate}T23:59:59.999`;
      }
      const r = await API.get("/invoices", { params }).then((r) => r.data);
      setData(r);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load(); /* افتراضي: اليوم */
  }, []);

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold">الفواتير (حسب التسليم)</h1>

      {/* فلاتر سريعة + مدى */}
      <div className="p-3 rounded-xl bg-white dark:bg-gray-800 space-y-3">
        <div className="flex items-center gap-2">
          <button
            onClick={() => applyQuick("today")}
            className={`px-3 py-2 rounded-xl ${
              quick === "today" ? "bg-gray-200 dark:bg-gray-700" : ""
            }`}
          >
            اليوم
          </button>
          <button
            onClick={() => applyQuick("yesterday")}
            className={`px-3 py-2 rounded-xl ${
              quick === "yesterday" ? "bg-gray-200 dark:bg-gray-700" : ""
            }`}
          >
            أمس
          </button>
          <button
            onClick={() => applyQuick("all")}
            className={`px-3 py-2 rounded-xl ${
              quick === "all" ? "bg-gray-200 dark:bg-gray-700" : ""
            }`}
          >
            جميع الأوقات
          </button>
          <span className="opacity-70 mx-2">أو اختر مدى:</span>
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
          <button
            onClick={load}
            className="px-4 py-2 rounded-xl bg-blue-600 text-white"
          >
            تطبيق
          </button>
        </div>
      </div>

      {/* ملخص مبسّط */}
      {loading || !data ? (
        <div className="p-3 rounded-xl bg-white dark:bg-gray-800">
          جارِ التحميل...
        </div>
      ) : (
        <>
          <section className="p-3 rounded-xl bg-white dark:bg-gray-800">
            <h2 className="font-semibold mb-2">الملخص</h2>
            <div className="grid md:grid-cols-3 gap-3">
              <Card
                title="إجمالي سعر قطع الغيار"
                value={data.totals.partsCostTotal}
              />
              <div className="md:col-span-2 p-3 rounded-xl bg-gray-100 dark:bg-gray-700">
                <div className="text-sm opacity-80 mb-2">إجمالي لكل مورد</div>
                {data.bySupplier.length === 0 ? (
                  <div className="opacity-70">لا توجد قطع</div>
                ) : (
                  <div className="grid md:grid-cols-3 gap-2">
                    {data.bySupplier.map((g) => (
                      <div
                        key={g.supplier}
                        className="p-2 rounded-lg bg-white dark:bg-gray-800 flex items-center justify-between"
                      >
                        <span>{g.supplier}</span>
                        <b>{g.totalCost}</b>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* جدول الفواتير */}
          <section className="p-3 rounded-xl bg-white dark:bg-gray-800 overflow-x-auto">
            <h2 className="font-semibold mb-2">
              فواتير {quick === "all" ? "كل الأوقات" : "الفترة"}
            </h2>
            <table className="w-full text-sm">
              <thead>
                <tr className="text-right">
                  <th className="p-2">#</th>
                  <th className="p-2">العميل</th>
                  <th className="p-2">الجهاز</th>
                  <th className="p-2">الفني</th>
                  <th className="p-2">تاريخ التسليم</th>
                  <th className="p-2">القطع (اسم/المصدر/المورد/التكلفة)</th>
                  <th className="p-2">سعر القطع</th>
                  {/* <th className="p-2">السعر النهائي</th>
                  <th className="p-2">الربح</th> */}
                </tr>
              </thead>
              <tbody>
                {data.repairs.map((r) => (
                  <tr
                    key={r._id}
                    className="odd:bg-gray-50 dark:odd:bg-gray-700/40 align-top"
                  >
                    <td className="p-2">{r.repairId}</td>
                    <td className="p-2">{r.customerName}</td>
                    <td className="p-2">{r.deviceType}</td>
                    <td className="p-2">{r.technician?.name || "—"}</td>
                    <td className="p-2">{formatDate(r.deliveryDate)}</td>
                    <td className="p-2">
                      {r.parts.length === 0 ? (
                        "—"
                      ) : (
                        <ul className="space-y-1 list-disc pr-5">
                          {r.parts.map((p, i) => (
                            <li key={i}>
                              {p.name} — {p.source || "—"} — {p.supplier || "—"}{" "}
                              — {p.cost}
                            </li>
                          ))}
                        </ul>
                      )}
                    </td>
                    <td className="p-2">{r.partsCost}</td>
                    {/* <td className="p-2">{r.finalPrice}</td>
                    <td className="p-2">{r.profit}</td> */}
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          {/* حسب المورد — التفاصيل */}
          <section className="p-3 rounded-xl bg-white dark:bg-gray-800">
            <h2 className="font-semibold mb-2">تفصيل حسب المورد</h2>
            {data.bySupplier.length === 0 ? (
              <div>لا توجد قطع</div>
            ) : (
              <div className="space-y-4">
                {data.bySupplier.map((group) => (
                  <div
                    key={group.supplier}
                    className="p-3 rounded-lg bg-gray-50 dark:bg-gray-700/40"
                  >
                    <div className="font-semibold mb-2">
                      المورد: {group.supplier} — الإجمالي: {group.totalCost}
                    </div>
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="text-right">
                          <th className="p-2">#الصيانة</th>
                          <th className="p-2">اسم القطعة</th>
                          <th className="p-2">المصدر</th>
                          <th className="p-2">التكلفة</th>
                          <th className="p-2">تاريخ الشراء</th>
                        </tr>
                      </thead>
                      <tbody>
                        {group.items.map((it, i) => (
                          <tr
                            key={i}
                            className="odd:bg-white dark:odd:bg-gray-800/40"
                          >
                            <td className="p-2">{it.repairId}</td>
                            <td className="p-2">{it.name}</td>
                            <td className="p-2">{it.source || "—"}</td>
                            <td className="p-2">{it.cost}</td>
                            <td className="p-2">
                              {it.purchaseDate
                                ? formatDate(it.purchaseDate)
                                : "—"}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ))}
              </div>
            )}
          </section>
        </>
      )}
    </div>
  );
}

function Card({ title, value }) {
  return (
    <div className="p-3 rounded-xl bg-gray-100 dark:bg-gray-700 text-center">
      <div className="text-xs opacity-70">{title}</div>
      <div className="text-xl font-bold">{value}</div>
    </div>
  );
}
