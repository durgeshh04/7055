import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:3000/api',
});

export const getAllDishes = () => API.get('/dishes');

export const getDishDetails = (id) => API.get(`/dishes/${id}`);

export const createDish = (data) => API.post('/dishes', data);

export const updateDish = (id, data) => API.put(`/dishes/${id}`, data);

export const deleteDish = (id) => API.delete(`/dishes/${id}`);