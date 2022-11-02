import UserContext from "../contexts/UserContext";
import { useContext, useState, useEffect } from "react";
import services from "../services/linkr.js";
import {
  Posts,
  Form,
  Load,
  Trending,
  Container,
  ScrollLoader,
} from "../styles/TimelineStyles.js";
import Post from "./secondaryComponents/Post.js";
import TrendingTopics from "./secondaryComponents/Trending";
import { useNavigate } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroller";
import loadSpinner from "../assets/loadSpinner.gif";
import { NewPostMessage } from "./secondaryComponents/NewPostMessage.js";

export default function Timeline() {
  const { user, setUser } = useContext(UserContext);
  const [posts, setPosts] = useState([]);
  const [load, setLoad] = useState(false);
  const [trending, setTrending] = useState([]);
  // eslint-disable-next-line
  const [follows, setFollows] = useState({});
  const [noPostsMessage, setNoPostsMessage] = useState(
    "No posts found from your friends"
  );
  const [loadMore, setLoadMore] = useState(false);
  const [disableMessageButtom, setDisableMessageButtom] = useState(false)
  const navigate = useNavigate();

  function loadFollows() {
    const promise = services.getFollows(user.token);

    promise.then((answer) => {
      setFollows(answer.data);

      if (answer.data.following.length === 0) {
        setNoPostsMessage(
          "You don't follow anyone yet. Search for new friends!"
        );
      }
    });

    promise.catch((answer) => {
      alert(
        "An error occured while trying to fetch the posts, please refresh the page!"
      );
    });
  }

  function loadTrending() {
    const promise = services.getTrending(user.token);
    promise.then((answer) => {
      setTrending(answer.data);
    });
    promise.catch((answer) => {
      if (answer.response.status === 401) {
        setUser(null);
        localStorage.clear();
        setUser(null);
        return navigate("/");
      }
      alert(
        "An error occured while trying to fetch the trending topics, please refresh the page"
      );
    });
  }

  function loadPosts(firstLoad) {
    let lastPost;

    if (firstLoad === true) {
      lastPost = Date.now() + 3 * 3600000;
      setLoad(true);
      setLoadMore(false);
      loadFollows();
      loadTrending();
      setPosts([]);
    } else {
      lastPost = posts[posts.length - 1].createdAt;
    }

    const promise = services.getPosts(user.token, lastPost);
    promise.then((answer) => {
      setLoad(false);
      if (answer.data.length === 0) {
        setLoadMore(false);
        return;
      }

      if (firstLoad === false) {
        setLoadMore(true);
        const newPosts = posts.concat(answer.data);
        setPosts(newPosts);
      } else {
        const newPosts = answer.data;
        setPosts(newPosts);
      }
    });

    promise.catch((answer) => {
      if (answer.response.status === 401) {
        localStorage.clear();
        setUser(null);
        return navigate("/");
      }

      alert(
        "An error occured while trying to fetch the posts, please refresh the page"
      );
    });
  }

  useEffect(() => {
    if (!user) {
      localStorage.clear();
      setUser(null);
      return navigate("/");
    }
    loadPosts(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container>
      <Posts load={load} hasTrending={true}>
        <h1>timeline</h1>

        <NewPost
          user={user}
          loadPosts={loadPosts}
          setDisableMessageButtom={setDisableMessageButtom}
          disableMessageButtom={disableMessageButtom}
        />

        <NewPostMessage loadPosts={loadPosts} disableMessageButtom={disableMessageButtom} />

          {
            posts.length === 0 ? (
              <h6>{noPostsMessage}</h6>
            ) : (
              <InfiniteScroll
                pageStart={2}
                loadMore={() => loadPosts(false)}
                hasMore={true}
                initialLoad={false}
                loader={
                  <ScrollLoader key={0} rendered={loadMore}>
                    <img src={loadSpinner} alt="loading" />
                  </ScrollLoader>
                }
              >
                {posts.map((post, index) => (
                  <Post
                    key={index}
                    user={user}
                    post={post}
                    loadPosts={loadPosts}
                    load={load}
                    follows={follows}
                    hasTrending={true}
                  />
                ))}
              </InfiniteScroll>
            )
          }
            < Load load={load}>
          <img src={loadSpinner} alt="loading" />
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

function NewPost({ user, loadPosts, setDisableMessageButtom, disableMessageButtom }) {
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
      setDisableMessageButtom(!disableMessageButtom);
      loadPosts(true);
    });

    promise.catch((answer) => {
      setSending(false);
      alert("Unable to post");
      loadPosts(true);
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
