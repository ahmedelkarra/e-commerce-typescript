import axios from "axios";

const host = import.meta.env.VITE_APP_HOST || 'http://localhost:4000'

const axiosMain = axios.create(
    {
        baseURL: `${host}/api/`,
        headers: { Authorization: localStorage.getItem('token') }
    }
)


export default axiosMain