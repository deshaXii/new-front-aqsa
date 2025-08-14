import React, { useEffect, useState } from "react";
import axios from "axios";
import useAuthStore from "../auth/authStore.js";
import Notification from "../../components/Notification.jsx";

const InvoicesPage = () => {
  const [stats, setStats] = useState(null);
  const [error, setError] = useState("");
  const { token, user } = useAuthStore();

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

  const { repairs, partsByShop } = stats;

  if (
    user?.role !== "admin" &&
    !user?.permissions?.accessAccounts &&
    !user?.permissions?.adminOverride
  ) {
    return (
      <div className="text-center text-red-500 font-bold mt-10">
        ليس لديك صلاحية الوصول لهذه الصفحة
      </div>
    );
  }

  return (
    <div className="py-4 container mx-auto md:px-60 ">
      <h2 className="text-xl font-bold mb-4">صفحة الفواتير والإحصائيات</h2>
      {error && <Notification type="error" message={error} />}

      <div className=" mb-4 flex flex-wrap gap-2 items-end">
        <div className="flex gap-2 date-filters">
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
        </div>
        <button
          onClick={fetchInvoices}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          تحديث
        </button>
      </div>

      {/* تفاصيل قطع الغيار حسب المحل */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded shadow mb-4">
        <h3 className="font-bold mb-5">قطع الغيار حسب المحل</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries(partsByShop).map(
            ([shop, parts], idx) =>
              parts.reduce((sum, p) => sum + p.cost, 0) > 0 && (
                <div key={idx} className="border-b pb-2">
                  <p className="font-bold">
                    🏪 {shop} (الإجمالي:{" "}
                    {parts.reduce((sum, p) => sum + p.cost, 0)} ج)
                  </p>
                  <ul className="list-disc list-inside ul-list">
                    {parts
                      .filter((item) => item.cost > 0)
                      .map((part, i) => (
                        <li key={i}>
                          <div>
                            <span className="partName">{part.name}</span>
                            <span className="partCost">{part.cost + "ج"}</span>
                          </div>
                          <span className="text-gray-500 ml-2">
                            ({part.customerName} - {part.technicianName})
                          </span>
                        </li>
                      ))}
                  </ul>
                </div>
              )
          )}
        </div>
      </div>

      {/* تفاصيل الصيانات */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded shadow overflow-x-auto">
        <h3 className="font-bold mb-2">تفاصيل الصيانات</h3>
        {/* <div className="block rapairsDetails md:hidden min-w-full border text-sm">
          {repairs
            .filter((item) => item.status === "تم التسليم")
            .map((r) => (
              <div className="mb-4">
                <ul className="list">
                  <li className="userName list-item">
                    <h5>اسم العميل:</h5>
                    <span>{r.customerName}</span>
                  </li>
                  <li className="userName list-item">
                    <h5>اسم الفني:</h5>
                    <span>{r.technician?.name || "-"}</span>
                  </li>
                  <li className="userName list-item">
                    <h5>السعر:</h5>
                    <span>{r.price} ج</span>
                  </li>
                  <li className="userName list-item">
                    <h5>سعر الجملة:</h5>
                    <span>
                      {r.totalPartsCost ? r.totalPartsCost + " ج" : "-"}
                    </span>
                  </li>
                  <li className="userName list-item">
                    <h5>اجمالي الربح:</h5>
                    <span>{r.profit} ج</span>
                  </li>
                  <li className="userName list-item">
                    <h5>ربح الفني:</h5>
                    <span>{r.profit} ج</span>
                  </li>
                  <li className="userName list-item">
                    <h5>ربح المحل:</h5>
                    <span>{r.profit / 2} ج</span>
                  </li>
                </ul>
              </div>
            ))}
        </div> */}

        {/* hidden md:table */}
        <table className="min-w-full border text-sm md:text-base">
          <thead className="bg-gray-200 dark:bg-gray-700">
            <tr>
              <th className="p-1 md:p-2 border text-xs md:text-sm">
                اسم العميل
              </th>
              <th className="p-1 md:p-2 border text-xs md:text-sm">
                اسم الفني
              </th>
              <th className="p-1 md:p-2 border text-xs md:text-sm">السعر</th>
              <th className="p-1 md:p-2 border text-xs md:text-sm">
                سعر الجملة
              </th>
              <th className="p-1 md:p-2 border text-xs md:text-sm">
                اجمالي الربح
              </th>
              <th className="p-1 md:p-2 border text-xs md:text-sm">
                ربح الفني
              </th>
              <th className="p-1 md:p-2 border text-xs md:text-sm">
                ربح المحل
              </th>
            </tr>
          </thead>
          <tbody>
            {repairs
              .filter((item) => item.status === "تم التسليم")
              .map((r) => (
                <tr key={r._id} className="text-center">
                  <td className="p-1 md:p-2 border text-xs md:text-sm">
                    {r.customerName}
                  </td>
                  <td className="p-1 md:p-2 border text-xs md:text-sm">
                    {r.technician?.name || "-"}
                  </td>
                  <td className="p-1 md:p-2 border text-xs md:text-sm">
                    {r.price} ج
                  </td>
                  <td className="p-1 md:p-2 border text-xs md:text-sm">
                    {r.totalPartsCost ? r.totalPartsCost + " ج" : "-"}
                  </td>
                  <td className="p-1 md:p-2 border text-xs md:text-sm">
                    {r.profit} ج
                  </td>
                  <td className="p-1 md:p-2 border text-xs md:text-sm">
                    {r.profit / 2} ج
                  </td>
                  <td className="p-1 md:p-2 border text-xs md:text-sm">
                    {r.profit / 2} ج
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InvoicesPage;
