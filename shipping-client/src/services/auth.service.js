import api from "../utils/axios";


export const login = async (formData) => {
  const { data } = await api.post("/auth/login", formData);
  return data;
};