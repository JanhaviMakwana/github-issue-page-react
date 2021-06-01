import axios from 'axios';

const token = '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';

export default axios.create({
    baseURL: 'https://api.github.com/',
    headers:{
        'Authorization' : `token ${token}`
    }
});