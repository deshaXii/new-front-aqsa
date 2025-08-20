// src/features/technicians/TechnicianProfilePage.jsx
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import API from "../../lib/api";
import { formatDate } from "../../utils/formatDate";

export default function TechnicianProfilePage() {
  const { id } = useParams();
  const [data, setData] = useState(null);

  async function load() {
    const res = await API.get(`/technicians/${id}/profile`).then((r) => r.data);
    setData(res);
  }

  useEffect(() => {
    load();
  }, [id]);

  if (!data) return <div>جارِ التحميل...</div>;

  const { tech, counts, totals, currentAssignments } = data;

  return (
    <div className="space-y-6">
      <header className="flex items-center justify-between">
        <h1 className="text-xl font-bold">بروفايل: {tech.name}</h1>
        <Link
          to="/technicians"
          className="px-3 py-2 rounded-xl bg-gray-200 dark:bg-gray-700"
        >
          رجوع
        </Link>
      </header>

      <section className="grid md:grid-cols-3 gap-4">
        <Card title="إجمالي الصيانات" value={counts.total} />
        <Card title="جاري/مفتوح" value={counts.open} />
        <Card title="مكتمل" value={counts.completed} />
        <Card title="تم التسليم" value={counts.delivered} />
        <Card title="مرتجع" value={counts.returned} />
        <Card title="مرفوض" value={counts.rejected} />
      </section>

      <section className="grid md:grid-cols-3 gap-4">
        <Card title="إجمالي الربح" value={totals.profit} />
        <Card title="نصيب الفني" value={totals.techShare} />
        <Card title="نصيب المحل" value={totals.shopShare} />
      </section>

      <section className="p-3 rounded-xl bg-white dark:bg-gray-800">
        <h2 className="font-semibold mb-2">تكليفات جارية</h2>
        {currentAssignments.length === 0 ? (
          <div>لا يوجد</div>
        ) : (
          <ul className="list-disc pr-5 space-y-1">
            {currentAssignments.map((r) => (
              <li key={r.id}>
                <Link className="underline" to={`/repairs/${r.id}`}>
                  #{r.repairId}
                </Link>
                {" — "}الحالة: {r.status} — {r.customerName} —{" "}
                {formatDate(r.createdAt)}
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

function Card({ title, value }) {
  return (
    <div className="p-3 rounded-xl bg-white dark:bg-gray-800 text-center">
      <div className="text-sm opacity-70">{title}</div>
      <div className="text-2xl font-bold">{value}</div>
    </div>
  );
}
