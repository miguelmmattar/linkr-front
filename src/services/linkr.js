import axios from "axios";

const BASE_URL = "http://localhost:4000";

function getPosts(token) {
    return axios.get(`${BASE_URL}/posts`, {
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
  const promise = axios.post(`${BASE_URL}/sign-up`, body);
  return promise;
}

export default {
    getPosts,
    postUrl,
    postLogin,
    postSignup,
    getTrending
};

