import axios from 'axios';

const aviasalesHost = axios.create({
    baseURL: 'https://aviasales-test-api.kata.academy'
});
export {aviasalesHost};
