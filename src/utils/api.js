const axios = require('axios');

const baseURL = 'https://nc-news-rpillar.herokuapp.com/api';

exports.getAllTopics = () => {
  return axios.get(`${baseURL}/topics`).then(({ data }) => {
    return data.topics.map(({ slug }) => {
      return slug.slice(0, 1).toUpperCase() + slug.slice(1);
    });
  });
};

exports.getAllArticles = query => {
  return axios
    .get(`${baseURL}/articles`, {
      params: query
    })
    .then(({ data }) => {
      return data.articles;
    });
};

exports.getArticleById = id => {
  return axios.get(`${baseURL}/articles/${id}`).then(({ data }) => {
    return data.article;
  });
};

exports.getCommentsByArticleId = id => {
  return axios.get(`${baseURL}/articles/${id}/comments`).then(({ data }) => {
    return data.comments;
  });
};
