import UserContext from "../contexts/UserContext";
import { useContext, useState, useEffect } from "react";
import services from "../services/linkr.js";
import {
  Posts,
  Form,
  Load,
  Trending,
  Container,
} from "../styles/TimelineStyles.js";
import Post from "./secondaryComponents/Post.js";
import TrendingTopics from "./secondaryComponents/Trending";
import { useNavigate } from "react-router-dom";

export default function Timeline() {
  const { user, setUser } = useContext(UserContext);
  const [posts, setPosts] = useState([]);
  const [load, setLoad] = useState(false);
  const [trending, setTrending] = useState([]);
  // eslint-disable-next-line
  const [follows, setFollows] = useState({});
  const [noPostsMessage, setNoPostsMessage] = useState("No posts found from your friends");
  const navigate = useNavigate();

  function loadFollows() {
    const promise = services.getFollows(user.token);
    
    promise.then(answer => {
      setFollows(answer.data)

      if(answer.data.following.length === 0) {
        setNoPostsMessage("You don't follow anyone yet. Search for new friends!");
      }  
    });

    promise.catch((answer) => {
      alert("An error occured while trying to fetch the posts, please refresh the page!")
    });
  }

  function loadTrending() {
    const promise = services.getTrending(user.token);
    promise.then((answer) => {
      setTrending(answer.data);
    });
    promise.catch((answer) => {
      if(answer.response.status === 401) {
        setUser(null)
        localStorage.clear();
        setUser(null);
        return (navigate("/"));
      }
      alert(
        "An error occured while trying to fetch the trending topics, please refresh the page"
      )
    }
    );
  }

  function loadPosts() {
    setLoad(true);
    loadFollows();
    loadTrending();

    const promise = services.getPosts(user.token);

    promise.then((answer) => {
      setPosts(answer.data);
      setLoad(false);
    });

    promise.catch((answer) => {
      if (answer.response.status === 401) {
        localStorage.clear();
        setUser(null);
        return (navigate("/"));
      }

      alert("An error occured while trying to fetch the posts, please refresh the page");
    }
    );
  }

  useEffect(() => {
    if (!user) {
      localStorage.clear();
      setUser(null);
      return navigate("/");
    }
    loadPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container>
      <Posts load={load} hasTrending={true}>
        <h1>timeline</h1>

        <NewPost user={user} loadPosts={loadPosts} loadTrending={loadTrending} />

        {posts.length === 0 ? (
          <h6>{noPostsMessage}</h6>
        ) : (
          posts.map((post, index) => (
            <Post key={index} user={user} post={post} loadPosts={loadPosts} />
          ))
        )}

        <Load load={load}>
          <img src="https://i.gifer.com/ZZ5H.gif" alt="loading" />
          <h2>Loading</h2>
        </Load>

        <Trending load={load}>
          <h3>trending</h3>
          <div></div>
          {trending.map((value, index) => (
            <TrendingTopics key={index} hashtag={value.hashtag} />
          ))}
        </Trending>
      </Posts>
    </Container>
  );
}

function NewPost({ user, loadPosts, loadTrending }) {
  const [sending, setSending] = useState(false);
  const [form, setForm] = useState({
    url: "",
    description: "",
  });

  function handleForm({ name, value }) {
    setForm({ ...form, [name]: value });
  }

  function handleSubmit(e) {
    e.preventDefault();

    setSending(true);

    const promise = services.postUrl(user.token, form);

    promise.then((answer) => {
      setForm({
        url: "",
        description: "",
      });

      setSending(false);
    });
    loadPosts();

    promise.catch((answer) => {
      setSending(false);
      alert(answer.response.data);
    });
  }

  return (
    <div className="new-post post-wrapper">
      <img src={user?.picture} alt="Profile" />

      <h2>What are you going to share today?</h2>

      <Form onSubmit={handleSubmit} disabled={sending}>
        <input
          type="url"
          placeholder="Insert a URL..."
          name="url"
          required={!sending}
          disabled={sending}
          value={form.url}
          onChange={(e) =>
            handleForm({
              name: e.target.name,
              value: e.target.value,
            })
          }
        />

        <textarea
          type="text"
          placeholder="Write a description..."
          name="description"
          value={form.description}
          disabled={sending}
          onChange={(e) =>
            handleForm({
              name: e.target.name,
              value: e.target.value,
            })
          }
        />

        <input
          type="submit"
          value={!sending ? "Publish" : "Publishing"}
          disabled={sending}
        />
      </Form>
    </div>
  );
}
