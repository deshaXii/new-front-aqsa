import axios from "axios";
import useAuthStore from "../../pages/auth/authStore";

const API_URL = "http://localhost:5000/api/repairs";

export const getRepairs = async () => {
  const { token } = useAuthStore.getState();
  const res = await axios.get(API_URL, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const createRepair = async (repairData) => {
  const { token } = useAuthStore.getState();
  const res = await axios.post(API_URL, repairData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const updateRepair = async (id, repairData) => {
  const { token } = useAuthStore.getState();
  const res = await axios.put(`${API_URL}/${id}`, repairData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};
