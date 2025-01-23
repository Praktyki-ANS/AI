import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://ai-o0vr.onrender.com/', // Backend URL
    headers: {
        'Content-Type': 'application/json',
    },
});

export default axiosInstance;
