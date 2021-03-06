const axios = require('axios');

const instance = axios.create({
  baseURL: 'https://nc-news-rpillar.herokuapp.com/api'
});

export const getAllTopics = async () => {
  const topics = await instance.get('topics');
  return topics.data.topics;
};

export const getAllArticles = async (
  { topicSlug, author, sortBy },
  { page }
) => {
  const articles = await instance.get('articles', {
    params: {
      topic: topicSlug,
      author,
      p: page,
      sort_by: sortBy || 'created_at'
    }
  });
  return articles.data;
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

export const deleteComment = async comment_id => {
  const deletedComment = await instance.delete(`comments/${comment_id}`);
  return deletedComment;
};

export const deleteArticle = async article_id => {
  const deletedArticle = await instance.delete(`articles/${article_id}`);
  return deletedArticle;
};

export const postNewArticle = async ({ title, topic, article }, user) => {
  const newArticle = await instance.post(`articles`, {
    title,
    author: user,
    topic,
    body: article
  });
  return newArticle.data.article;
};

export const patchVote = async (name, id, type) => {
  const updateVote = await instance.patch(`${type}/${id}`, {
    inc_votes: +name
  });
  return updateVote;
};

export const getAllUsers = async () => {
  const allUsers = await instance.get('users');
  return allUsers.data.users;
};

export const createUser = async (username, name) => {
  const newUser = await instance.post('users', {
    username,
    name,
    avatar_url: 'www.thisisiaurl.co.uk'
  });
  return newUser;
};
