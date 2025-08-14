import React, { useEffect, useState } from "react";
import axios from "axios";
import useAuthStore from "../auth/authStore.js";
import Button from "../../components/Button.jsx";
import Notification from "../../components/Notification.jsx";

const TechniciansPage = () => {
  const { token, user } = useAuthStore();
  const [technicians, setTechnicians] = useState([]);
  const [newTech, setNewTech] = useState({
    name: "",
    username: "",
    password: "",
    permissions: {
      addRepair: false,
      editRepair: false,
      deleteRepair: false,
      receiveDevice: false,
    },
  });
  const [error, setError] = useState("");

  const fetchTechnicians = async () => {
    try {
      const { data } = await axios.get(
        "https://aqsa-serverless.vercel.app/api/technicians",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      // إخفاء الأدمن من الجدول
      setTechnicians(data.filter((t) => t.role !== "admin"));
    } catch (err) {
      setError("فشل في تحميل الفنيين");
    }
  };

  useEffect(() => {
    fetchTechnicians();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewTech({ ...newTech, [name]: value });
  };

  const handlePermissionChange = (perm) => {
    setNewTech({
      ...newTech,
      permissions: {
        ...newTech.permissions,
        [perm]: !newTech.permissions[perm],
      },
    });
  };

  const handleAddTech = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await axios.post(
        "https://aqsa-serverless.vercel.app/api/technicians",
        newTech,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setNewTech({
        name: "",
        username: "",
        password: "",
        permissions: {
          addRepair: false,
          editRepair: false,
          deleteRepair: false,
          receiveDevice: false,
        },
      });
      fetchTechnicians();
    } catch (err) {
      setError(err.response?.data?.message || "فشل في إضافة الفني");
    }
  };

  const handleDeleteTech = async (id) => {
    if (!window.confirm("هل أنت متأكد من حذف هذا الفني؟")) return;
    try {
      await axios.delete(
        `https://aqsa-serverless.vercel.app/api/technicians/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      fetchTechnicians();
    } catch (err) {
      alert("فشل في حذف الفني");
    }
  };

  if (
    user?.role !== "admin" &&
    !user?.permissions?.accessAccounts &&
    !user?.permissions?.adminOverride
  ) {
    return (
      <div className="text-center text-red-500 font-bold mt-10">
        ليس لديك صلاحية الوصول لهذه الصفحة
      </div>
    );
  }

  return (
    <div className="py-4 container mx-auto md:px-60">
      <h2 className="text-xl font-bold mb-4">قائمة الفنيين</h2>
      {error && <Notification type="error" message={error} />}

      {/* إضافة فني جديد (للأدمن فقط) */}
      {user?.role === "admin" && (
        <form
          onSubmit={handleAddTech}
          className="bg-white dark:bg-gray-800 shadow rounded p-4 mb-6 max-w-xl"
        >
          <h3 className="font-bold mb-2">إضافة فني جديد</h3>
          <input
            type="text"
            name="name"
            value={newTech.name}
            onChange={handleChange}
            placeholder="اسم الفني"
            required
            className="border rounded px-2 py-1 w-full mb-2"
          />
          <input
            type="text"
            name="username"
            value={newTech.username}
            onChange={handleChange}
            placeholder="اسم المستخدم"
            required
            className="border rounded px-2 py-1 w-full mb-2"
          />
          <input
            type="password"
            name="password"
            value={newTech.password}
            onChange={handleChange}
            placeholder="كلمة المرور"
            required
            className="border rounded px-2 py-1 w-full mb-2"
          />

          <div className="grid grid-cols-2 gap-2 mb-2">
            <label>
              <input
                type="checkbox"
                checked={newTech.permissions.addRepair}
                onChange={() => handlePermissionChange("addRepair")}
              />{" "}
              إضافة صيانة
            </label>
            <label>
              <input
                type="checkbox"
                checked={newTech.permissions.editRepair}
                onChange={() => handlePermissionChange("editRepair")}
              />{" "}
              تعديل صيانة
            </label>
            <label>
              <input
                type="checkbox"
                checked={newTech.permissions.deleteRepair}
                onChange={() => handlePermissionChange("deleteRepair")}
              />{" "}
              حذف صيانة
            </label>
            <label>
              <input
                type="checkbox"
                checked={newTech.permissions.receiveDevice}
                onChange={() => handlePermissionChange("receiveDevice")}
              />{" "}
              استلام الأجهزة
            </label>
            {/* ✅ الصلاحية الجديدة */}
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={newTech.permissions?.accessAccounts}
                onChange={() => handlePermissionChange("accessAccounts")}
                className="mr-2"
              />
              الوصول للحسابات والفواتير
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={newTech.permissions?.adminOverride}
                onChange={() => handlePermissionChange("adminOverride")}
                className="mr-2"
              />
              صلاحيات المدير
            </label>
          </div>

          <Button type="submit" className="w-full mt-2">
            إضافة الفني
          </Button>
        </form>
      )}

      {/* جدول الفنيين */}
      <div className="overflow-auto">
        <table className="min-w-full bg-white dark:bg-gray-800 border text-sm">
          <thead className="bg-gray-200 dark:bg-gray-700">
            <tr>
              <th className="p-2 border">اسم الفني</th>
              <th className="p-2 border">اسم المستخدم</th>
              <th className="p-2 border">الصلاحيات</th>
              {user?.role === "admin" && (
                <th className="p-2 border">إجراءات</th>
              )}
            </tr>
          </thead>
          <tbody>
            {technicians.map((t) => (
              <tr key={t._id} className="text-center">
                <td className="p-2 border">{t.name}</td>
                <td className="p-2 border">{t.username}</td>
                <td className="p-2 border text-right">
                  {Object.entries(t.permissions || {}).map(([perm, val]) =>
                    val ? (
                      <div key={perm} className="text-green-600">
                        {perm === "addRepair"
                          ? "إضافة صيانة"
                          : perm === "editRepair"
                          ? "تعديل صيانة"
                          : perm === "deleteRepair"
                          ? "حذف صيانة"
                          : "استلام أجهزة"}
                      </div>
                    ) : null
                  )}
                </td>
                {user?.role === "admin" && (
                  <td className="p-2 border">
                    <Button
                      onClick={() => handleDeleteTech(t._id)}
                      className="bg-red-500 text-white"
                    >
                      حذف
                    </Button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TechniciansPage;
