import axios from 'axios';
// import Cookies from 'js-cookie'; 

const BASEURL = 'https://socialsnipper.onrender.com/api/v1';

export const api = axios.create({
  baseURL: BASEURL,
  withCredentials: true, // Keep for cookie-based auth if needed
  headers: {
    'Content-Type': 'application/json',
  },
});

