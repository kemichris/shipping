import api from "../utils/axios";

export const getDashboard = async () => {
  const { data } = await api.get("/admin/dashboard");
  return data;
};