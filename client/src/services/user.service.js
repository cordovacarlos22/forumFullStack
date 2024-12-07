import axios from "axios";

const mainUrl = import.meta.env.VITE_FORO_API

const getMyUserService = (token, userId) => axios.get(`${mainUrl}/user/${userId}`, {
    headers: {
        Authorization: `Bearer ${token}`
    }
})

export {
    getMyUserService
}