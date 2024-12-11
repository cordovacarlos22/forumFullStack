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

const updateUserInfo = (data, userId, token) => {
  
  return axios.patch(
    `${mainUrl}/user/${userId}`, 
    {
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email,
    bio: data.bio,
    avatar: data.avatarUrl,
    CurrentPassword: data.password
  },
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
)
.catch((error) => {
  if (error.response) {
    console.error('Backend error response:', error.response.data);
  } else if (error.request) {
    console.error('No response received:', error.request);
  } else {
    console.error('Error during request setup:', error.message);
  }
});
}


export { userLogin, userRegister, deleteUserByPassword, updateUserPassword, updateUserInfo };
