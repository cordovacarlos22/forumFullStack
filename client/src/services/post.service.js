import axios from "axios";

const url = import.meta.env.VITE_FORO_API;

export const createPost = (data, token) => {
  return axios.post(`${url}/post`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};