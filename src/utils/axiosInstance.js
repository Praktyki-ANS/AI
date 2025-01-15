import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://10.100.24.254:3000', // Backend URL
    headers: {
        'Content-Type': 'application/json',
    },
});

export default axiosInstance;
