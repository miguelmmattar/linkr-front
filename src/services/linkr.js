import axios from "axios";

const BASE_URL = "http://localhost:4000";

function getPosts(token) {
    return axios.get(`${BASE_URL}/posts`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
}

function postUrl(token, body) {
    return axios.get(`${BASE_URL}/posts`, body, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
}


function sendLogin(body) {
  const promise = axios.post(`${BASE_URL}/sign-in`, body);
  return promise;
}



export default {
    getPosts,
    postUrl,
    sendLogin,
};

