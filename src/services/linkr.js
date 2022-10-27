import axios from "axios";

const BASE_URL = "http://localhost:4000";

function getFollows(token) {
  return axios.get(`${BASE_URL}/follows`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

function getPosts(token) {
  return axios.get(`${BASE_URL}/posts`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

function getUserPosts(token, userId) {
  return axios.get(`${BASE_URL}/user/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

function getHashtagPosts(token, hashtag) {
  return axios.get(`${BASE_URL}/hashtag/${hashtag}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

function getTrending(token) {
  return axios.get(`${BASE_URL}/trending`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

function postUrl(token, body) {
  return axios.post(`${BASE_URL}/posts`, body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

function postLogin(body) {
  const promise = axios.post(`${BASE_URL}/sign-in`, body);
  return promise;
}

function postSignup(body) {
  return axios.post(`${BASE_URL}/sign-up`, body);
}

function deleteLogout(token) {
  return axios.delete(`${BASE_URL}/logout`, {
    headers: { Authorization: `Bearer ${token}` },
  });
}

function postLike({ postId, token }) {
  return axios.post(`${BASE_URL}/posts/likes/${postId}`, "", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

function deletePost({ postId, token }) {
  return axios.delete(`${BASE_URL}/posts/${postId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

function editPost({ body, token }) {
  return axios.put(`${BASE_URL}/posts`, body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

function getSearch({ token, searchString }) {
  return axios.get(`${BASE_URL}/search/${searchString}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

// eslint-disable-next-line
export default {
  getPosts,
  postUrl,
  getUserPosts,
  postLogin,
  postSignup,
  deleteLogout,
  postLike,
  getTrending,
  deletePost,
  getHashtagPosts,
  editPost,
  getSearch,
  getFollows,
};
