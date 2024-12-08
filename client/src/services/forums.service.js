import axios from "axios";

const url = import.meta.env.VITE_FORO_API;

export const createForum = (data, token) => {
  return axios.post(`${url}/forum`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};