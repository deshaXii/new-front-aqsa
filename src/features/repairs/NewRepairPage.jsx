import React, { useState, useEffect } from "react";
import InputField from "../../components/InputField.jsx";
import VoiceInput from "../../components/VoiceInput.jsx";
import Button from "../../components/Button.jsx";
import Notification from "../../components/Notification.jsx";
import useAuthStore from "../auth/authStore.js";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const NewRepairPage = () => {
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

  const [partInput, setPartInput] = useState({
    name: "",
    price: "",
    source: "",
  });
  const [error, setError] = useState("");
  const [technicians, setTechnicians] = useState([]);
  const navigate = useNavigate();
  const { token } = useAuthStore();

  useEffect(() => {
    const fetchTechs = async () => {
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

    fetchTechs();
  }, [token]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePartChange = (e) => {
    setPartInput({ ...partInput, [e.target.name]: e.target.value });
  };

  const addPart = () => {
    if (partInput.name && partInput.price && partInput.source) {
      setForm({ ...form, parts: [...form.parts, partInput] });
      setPartInput({ name: "", price: "", source: "" });
    }
  };

  const calculateTotalPartsCost = () => {
    return form.parts.reduce((acc, part) => acc + Number(part.price || 0), 0);
  };

  const calculateProfit = () => {
    const totalParts = calculateTotalPartsCost();
    return Number(form.price || 0) - totalParts;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const finalForm = {
      ...form,
      totalPartsCost: calculateTotalPartsCost(),
      profit: calculateProfit(),
    };

    try {
      await axios.post("http://localhost:5000/api/repairs", finalForm, {
        headers: { Authorization: `Bearer ${token}` },
      });
      navigate("/repairs");
    } catch {
      setError("فشل في حفظ الصيانة");
    }
  };

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h2 className="text-xl font-bold mb-4">إضافة صيانة جديدة</h2>
      {error && <Notification type="error" message={error} />}

      <form onSubmit={handleSubmit}>
        {[
          ["customerName", "اسم العميل"],
          ["deviceType", "نوع الجهاز"],
          ["issue", "العطل"],
          ["color", "اللون"],
          ["phone", "رقم التليفون"],
          ["price", "سعر الصيانة"],
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

        {/* اختيار الفني والمستلم */}
        {["technician", "recipient"].map((key) => (
          <div key={key} className="mb-4">
            <label className="block mb-1 font-semibold">
              {key === "technician" ? "اسم الفني" : "اسم المستلم"}
            </label>
            <select
              name={key}
              value={form[key]}
              onChange={handleChange}
              className="w-full border rounded p-2"
              required
            >
              <option value="">
                اختر {key === "technician" ? "فني" : "مستلم"}
              </option>
              {technicians.map((tech) => (
                <option key={tech._id} value={tech._id}>
                  {tech.name}
                </option>
              ))}
            </select>
          </div>
        ))}

        {/* الحالة */}
        <div className="mb-4">
          <label className="block mb-1 font-semibold">الحالة</label>
          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="w-full border rounded p-2"
          >
            <option>في الانتظار</option>
            <option>جاري العمل</option>
            <option>مكتمل</option>
            <option>تم التسليم</option>
            <option>مرفوض</option>
          </select>
        </div>

        {/* ملاحظات */}
        <div className="relative">
          <InputField
            label="ملاحظات"
            name="notes"
            value={form.notes}
            onChange={handleChange}
            placeholder="ملاحظات إن وجدت"
          />
          <div className="absolute top-[1.8rem] left-[-0.5rem]">
            <VoiceInput onText={(text) => setForm({ ...form, notes: text })} />
          </div>
        </div>

        {/* قطع الغيار */}
        <div className="mb-4">
          <label className="font-semibold block mb-2">قطع الغيار</label>
          <div className="flex gap-2 mb-2">
            <input
              type="text"
              name="name"
              value={partInput.name}
              onChange={handlePartChange}
              placeholder="اسم القطعة"
              className="flex-1 border p-2 rounded"
            />
            <input
              type="number"
              name="price"
              value={partInput.price}
              onChange={handlePartChange}
              placeholder="السعر"
              className="w-24 border p-2 rounded"
            />
            <input
              type="text"
              name="source"
              value={partInput.source}
              onChange={handlePartChange}
              placeholder="المصدر"
              className="flex-1 border p-2 rounded"
            />
            <Button type="button" onClick={addPart}>
              إضافة
            </Button>
          </div>

          {form.parts.length > 0 && (
            <ul className="list-disc list-inside bg-gray-50 dark:bg-gray-700 p-2 rounded text-sm">
              {form.parts.map((part, index) => (
                <li key={index}>
                  {part.name} - {part.price}ج - من: {part.source}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* الربح */}
        <div className="text-right font-bold">
          الربح المتوقع: {calculateProfit()} ج
        </div>

        <Button type="submit" className="w-full mt-4">
          حفظ الصيانة
        </Button>
      </form>
    </div>
  );
};

export default NewRepairPage;
