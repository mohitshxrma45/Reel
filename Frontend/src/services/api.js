import axios from 'axios'

// Default to deployed backend on Render if VITE_API_URL not set
const baseURL = import.meta.env.VITE_API_URL || 'https://reel-3-2fi7.onrender.com'

axios.defaults.baseURL = baseURL
axios.defaults.withCredentials = true

export default axios
