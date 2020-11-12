import { api } from '../config/api';

export const getSomething = ({ id }) => api.get(`/userActions/me/${id}`);

//export const talcosa
