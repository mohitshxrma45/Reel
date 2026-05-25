import axios from 'axios'

const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

axios.defaults.baseURL = baseURL
axios.defaults.withCredentials = true

export default axios
