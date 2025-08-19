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
  const [showContactModal, setShowContactModal] = useState(false);
  const [searchFormShown, setSearchFormShown] = useState(true);
  const [selectedRepair, setSelectedRepair] = useState(null);
  // 🔹 Pagination State
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalRepairs: 0,
  });
  const [finalPrice, setFinalPrice] = useState("");
  const [parts, setParts] = useState([{ name: "", cost: "", source: "" }]);
  const [technicians, setTechnicians] = useState([]);

  const [filters, setFilters] = useState({
    dateFilter: "today",
    technician: "",
    repairId: "",
  });

  const fetchRepairs = async (page = 1) => {
    try {
      const params = new URLSearchParams({
        page,
        limit: 30,
        ...filters,
      }).toString();

      const { data } = await axios.get(
        `https://aqsa-serverless.vercel.app/api/repairs?${params}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const filtered =
        user?.role === "admin" || user?.permissions?.receiveDevice
          ? data.repairs
          : data.repairs.filter(
              (r) =>
                r.technician?._id === user?.id || r.recipient?._id === user?.id
            );

      setRepairs(filtered);
      setPagination({
        totalPages: data.totalPages,
        currentPage: data.currentPage,
      });
    } catch (err) {
      console.log(err);
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

  const openContactModal = (repair) => {
    setSelectedRepair(repair);
    setShowContactModal(true);
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
        <select
          value={filters.dateFilter}
          onChange={(e) =>
            setFilters({ ...filters, dateFilter: e.target.value })
          }
        >
          <option value="today">صيانات اليوم</option>
          <option value="yesterday">صيانات الأمس</option>
          <option value="all">جميع الصيانات</option>
        </select>

        <select
          value={filters.technician}
          onChange={(e) =>
            setFilters({ ...filters, technician: e.target.value })
          }
        >
          <option value="">كل الفنيين</option>
          {users.map((t) => (
            <option key={t._id} value={t._id}>
              {t.name}
            </option>
          ))}
        </select>

        <input
          placeholder="بحث برقم الصيانة"
          value={filters.repairId}
          onChange={(e) => setFilters({ ...filters, repairId: e.target.value })}
        />

        <Button onClick={() => fetchRepairs(1)}>بحث</Button>
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
                "الكود",
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
                <td>{r.repairId}</td>
                <td className="p-2 border border-gray-200 dark:border-gray-700">
                  {r.customerName}
                </td>
                <td className="p-2 border border-gray-200 dark:border-gray-700">
                  {r.deviceType}
                </td>
                <td className="p-2 border border-gray-200 dark:border-gray-700">
                  {r.issue || "-"}
                </td>
                <td
                  className={`p-2 border border-gray-200 dark:border-gray-700`}
                  style={{ backgroundColor: r.color }}
                >
                  {"-"}
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
                    className={`border rounded px-2 py-1 text-xs md:text-sm 
                      ${
                        r.status === "تم التسليم"
                          ? "bg-green-600 text-white "
                          : ""
                      } 
                      ${r.status === "مرفوض" ? "bg-red-600 text-white" : ""}
                      ${
                        r.status === "جاري العمل"
                          ? "bg-yellow-500 text-white"
                          : ""
                      }
                      ${
                        r.status === "في الانتظار"
                          ? "bg-gray-400 text-white"
                          : ""
                      }
                      ${r.status === "مكتمل" ? "bg-blue-600 text-white" : ""}
                      `}
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
                  {r.parts?.length && r.parts[0].cost
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

                  <Button
                    onClick={() => openContactModal(r)}
                    className="bg-blue-600 text-white text-xs md:text-sm"
                  >
                    تواصل
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
      {showContactModal && selectedRepair && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-sm w-full text-center">
            <h3 className="font-bold mb-3">تواصل مع العميل</h3>
            <p className="mb-4">اختر طريقة التواصل</p>
            <div className="flex justify-center gap-3">
              <a
                href={`tel:${selectedRepair.phone}`}
                className="bg-blue-600 text-white px-4 py-2 rounded"
              >
                اتصال
              </a>
              <a
                href={`https://wa.me/${
                  selectedRepair.phone
                }?text=مرحبًا عميلنا العزيز، تم الانتهاء من صيانة جهازك بنجاح. التكلفة: ${
                  selectedRepair.price || "-"
                } جنيه. شكرًا لاختياركم الأقصي ستور.`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-600 text-white px-4 py-2 rounded"
              >
                واتساب
              </a>
            </div>
            <button
              onClick={() => setShowContactModal(false)}
              className="mt-4 bg-gray-400 text-white px-4 py-2 rounded"
            >
              إغلاق
            </button>
          </div>
        </div>
      )}
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

              <div className="flex items-center gap-2">
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
                <Button
                  onClick={() => openContactModal(r)}
                  className="bg-blue-600 text-white text-xs md:text-sm"
                >
                  تواصل
                </Button>
              </div>
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

      {pagination.totalPages > 1 && (
        <div className="flex justify-center mt-6 gap-2">
          {/* Previous Button */}
          <Button
            onClick={() => fetchRepairs(pagination.currentPage - 1)}
            disabled={pagination.currentPage === 1}
            className="px-4 py-2"
          >
            السابق
          </Button>

          {/* Page Numbers */}
          {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map(
            (page) => (
              <Button
                key={page}
                onClick={() => fetchRepairs(page)}
                className={`px-4 py-2 ${
                  page === pagination.currentPage
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 dark:bg-gray-700"
                }`}
              >
                {page}
              </Button>
            )
          )}

          {/* Next Button */}
          <Button
            onClick={() => fetchRepairs(pagination.currentPage + 1)}
            disabled={pagination.currentPage === pagination.totalPages}
            className="px-4 py-2"
          >
            التالي
          </Button>
        </div>
      )}

      <div className="text-center mt-4 text-sm text-gray-600 dark:text-gray-400">
        عرض {repairs.length} من أصل {pagination.totalRepairs} صيانة
      </div>

      {filteredRepairs.length === 0 && (
        <p className="text-center text-gray-500 dark:text-gray-400 mt-4">
          لا توجد صيانات حاليًا
        </p>
      )}
    </div>
  );
};

export default RepairsPage;
