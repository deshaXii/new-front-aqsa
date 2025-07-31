import React, { useEffect, useState } from "react";
import axios from "axios";
import useAuthStore from "../auth/authStore.js";
import Notification from "../../components/Notification.jsx";
import Button from "../../components/Button.jsx";
import { useNavigate } from "react-router-dom";
import RepairCard from "../../components/RepairCard.jsx";

const RepairsPage = () => {
  const [repairs, setRepairs] = useState([]);
  const [error, setError] = useState("");
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

  const translateStatus = (status) => {
    const map = {
      pending: "في الانتظار",
      in_progress: "جاري العمل",
      completed: "مكتمل",
      delivered: "تم التسليم",
      rejected: "مرفوض",
    };
    return map[status] || status;
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">قائمة الصيانات</h2>
        <Button onClick={() => navigate("/repairs/new")}>
          إضافة صيانة جديدة
        </Button>
      </div>

      {error && <Notification type="error" message={error} />}

      <div className="overflow-auto">
        {/* <table className="min-w-full bg-white dark:bg-gray-800 border text-xs md:text-sm">
          <thead className="bg-gray-200 dark:bg-gray-700">
            <tr>
              <th className="p-2 border">اسم العميل</th>
              <th className="p-2 border">نوع الجهاز</th>
              <th className="p-2 border">العطل</th>
              <th className="p-2 border">اللون</th>
              <th className="p-2 border">الهاتف</th>
              <th className="p-2 border">الفني</th>
              <th className="p-2 border">المستلم</th>
              <th className="p-2 border">السعر</th>
              <th className="p-2 border">تكلفة القطع</th>
              <th className="p-2 border">الربح</th>
              <th className="p-2 border">الحالة</th>
              <th className="p-2 border">القطع المستخدمة</th>
              <th className="p-2 border">التاريخ</th>
            </tr>
          </thead>
          <tbody>
            
          </tbody>
        </table> */}
        {repairs.map((repair) => (
          <RepairCard key={repair._id} repair={repair} />
        ))}
      </div>
    </div>
  );
};

export default RepairsPage;
