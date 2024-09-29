import axios from "axios";

export const loginUser = async (email, password) => {
  const { data } = await axios.post("/api/users/login", { email, password });
  return data;
};

export const registerUser = async (name, email, password) => {
  const { data } = await axios.post("/api/users/register", {
    name,
    email,
    password,
  });
  return data;
};

export const loginAdmin = async (email, password) => {
  const { data } = await axios.post("/api/admin/login", { email, password });
  return data;
};
