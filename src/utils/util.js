const axios = require('axios');

exports.getAllTopics = () => {
  return axios
    .get('https://nc-news-rpillar.herokuapp.com/api/topics')
    .then(({ data }) => {
      return data.topics;
    });
};
