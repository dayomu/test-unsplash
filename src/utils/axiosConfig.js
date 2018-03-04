import axios from 'axios';

export const axiosUnsplash = axios.create({
  baseURL: 'https://api.unsplash.com/',
  timeout: 5000,
  headers: {
    'Accept-Version': 'v1',
    'Authorization': 'Client-ID 762a301acc81759cf01a5c79fa3982a10d98fa64d7b8569463d9aa3cb3e31c97'
  }
});