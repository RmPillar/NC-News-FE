const axios = require('axios');

const baseURL = 'https://nc-news-rpillar.herokuapp.com/api';

exports.getAllTopics = () => {
  return axios.get(`${baseURL}/topics`).then(({ data }) => {
    return data.topics;
  });
};

exports.getAllArticles = () => {
  return axios.get(`${baseURL}/articles`).then(({ data }) => {
    return data.articles;
  });
};
