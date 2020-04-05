import axios from 'axios';
import { API_URL, DEVICE_ID } from 'react-native-dotenv';

const api = axios.create({
  baseURL: API_URL,
  timeout: 5000,
  proxy: false,
  headers: {
    'content-type': 'application/json',
    'Device-ID': DEVICE_ID },
});

export default api;
