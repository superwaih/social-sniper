import axios from 'axios';
const BASEURL = 'https://socialsnipper.onrender.com/api/v1'

export const api = axios.create({
    baseURL: BASEURL,
    withCredentials: true, 
    
    headers: {
      'Content-Type': 'application/json',
    },
  });

