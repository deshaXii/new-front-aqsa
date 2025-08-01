import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import useAuthStore from "../../features/auth/authStore.js";
import Notification from "../../components/Notification.jsx";

const RepairDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token } = useAuthStore();

  const [repair, setRepair] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRepair = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:5000/api/repairs/${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setRepair(data);
      } catch {
        setError("فشل في تحميل بيانات الصيانة");
      }
    };
    fetchRepair();
  }, [id, token]);

  if (error) return <Notification type="error" message={error} />;
  if (!repair) return <div className="p-4">جاري تحميل البيانات...</div>;

  const deliveredDate =
    repair.status === "تم التسليم" || repair.status === "مكتمل"
      ? new Date(repair.updatedAt).toLocaleDateString()
      : "—";

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">تفاصيل الصيانة</h2>

      <div className="bg-white dark:bg-gray-800 shadow rounded p-4 space-y-2">
        <p>
          <strong>اسم العميل:</strong> {repair.customerName}
        </p>
        <p>
          <strong>رقم الهاتف:</strong> {repair.phone}
        </p>
        <p>
          <strong>نوع الجهاز:</strong> {repair.deviceType}
        </p>
        <p>
          <strong>لون الجهاز:</strong> {repair.color || "—"}
        </p>
        <p>
          <strong>نوع العطل:</strong> {repair.issue || "—"}
        </p>
        <p>
          <strong>السعر:</strong> {repair.price} ج
        </p>
        <p>
          <strong>إجمالي سعر الجملة:</strong> {repair.totalPartsCost || 0} ج
        </p>
        <p>
          <strong>الربح:</strong> {repair.profit || 0} ج
        </p>
        <p>
          <strong>الحالة:</strong> {repair.status}
        </p>
        <p>
          <strong>الفني:</strong> {repair.technician?.name || "—"}
        </p>
        <p>
          <strong>المستلم:</strong> {repair.recipient?.name || "—"}
        </p>
        <p>
          <strong>تاريخ الاستلام:</strong>{" "}
          {new Date(repair.createdAt).toLocaleDateString()}
        </p>
        <p>
          <strong>تاريخ التسليم:</strong> {deliveredDate}
        </p>
        <p>
          <strong>ملاحظات:</strong> {repair.notes || "—"}
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 shadow rounded p-4 mt-4">
        <h3 className="text-lg font-bold mb-2">قطع الغيار المستخدمة</h3>
        {repair.parts && repair.parts.length > 0 ? (
          <table className="min-w-full text-sm border">
            <thead className="bg-gray-200 dark:bg-gray-700">
              <tr>
                <th className="p-2 border">اسم القطعة</th>
                <th className="p-2 border">المصدر</th>
                <th className="p-2 border">السعر</th>
              </tr>
            </thead>
            <tbody>
              {repair.parts.map((part, idx) => (
                <tr key={idx}>
                  <td className="p-2 border">{part.name}</td>
                  <td className="p-2 border">{part.source || "—"}</td>
                  <td className="p-2 border">{part.cost} ج</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>لا توجد قطع غيار مسجلة</p>
        )}
      </div>

      <div className="flex justify-end gap-2 mt-4">
        <button
          onClick={() => navigate(`/repairs/${repair._id}/edit`)}
          className="bg-yellow-500 text-white px-4 py-2 rounded"
        >
          تعديل
        </button>
        <button
          onClick={() => navigate("/repairs")}
          className="bg-gray-500 text-white px-4 py-2 rounded"
        >
          رجوع
        </button>
      </div>
    </div>
  );
};

export default RepairDetailsPage;
