/* 
    THIS FILE IS THE API SERVICE
    IT ALLOWS TO MAKE REQUESTS TO THE BACKEND
    IT USES THE AXIOS LIBRARY TO MAKE THE REQUESTS
*/
import axios from "axios";
// CREATE INSTANCE OF AXIOS
const Api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || "https://innovatube-backend-zegg.onrender.com",
});
// INTERCEPT REQUESTS AND ADD TOKEN TO HEADERS FOR AUTH
Api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    // ADD TOKEN TO HEADERS IF IT EXISTS
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default Api;