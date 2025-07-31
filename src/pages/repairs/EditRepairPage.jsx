import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import InputField from "../../components/InputField.jsx";
import PartsInputGroup from "../../components/PartsInputGroup.jsx";
import Button from "../../components/Button.jsx";
import Notification from "../../components/Notification.jsx";
import VoiceInput from "../../components/VoiceInput.jsx";
import useAuthStore from "../../features/auth/authStore.js";

const EditRepairPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token, user } = useAuthStore();
  const [form, setForm] = useState(null);
  const [technicians, setTechnicians] = useState([]);
  const [password, setPassword] = useState("");
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
        setForm(data);
      } catch {
        setError("فشل في تحميل بيانات الصيانة");
      }
    };

    const fetchTechnicians = async () => {
      const res = await axios.get("http://localhost:5000/api/technicians", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTechnicians(res.data);
    };

    fetchRepair();
    fetchTechnicians();
  }, [id, token]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await axios.put(
        `http://localhost:5000/api/repairs/${id}`,
        { ...form, password },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      navigate("/repairs");
    } catch {
      setError("فشل في تحديث الصيانة. تأكد من كلمة المرور.");
    }
  };

  if (!form) return <div className="p-4">جاري التحميل...</div>;

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h2 className="text-xl font-bold mb-4">تعديل الصيانة</h2>
      {error && <Notification type="error" message={error} />}

      <form onSubmit={handleSubmit}>
        {[
          ["customerName", "اسم العميل"],
          ["deviceType", "نوع الجهاز"],
          ["issue", "العطل"],
          ["color", "اللون"],
          ["phone", "رقم التليفون"],
          ["price", "سعر الصيانة"],
          ["notes", "ملاحظات"],
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

        <PartsInputGroup
          parts={form.parts}
          onChange={(updatedParts) => setForm({ ...form, parts: updatedParts })}
        />

        <div className="mb-4">
          <label className="block font-semibold mb-1">اختر الفني</label>
          <select
            name="technician"
            value={form.technician || ""}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          >
            <option value="">— اختر فني —</option>
            {technicians.map((tech) => (
              <option key={tech._id} value={tech._id}>
                {tech.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block font-semibold mb-1">اختر المستلم</label>
          <select
            name="recipient"
            value={form.recipient || ""}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          >
            <option value="">— اختر مستلم —</option>
            {technicians.map((tech) => (
              <option key={tech._id} value={tech._id}>
                {tech.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block font-semibold mb-1">
            كلمة المرور للتعديل
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="كلمة مرور الفني"
            required
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <Button type="submit" className="w-full mt-4">
          حفظ التعديلات
        </Button>
      </form>
    </div>
  );
};

export default EditRepairPage;
