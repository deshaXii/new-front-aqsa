import React, { useState } from "react";
import axios from "axios";
import useAuthStore from "../auth/authStore.js";
import Notification from "../../components/Notification.jsx";
import RepairCard from "../../components/RepairCard.jsx";

const SearchPage = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [error, setError] = useState("");
  const { token } = useAuthStore();

  const handleSearch = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const { data } = await axios.get(
        `http://localhost:5000/api/repairs/search?q=${query}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setResults(data);
    } catch {
      setError("فشل في تنفيذ البحث");
    }
  };

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h2 className="text-xl font-bold mb-4">البحث</h2>
      {error && <Notification type="error" message={error} />}

      <form onSubmit={handleSearch} className="flex mb-4">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="اكتب للبحث..."
          className="flex-1 border px-3 py-2 rounded-l outline-none"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-r"
        >
          بحث
        </button>
      </form>

      <div className="grid gap-4">
        {results.map((r) => (
          <RepairCard key={r._id} repair={r} />
        ))}
      </div>
    </div>
  );
};

export default SearchPage;
