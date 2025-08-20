// src/features/chat/ChatPage.jsx
import { useEffect, useState } from "react";
import API from "../../lib/api";
import { formatDate } from "../../utils/formatDate";
import { Link } from "react-router-dom";

export default function ChatPage() {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [techs, setTechs] = useState([]);

  async function loadMsgs() {
    const msgs = await API.get("/chat/public").then((r) => r.data);
    setMessages(msgs);
  }
  async function loadUsers() {
    try {
      const t = await API.get("/technicians").then((r) => r.data);
      setTechs(t);
    } catch {}
  }
  async function send() {
    const content = text.trim();
    if (!content) return;
    await API.post("/chat/public", { content });
    setText("");
    await loadMsgs();
  }

  useEffect(() => {
    loadMsgs();
    loadUsers();
    const i = setInterval(loadMsgs, 5000);
    return () => clearInterval(i);
  }, []);

  return (
    <div className="grid md:grid-cols-3 gap-4">
      <div className="md:col-span-2 space-y-4">
        <h1 className="text-xl font-bold">شات عام</h1>
        <div className="p-3 rounded-xl bg-white dark:bg-gray-800 h-[60vh] overflow-auto flex flex-col-reverse">
          <div className="space-y-2">
            {messages.map((m) => (
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

      <aside className="space-y-2">
        <h2 className="font-semibold">بدء محادثة خاصة</h2>
        <div className="p-2 rounded-xl bg-white dark:bg-gray-800 max-h-[60vh] overflow-auto">
          {techs.length === 0 ? (
            <div className="opacity-70">لا يوجد مستخدمون</div>
          ) : (
            <ul className="space-y-1">
              {techs.map((t) => (
                <li key={t._id}>
                  <Link
                    to={`/chat/dm/${t._id}`}
                    className="block px-2 py-1 rounded-lg bg-gray-100 dark:bg-gray-700 hover:opacity-90"
                  >
                    {t.name} <span className="opacity-60">@{t.username}</span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </aside>
    </div>
  );
}
