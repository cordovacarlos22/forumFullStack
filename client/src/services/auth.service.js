import axios from "axios";

const mainUrl = 'http://localhost:5173/api/v1'

const userLogin = (loginData) => axios.post(`${ mainUrl }/user/login`, loginData)

const userRegister = (registerData) => axios.post(`${ mainUrl }/user/register`, registerData)

export {
    userLogin,
    userRegister,
}





