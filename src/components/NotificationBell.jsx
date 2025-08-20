// src/components/NotificationBell.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../lib/api";

export default function NotificationBell() {
  const [count, setCount] = useState(0);

  async function fetchCount() {
    try {
      const list = await API.get("/notifications").then((r) => r.data);
      setCount(list.filter((n) => !n.read).length);
    } catch (e) {
      // ignore
    }
  }

  useEffect(() => {
    fetchCount();
    const i = setInterval(fetchCount, 10000); // كل 10 ثواني
    return () => clearInterval(i);
  }, []);

  return (
    <Link to="/notifications" className="relative inline-flex items-center">
      <span className="material-icons">notifications</span>
      {count > 0 && (
        <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs px-1.5 rounded-full">
          {count}
        </span>
      )}
    </Link>
  );
}
