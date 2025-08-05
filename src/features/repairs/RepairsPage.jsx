import { useEffect, useRef, useState } from "react";
import axios from "axios";
import useAuthStore from "../auth/authStore.js";
import Notification from "../../components/Notification.jsx";
import Button from "../../components/Button.jsx";
import { useNavigate } from "react-router-dom";

const RepairsPage = () => {
  const searchFormRef = useRef(null);
  const [repairs, setRepairs] = useState([]);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const { token, user } = useAuthStore();
  const navigate = useNavigate();

  // 🔹 Filters
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  // 🔹 Modal
  const [showModal, setShowModal] = useState(false);
  const [searchFormShown, setSearchFormShown] = useState(true);
  const [selectedRepair, setSelectedRepair] = useState(null);
  const [finalPrice, setFinalPrice] = useState("");
  const [parts, setParts] = useState([{ name: "", cost: "", source: "" }]);

  const fetchRepairs = async () => {
    try {
      const { data } = await axios.get(
        "https://aqsa-serverless.vercel.app/api/repairs",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const filtered =
        user?.role === "admin"
          ? data
          : data.filter((r) => r.technician?._id === user?.id);

      setRepairs(filtered);
    } catch (err) {
      setError("فشل في تحميل بيانات الصيانة");
    }
  };

  const fetchUsers = async () => {
    try {
      const { data } = await axios.get(
        "https://aqsa-serverless.vercel.app/api/technicians",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setUsers(data);
    } catch (err) {
      console.error("فشل في جلب الفنيين");
    }
  };

  const handleStatusChange = async (repair, newStatus) => {
    if (newStatus === "تم التسليم") {
      setSelectedRepair(repair);
      setShowModal(true);
    } else {
      await updateRepairStatus(repair._id, { status: newStatus });
    }
  };

  const updateRepairStatus = async (id, body) => {
    try {
      await axios.put(
        `https://aqsa-serverless.vercel.app/api/repairs/${id}`,
        body,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      fetchRepairs();
    } catch (err) {
      alert("فشل في تحديث الحالة");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("هل أنت متأكد من حذف هذه الصيانة؟")) return;
    try {
      await axios.delete(
        `https://aqsa-serverless.vercel.app/api/repairs/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      fetchRepairs();
    } catch (err) {
      alert("فشل في حذف الصيانة");
    }
  };

  const handleModalSubmit = async () => {
    const totalPartsCost = parts.reduce(
      (sum, p) => sum + Number(p.cost || 0),
      0
    );
    const profit = Number(finalPrice) - totalPartsCost;

    await updateRepairStatus(selectedRepair._id, {
      status: "تم التسليم",
      price: Number(finalPrice),
      parts,
      profit,
      totalPartsCost,
    });

    setShowModal(false);
    setFinalPrice("");
    setParts([{ name: "", cost: "", source: "" }]);
  };

  const addPartField = () => {
    setParts([...parts, { name: "", cost: "", source: "" }]);
  };

  const updatePart = (index, key, value) => {
    const updated = [...parts];
    updated[index][key] = value;
    setParts(updated);
  };

  // 🔹 Filters
  const filteredRepairs = repairs.filter((r) => {
    const matchesSearch =
      r.customerName?.includes(search) ||
      r.phone?.includes(search) ||
      r.deviceType?.includes(search);

    const matchesStatus = statusFilter ? r.status === statusFilter : true;

    const matchesDateFrom = dateFrom
      ? new Date(r.createdAt) >= new Date(dateFrom)
      : true;
    const matchesDateTo = dateTo
      ? new Date(r.createdAt) <= new Date(dateTo)
      : true;

    return matchesSearch && matchesStatus && matchesDateFrom && matchesDateTo;
  });

  const handleSearchFormToggle = () => {
    setSearchFormShown(!searchFormShown);
    if (searchFormShown) {
      searchFormRef.current.style.display = "none";
    } else {
      searchFormRef.current.style.display = "grid";
    }
  };

  useEffect(() => {
    fetchRepairs();
    fetchUsers();
  }, []);

  return (
    <div className="p-4 md:p-6">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-3">
        <h2 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-gray-100">
          قائمة الصيانات
        </h2>
        <div className="flex items-center gap-2">
          {user?.permissions?.addRepair && (
            <Button
              onClick={() => navigate("/repairs/new")}
              className="w-full md:w-auto"
            >
              + إضافة صيانة جديدة
            </Button>
          )}
          <Button
            className="flex sm:hidden mobile-search"
            onClick={() => handleSearchFormToggle()}
          >
            بحث
          </Button>
        </div>
      </div>

      {/* 🔹 Filters */}
      <div
        ref={searchFormRef}
        className="hidden sm:grid grid-cols-1 md:grid-cols-4 gap-3 mb-6"
      >
        <input
          placeholder="بحث بالاسم / الهاتف / الجهاز"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="p-2 border rounded dark:bg-gray-700 dark:text-white"
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="p-2 border rounded dark:bg-gray-700 dark:text-white"
        >
          <option value="">كل الحالات</option>
          <option>في الانتظار</option>
          <option>جاري العمل</option>
          <option>مكتمل</option>
          <option>تم التسليم</option>
          <option>مرفوض</option>
        </select>
        <input
          type="date"
          value={dateFrom}
          onChange={(e) => setDateFrom(e.target.value)}
          className="p-2 border rounded dark:bg-gray-700 dark:text-white"
        />
        <input
          type="date"
          value={dateTo}
          onChange={(e) => setDateTo(e.target.value)}
          className="p-2 border rounded dark:bg-gray-700 dark:text-white"
        />
      </div>

      {error && <Notification type="error" message={error} />}

      {/* ✅ Desktop Table */}
      <div className="hidden md:block overflow-x-auto shadow-md rounded-lg border border-gray-300 dark:border-gray-700">
        <table className="min-w-[1200px] w-full text-sm text-gray-800 dark:text-gray-200">
          <thead className="bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100">
            <tr>
              {[
                "اسم العميل",
                "نوع الجهاز",
                "العطل",
                "اللون",
                "رقم الهاتف",
                "السعر",
                "الحالة",
                "الفني",
                "المستلم",
                "تاريخ الإنشاء",
                "تاريخ التسليم",
                "قطع الغيار",
                "إجراءات",
              ].map((head) => (
                <th
                  key={head}
                  className="p-3 border border-gray-300 dark:border-gray-600 whitespace-nowrap"
                >
                  {head}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredRepairs.map((r, idx) => (
              <tr
                key={r._id}
                className={`text-center transition-colors hover:bg-gray-100 dark:hover:bg-gray-700 ${
                  idx % 2 === 0
                    ? "bg-white dark:bg-gray-800"
                    : "bg-gray-50 dark:bg-gray-900"
                }`}
              >
                <td className="p-2 border border-gray-200 dark:border-gray-700">
                  {r.customerName}
                </td>
                <td className="p-2 border border-gray-200 dark:border-gray-700">
                  {r.deviceType}
                </td>
                <td className="p-2 border border-gray-200 dark:border-gray-700">
                  {r.issue || "-"}
                </td>
                <td className="p-2 border border-gray-200 dark:border-gray-700">
                  {r.color || "-"}
                </td>
                <td className="p-2 border border-gray-200 dark:border-gray-700">
                  {r.phone}
                </td>
                <td className="p-2 border border-gray-200 dark:border-gray-700">
                  {r.price || "-"} ج
                </td>
                <td className="p-2 border border-gray-200 dark:border-gray-700">
                  <select
                    value={r.status}
                    onChange={(e) => handleStatusChange(r, e.target.value)}
                    className="border rounded px-2 py-1 text-xs md:text-sm bg-white dark:bg-gray-800 dark:border-gray-600"
                  >
                    <option>في الانتظار</option>
                    <option>جاري العمل</option>
                    <option>مكتمل</option>
                    <option>تم التسليم</option>
                    <option>مرفوض</option>
                  </select>
                </td>
                <td className="p-2 border border-gray-200 dark:border-gray-700">
                  {r.technician?.name || "-"}
                </td>
                <td className="p-2 border border-gray-200 dark:border-gray-700">
                  {users.find(
                    (u) =>
                      u._id === r.recipient?._id &&
                      u.permissions?.receiveDevices
                  )?.name ||
                    r.recipient?.name ||
                    "-"}
                </td>
                <td className="p-2 border border-gray-200 dark:border-gray-700">
                  {new Date(r.createdAt).toLocaleDateString()}
                </td>
                <td className="p-2 border border-gray-200 dark:border-gray-700">
                  {r.status === "تم التسليم"
                    ? new Date(r.updatedAt).toLocaleDateString()
                    : "-"}
                </td>
                <td className="p-2 border border-gray-200 dark:border-gray-700">
                  {r.parts?.length
                    ? r.parts
                        .map((p, idx) => `${p.name} (${p.cost}ج)`)
                        .join(", ")
                    : "-"}
                </td>
                <td className="p-2 border border-gray-200 dark:border-gray-700 flex flex-wrap justify-center gap-2">
                  <Button
                    onClick={() => navigate(`/repairs/${r._id}`)}
                    className="text-xs md:text-sm"
                  >
                    عرض
                  </Button>
                  {user?.permissions?.editRepair && (
                    <Button
                      onClick={() => navigate(`/repairs/${r._id}/edit`)}
                      className="bg-lime-700 text-white text-xs md:text-sm"
                    >
                      تعديل
                    </Button>
                  )}
                  {user?.permissions?.deleteRepair && (
                    <Button
                      onClick={() => handleDelete(r._id)}
                      className="bg-red-600 text-white text-xs md:text-sm"
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

      {/* ✅ Mobile Cards */}
      <div className="md:hidden space-y-4 mt-4">
        {filteredRepairs.map((r) => (
          <div
            key={r._id}
            className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-4 border border-gray-200 dark:border-gray-700"
          >
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-bold text-gray-800 dark:text-gray-100">
                {r.customerName}
              </h3>
              <select
                value={r.status}
                onChange={(e) => handleStatusChange(r, e.target.value)}
                className="border rounded px-2 py-1 text-xs bg-white dark:bg-gray-800 dark:border-gray-600"
              >
                <option>في الانتظار</option>
                <option>جاري العمل</option>
                <option>مكتمل</option>
                <option>تم التسليم</option>
                <option>مرفوض</option>
              </select>
            </div>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              <strong>الجهاز:</strong> {r.deviceType} - {r.color || "-"}
            </p>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              <strong>العطل:</strong> {r.issue || "-"}
            </p>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              <strong>الهاتف:</strong> {r.phone}
            </p>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              <strong>السعر:</strong> {r.price || "-"} ج
            </p>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              <strong>تاريخ الاستلام:</strong>{" "}
              {new Date(r.createdAt).toLocaleDateString()}
            </p>
            {r.status === "تم التسليم" && (
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                <strong>تاريخ التسليم:</strong>{" "}
                {new Date(r.updatedAt).toLocaleDateString()}
              </p>
            )}
            {r.parts?.length > 0 && (
              <p className="text-gray-600 dark:text-gray-300 text-sm mt-1">
                <strong>قطع الغيار:</strong>{" "}
                {r.parts.map((p) => `${p.name}(${p.cost}ج)`).join(", ")}
              </p>
            )}
            <div className="flex justify-end gap-2 mt-3 flex-wrap">
              <Button
                onClick={() => navigate(`/repairs/${r._id}`)}
                className="text-xs"
              >
                عرض
              </Button>
              {user?.permissions?.editRepair && (
                <Button
                  onClick={() => navigate(`/repairs/${r._id}/edit`)}
                  className="bg-lime-700 text-white text-xs"
                >
                  تعديل
                </Button>
              )}
              {user?.permissions?.deleteRepair && (
                <Button
                  onClick={() => handleDelete(r._id)}
                  className="bg-red-600 text-white text-xs"
                >
                  حذف
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* ✅ Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-lg w-[calc(100%-5px)]">
            <h3 className="text-lg font-bold mb-4 text-gray-800 dark:text-gray-100">
              إدخال بيانات التسليم
            </h3>

            <label className="block mb-2 text-sm">السعر النهائي</label>
            <input
              type="number"
              className="w-full mb-3 p-2 border rounded dark:bg-gray-700 dark:text-white"
              value={finalPrice}
              onChange={(e) => setFinalPrice(e.target.value)}
            />

            <label className="block mb-2 text-sm">قطع الغيار</label>
            {parts.map((p, idx) => (
              <div
                key={idx}
                className="flex gap-2 mb-2 flex-wrap sm:flex-nowrap"
              >
                <input
                  placeholder="الاسم"
                  className="flex-1 w-14 p-2 border rounded dark:bg-gray-700 dark:text-white"
                  value={p.name}
                  onChange={(e) => updatePart(idx, "name", e.target.value)}
                />
                <input
                  type="number"
                  placeholder="التكلفة"
                  className="w-24 p-2 border rounded dark:bg-gray-700 dark:text-white"
                  value={p.cost}
                  onChange={(e) => updatePart(idx, "cost", e.target.value)}
                />
                <input
                  placeholder="المصدر"
                  className="w-full sm:w-28 p-2 border rounded dark:bg-gray-700 dark:text-white"
                  value={p.source}
                  onChange={(e) => updatePart(idx, "source", e.target.value)}
                />
              </div>
            ))}
            <Button
              onClick={addPartField}
              className="w-full mb-4 bg-gray-500 text-white"
            >
              + إضافة قطعة
            </Button>

            <div className="flex justify-end gap-2">
              <Button
                onClick={() => setShowModal(false)}
                className="bg-gray-400 text-white"
              >
                إلغاء
              </Button>
              <Button
                onClick={handleModalSubmit}
                className="bg-lime-700 text-white"
              >
                حفظ التسليم
              </Button>
            </div>
          </div>
        </div>
      )}

      {filteredRepairs.length === 0 && (
        <p className="text-center text-gray-500 dark:text-gray-400 mt-4">
          لا توجد صيانات حاليًا
        </p>
      )}
    </div>
  );
};

export default RepairsPage;
