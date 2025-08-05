import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import useAuthStore from "../auth/authStore.js";
import InputField from "../../components/InputField.jsx";
import Button from "../../components/Button.jsx";
import Notification from "../../components/Notification.jsx";

const EditRepairPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token, user } = useAuthStore();

  const [form, setForm] = useState({
    customerName: "",
    deviceType: "",
    issue: "",
    color: "",
    phone: "",
    price: "",
    technician: "",
    recipient: "",
    status: "في الانتظار",
    notes: "",
    parts: [],
  });
  const [technicians, setTechnicians] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  // جلب بيانات الصيانة والفنيين
  const fetchRepair = async () => {
    try {
      const [repairRes, techsRes] = await Promise.all([
        axios.get(`http://localhost:5000/api/repairs/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get(`http://localhost:5000/api/technicians`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);

      setForm({
        customerName: repairRes.data.customerName || "",
        deviceType: repairRes.data.deviceType || "",
        issue: repairRes.data.issue || "",
        color: repairRes.data.color || "",
        phone: repairRes.data.phone || "",
        price: repairRes.data.price || "",
        technician: repairRes.data.technician?._id || "",
        recipient: repairRes.data.recipient?._id || "",
        status: repairRes.data.status || "في الانتظار",
        notes: repairRes.data.notes || "",
        parts: repairRes.data.parts || [],
      });

      setTechnicians(techsRes.data);
    } catch (err) {
      setError("فشل في تحميل بيانات الصيانة");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRepair();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // إدارة قطع الغيار
  const handlePartChange = (idx, field, value) => {
    const updatedParts = [...form.parts];
    updatedParts[idx][field] = value;
    setForm({ ...form, parts: updatedParts });
  };

  const addPart = () => {
    setForm({
      ...form,
      parts: [...form.parts, { name: "", cost: 0, source: "" }],
    });
  };

  const removePart = (idx) => {
    const updatedParts = [...form.parts];
    updatedParts.splice(idx, 1);
    setForm({ ...form, parts: updatedParts });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user?.permissions?.editRepair && user?.role !== "admin") {
      alert("ليس لديك صلاحية لتعديل الصيانة");
      return;
    }
    try {
      await axios.put(`http://localhost:5000/api/repairs/${id}`, form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      navigate("/repairs");
    } catch (err) {
      setError("فشل في حفظ التعديلات");
    }
  };

  if (loading) return <div className="p-4">جاري التحميل...</div>;

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h2 className="text-xl font-bold mb-4">تعديل الصيانة</h2>
      {error && <Notification type="error" message={error} />}

      <form onSubmit={handleSubmit}>
        <InputField
          label="اسم العميل"
          name="customerName"
          value={form.customerName}
          onChange={handleChange}
          required
        />
        <InputField
          label="نوع الجهاز"
          name="deviceType"
          value={form.deviceType}
          onChange={handleChange}
          required
        />
        <InputField
          label="العطل"
          name="issue"
          value={form.issue}
          onChange={handleChange}
        />
        <InputField
          label="لون الجهاز"
          name="color"
          value={form.color}
          onChange={handleChange}
        />
        <InputField
          label="رقم الهاتف"
          name="phone"
          value={form.phone}
          onChange={handleChange}
        />
        <InputField
          label="سعر الصيانة"
          name="price"
          type="number"
          value={form.price}
          onChange={handleChange}
        />

        {/* الفني */}
        <label className="block font-semibold mb-1">الفني</label>
        <select
          name="technician"
          value={form.technician}
          onChange={handleChange}
          className="w-full border rounded px-2 py-1 mb-4"
        >
          <option value="">اختر الفني</option>
          {technicians.map((t) => (
            <option key={t._id} value={t._id}>
              {t.name}
            </option>
          ))}
        </select>

        {/* المستلم */}
        <label className="block font-semibold mb-1">المستلم</label>
        <select
          name="recipient"
          value={form.recipient}
          onChange={handleChange}
          className="w-full border rounded px-2 py-1 mb-4"
        >
          <option value="">اختر المستلم</option>
          {technicians.map((t) => (
            <option key={t._id} value={t._id}>
              {t.name}
            </option>
          ))}
        </select>

        {/* الحالة */}
        <label className="block font-semibold mb-1">الحالة</label>
        <select
          name="status"
          value={form.status}
          onChange={handleChange}
          className="w-full border rounded px-2 py-1 mb-4"
        >
          <option value="في الانتظار">في الانتظار</option>
          <option value="جاري العمل">جاري العمل</option>
          <option value="مكتمل">مكتمل</option>
          <option value="تم التسليم">تم التسليم</option>
          <option value="مرفوض">مرفوض</option>
        </select>

        {/* ملاحظات */}
        <InputField
          label="ملاحظات"
          name="notes"
          value={form.notes}
          onChange={handleChange}
        />

        {/* قطع الغيار */}
        <div className="mb-4">
          <label className="block font-semibold mb-1">قطع الغيار</label>
          {form.parts.map((part, idx) => (
            <div key={idx} className="flex gap-2 mb-2">
              <input
                type="text"
                placeholder="اسم القطعة"
                value={part.name}
                onChange={(e) => handlePartChange(idx, "name", e.target.value)}
                className="border rounded px-2 py-1 flex-1"
              />
              <input
                type="number"
                placeholder="سعر الجملة"
                value={part.cost}
                onChange={(e) =>
                  handlePartChange(idx, "cost", Number(e.target.value))
                }
                className="border rounded px-2 py-1 w-24"
              />
              <input
                type="text"
                placeholder="المصدر / المحل"
                value={part.source}
                onChange={(e) =>
                  handlePartChange(idx, "source", e.target.value)
                }
                className="border rounded px-2 py-1 flex-1"
              />
              <Button
                type="button"
                onClick={() => removePart(idx)}
                className="bg-red-500 text-white"
              >
                حذف
              </Button>
            </div>
          ))}
          <Button type="button" onClick={addPart} className="mt-2">
            + إضافة قطعة
          </Button>
        </div>

        <Button type="submit" className="w-full mt-4">
          حفظ التعديلات
        </Button>
      </form>
    </div>
  );
};

export default EditRepairPage;
