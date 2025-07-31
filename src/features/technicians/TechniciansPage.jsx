import React, { useEffect, useState } from "react";
import axios from "axios";
import useAuthStore from "../auth/authStore.js";
import Notification from "../../components/Notification.jsx";
import InputField from "../../components/InputField.jsx";
import Button from "../../components/Button.jsx";
import VoiceInput from "../../components/VoiceInput.jsx";

const TechniciansPage = () => {
  const [techs, setTechs] = useState([]);
  const [form, setForm] = useState({
    name: "",
    username: "",
    password: "",
    permissions: {
      addRepair: true,
      editRepair: true,
      deleteRepair: false,
      receiveDevice: true,
    },
  });
  const [error, setError] = useState("");
  const { token } = useAuthStore();

  const fetchTechnicians = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:5000/api/technicians",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setTechs(data);
    } catch (err) {
      setError("فشل تحميل الفنيين");
    }
  };

  useEffect(() => {
    fetchTechnicians();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name in form.permissions) {
      setForm({
        ...form,
        permissions: { ...form.permissions, [name]: checked },
      });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await axios.post("http://localhost:5000/api/technicians", form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchTechnicians();
      setForm({ ...form, name: "", username: "", password: "" });
    } catch (err) {
      setError("فشل في إنشاء الفني");
    }
  };
  const permissionLabels = {
    addRepair: "➕ إضافة صيانة",
    editRepair: "📝 تعديل صيانة",
    deleteRepair: "❌ حذف صيانة",
    receiveDevice: "📥 استلام الأجهزة",
  };
  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h2 className="text-xl font-bold mb-4">الفنيين</h2>
      {error && <Notification type="error" message={error} />}

      <form
        onSubmit={handleSubmit}
        className="mb-6 bg-white dark:bg-gray-800 p-4 rounded shadow"
      >
        <h3 className="text-lg font-semibold mb-2">إضافة فني جديد</h3>

        {["name", "username", "password"].map((field) => (
          <div key={field} className="relative">
            <InputField
              label={
                field === "name"
                  ? "اسم الفني"
                  : field === "username"
                  ? "اسم المستخدم"
                  : "كلمة المرور"
              }
              name={field}
              type={field === "password" ? "password" : "text"}
              value={form[field]}
              onChange={handleChange}
              required
            />
            <div className="absolute top-[1.8rem] left-[-0.5rem]">
              <VoiceInput
                onText={(text) => setForm({ ...form, [field]: text })}
              />
            </div>
          </div>
        ))}

        <div className="grid grid-cols-2 gap-4 mt-4 text-sm">
          {Object.keys(form.permissions).map((perm) => (
            <label key={perm} className="flex items-center gap-2">
              <input
                type="checkbox"
                name={perm}
                checked={form.permissions[perm]}
                onChange={handleChange}
              />
              <span>{permissionLabels[perm]}</span>
            </label>
          ))}
        </div>

        <Button type="submit" className="mt-4 w-full">
          إضافة الفني
        </Button>
      </form>

      <div className="overflow-auto">
        <table className="min-w-full text-sm border bg-white dark:bg-gray-800">
          <thead className="bg-gray-100 dark:bg-gray-700">
            <tr>
              <th className="p-2 border">الاسم</th>
              <th className="p-2 border">اسم المستخدم</th>
              <th className="p-2 border">الصلاحيات</th>
            </tr>
          </thead>
          <tbody>
            {techs.map((tech) => (
              <tr key={tech._id}>
                <td className="p-2 border">{tech.name}</td>
                <td className="p-2 border">{tech.username}</td>
                <td className="p-2 border">
                  {Object.entries(tech.permissions)
                    .filter(([_, v]) => v)
                    .map(([k]) => k)
                    .join(", ")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TechniciansPage;
