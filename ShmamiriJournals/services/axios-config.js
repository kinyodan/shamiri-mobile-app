import axios from 'axios';

const apiClient = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL, // Replace with your base URL
  timeout: 1000,
  headers: { 'Content-Type': 'application/json' },
});


export { apiClient };