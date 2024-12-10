import axios from "axios";

const url = import.meta.env.VITE_FORO_API

export const toggleLike = (data, token) => {
  return axios.post(
    `${url}/posts/${data.postId}/like`, // Endpoint
    {}, // Empty body since we don't need to send any payload
    {
      headers: {
        Authorization: `Bearer ${token}`, // Authorization header
      },
    }
  );
};
