import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import useAuthStore from "../auth/authStore.js";
import Button from "../../components/Button.jsx";
import Notification from "../../components/Notification.jsx";

const RepairDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token, user } = useAuthStore();

  const [repair, setRepair] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchRepair = async () => {
    try {
      const { data } = await axios.get(
        `https://aqsa-serverless.vercel.app/api/repairs/${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setRepair(data);
    } catch (err) {
      setError("فشل في تحميل بيانات الصيانة");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("هل أنت متأكد من حذف هذه الصيانة؟")) return;
    try {
      await axios.delete(
        `https://aqsa-serverless.vercel.app/api/repairs/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      navigate("/repairs");
    } catch (err) {
      alert("فشل في حذف الصيانة");
    }
  };

  useEffect(() => {
    fetchRepair();
  }, []);

  if (loading) return <div className="p-4">جاري التحميل...</div>;
  if (!repair) return <div className="p-4">لا توجد بيانات</div>;

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h2 className="text-xl font-bold mb-4">تفاصيل الصيانة</h2>
      {error && <Notification type="error" message={error} />}

      <div className="bg-white dark:bg-gray-800 shadow rounded p-4 mb-4">
        <p className="mb-2.5 pb-2.5 border-b border-gray-200 dark:border-gray-700">
          <strong>اسم العميل:</strong> {repair.customerName}
        </p>
        <p className="mb-2.5 pb-2.5 border-b border-gray-200 dark:border-gray-700">
          <strong>نوع الجهاز:</strong> {repair.deviceType}
        </p>
        <p className="mb-2.5 pb-2.5 border-b border-gray-200 dark:border-gray-700">
          <strong>العطل:</strong> {repair.issue || "-"}
        </p>
        <p className="mb-2.5 pb-2.5 border-b border-gray-200 dark:border-gray-700">
          <strong>لون الجهاز:</strong> {repair.color || "-"}
        </p>
        <p className="mb-2.5 pb-2.5 border-b border-gray-200 dark:border-gray-700">
          <strong>رقم الهاتف:</strong> {repair.phone}
        </p>
        <p className="mb-2.5 pb-2.5 border-b border-gray-200 dark:border-gray-700">
          <strong>السعر:</strong> {repair.price} ج
        </p>
        <p className="mb-2.5 pb-2.5 border-b border-gray-200 dark:border-gray-700">
          <strong>الحالة:</strong> {repair.status}
        </p>
        <p className="mb-2.5 pb-2.5 border-b border-gray-200 dark:border-gray-700">
          <strong>الفني:</strong> {repair.technician?.name || "-"}
        </p>
        <p className="mb-2.5 pb-2.5 border-b border-gray-200 dark:border-gray-700">
          <strong>المستلم:</strong> {repair.recipient?.name || "-"}
        </p>
        <p className="mb-2.5 pb-2.5 border-b border-gray-200 dark:border-gray-700">
          <strong>ملاحظات:</strong> {repair.notes || "-"}
        </p>

        <p className="mb-2.5 pb-2.5 border-b border-gray-200 dark:border-gray-700">
          <strong>تاريخ الاستلام:</strong>{" "}
          {new Date(repair.createdAt).toLocaleString()}
        </p>
        <p className="mb-2.5 pb-2.5 border-b border-gray-200 dark:border-gray-700">
          <strong>آخر تحديث:</strong>{" "}
          {new Date(repair.updatedAt).toLocaleString()}
        </p>

        <p className="mt-2 font-bold">الربح: {repair.profit || 0} ج</p>

        <div className="mt-4">
          <h3 className="font-semibold mb-2">قطع الغيار</h3>
          {repair.parts && repair.parts.length > 0 ? (
            <ul className="list-disc list-inside">
              {repair.parts.map((part, idx) => (
                <li key={idx}>
                  {part.name} - {part.cost}ج - {part.source || "المحل"}
                </li>
              ))}
            </ul>
          ) : (
            <p>لا توجد قطع غيار</p>
          )}
        </div>
      </div>

      <div className="flex gap-2">
        {user?.permissions?.editRepair && (
          <Button onClick={() => navigate(`/repairs/${repair._id}/edit`)}>
            تعديل
          </Button>
        )}
        {user?.permissions?.deleteRepair && (
          <Button onClick={handleDelete} className="bg-red-500 text-white">
            حذف
          </Button>
        )}
        <Button
          onClick={() => navigate("/repairs")}
          className="bg-gray-500 text-white"
        >
          رجوع
        </Button>
      </div>
    </div>
  );
};

export default RepairDetailsPage;
