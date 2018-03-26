import axios from 'axios';

// ajax client setup

let baseURL = 'http://localhost:8888/api/';
let withCredentials = true;

if (!(window.location.host === 'localhost:8080' || window.location.host === 'localhost:8888')) {
  withCredentials = false;
  if (location.protocol === 'https:') {
    baseURL = 'https://www.mysite.com/api/';
  } else {
    baseURL = 'http://www.mysite.com/api/';
  }
}



export const client = axios.create({
  baseURL,
  withCredentials,
});
