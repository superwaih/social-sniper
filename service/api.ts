import axios from 'axios';
const BASEURL = 'https://socialsnipper.onrender.com/api/v1'


export const api = axios.create({
    baseURL: BASEURL,
    withCredentials: true, 
    
    headers: {
      'Content-Type': 'application/json',
    },
  });
//   api.interceptors.request.use(
//     async (config) => {
//       const AUTHENTICATION_TOKEN = getToken();
//       if (AUTHENTICATION_TOKEN) {
//         config.headers.Authorization = `Bearer ${AUTHENTICATION_TOKEN}`;
//       }
//       return config;
//     },
//     (error) => {
//       return Promise.reject(error);
//     },
//   );
