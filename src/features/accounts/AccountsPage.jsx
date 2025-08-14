import React, { useEffect, useState } from "react";
import axios from "axios";
import useAuthStore from "../auth/authStore.js";
import Notification from "../../components/Notification.jsx";
import Button from "../../components/Button.jsx";

const AccountsPage = () => {
  const { token } = useAuthStore();
  const [summary, setSummary] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   if (!user?.permissions?.accessAccounts && user?.role !== "admin") {
  //     navigate("/unauthorized");
  //   }
  // }, []);

  const handleDeleteTransaction = async (id) => {
    if (!window.confirm("هل أنت متأكد من حذف هذه المعاملة؟")) return;

    try {
      await axios.delete(
        `https://aqsa-serverless.vercel.app/api/accounts/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setTransactions((prev) => prev.filter((t) => t._id !== id));
    } catch (err) {
      alert("فشل في حذف المعاملة");
    }
  };

  const [newTransaction, setNewTransaction] = useState({
    type: "داخل",
    amount: "",
    note: "",
  });

  const fetchSummary = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        "https://aqsa-serverless.vercel.app/api/accounts/summary",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSummary(data);
    } catch (err) {
      setError("فشل في تحميل ملخص الحسابات");
    } finally {
      setLoading(false);
    }
  };

  const addTransaction = async () => {
    if (!newTransaction.amount) return alert("الرجاء إدخال المبلغ");

    try {
      await axios.post(
        "https://aqsa-serverless.vercel.app/api/accounts",
        newTransaction,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setNewTransaction({ type: "داخل", amount: "", note: "" });
      fetchSummary();
    } catch (err) {
      alert("فشل في إضافة المعاملة");
    }
  };

  useEffect(() => {
    fetchSummary();
  }, []);

  return (
    <div className="py-4 container mx-auto md:px-60 space-y-4">
      <h2 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-gray-100">
        صفحة الحسابات
      </h2>

      {error && <Notification type="error" message={error} />}
      {loading && <p className="text-gray-500">جارٍ التحميل...</p>}

      {summary && (
        <>
          {/* ✅ ملخص الحسابات */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white dark:bg-gray-800 shadow p-4 rounded-lg text-center">
              <p className="font-bold text-lg text-green-600">إجمالي الربح</p>
              <p>{summary.totalProfit} ج</p>
            </div>
            <div className="bg-white dark:bg-gray-800 shadow p-4 rounded-lg text-center">
              <p className="font-bold text-lg text-red-600">تكلفة قطع الغيار</p>
              <p>{summary.totalPartsCost} ج</p>
            </div>
            <div className="bg-white dark:bg-gray-800 shadow p-4 rounded-lg text-center">
              <p className="font-bold text-lg text-blue-600">إجمالي الداخل</p>
              <p>{summary.totalIn} ج</p>
            </div>
            <div className="bg-white dark:bg-gray-800 shadow p-4 rounded-lg text-center">
              <p className="font-bold text-lg text-orange-600">إجمالي الخارج</p>
              <p>{summary.totalOut} ج</p>
            </div>
            <div className="col-span-2 md:col-span-4 bg-white dark:bg-gray-800 shadow p-4 rounded-lg text-center">
              <p className="font-bold text-xl text-green-700">صافي ربح المحل</p>
              <p className="text-2xl">{summary.netProfit} ج</p>
            </div>
          </div>

          {/* ✅ إضافة معاملة */}
          <div className="bg-white dark:bg-gray-800 shadow p-4 rounded-lg">
            <h3 className="font-bold mb-3 text-gray-800 dark:text-gray-100">
              إضافة معاملة جديدة
            </h3>
            <div className="flex flex-col md:flex-row gap-3">
              <select
                value={newTransaction.type}
                onChange={(e) =>
                  setNewTransaction({ ...newTransaction, type: e.target.value })
                }
                className="border rounded px-3 py-2 dark:bg-gray-900 dark:text-white"
              >
                <option>داخل</option>
                <option>خارج</option>
              </select>
              <input
                type="number"
                placeholder="المبلغ"
                value={newTransaction.amount}
                onChange={(e) =>
                  setNewTransaction({
                    ...newTransaction,
                    amount: Number(e.target.value),
                  })
                }
                className="border rounded px-3 py-2 flex-1 dark:bg-gray-900 dark:text-white"
              />
              <input
                type="text"
                placeholder="الوصف"
                value={newTransaction.note}
                onChange={(e) =>
                  setNewTransaction({
                    ...newTransaction,
                    note: e.target.value,
                  })
                }
                className="border rounded px-3 py-2 flex-1 dark:bg-gray-900 dark:text-white"
              />
              <Button onClick={addTransaction}>إضافة</Button>
            </div>
          </div>

          {/* ✅ جدول أرباح الفنيين */}
          {/* <div className="overflow-x-auto shadow-md rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 shadow p-4 rounded-lg">
            <h4 className="mb-3 font-bold">جدول ربح الفنيين</h4>
            <table className="min-w-[600px] w-full text-sm text-gray-800 dark:text-gray-200">
              <thead className="bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100">
                <tr>
                  <th className="p-3 border">الفني</th>
                  <th className="p-3 border">عدد الصيانات</th>
                  <th className="p-3 border">ربحه</th>
                </tr>
              </thead>
              <tbody>
                {summary.technicians.map((tech) => (
                  <tr
                    key={tech.name}
                    className="text-center bg-white dark:bg-gray-800 border-b"
                  >
                    <td className="p-2 border">{tech.name}</td>
                    <td className="p-2 border">{tech.count}</td>
                    <td className="p-2 border">{tech.profit} ج</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div> */}

          {/* ✅ جدول تفاصيل الصيانات */}
          {/* <div className="overflow-x-auto shadow-md rounded-lg border border-gray-300 dark:border-gray-700 mt-6">
            <table className="min-w-[800px] w-full text-sm text-gray-800 dark:text-gray-200">
              <thead className="bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100">
                <tr>
                  <th className="p-3 border">العميل</th>
                  <th className="p-3 border">الجهاز</th>
                  <th className="p-3 border">السعر</th>
                  <th className="p-3 border">تكلفة قطع الغيار</th>
                  <th className="p-3 border">ربح الصيانة</th>
                  <th className="p-3 border">الفني</th>
                </tr>
              </thead>
              <tbody>
                {summary.repairs.map((r, idx) => (
                  <tr
                    key={idx}
                    className="text-center bg-white dark:bg-gray-800 border-b"
                  >
                    <td className="p-2 border">{r.customerName}</td>
                    <td className="p-2 border">{r.deviceType}</td>
                    <td className="p-2 border">{r.price} ج</td>
                    <td className="p-2 border">{r.partsCost} ج</td>
                    <td className="p-2 border">{r.repairProfit} ج</td>
                    <td className="p-2 border">{r.technician}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div> */}

          {/* ✅ جدول المعاملات اليدوية */}
          <div className="overflow-x-auto shadow-md rounded-lg border border-gray-300 dark:border-gray-700 mt-6">
            <table className="min-w-[500px] w-full text-sm text-gray-800 dark:text-gray-200">
              <thead className="bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100">
                <tr>
                  <th className="p-3 border">النوع</th>
                  <th className="p-3 border">المبلغ</th>
                  <th className="p-3 border">الوصف</th>
                  <th className="p-3 border">التاريخ</th>
                  <th className="p-3 border">الاجراءات</th>
                </tr>
              </thead>
              <tbody>
                {summary.transactions.map((t, idx) => (
                  <tr
                    key={t._id}
                    className={`text-center transition-colors hover:bg-gray-100 dark:hover:bg-gray-700 ${
                      idx % 2 === 0
                        ? "bg-white dark:bg-gray-800"
                        : "bg-gray-50 dark:bg-gray-900"
                    }`}
                  >
                    <td className="p-2 border border-gray-200 dark:border-gray-700">
                      {t.type}
                    </td>
                    <td className="p-2 border border-gray-200 dark:border-gray-700">
                      {t.amount} ج
                    </td>
                    <td className="p-2 border border-gray-200 dark:border-gray-700">
                      {t.note || "-"}
                    </td>
                    <td className="p-2 border border-gray-200 dark:border-gray-700 text-xs">
                      {new Date(t.createdAt).toLocaleDateString("ar-EG")}
                    </td>
                    <td className="p-2 border border-gray-200 dark:border-gray-700">
                      <button
                        onClick={() => handleDeleteTransaction(t._id)}
                        className="bg-red-600 text-white px-2 py-1 rounded text-xs hover:bg-red-700"
                      >
                        حذف
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default AccountsPage;
