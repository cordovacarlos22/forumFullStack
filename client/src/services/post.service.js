import axios from 'axios';

const mainUrl = import.meta.env.VITE_FORO_API || 'http://localhost:3000/api/v1'

const getPostsService = () => axios.get(`${mainUrl}/post`)

export { getPostsService }