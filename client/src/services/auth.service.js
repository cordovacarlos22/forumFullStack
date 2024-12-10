import axios from "axios";

const mainUrl = import.meta.env.VITE_FORO_API

const userLogin = (loginData) => axios.post(`${mainUrl}/user/login`, loginData);

const userRegister = (registerData) =>
  axios.post(`${mainUrl}/user/register`, registerData);

const deleteUserByPassword = (password, userId, token) => {
  return axios.delete(`${mainUrl}/user/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: { password }, // La contraseña se envía en el cuerpo de la solicitud
  });
};

const updateUserPassword = (data, userId, token) => {
  return axios.put(
    `${mainUrl}/user/${userId}`,
    {
      CurrentPassword: data.password,
      NewPassword: data.newPassword,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};


export { userLogin, userRegister, deleteUserByPassword, updateUserPassword };
