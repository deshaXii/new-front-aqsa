import React, { useEffect, useState } from "react";
import axios from "axios";
import useAuthStore from "../auth/authStore.js";
import Notification from "../../components/Notification.jsx";
import Button from "../../components/Button.jsx";
import { useNavigate } from "react-router-dom";
import RepairFilterBar from "../../components/RepairFilterBar.jsx";

const RepairsPage = () => {
  const [repairs, setRepairs] = useState([]);
  const [technicians, setTechnicians] = useState([]);
  const [error, setError] = useState("");

  // 🔹 فلاتر البحث
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [technicianFilter, setTechnicianFilter] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [sortBy, setSortBy] = useState("newest");

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

  const fetchTechnicians = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:5000/api/technicians",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setTechnicians(data);
    } catch {
      // تجاهل الخطأ لو فشل
    }
  };

  const { user } = useAuthStore();

  useEffect(() => {
    fetchRepairs();
    user?.role === "admin" && fetchTechnicians();
  }, []);

  // 🔹 تطبيق البحث والتصفية والفرز
  const filteredRepairs = repairs
    .filter((r) => {
      const matchSearch =
        r.customerName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.phone?.includes(searchTerm) ||
        r.deviceType?.toLowerCase().includes(searchTerm.toLowerCase());

      const matchStatus = statusFilter ? r.status === statusFilter : true;
      const matchTechnician = technicianFilter
        ? r.technician?._id === technicianFilter
        : true;

      const createdAt = new Date(r.createdAt);
      const matchDateFrom = dateFrom ? createdAt >= new Date(dateFrom) : true;
      const matchDateTo = dateTo ? createdAt <= new Date(dateTo) : true;

      return (
        matchSearch &&
        matchStatus &&
        matchTechnician &&
        matchDateFrom &&
        matchDateTo
      );
    })
    .sort((a, b) => {
      if (sortBy === "newest")
        return new Date(b.createdAt) - new Date(a.createdAt);
      if (sortBy === "oldest")
        return new Date(a.createdAt) - new Date(b.createdAt);
      if (sortBy === "priceHigh") return b.price - a.price;
      if (sortBy === "priceLow") return a.price - b.price;
      if (sortBy === "name")
        return a.customerName.localeCompare(b.customerName);
      return 0;
    });
  const handleDelete = async (id) => {
    if (!window.confirm("هل أنت متأكد من حذف هذه الصيانة؟")) return;

    try {
      await axios.delete(`http://localhost:5000/api/repairs/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setRepairs((prev) => prev.filter((r) => r._id !== id));
    } catch {
      setError("فشل في حذف الصيانة");
    }
  };
  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">قائمة الصيانات</h2>
        {user?.permissions?.addRepair && (
          <Button onClick={() => navigate("/repairs/new")}>
            إضافة صيانة جديدة
          </Button>
        )}
      </div>

      {error && <Notification type="error" message={error} />}

      <RepairFilterBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        technicianFilter={technicianFilter}
        setTechnicianFilter={setTechnicianFilter}
        dateFrom={dateFrom}
        setDateFrom={setDateFrom}
        dateTo={dateTo}
        setDateTo={setDateTo}
        sortBy={sortBy}
        setSortBy={setSortBy}
        technicians={technicians}
      />

      <div className="overflow-auto">
        <table className="min-w-full bg-white dark:bg-gray-800 border text-sm">
          <thead className="bg-gray-200 dark:bg-gray-700">
            <tr>
              <th className="p-2 border">اسم العميل</th>
              <th className="p-2 border">نوع الجهاز</th>
              <th className="p-2 border">نوع العطل</th>
              <th className="p-2 border">لون الجهاز</th>
              <th className="p-2 border">رقم الهاتف</th>
              <th className="p-2 border">السعر</th>
              <th className="p-2 border">الحالة</th>
              <th className="p-2 border">الفني</th>
              <th className="p-2 border">اسم المستلم</th>
              <th className="p-2 border">تاريخ الاستلام</th>
              <th className="p-2 border">ملاحظات</th>
              <th className="p-2 border">تاريخ التسليم</th>
              <th className="p-2 border">قطع الغيار</th>
              <th className="p-2 border">الإجراءات</th>
            </tr>
          </thead>

          <tbody>
            {repairs.map((r) => (
              <tr key={r._id} className="align-top">
                <td className="p-2 border">{r.customerName}</td>
                <td className="p-2 border">{r.deviceType}</td>
                <td className="p-2 border">{r.issue || "—"}</td>
                <td className="p-2 border">{r.color || "—"}</td>
                <td className="p-2 border">{r.phone}</td>
                <td className="p-2 border">{r.price} ج</td>
                <td className="p-2 border">{r.status}</td>
                <td className="p-2 border">{r.technician?.name || "—"}</td>
                <td className="p-2 border">{r.recipient?.name || "—"}</td>
                <td className="p-2 border">
                  {r.createdAt
                    ? new Date(r.createdAt).toLocaleDateString()
                    : "—"}
                </td>
                <td className="p-2 border">{r.notes || "—"}</td>
                <td className="p-2 border">
                  {r.status === "تم التسليم" || r.status === "مكتمل"
                    ? new Date(r.updatedAt).toLocaleDateString()
                    : "—"}
                </td>
                <td className="p-2 border">
                  {r.parts?.length > 0 ? (
                    <ul className="list-disc pl-4">
                      {r.parts.slice(0, 2).map((p, idx) => (
                        <li key={idx}>
                          {p.name} - {p.cost} ج
                        </li>
                      ))}
                      {r.parts.length > 2 && (
                        <li>+{r.parts.length - 2} أخرى...</li>
                      )}
                    </ul>
                  ) : (
                    "—"
                  )}
                </td>
                <td className="p-2 border flex gap-2">
                  <button
                    onClick={() => navigate(`/repairs/${r._id}`)}
                    className="bg-blue-500 text-white px-2 py-1 rounded text-xs"
                  >
                    عرض
                  </button>
                  <button
                    onClick={() => navigate(`/repairs/${r._id}/edit`)}
                    className="bg-yellow-500 text-white px-2 py-1 rounded text-xs"
                  >
                    تعديل
                  </button>
                  <button
                    onClick={() => handleDelete(r._id)}
                    className="bg-red-500 text-white px-2 py-1 rounded text-xs"
                  >
                    حذف
                  </button>
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
