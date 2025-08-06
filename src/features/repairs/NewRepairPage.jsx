import React, { useState, useEffect } from "react";
import InputField from "../../components/InputField.jsx";
import VoiceInput from "../../components/VoiceInput.jsx";
import Button from "../../components/Button.jsx";
import Notification from "../../components/Notification.jsx";
import useAuthStore from "../../features/auth/authStore.js";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const NewRepairPage = () => {
  const [form, setForm] = useState({
    customerName: "",
    deviceType: "",
    issue: "",
    color: "",
    phone: "",
    notes: "",
    technician: "",
    recipient: "",
  });

  const [technicians, setTechnicians] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { token, user } = useAuthStore();

  useEffect(() => {
    const fetchTechnicians = async () => {
      try {
        const { data } = await axios.get(
          "https://aqsa-serverless.vercel.app/api/technicians",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setTechnicians(data);
      } catch (err) {
        console.error("فشل في جلب الفنيين:", err);
        setTechnicians([]);
      }
    };

    fetchTechnicians();
  }, [token]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await axios.post(
        "https://aqsa-serverless.vercel.app/api/repairs",
        {
          ...form,
          createdBy: user?.id,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      navigate("/repairs");
    } catch (err) {
      console.error(err.response?.data);
      setError("فشل في حفظ الصيانة");
    }
  };

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h2 className="text-xl font-bold mb-4">إضافة صيانة جديدة</h2>
      {error && <Notification type="error" message={error} />}

      <form onSubmit={handleSubmit} className="space-y-3">
        {/* خانات الإدخال الصوتي */}
        {[
          ["customerName", "اسم العميل"],
          ["deviceType", "نوع الجهاز"],
          ["issue", "نوع العطل"],
          ["color", "لون الجهاز"],
          ["phone", "رقم التليفون"],
        ].map(([name, label]) => (
          <div key={name} className="relative">
            <InputField
              label={label}
              name={name}
              value={form[name]}
              onChange={handleChange}
              placeholder={`ادخل ${label}`}
              required
            />
            <div className="absolute top-[1.8rem] left-[-0.5rem]">
              <VoiceInput
                onText={(text) => setForm({ ...form, [name]: text })}
              />
            </div>
          </div>
        ))}

        {/* اختيار الفني المسؤول */}
        <div>
          <label className="block mb-1 font-semibold">الفني المسؤول</label>
          <select
            name="technician"
            value={form.technician}
            onChange={handleChange}
            className="border rounded w-full p-2 bg-white dark:bg-gray-800"
          >
            <option value="">اختر الفني</option>
            {technicians.map((t) => (
              <option key={t._id} value={t._id}>
                {t.name}
              </option>
            ))}
          </select>
        </div>

        {/* اختيار المستلم - فقط من لديه صلاحية receiveDevice */}
        <div>
          <label className="block mb-1 font-semibold">المستلم</label>
          <select
            name="recipient"
            value={form.recipient}
            onChange={handleChange}
            className="border rounded w-full p-2 bg-white dark:bg-gray-800"
          >
            <option value="">اختر المستلم</option>
            {technicians
              .filter((t) => t.permissions?.receiveDevice)
              .map((t) => (
                <option key={t._id} value={t._id}>
                  {t.name}
                </option>
              ))}
          </select>
        </div>

        <InputField
          label="ملاحظات"
          name="notes"
          value={form.notes}
          onChange={handleChange}
          placeholder="ملاحظات إن وجدت"
        />

        <Button type="submit" className="w-full mt-4">
          حفظ الصيانة
        </Button>
      </form>
    </div>
  );
};

export default NewRepairPage;
