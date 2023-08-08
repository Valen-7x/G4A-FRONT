// api.js
import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:8080/api/games', // Cambia esto si tu servidor está en otra dirección
});

export default instance;
