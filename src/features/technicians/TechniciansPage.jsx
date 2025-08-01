import React, { useEffect, useState } from "react";
import axios from "axios";
import useAuthStore from "../auth/authStore.js";
import Notification from "../../components/Notification.jsx";
import Button from "../../components/Button.jsx";

const TechniciansPage = () => {
  const { user } = useAuthStore();
  const [technicians, setTechnicians] = useState([]);
  const [form, setForm] = useState({
    name: "",
    username: "",
    password: "",
    permissions: {},
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
      setTechnicians(data);
    } catch (err) {
      setError("فشل في تحميل الفنيين");
    }
  };

  useEffect(() => {
    user?.role === "admin" && fetchTechnicians();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setForm((prev) => ({
        ...prev,
        permissions: { ...prev.permissions, [name]: checked },
      }));
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleAddTechnician = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/technicians", form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setForm({ name: "", username: "", password: "", permissions: {} });
      fetchTechnicians();
    } catch (err) {
      setError("فشل في إضافة الفني");
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">الفنيين</h2>
      {error && <Notification type="error" message={error} />}

      <form onSubmit={handleAddTechnician} className="mb-6 space-y-2">
        <input
          type="text"
          name="name"
          placeholder="اسم الفني"
          value={form.name}
          onChange={handleChange}
          className="border p-2 rounded w-full"
          required
        />
        <input
          type="text"
          name="username"
          placeholder="اسم المستخدم"
          value={form.username}
          onChange={handleChange}
          className="border p-2 rounded w-full"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="كلمة المرور"
          value={form.password}
          onChange={handleChange}
          className="border p-2 rounded w-full"
          required
        />

        <div className="grid grid-cols-2 gap-2 text-sm">
          {/* متوقفه الان لانها نفس الشئ في استلام الاجهزه */}
          {/* <label>
            <input
              type="checkbox"
              name="addRepair"
              checked={form.permissions.addRepair || false}
              onChange={handleChange}
            />{" "}
            إضافة صيانة
          </label> */}
          <label>
            <input
              type="checkbox"
              name="editRepair"
              checked={form.permissions.editRepair || false}
              onChange={handleChange}
            />{" "}
            تعديل صيانة
          </label>
          <label>
            <input
              type="checkbox"
              name="deleteRepair"
              checked={form.permissions.deleteRepair || false}
              onChange={handleChange}
            />{" "}
            حذف صيانة
          </label>
          <label>
            <input
              type="checkbox"
              name="receiveDevice"
              checked={form.permissions.receiveDevice || false}
              onChange={handleChange}
            />{" "}
            استلام الأجهزة
          </label>
        </div>

        <Button type="submit" className="w-full mt-2">
          إضافة الفني
        </Button>
      </form>

      <table className="min-w-full bg-white dark:bg-gray-800 border text-sm">
        <thead className="bg-gray-200 dark:bg-gray-700">
          <tr>
            <th className="p-2 border">الاسم</th>
            <th className="p-2 border">اسم المستخدم</th>
            <th className="p-2 border">الصلاحيات</th>
          </tr>
        </thead>
        <tbody>
          {technicians.map((t) => (
            <tr key={t._id}>
              <td className="p-2 border">{t.name}</td>
              <td className="p-2 border">{t.username}</td>
              <td className="p-2 border">
                {Object.keys(t.permissions || {})
                  .map((p) => (t.permissions[p] ? ` ${p} ` : ""))
                  .join("")}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TechniciansPage;
