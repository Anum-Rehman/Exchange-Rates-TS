import axios from 'axios';
export const API_URL = 'https://open.exchangerate-api.com/v6/latest';

function _errorHandler(err) {
    console.error('API_ERROR: ', err);
  }
  
   
  
  export function getRates(userRates) {
    return axios
      .get(API_URL, { ...userRates })
      .then(({ data }) => data)
    .catch(_errorHandler);
  }

  export function setRates(givenRates){
      return axios
      .post(API_URL, { ...givenRates })
      .then(({ data }) => data)
    .catch(_errorHandler);

  }