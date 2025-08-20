import { useEffect, useMemo, useState } from "react";
import API from "../../lib/api";
import formatDate from "../../utils/formatDate";

function ymdLocal(d) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export default function AccountsPage() {
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
  const [err, setErr] = useState("");
  const [summary, setSummary] = useState({
    totals: {},
    perTechnician: [],
    transactions: [],
  });

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

  async function load() {
    setLoading(true);
    setErr("");
    try {
      const params = {};
      if (quick !== "all") {
        if (startDate) params.startDate = startDate;
        if (endDate) params.endDate = endDate;
      }
      const { data } = await API.get("/accounts/summary", { params });
      setSummary(data);
    } catch (e) {
      setErr(e?.response?.data?.message || "تعذر تحميل ملخص الحسابات");
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    load();
  }, []);
  useEffect(() => {
    load();
  }, [quick, startDate, endDate]);

  return (
    <div className="space-y-4">
      <header className="flex items-center justify-between">
        <h1 className="text-xl font-bold">الحسابات</h1>
      </header>

      {/* فلاتر */}
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
      </section>

      {err && (
        <div className="p-3 rounded-xl bg-red-50 text-red-800">{err}</div>
      )}

      {/* ملخص عام */}
      <section className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <Card
          title="إجمالي الدخل (الصيانة المسلّمة)"
          value={summary.totals?.grossRevenue || 0}
        />
        <Card
          title="إجمالي قطع الغيار"
          value={summary.totals?.partsCost || 0}
        />
        <Card
          title="إجمالي الداخل"
          value={summary.totals?.transactionsIn || 0}
        />
        <Card
          title="إجمالي الخارج"
          value={summary.totals?.transactionsOut || 0}
        />
        <Card
          className="lg:col-span-4"
          title="الصافي"
          value={summary.totals?.netCash || 0}
        />
      </section>

      {/* ربح كل فني */}
      <section className="p-3 rounded-2xl bg-white dark:bg-gray-800 shadow-sm">
        <h2 className="font-semibold mb-3">ربح كل فني</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-right">
                <Th>الفني</Th>
                <Th>عدد المسلّم</Th>
                <Th>صافي الربح</Th>
                <Th>نصيب الفني</Th>
                <Th>نصيب المحل</Th>
              </tr>
            </thead>
            <tbody>
              {summary.perTechnician?.length ? (
                summary.perTechnician.map((t, i) => (
                  <tr
                    key={i}
                    className="odd:bg-gray-50 dark:odd:bg-gray-700/40"
                  >
                    <Td>{t.techName || t.techId}</Td>
                    <Td>{t.deliveredCount}</Td>
                    <Td>{Math.round(t.netProfit)}</Td>
                    <Td>{Math.round(t.techShare)}</Td>
                    <Td>{Math.round(t.shopShare)}</Td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="p-3 text-center opacity-70">
                    لا بيانات
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* المعاملات + فورم */}
      <TransactionsBlock startDate={startDate} endDate={endDate} />
    </div>
  );
}

function TransactionsBlock({ startDate, endDate }) {
  const [list, setList] = useState([]);
  const [f, setF] = useState({
    type: "in",
    amount: "",
    description: "",
    date: ymdLocal(new Date()),
  });
  const [loading, setLoading] = useState(false);

  async function load() {
    setLoading(true);
    try {
      const { data } = await API.get("/accounts/transactions", {
        params: { startDate, endDate },
      });
      setList(data || []);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    load();
  }, [startDate, endDate]);

  async function submit(e) {
    e.preventDefault();
    if (!f.amount) return;
    await API.post("/accounts/transactions", {
      ...f,
      amount: Number(f.amount),
    });
    setF({
      type: "in",
      amount: "",
      description: "",
      date: ymdLocal(new Date()),
    });
    load();
  }

  async function remove(id) {
    await API.delete(`/accounts/transactions/${id}`);
    load();
  }

  return (
    <section className="grid lg:grid-cols-3 gap-3">
      <div className="p-3 rounded-2xl bg-white dark:bg-gray-800 shadow-sm">
        <h2 className="font-semibold mb-3">معاملة جديدة</h2>
        <form onSubmit={submit} className="space-y-2">
          <select
            value={f.type}
            onChange={(e) => setF({ ...f, type: e.target.value })}
            className="w-full px-3 py-2 rounded-xl bg-gray-100 dark:bg-gray-700"
          >
            <option value="in">داخل</option>
            <option value="out">خارج</option>
          </select>
          <input
            type="number"
            value={f.amount}
            onChange={(e) => setF({ ...f, amount: e.target.value })}
            className="w-full px-3 py-2 rounded-xl bg-gray-100 dark:bg-gray-700"
            placeholder="المبلغ"
          />
          <input
            type="date"
            value={f.date}
            onChange={(e) => setF({ ...f, date: e.target.value })}
            className="w-full px-3 py-2 rounded-xl bg-gray-100 dark:bg-gray-700"
          />
          <textarea
            value={f.description}
            onChange={(e) => setF({ ...f, description: e.target.value })}
            className="w-full px-3 py-2 rounded-xl bg-gray-100 dark:bg-gray-700"
            placeholder="الوصف (اختياري)"
          />
          <button className="px-4 py-2 rounded-xl bg-blue-600 text-white">
            حفظ
          </button>
        </form>
      </div>
      <div className="p-3 rounded-2xl bg-white dark:bg-gray-800 shadow-sm lg:col-span-2">
        <h2 className="font-semibold mb-3">كل المعاملات داخل الفترة</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-right">
                <Th>النوع</Th>
                <Th>المبلغ</Th>
                <Th>التاريخ</Th>
                <Th>الوصف</Th>
                <Th>إجراءات</Th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={5} className="p-3">
                    …
                  </td>
                </tr>
              ) : list.length ? (
                list.map((t) => (
                  <tr
                    key={t._id}
                    className="odd:bg-gray-50 dark:odd:bg-gray-700/40"
                  >
                    <Td>{t.type === "in" ? "داخل" : "خارج"}</Td>
                    <Td>{t.amount}</Td>
                    <Td>{formatDate(t.date)}</Td>
                    <Td>{t.description || "—"}</Td>
                    <Td>
                      <button
                        className="px-2 py-1 rounded bg-red-600 text-white"
                        onClick={() => remove(t._id)}
                      >
                        حذف
                      </button>
                    </Td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="p-3 text-center opacity-70">
                    لا يوجد معاملات
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
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
function Card({ title, value, className = "" }) {
  return (
    <div
      className={`p-4 rounded-2xl bg-white dark:bg-gray-800 shadow-sm ${className}`}
    >
      <div className="text-sm opacity-70">{title}</div>
      <div className="text-2xl font-bold mt-1">{Math.round(value || 0)}</div>
    </div>
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
