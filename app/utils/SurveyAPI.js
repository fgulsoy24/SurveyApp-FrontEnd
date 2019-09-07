
import api from './BaseAPI';
import cache from 'memory-cache';

export default {
  getQuestions: (params) => {
    const url = window.apiUrl + '/Values';
    return api.getData(url,params);
  }, 
  sendResults: (params) => {
    const url = window.apiUrl + '/Survey/GetResults';
    return api.postData(url,params);
  },
  getDetailedResults: (params) => {
    const url = window.apiUrl + '/Survey/GetDetailedResults';
    return api.getData(url,params);
  },

}