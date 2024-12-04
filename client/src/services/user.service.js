import axios from "axios";

const mainUrl = /* import.meta.env.VITE_FORO_API ||  */'http://localhost:3000/api/v1'

const getMyUserService = (token, userId) => axios.get(`${mainUrl}/user/${userId}`, {
    headers: {
        Authorization: `Bearer ${token}`
    }
})

export {
    getMyUserService
}