import axios from "axios";

const mainUrl = import.meta.env.VITE_FORO_API

const userLogin = (loginData) => axios.post(`${mainUrl}/user/login`, loginData)

const userRegister = (registerData) => axios.post(`${mainUrl}/user/register`, registerData)

export {
    userLogin,
    userRegister,
}





