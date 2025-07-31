import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import useAuthStore from "../../features/auth/authStore.js";
import Notification from "../../components/Notification.jsx";
import Button from "../../components/Button.jsx";

const RepairDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token } = useAuthStore();
  const [repair, setRepair] = useState(null);
  const [error, setError] = useState("");

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

  useEffect(() => {
    fetchRepair();
  }, []);

  if (!repair) return <div className="p-4">جاري التحميل...</div>;

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h2 className="text-xl font-bold mb-4">تفاصيل الصيانة</h2>
      {error && <Notification type="error" message={error} />}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div>
          <strong>اسم العميل:</strong> {repair.customerName}
        </div>
        <div>
          <strong>نوع الجهاز:</strong> {repair.deviceType}
        </div>
        <div>
          <strong>العطل:</strong> {repair.issue}
        </div>
        <div>
          <strong>اللون:</strong> {repair.color}
        </div>
        <div>
          <strong>رقم التليفون:</strong> {repair.phone}
        </div>
        <div>
          <strong>السعر:</strong> {repair.price} ج
        </div>
        <div>
          <strong>اسم الفني:</strong> {repair.technician?.name || "—"}
        </div>
        <div>
          <strong>اسم المستلم:</strong> {repair.recipient?.name || "—"}
        </div>
        <div>
          <strong>الحالة:</strong> {repair.status}
        </div>
        <div>
          <strong>الربح:</strong> {repair.profit} ج
        </div>
        <div>
          <strong>ملاحظات:</strong> {repair.notes || "—"}
        </div>
        <div>
          <strong>تاريخ البداية:</strong>{" "}
          {repair.startTime ? new Date(repair.startTime).toLocaleString() : "—"}
        </div>
        <div>
          <strong>تاريخ النهاية:</strong>{" "}
          {repair.endTime ? new Date(repair.endTime).toLocaleString() : "—"}
        </div>
      </div>

      <div className="mb-6">
        <h3 className="font-semibold mb-2">قطع الغيار:</h3>
        {repair.parts.length > 0 ? (
          <ul className="list-disc ml-6">
            {repair.parts.map((p, i) => (
              <li key={i}>
                {p.name} - {p.source} - {p.cost} ج
              </li>
            ))}
          </ul>
        ) : (
          <div>لا توجد قطع غيار</div>
        )}
      </div>

      <div className="mb-6">
        <h3 className="font-semibold mb-2">سجل التحركات:</h3>
        {repair.logs?.length > 0 ? (
          <ul className="list-disc ml-6">
            {repair.logs.map((log) => (
              <li key={log._id}>
                [{new Date(log.createdAt).toLocaleString()}] {log.action} بواسطة{" "}
                {log.user?.name || "مستخدم مجهول"}
              </li>
            ))}
          </ul>
        ) : (
          <div>لا توجد تحركات مسجلة</div>
        )}
      </div>

      <div className="flex justify-between">
        <Button onClick={() => navigate(`/repairs/${id}/edit`)}>تعديل</Button>
        <Button onClick={() => navigate("/repairs")}>رجوع</Button>
      </div>
    </div>
  );
};

export default RepairDetailsPage;
