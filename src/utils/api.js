const axios = require('axios');

const instance = axios.create({
  baseURL: 'https://nc-news-rpillar.herokuapp.com/api'
});

export const getAllTopics = async () => {
  const topics = await instance.get('topics');
  return topics.data.topics;
};

export const getAllArticles = async ({ topicSlug }, { page, sortBy }) => {
  const articles = await instance.get('articles', {
    params: {
      topic: topicSlug,
      p: page,
      orderby: sortBy
    }
  });
  return articles.data.articles;
};

export const getArticleById = async id => {
  const article = await instance.get(`articles/${id}`);
  return article.data.article;
};

export const getCommentsByArticleId = async id => {
  const comments = await instance.get(`articles/${id}/comments`);
  return comments.data.comments;
};

export const postComment = async (id, username, body) => {
  const newComment = await instance.post(`articles/${id}/comments`, {
    username,
    body
  });
  return newComment;
};
