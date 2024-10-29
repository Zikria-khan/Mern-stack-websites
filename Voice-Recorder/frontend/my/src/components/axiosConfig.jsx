// axiosConfig.js
import axios from 'axios';

// Set default base URL for axios
axios.defaults.baseURL = 'https://mern-stack-websites.vercel.app'; // Base URL for your API
axios.defaults.withCredentials = true; // Include credentials with requests

export default axios;
