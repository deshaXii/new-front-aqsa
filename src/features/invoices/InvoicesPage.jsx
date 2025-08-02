import React, { useEffect, useState } from "react";
import axios from "axios";
import useAuthStore from "../auth/authStore.js";
import Notification from "../../components/Notification.jsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import cairoFont from "../../assets/fonts/Cairo-Regular-normal.js";

const InvoicesPage = () => {
  const [stats, setStats] = useState(null);
  const [error, setError] = useState("");
  const { token } = useAuthStore();

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const fetchInvoices = async () => {
    try {
      const params = {};
      if (startDate) params.startDate = startDate;
      if (endDate) params.endDate = endDate;

      const { data } = await axios.get(
        "https://aqsa-serverless.vercel.app/api/invoices",
        {
          headers: { Authorization: `Bearer ${token}` },
          params,
        }
      );
      setStats(data);
    } catch (err) {
      setError("فشل في تحميل بيانات الفواتير");
    }
  };

  useEffect(() => {
    fetchInvoices();
  }, []);

  if (!stats) return <div className="p-4">جاري التحميل...</div>;

  const {
    totalProfit,
    totalPartsCost,
    technicianProfits,
    repairs,
    partsByShop,
  } = stats;

  const exportPDF = () => {
    const doc = new jsPDF({
      orientation: "p", // portrait
      unit: "pt", // points
      format: "a4", // page size
    });
    doc.addFileToVFS("Cairo-Regular.ttf", cairoFont);
    doc.addFont("Cairo-Regular.ttf", "Cairo", "normal");
    doc.text("تقرير الفواتير والصيانة", 40, 40);

    autoTable(doc, {
      startY: 60,
      head: [["اسم العميل", "الفني", "السعر", "سعر الجملة", "الربح"]],
      body: repairs.map((r) => [
        r.customerName,
        r.technician?.name || "-",
        `${r.price} ج`,
        `${r.totalPartsCost} ج`,
        `${r.profit} ج`,
      ]),
    });

    // حفظ الملف مباشرة
    doc.save(`invoices_${Date.now()}.pdf`);
  };

  const exportExcel = () => {
    // ✅ إنشاء ملف CSV بسيط
    const rows = [
      ["اسم العميل", "اسم الفني", "السعر", "سعر الجملة", "الربح"],
      ...repairs.map((r) => [
        r.customerName,
        r.technician?.name || "-",
        r.price,
        r.totalPartsCost,
        r.profit,
      ]),
    ];

    const csvContent =
      "data:text/csv;charset=utf-8," + rows.map((e) => e.join(",")).join("\n");

    const link = document.createElement("a");
    link.setAttribute("href", encodeURI(csvContent));
    link.setAttribute("download", `invoices_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">صفحة الفواتير والإحصائيات</h2>
      {error && <Notification type="error" message={error} />}

      <div className="mb-4 flex flex-wrap gap-2 items-end">
        <div>
          <label className="block font-semibold mb-1">من تاريخ</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="border px-2 py-1 rounded"
          />
        </div>
        <div>
          <label className="block font-semibold mb-1">إلى تاريخ</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="border px-2 py-1 rounded"
          />
        </div>
        <button
          onClick={fetchInvoices}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          تحديث
        </button>
        {/* <button
          onClick={exportPDF}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          تصدير PDF
        </button>
        <button
          onClick={exportExcel}
          className="bg-yellow-500 text-white px-4 py-2 rounded"
        >
          تصدير Excel
        </button> */}
      </div>

      {/* إجمالي الأرباح */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded shadow mb-4">
        <p>إجمالي الربح: {totalProfit} ج</p>
        <p>إجمالي تكلفة قطع الغيار: {totalPartsCost} ج</p>
      </div>

      {/* أرباح الفنيين */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded shadow mb-4">
        <h3 className="font-bold mb-2">أرباح الفنيين</h3>
        <ul>
          {technicianProfits.map((t, i) => (
            <li key={i}>
              {t.technicianName}: {t.profit} ج
            </li>
          ))}
        </ul>
      </div>

      {/* تفاصيل قطع الغيار حسب المحل */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded shadow mb-4">
        <h3 className="font-bold mb-2">قطع الغيار حسب المحل</h3>
        {Object.entries(partsByShop).map(([shop, parts], idx) => (
          <div key={idx} className="mb-3 border-b pb-2">
            <p className="font-bold">
              🏪 {shop} (الإجمالي: {parts.reduce((sum, p) => sum + p.cost, 0)}{" "}
              ج)
            </p>
            <ul className="list-disc list-inside">
              {parts.map((part, i) => (
                <li key={i}>
                  {part.name} - {part.cost} ج
                  <span className="text-gray-500 ml-2">
                    (العميل: {part.customerName} - الفني: {part.technicianName})
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* تفاصيل الصيانات */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
        <h3 className="font-bold mb-2">تفاصيل الصيانات</h3>
        <table className="min-w-full border text-sm">
          <thead className="bg-gray-200 dark:bg-gray-700">
            <tr>
              <th className="p-2 border">اسم العميل</th>
              <th className="p-2 border">اسم الفني</th>
              <th className="p-2 border">السعر</th>
              <th className="p-2 border">سعر الجملة</th>
              <th className="p-2 border">ربح المحل</th>
            </tr>
          </thead>
          <tbody>
            {repairs.map((r) => (
              <tr key={r._id} className="text-center">
                <td className="p-2 border">{r.customerName}</td>
                <td className="p-2 border">{r.technician?.name || "-"}</td>
                <td className="p-2 border">{r.price} ج</td>
                <td className="p-2 border">{r.totalPartsCost} ج</td>
                <td className="p-2 border">{r.profit} ج</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InvoicesPage;
