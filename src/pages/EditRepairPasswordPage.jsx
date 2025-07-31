import React, { useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import useAuthStore from "../auth/authStore";
import InputField from "../../components/InputField";
import Button from "../../components/Button";
import Notification from "../../components/Notification";

const EditRepairPasswordPage = () => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { id } = useParams();
  const { token } = useAuthStore();
  const navigate = useNavigate();

  const handleVerify = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const { data } = await axios.post(
        `http://localhost:5000/api/repairs/${id}/verify-password`,
        { password },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (data.success) {
        navigate(`/repairs/${id}/edit`);
      } else {
        setError("كلمة المرور غير صحيحة");
      }
    } catch {
      setError("فشل التحقق من كلمة المرور");
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">التحقق قبل التعديل</h2>
      {error && <Notification type="error" message={error} />}
      <form onSubmit={handleVerify}>
        <InputField
          type="password"
          label="كلمة مرور الفني"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button type="submit" className="w-full mt-4">
          تأكيد
        </Button>
      </form>
    </div>
  );
};

export default EditRepairPasswordPage;
