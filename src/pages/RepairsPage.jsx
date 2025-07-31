import React, { useEffect, useState } from "react";
import axios from "axios";
import useAuthStore from "../auth/authStore.js";
import Notification from "../../components/Notification.jsx";
import Button from "../../components/Button.jsx";
import { useNavigate } from "react-router-dom";

const RepairsPage = () => {
  const [repairs, setRepairs] = useState([]);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [sortKey, setSortKey] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState("desc");
  const { token } = useAuthStore();
  const navigate = useNavigate();

  const fetchRepairs = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/api/repairs", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setRepairs(data);
    } catch (err) {
      setError("فشل في تحميل بيانات الصيانة");
    }
  };

  useEffect(() => {
    fetchRepairs();
  }, []);

  const filtered = repairs
    .filter((r) =>
      query
        ? r.customerName?.includes(query) ||
          r.deviceType?.includes(query) ||
          r.phone?.includes(query)
        : true
    )
    .filter((r) => (filterStatus ? r.status === filterStatus : true))
    .sort((a, b) => {
      if (sortOrder === "asc")
        return new Date(a[sortKey]) - new Date(b[sortKey]);
      else return new Date(b[sortKey]) - new Date(a[sortKey]);
    });

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">قائمة الصيانات</h2>
        <Button onClick={() => navigate("/repairs/new")}>
          إضافة صيانة جديدة
        </Button>
      </div>

      <div className="flex gap-2 mb-4 flex-wrap">
        <input
          type="text"
          placeholder="بحث باسم العميل أو الجهاز"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="border px-2 py-1 rounded text-sm"
        />
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="border px-2 py-1 rounded text-sm"
        >
          <option value="">كل الحالات</option>
          <option value="في الانتظار">في الانتظار</option>
          <option value="جاري العمل">جاري العمل</option>
          <option value="مكتمل">مكتمل</option>
          <option value="تم التسليم">تم التسليم</option>
          <option value="مرفوض">مرفوض</option>
        </select>
        <select
          value={sortKey}
          onChange={(e) => setSortKey(e.target.value)}
          className="border px-2 py-1 rounded text-sm"
        >
          <option value="createdAt">تاريخ الإنشاء</option>
          <option value="price">السعر</option>
          <option value="status">الحالة</option>
        </select>
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="border px-2 py-1 rounded text-sm"
        >
          <option value="desc">تنازلي</option>
          <option value="asc">تصاعدي</option>
        </select>
      </div>

      {error && <Notification type="error" message={error} />}

      <div className="overflow-auto">
        <table className="min-w-full bg-white dark:bg-gray-800 border text-sm">
          <thead className="bg-gray-200 dark:bg-gray-700">
            <tr>
              <th className="p-2 border">اسم العميل</th>
              <th className="p-2 border">نوع الجهاز</th>
              <th className="p-2 border">رقم الهاتف</th>
              <th className="p-2 border">السعر</th>
              <th className="p-2 border">الحالة</th>
              <th className="p-2 border">تاريخ الإنشاء</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((r) => (
              <tr key={r._id}>
                <td className="p-2 border">{r.customerName}</td>
                <td className="p-2 border">{r.deviceType}</td>
                <td className="p-2 border">{r.phone}</td>
                <td className="p-2 border">{r.price} ج</td>
                <td className="p-2 border">{r.status}</td>
                <td className="p-2 border">
                  {new Date(r.createdAt).toLocaleDateString("ar-EG")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RepairsPage;
