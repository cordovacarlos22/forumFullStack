import axios from "axios";

const url = import.meta.env.VITE_FORO_API

export const createComment = (data, token) => {
  return axios.post(
    `${url}/comments/post/${data.postId}`, // Endpoint
    {}, // Empty body since we don't need to send any payload
    {
      headers: {
        Authorization: `Bearer ${token}`, // Authorization header
      },
      data: { content }
    }
  );
};
