import axios from "axios";

const BASE_URL = "https://linkr-postgres-17.herokuapp.com";

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


export default {
    getPosts,
    postUrl
};