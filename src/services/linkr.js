import axios from "axios";

const BASE_URL = "http://localhost:4000";

function getPosts(token) {
  return axios.get(`${BASE_URL}/posts`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

function getUserPosts(token, id) {
  return axios.get(`${BASE_URL}/user/${id}`, {
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

export default {
  getPosts,
  postUrl,
  getUserPosts,
  postLogin,
  postSignup,
  deleteLogout,
  postLike,
};
