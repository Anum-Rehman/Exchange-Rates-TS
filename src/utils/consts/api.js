import axios from 'axios';
export const API_URL = 'https://open.exchangerate-api.com/v6/latest';

//calling axios function   
export const getRates = (userRates) => axios.get(API_URL, { ...userRates });