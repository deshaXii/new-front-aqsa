import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import useAuthStore from "../../features/auth/authStore.js";
import Notification from "../../components/Notification.jsx";
import PasswordPrompt from "../../components/PasswordPrompt.jsx";

const EditRepairPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token, user } = useAuthStore();

  const [form, setForm] = useState({});
  const [parts, setParts] = useState([]);
  const [technicians, setTechnicians] = useState([]);
  const [error, setError] = useState("");
  const [showPrompt, setShowPrompt] = useState(false);
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRepair = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:5000/api/repairs/${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setForm({
          ...data,
          technician: data.technician?._id || "",
          recipient: data.recipient?._id || "",
        });
        setParts(data.parts || []);
      } catch {
        setError("فشل في تحميل بيانات الصيانة");
      } finally {
        setLoading(false);
      }
    };

    const fetchTechnicians = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:5000/api/technicians",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setTechnicians(data);
      } catch {
        setTechnicians([]);
      }
    };

    fetchRepair();
    user?.role === "admin" && fetchTechnicians();
  }, [id, token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value || "" });
  };

  const handlePartChange = (index, field, value) => {
    const newParts = [...parts];
    newParts[index][field] = field === "cost" ? Number(value) : value;
    setParts(newParts);
  };

  const addPart = () => {
    setParts([...parts, { name: "", source: "", cost: 0 }]);
  };

  const removePart = (index) => {
    const newParts = parts.filter((_, i) => i !== index);
    setParts(newParts);
  };

  const totalPartsCost = parts.reduce((sum, p) => sum + (p.cost || 0), 0);
  const profit = (form.price || 0) - totalPartsCost;

  const handleSubmit = async () => {
    try {
      await axios.put(
        `http://localhost:5000/api/repairs/${id}`,
        { ...form, parts, totalPartsCost, profit, password },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      navigate("/repairs");
    } catch {
      setError("فشل في تعديل الصيانة");
    }
  };

  if (loading) return <div className="p-4">جاري التحميل...</div>;

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h2 className="text-xl font-bold mb-4">تعديل الصيانة</h2>
      {error && <Notification type="error" message={error} />}

      <div className="space-y-3">
        {[
          ["customerName", "اسم العميل"],
          ["deviceType", "نوع الجهاز"],
          ["issue", "نوع العطل"],
          ["color", "لون الجهاز"],
          ["phone", "رقم التليفون"],
          ["price", "سعر الصيانة"],
        ].map(([name, label]) => (
          <input
            key={name}
            type={name === "price" ? "number" : "text"}
            name={name}
            value={form[name] || ""}
            onChange={handleChange}
            placeholder={label}
            className="border p-2 rounded w-full"
          />
        ))}

        {/* اختيار الفني */}
        <div>
          <label className="block mb-1 font-semibold">الفني المسؤول</label>
          <select
            name="technician"
            value={form.technician || ""}
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

        {/* اختيار المستلم */}
        <div>
          <label className="block mb-1 font-semibold">المستلم</label>
          <select
            name="recipient"
            value={form.recipient || ""}
            onChange={handleChange}
            className="border rounded w-full p-2 bg-white dark:bg-gray-800"
          >
            <option value="">اختر المستلم</option>
            {technicians.map((t) => (
              <option key={t._id} value={t._id}>
                {t.name}
              </option>
            ))}
          </select>
        </div>

        {/* قطع الغيار */}
        <div>
          <h3 className="font-bold mt-4 mb-2">قطع الغيار</h3>
          {parts.map((part, idx) => (
            <div key={idx} className="flex gap-2 mb-2">
              <input
                type="text"
                placeholder="اسم القطعة"
                value={part.name}
                onChange={(e) => handlePartChange(idx, "name", e.target.value)}
                className="border p-2 rounded w-1/3"
              />
              <input
                type="text"
                placeholder="المحل/المصدر"
                value={part.source}
                onChange={(e) =>
                  handlePartChange(idx, "source", e.target.value)
                }
                className="border p-2 rounded w-1/3"
              />
              <input
                type="number"
                placeholder="السعر"
                value={part.cost}
                onChange={(e) => handlePartChange(idx, "cost", e.target.value)}
                className="border p-2 rounded w-1/3"
              />
              <button
                type="button"
                onClick={() => removePart(idx)}
                className="bg-red-500 text-white px-2 rounded"
              >
                ×
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addPart}
            className="bg-green-500 text-white px-3 py-1 rounded mb-4"
          >
            إضافة قطعة غيار
          </button>
        </div>

        {/* الربح */}
        <div className="mt-2">
          <p>إجمالي سعر الجملة: {totalPartsCost} ج</p>
          <p>الربح المتوقع: {profit} ج</p>
        </div>

        <textarea
          name="notes"
          value={form.notes || ""}
          onChange={handleChange}
          placeholder="ملاحظات"
          className="border p-2 rounded w-full"
        />

        <button
          onClick={() => {
            if (user?.role === "admin") handleSubmit();
            else setShowPrompt(true);
          }}
          className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
        >
          حفظ التعديلات
        </button>
      </div>

      {showPrompt && (
        <PasswordPrompt
          onSubmit={(pass) => {
            setPassword(pass);
            handleSubmit();
            setShowPrompt(false);
          }}
          onCancel={() => setShowPrompt(false)}
        />
      )}
    </div>
  );
};

export default EditRepairPage;
