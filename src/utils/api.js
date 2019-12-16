const axios = require('axios');

const instance = axios.create({
  baseURL: 'https://nc-news-rpillar.herokuapp.com/api'
});

export const getAllTopics = async () => {
  const topics = await instance.get('topics');
  return topics.data.topics;
};

export const getAllArticles = async ({ topicSlug }, page) => {
  const articles = await instance.get('articles', {
    params: {
      topic: topicSlug,
      p: page
    }
  });
  return articles.data.articles;
};

export const getArticleById = async id => {
  const article = await axios.get(`articles/${id}`);
  return article;
};

export const getCommentsByArticleId = async id => {
  const comments = await axios.get(`articles/${id}/comments`);
  return comments;
};
