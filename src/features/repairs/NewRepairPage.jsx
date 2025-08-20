// src/features/repairs/NewRepairPage.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../lib/api";
import { createRepair } from "./repairsApi";
import formatDate from "../../utils/formatDate";

export default function NewRepairPage() {
  const nav = useNavigate();
  const [techs, setTechs] = useState([]);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    customerName: "",
    phone: "",
    deviceType: "",
    color: "",
    issue: "",
    price: "",
    technician: "",
    notes: "",
    parts: [],
  });

  useEffect(() => {
    (async () => {
      try {
        const t = await API.get("/technicians").then((r) => r.data);
        setTechs(t);
      } catch {}
    })();
  }, []);

  function setField(k, v) {
    setForm((prev) => ({ ...prev, [k]: v }));
  }

  function addPart() {
    setForm((prev) => ({
      ...prev,
      parts: [
        ...prev.parts,
        {
          name: "",
          cost: "",
          supplier: "",
          source: "",
          purchaseDate: new Date().toISOString().slice(0, 10),
        },
      ],
    }));
  }
  function updatePart(i, k, v) {
    setForm((prev) => {
      const parts = prev.parts.slice();
      parts[i] = { ...parts[i], [k]: v };
      return { ...prev, parts };
    });
  }
  function removePart(i) {
    setForm((prev) => ({
      ...prev,
      parts: prev.parts.filter((_, idx) => idx !== i),
    }));
  }

  async function submit() {
    if (!form.customerName || !form.deviceType) {
      alert("الرجاء إدخال اسم العميل ونوع الجهاز");
      return;
    }
    setSaving(true);
    try {
      // نظّف الأرقام
      const priceNum = form.price ? Number(form.price) : 0;
      const payload = {
        ...form,
        price: priceNum,
        parts: form.parts.map((p) => ({
          name: p.name,
          cost: p.cost ? Number(p.cost) : 0,
          supplier: p.supplier || undefined,
          source: p.source || undefined,
          purchaseDate: p.purchaseDate
            ? new Date(p.purchaseDate).toISOString()
            : undefined,
        })),
      };
      const created = await createRepair(payload);
      alert(`تم إنشاء الصيانة #${created.repairId}`);
      nav(`/repairs/${created._id}`);
    } catch (e) {
      alert(e?.response?.data?.message || "حدث خطأ");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-bold">إضافة صيانة</h1>

      <section className="p-3 rounded-xl bg-white dark:bg-gray-800 grid md:grid-cols-2 gap-4">
        <Field label="اسم العميل">
          <input
            value={form.customerName}
            onChange={(e) => setField("customerName", e.target.value)}
            className="inp"
          />
        </Field>
        <Field label="هاتف">
          <input
            value={form.phone}
            onChange={(e) => setField("phone", e.target.value)}
            className="inp"
          />
        </Field>
        <Field label="نوع الجهاز">
          <input
            value={form.deviceType}
            onChange={(e) => setField("deviceType", e.target.value)}
            className="inp"
          />
        </Field>
        <Field label="اللون">
          <input
            value={form.color}
            onChange={(e) => setField("color", e.target.value)}
            className="inp"
          />
        </Field>
        <Field label="العطل">
          <input
            value={form.issue}
            onChange={(e) => setField("issue", e.target.value)}
            className="inp"
          />
        </Field>
        <Field label="السعر المبدئي">
          <input
            type="number"
            value={form.price}
            onChange={(e) => setField("price", e.target.value)}
            className="inp"
          />
        </Field>
        <Field label="الفني المسؤول">
          <select
            value={form.technician}
            onChange={(e) => setField("technician", e.target.value)}
            className="inp"
          >
            <option value="">—</option>
            {techs.map((t) => (
              <option key={t._id} value={t._id}>
                {t.name}
              </option>
            ))}
          </select>
        </Field>
        <Field label="ملاحظات">
          <input
            value={form.notes}
            onChange={(e) => setField("notes", e.target.value)}
            className="inp"
          />
        </Field>
      </section>

      <section className="p-3 rounded-xl bg-white dark:bg-gray-800">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-semibold">قطع الغيار</h2>
          <button
            onClick={addPart}
            className="px-3 py-1 rounded-lg bg-gray-200 dark:bg-gray-700"
          >
            + إضافة قطعة
          </button>
        </div>
        {form.parts.length === 0 ? (
          <div className="opacity-70">لا توجد قطع</div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="text-right">
                <th className="p-2">الاسم</th>
                <th className="p-2">التكلفة</th>
                <th className="p-2">المورد</th>
                <th className="p-2">المصدر</th>
                <th className="p-2">تاريخ الشراء</th>
                <th className="p-2">حذف</th>
              </tr>
            </thead>
            <tbody>
              {form.parts.map((p, i) => (
                <tr key={i} className="odd:bg-gray-50 dark:odd:bg-gray-700/40">
                  <td className="p-2">
                    <input
                      value={p.name}
                      onChange={(e) => updatePart(i, "name", e.target.value)}
                      className="inp"
                    />
                  </td>
                  <td className="p-2">
                    <input
                      type="number"
                      value={p.cost}
                      onChange={(e) => updatePart(i, "cost", e.target.value)}
                      className="inp w-28"
                    />
                  </td>
                  <td className="p-2">
                    <input
                      value={p.supplier}
                      onChange={(e) =>
                        updatePart(i, "supplier", e.target.value)
                      }
                      className="inp"
                    />
                  </td>
                  <td className="p-2">
                    <input
                      value={p.source}
                      onChange={(e) => updatePart(i, "source", e.target.value)}
                      className="inp"
                    />
                  </td>
                  <td className="p-2">
                    <input
                      type="date"
                      value={p.purchaseDate || ""}
                      onChange={(e) =>
                        updatePart(i, "purchaseDate", e.target.value)
                      }
                      className="inp"
                    />
                  </td>
                  <td className="p-2">
                    <button
                      onClick={() => removePart(i)}
                      className="px-2 py-1 rounded-lg bg-red-500 text-white"
                    >
                      حذف
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>

      <div className="flex items-center gap-2">
        <button
          onClick={submit}
          disabled={saving}
          className="px-4 py-2 rounded-xl bg-blue-600 text-white hover:opacity-90 disabled:opacity-50"
        >
          {saving ? "جارِ الحفظ..." : "حفظ الصيانة"}
        </button>
      </div>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <label className="space-y-1">
      <div className="text-sm opacity-80">{label}</div>
      {children}
      <style>
        {`.inp{padding:.5rem .75rem;border-radius:.75rem;background:var(--inp-bg,#f3f4f6);}`}
      </style>
    </label>
  );
}
