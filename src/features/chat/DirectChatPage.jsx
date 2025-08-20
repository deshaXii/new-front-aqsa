// src/features/chat/DirectChatPage.jsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../../lib/api";
import { formatDate } from "../../utils/formatDate";

export default function DirectChatPage() {
  const { userId } = useParams();
  const [list, setList] = useState([]);
  const [text, setText] = useState("");
  const [techs, setTechs] = useState([]);

  async function loadUsers() {
    const t = await API.get("/technicians").then((r) => r.data);
    setTechs(t);
  }

  async function load() {
    if (!userId) return;
    const msgs = await API.get(`/chat/dm/${userId}`).then((r) => r.data);
    setList(msgs);
  }

  async function send() {
    const content = text.trim();
    if (!content || !userId) return;
    await API.post(`/chat/dm/${userId}`, { content });
    setText("");
    await load();
  }

  useEffect(() => {
    loadUsers();
  }, []);
  useEffect(() => {
    load();
    const i = setInterval(load, 5000);
    return () => clearInterval(i);
  }, [userId]);

  return (
    <div className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-xl font-bold">مراسلة خاصة</h1>

      <div className="p-2 rounded-xl bg-white dark:bg-gray-800">
        <label className="text-sm opacity-80">
          اختر فنيًا (الرابط يحتوي userId)
        </label>
        <div className="flex flex-wrap gap-2 mt-2">
          {techs.map((t) => (
            <a
              key={t._id}
              href={`/chat/dm/${t._id}`}
              className="px-3 py-1 rounded-lg bg-gray-100 dark:bg-gray-700"
            >
              {t.name}
            </a>
          ))}
        </div>
      </div>

      <div className="p-3 rounded-xl bg-white dark:bg-gray-800 h-[60vh] overflow-auto flex flex-col">
        <div className="space-y-2">
          {list.map((m) => (
            <div
              key={m._id}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700"
            >
              <div className="text-xs opacity-80">
                {m?.from?.name || "مستخدم"} — {formatDate(m.createdAt)}
              </div>
              <div>{m.content}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-2">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && send()}
          className="flex-1 px-3 py-2 rounded-xl bg-white dark:bg-gray-800"
          placeholder="اكتب رسالة..."
        />
        <button
          onClick={send}
          className="px-4 py-2 rounded-xl bg-blue-600 text-white"
        >
          إرسال
        </button>
      </div>
    </div>
  );
}
