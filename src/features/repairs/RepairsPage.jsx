import React, { useEffect, useState } from "react";
import axios from "axios";
import useAuthStore from "../auth/authStore.js";
import Notification from "../../components/Notification.jsx";
import Button from "../../components/Button.jsx";
import { useNavigate } from "react-router-dom";

const RepairsPage = () => {
  const [repairs, setRepairs] = useState([]);
  const [error, setError] = useState("");
  const { token, user } = useAuthStore();
  const navigate = useNavigate();

  // بحث وفلاتر
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [sortField, setSortField] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState("desc");

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

  const handleStatusChange = async (id, newStatus) => {
    try {
      await axios.put(
        `http://localhost:5000/api/repairs/${id}`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchRepairs();
    } catch (err) {
      alert("فشل في تحديث الحالة");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("هل أنت متأكد من حذف هذه الصيانة؟")) return;
    try {
      await axios.delete(`http://localhost:5000/api/repairs/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchRepairs();
    } catch (err) {
      alert("فشل في حذف الصيانة");
    }
  };

  useEffect(() => {
    fetchRepairs();
  }, []);

  // تطبيق البحث + الفلاتر + الفرز
  const filteredRepairs = repairs
    .filter((r) =>
      [r.customerName, r.deviceType, r.phone]
        .join(" ")
        .toLowerCase()
        .includes(search.toLowerCase())
    )
    .filter((r) => (filterStatus ? r.status === filterStatus : true))
    .sort((a, b) => {
      if (sortField === "profit") {
        return sortOrder === "asc" ? a.profit - b.profit : b.profit - a.profit;
      }
      return sortOrder === "asc"
        ? new Date(a[sortField]) - new Date(b[sortField])
        : new Date(b[sortField]) - new Date(a[sortField]);
    });

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4 flex-wrap gap-2">
        <h2 className="text-xl font-bold">قائمة الصيانات</h2>

        {user?.permissions?.addRepair && (
          <Button onClick={() => navigate("/repairs/new")}>
            إضافة صيانة جديدة
          </Button>
        )}
      </div>

      {/* شريط البحث والفلاتر */}
      <div className="flex flex-wrap gap-2 mb-4">
        <input
          type="text"
          placeholder="بحث باسم العميل / الجهاز / الهاتف"
          className="border px-2 py-1 rounded"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="border px-2 py-1 rounded"
        >
          <option value="">كل الحالات</option>
          <option value="في الانتظار">في الانتظار</option>
          <option value="جاري العمل">جاري العمل</option>
          <option value="مكتمل">مكتمل</option>
          <option value="تم التسليم">تم التسليم</option>
          <option value="مرفوض">مرفوض</option>
        </select>
        <select
          value={sortField}
          onChange={(e) => setSortField(e.target.value)}
          className="border px-2 py-1 rounded"
        >
          <option value="createdAt">تاريخ الإدخال</option>
          <option value="profit">الربح</option>
        </select>
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="border px-2 py-1 rounded"
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
              <th className="p-2 border">العطل</th>
              <th className="p-2 border">لون الجهاز</th>
              <th className="p-2 border">رقم الهاتف</th>
              <th className="p-2 border">السعر</th>
              <th className="p-2 border">الحالة</th>
              <th className="p-2 border">الفني</th>
              <th className="p-2 border">المستلم</th>
              <th className="p-2 border">قطع الغيار</th>
              <th className="p-2 border">إجراءات</th>
            </tr>
          </thead>
          <tbody>
            {filteredRepairs.map((r) => (
              <tr key={r._id} className="text-center">
                <td className="p-2 border">{r.customerName}</td>
                <td className="p-2 border">{r.deviceType}</td>
                <td className="p-2 border">{r.issue || "-"}</td>
                <td className="p-2 border">{r.color || "-"}</td>
                <td className="p-2 border">{r.phone}</td>
                <td className="p-2 border">{r.price} ج</td>
                <td className="p-2 border">
                  {user?.permissions?.editRepair ? (
                    <select
                      value={r.status}
                      onChange={(e) =>
                        handleStatusChange(r._id, e.target.value)
                      }
                      className="border rounded px-2 py-1"
                    >
                      <option>في الانتظار</option>
                      <option>جاري العمل</option>
                      <option>مكتمل</option>
                      <option>تم التسليم</option>
                      <option>مرفوض</option>
                    </select>
                  ) : (
                    r.status
                  )}
                </td>
                <td className="p-2 border">{r.technician?.name || "-"}</td>
                <td className="p-2 border">{r.recipient?.name || "-"}</td>
                <td className="p-2 border">
                  {r.parts && r.parts.length > 0 ? (
                    <ul className="text-left">
                      {r.parts.map((part, idx) => (
                        <li key={idx}>
                          {part.name} - {part.cost}ج - {part.source || "المحل"}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    "-"
                  )}
                </td>
                <td className="p-2 border">
                  <Button
                    className="text-sm mr-2"
                    onClick={() => navigate(`/repairs/${r._id}`)}
                  >
                    عرض
                  </Button>
                  {user?.permissions?.editRepair && (
                    <Button
                      onClick={() => navigate(`/repairs/${r._id}/edit`)}
                      className="bg-lime-700 mx-1"
                    >
                      تعديل
                    </Button>
                  )}
                  {user?.permissions?.deleteRepair && (
                    <Button
                      onClick={() => handleDelete(r._id)}
                      className="bg-red-600 text-red-500 mx-1"
                    >
                      حذف
                    </Button>
                  )}
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
