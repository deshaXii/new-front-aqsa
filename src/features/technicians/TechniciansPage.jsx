// src/features/technicians/TechniciansPage.jsx
import { useEffect, useState } from "react";
import API from "../../lib/api";
import useAuthStore from "../auth/authStore";
import { Link } from "react-router-dom";

export default function TechniciansPage() {
  const { user } = useAuthStore();
  const isAdmin = user?.role === "admin" || user?.permissions?.adminOverride;

  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);

  // إنشاء فني جديد (أدمن فقط)
  const [newTech, setNewTech] = useState({
    name: "",
    username: "",
    password: "",
    commissionPct: "",
  });
  const [savingNew, setSavingNew] = useState(false);

  // حالات حفظ/حذف صف معيّن
  const [savingRowId, setSavingRowId] = useState(null);
  const [deletingRowId, setDeletingRowId] = useState(null);

  async function load() {
    setLoading(true);
    try {
      const res = await API.get("/technicians").then((r) => r.data);
      // جهّز حالة التحرير لكل صف
      setList(
        res.map((t) => ({
          ...t,
          editing: false,
          editable: {
            name: t.name || "",
            username: t.username || "",
            commissionPct:
              typeof t.commissionPct === "number" ? t.commissionPct : "",
            password: "",
            addRepair: !!t?.permissions?.addRepair,
            editRepair: !!t?.permissions?.editRepair,
            deleteRepair: !!t?.permissions?.deleteRepair,
            receiveDevice: !!t?.permissions?.receiveDevice,
            accessAccounts: !!t?.permissions?.accessAccounts,
            adminOverride: !!t?.permissions?.adminOverride,
          },
        }))
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function createTech() {
    if (!newTech.name || !newTech.username || !newTech.password) {
      alert("أدخل الاسم واسم المستخدم وكلمة السر");
      return;
    }
    setSavingNew(true);
    try {
      await API.post("/technicians", {
        name: newTech.name,
        username: newTech.username,
        password: newTech.password,
        commissionPct:
          newTech.commissionPct === ""
            ? undefined
            : Number(newTech.commissionPct),
      });
      setNewTech({ name: "", username: "", password: "", commissionPct: "" });
      await load();
    } catch (e) {
      alert(e?.response?.data?.message || "خطأ أثناء إضافة الفني");
    } finally {
      setSavingNew(false);
    }
  }

  function toggleEdit(idx, on = null) {
    setList((L) => {
      const A = [...L];
      const t = A[idx];
      const want = on === null ? !t.editing : !!on;
      if (want) {
        // ادخل وضع التحرير: حمّل القيم الحالية في editable (إعادة تزامن)
        A[idx] = {
          ...t,
          editing: true,
          editable: {
            name: t.name || "",
            username: t.username || "",
            commissionPct:
              typeof t.commissionPct === "number" ? t.commissionPct : "",
            password: "",
            addRepair: !!t?.permissions?.addRepair,
            editRepair: !!t?.permissions?.editRepair,
            deleteRepair: !!t?.permissions?.deleteRepair,
            receiveDevice: !!t?.permissions?.receiveDevice,
            accessAccounts: !!t?.permissions?.accessAccounts,
            adminOverride: !!t?.permissions?.adminOverride,
          },
        };
      } else {
        // خروج من وضع التحرير
        A[idx] = { ...t, editing: false };
      }
      return A;
    });
  }

  async function saveRow(t, idx) {
    if (!isAdmin) return;
    setSavingRowId(t._id);
    try {
      const e = t.editable;
      const body = {
        name: e.name,
        username: e.username,
        commissionPct:
          e.commissionPct === "" ? undefined : Number(e.commissionPct),
        permissions: {
          addRepair: !!e.addRepair,
          editRepair: !!e.editRepair,
          deleteRepair: !!e.deleteRepair,
          receiveDevice: !!e.receiveDevice,
          accessAccounts: !!e.accessAccounts,
          adminOverride: !!e.adminOverride,
        },
      };
      if (e.password && e.password.length >= 4) {
        body.password = e.password; // اختياري
      }
      await API.put(`/technicians/${t._id}`, body);
      // حدّث القائمة محليًا لعرض القيم الجديدة فوراً
      setList((L) => {
        const A = [...L];
        A[idx] = {
          ...A[idx],
          name: e.name,
          username: e.username,
          commissionPct: body.commissionPct ?? A[idx].commissionPct,
          permissions: body.permissions,
          editing: false,
        };
        return A;
      });
      alert("تم حفظ التعديلات");
    } catch (e) {
      alert(e?.response?.data?.message || "خطأ أثناء حفظ التعديلات");
    } finally {
      setSavingRowId(null);
    }
  }

  async function deleteRow(t) {
    if (!isAdmin) return;
    if (!confirm(`سيتم حذف الفني "${t.name}" نهائيًا. متأكد؟`)) return;
    setDeletingRowId(t._id);
    try {
      await API.delete(`/technicians/${t._id}`);
      setList((L) => L.filter((x) => x._id !== t._id));
    } catch (e) {
      alert(e?.response?.data?.message || "خطأ أثناء الحذف");
    } finally {
      setDeletingRowId(null);
    }
  }

  // Helpers لتعديل حقول التحرير
  function setEditable(idx, key, value) {
    setList((L) => {
      const A = [...L];
      A[idx] = { ...A[idx], editable: { ...A[idx].editable, [key]: value } };
      return A;
    });
  }

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold">الفنيون</h1>

      {isAdmin && (
        <section className="p-3 rounded-xl bg-white dark:bg-gray-800">
          <h2 className="font-semibold mb-2">إنشاء فني جديد</h2>
          <div className="grid md:grid-cols-5 gap-2">
            <input
              placeholder="الاسم"
              value={newTech.name}
              onChange={(e) => setNewTech({ ...newTech, name: e.target.value })}
              className="inp"
            />
            <input
              placeholder="اسم المستخدم"
              value={newTech.username}
              onChange={(e) =>
                setNewTech({ ...newTech, username: e.target.value })
              }
              className="inp"
            />
            <input
              placeholder="كلمة السر"
              value={newTech.password}
              onChange={(e) =>
                setNewTech({ ...newTech, password: e.target.value })
              }
              className="inp"
            />
            <input
              placeholder="نسبة مخصصة %"
              type="number"
              value={newTech.commissionPct}
              onChange={(e) =>
                setNewTech({ ...newTech, commissionPct: e.target.value })
              }
              className="inp"
            />
            <button
              onClick={createTech}
              disabled={savingNew}
              className="px-3 py-2 rounded-xl bg-emerald-600 text-white"
            >
              {savingNew ? "جارٍ..." : "إضافة"}
            </button>
          </div>
          <style>{`.inp{padding:.5rem .75rem;border-radius:.75rem;background:#f3f4f6}`}</style>
        </section>
      )}

      <section className="p-3 rounded-xl bg-white dark:bg-gray-800 overflow-x-auto">
        {loading ? (
          <div>جارِ التحميل...</div>
        ) : list.length === 0 ? (
          <div>لا يوجد فنيون.</div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="text-right">
                <th className="p-2">الاسم</th>
                <th className="p-2">@المستخدم</th>
                {/* <th className="p-2">نسبة %</th> */}
                <th className="p-2">صلاحيات</th>
                <th className="p-2">إجراءات</th>
              </tr>
            </thead>
            <tbody>
              {list.map((t, idx) => (
                <tr
                  key={t._id}
                  className="odd:bg-gray-50 dark:odd:bg-gray-700/40 align-top"
                >
                  {/* الاسم */}
                  <td className="p-2">
                    {t.editing ? (
                      <input
                        className="inp"
                        value={t.editable.name}
                        onChange={(e) =>
                          setEditable(idx, "name", e.target.value)
                        }
                      />
                    ) : (
                      <>
                        <div className="font-medium">{t.name}</div>
                        <div className="text-xs opacity-60">
                          <Link
                            className="underline"
                            to={`/technicians/${t._id}/profile`}
                          >
                            بروفايل
                          </Link>{" "}
                          •{" "}
                          <Link className="underline" to={`/chat/dm/${t._id}`}>
                            رسالة خاصة
                          </Link>
                        </div>
                      </>
                    )}
                  </td>

                  {/* اسم المستخدم */}
                  <td className="p-2">
                    {t.editing ? (
                      <input
                        className="inp"
                        value={t.editable.username}
                        onChange={(e) =>
                          setEditable(idx, "username", e.target.value)
                        }
                      />
                    ) : (
                      <span>@{t.username}</span>
                    )}
                  </td>

                  {/* النسبة */}
                  {/* <td className="p-2 w-28">
                    {t.editing ? (
                      <input
                        type="number"
                        className="inp"
                        value={t.editable.commissionPct}
                        onChange={(e) =>
                          setEditable(idx, "commissionPct", e.target.value)
                        }
                      />
                    ) : typeof t.commissionPct === "number" ? (
                      `${t.commissionPct}%`
                    ) : (
                      "—"
                    )}
                  </td> */}

                  {/* الصلاحيات + تغيير كلمة السر عند التحرير */}
                  <td className="p-2">
                    {t.editing ? (
                      <div className="space-y-2">
                        <div className="flex flex-wrap gap-2">
                          <PermToggle
                            label="إضافة صيانة"
                            checked={t.editable.addRepair}
                            onChange={(v) => setEditable(idx, "addRepair", v)}
                          />
                          <PermToggle
                            label="تعديل صيانة"
                            checked={t.editable.editRepair}
                            onChange={(v) => setEditable(idx, "editRepair", v)}
                          />
                          <PermToggle
                            label="حذف صيانة"
                            checked={t.editable.deleteRepair}
                            onChange={(v) =>
                              setEditable(idx, "deleteRepair", v)
                            }
                          />
                          <PermToggle
                            label="استلام جهاز"
                            checked={t.editable.receiveDevice}
                            onChange={(v) =>
                              setEditable(idx, "receiveDevice", v)
                            }
                          />
                          <PermToggle
                            label="الحسابات/الإعدادات"
                            checked={t.editable.accessAccounts}
                            onChange={(v) =>
                              setEditable(idx, "accessAccounts", v)
                            }
                          />
                          <PermToggle
                            label="صلاحيات أدمن"
                            checked={t.editable.adminOverride}
                            onChange={(v) =>
                              setEditable(idx, "adminOverride", v)
                            }
                          />
                        </div>
                        <div className="grid md:grid-cols-2 gap-2">
                          <input
                            type="password"
                            className="inp"
                            placeholder="تغيير كلمة السر (اختياري)"
                            value={t.editable.password}
                            onChange={(e) =>
                              setEditable(idx, "password", e.target.value)
                            }
                          />
                          <div className="text-xs opacity-70 self-center">
                            اتركها فارغة إذا لا تريد تغيير كلمة السر.
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-wrap gap-1 text-xs">
                        {t?.permissions?.addRepair && <Pill>إضافة</Pill>}
                        {t?.permissions?.editRepair && <Pill>تعديل</Pill>}
                        {t?.permissions?.deleteRepair && <Pill>حذف</Pill>}
                        {t?.permissions?.receiveDevice && <Pill>استلام</Pill>}
                        {t?.permissions?.accessAccounts && <Pill>حسابات</Pill>}
                        {t?.permissions?.adminOverride && <Pill>أدمن</Pill>}
                        {!t?.permissions && (
                          <span className="opacity-60">—</span>
                        )}
                      </div>
                    )}
                  </td>

                  {/* إجراءات: تعديل/حفظ/إلغاء + حذف */}
                  <td className="p-2 align-middle">
                    <div className="flex flex-wrap items-center justify-end gap-2">
                      {isAdmin &&
                        (t.editing ? (
                          <>
                            <button
                              onClick={() => saveRow(t, idx)}
                              disabled={savingRowId === t._id}
                              className="px-3 py-1 rounded-lg bg-blue-600 text-white"
                            >
                              {savingRowId === t._id ? "جارٍ الحفظ..." : "حفظ"}
                            </button>
                            <button
                              onClick={() => toggleEdit(idx, false)}
                              className="px-3 py-1 rounded-lg bg-gray-200 dark:bg-gray-700"
                            >
                              إلغاء
                            </button>
                          </>
                        ) : (
                          <button
                            onClick={() => toggleEdit(idx, true)}
                            className="px-3 py-1 rounded-lg bg-amber-500 text-white"
                          >
                            تعديل
                          </button>
                        ))}

                      {isAdmin && (
                        <button
                          onClick={() => deleteRow(t)}
                          disabled={deletingRowId === t._id}
                          className="px-3 py-1 rounded-lg bg-red-600 text-white"
                        >
                          {deletingRowId === t._id ? "جارٍ الحذف..." : "حذف"}
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </div>
  );
}

function PermToggle({ label, checked, onChange }) {
  return (
    <label className="flex items-center gap-1 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-lg">
      <input
        type="checkbox"
        checked={!!checked}
        onChange={(e) => onChange(e.target.checked)}
      />
      <span className="text-xs">{label}</span>
    </label>
  );
}

function Pill({ children }) {
  return (
    <span className="px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-700">
      {children}
    </span>
  );
}
