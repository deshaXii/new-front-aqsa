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

  // 🔹 Modal State
  const [showModal, setShowModal] = useState(false);
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

      // 🔹 الفني العادي يشوف بس شغله
      const filtered =
        user?.role === "admin"
          ? data
          : data.filter((r) => r.technician?._id === user?.id);

      setRepairs(filtered);
    } catch (err) {
      setError("فشل في تحميل بيانات الصيانة");
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

  useEffect(() => {
    fetchRepairs();
  }, []);

  return (
    <div className="p-4 md:p-6">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-3">
        <h2 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-gray-100">
          قائمة الصيانات
        </h2>
        {user?.permissions?.addRepair && (
          <Button
            onClick={() => navigate("/repairs/new")}
            className="w-full md:w-auto"
          >
            + إضافة صيانة جديدة
          </Button>
        )}
      </div>

      {error && <Notification type="error" message={error} />}

      {/* ✅ Desktop Table */}
      <div className="hidden md:block overflow-x-auto shadow-md rounded-lg border border-gray-300 dark:border-gray-700">
        <table className="min-w-[1000px] w-full text-sm text-gray-800 dark:text-gray-200">
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
            {repairs.map((r, idx) => (
              <tr
                key={r._id}
                className={`text-center transition-colors hover:bg-gray-100 dark:hover:bg-gray-700 ${
                  idx % 2 === 0
                    ? "bg-white dark:bg-gray-800"
                    : "bg-gray-50 dark:bg-gray-900"
                }`}
              >
                <td
                  className="p-2 border border-gray-200 dark:border-gray-700 truncate max-w-[150px]"
                  title={r.customerName}
                >
                  {r.customerName}
                </td>
                <td
                  className="p-2 border border-gray-200 dark:border-gray-700 truncate max-w-[120px]"
                  title={r.deviceType}
                >
                  {r.deviceType}
                </td>
                <td
                  className="p-2 border border-gray-200 dark:border-gray-700 truncate max-w-[180px]"
                  title={r.issue || "-"}
                >
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
                  {r.recipient?.name || "-"}
                </td>
                <td
                  className="p-2 border border-gray-200 dark:border-gray-700 text-left truncate max-w-[180px]"
                  title={(r.parts || [])
                    .map((p) => `${p.name} - ${p.cost}ج`)
                    .join(", ")}
                >
                  {r.parts?.length ? (
                    <ul className="space-y-1">
                      {r.parts.map((part, idx) => (
                        <li key={idx} className="truncate">
                          {part.name} - {part.cost}ج - {part.source || "المحل"}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    "-"
                  )}
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

      {/* ✅ Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-lg w-full">
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
              <div key={idx} className="flex gap-2 mb-2">
                <input
                  placeholder="الاسم"
                  className="flex-1 p-2 border rounded dark:bg-gray-700 dark:text-white"
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
                  className="w-28 p-2 border rounded dark:bg-gray-700 dark:text-white"
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

      {repairs.length === 0 && (
        <p className="text-center text-gray-500 dark:text-gray-400 mt-4">
          لا توجد صيانات حاليًا
        </p>
      )}
    </div>
  );
};

export default RepairsPage;
