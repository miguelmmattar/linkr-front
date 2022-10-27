import { Posts, Load, Trending, ScrollLoader } from "../styles/TimelineStyles.js";
import Post from "./secondaryComponents/Post.js";
import UserContext from "../contexts/UserContext";
import { useContext, useState, useEffect } from "react";
import services from "../services/linkr.js";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import TrendingTopics from "./secondaryComponents/Trending";
import InfiniteScroll from "react-infinite-scroller";

export default function HashtagPage() {
    const { user, setUser } = useContext(UserContext);
    const { hashtag } = useParams();
    const [posts, setPosts] = useState([]);
    const [load, setLoad] = useState(false);
    const [trending, setTrending] = useState([]);
    const [loadMore, setLoadMore] = useState(false);
    const navigate = useNavigate("/");

    function loadPosts(firstLoad) {
         if(firstLoad === true) {
            setLoad(true);
            loadTrending();
          }

        const promise = services.getHashtagPosts(user.token, hashtag, posts.length);

        promise.then(answer => {
            setLoad(false);
            if(answer.data.length === 0) {
                setLoadMore(false);
                return;
            }
            setPosts(posts.concat(answer.data));
            setLoadMore(true);
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

  function loadTrending() {
    const promise = services.getTrending(user.token);
    promise.then((answer) => {
      setTrending(answer.data);
    });
    promise.catch((answer) => {
      if (answer.response.status === 401) {
        localStorage.clear();
        setUser(null);
        return navigate("/");
      }
      alert(
        "An error occured while trying to fetch the trending topics, please refresh the page"
      );
    });
  }

  useEffect(() => {
    if (!user) {
      return navigate("/");
    }
    loadPosts();
    loadTrending();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hashtag]);

  return (
    <Posts load={load} hasTrending={true}>
      <HashtagInfo load={load}>
        <h1>{`# ${hashtag}`}</h1>
      </HashtagInfo>
      <Load load={load}>
        <img src="https://i.gifer.com/ZZ5H.gif" alt="loading" />
        <h2>Loading</h2>
      </Load>

            <InfiniteScroll
                pageStart={0}
                loadMore={loadPosts}
                hasMore={true}
                loader={<ScrollLoader key={0} rendered={loadMore}><img src="https://i.gifer.com/ZZ5H.gif" alt="loading" /></ScrollLoader>}
            >
                {posts.length === 0 ? (
                    <h6>There are no posts yet . . .</h6>
                ) : (
                    posts.map((post, index) => (
                        <Post
                            key={index}
                            user={user}
                            post={post}
                            loadPosts={loadPosts}
                        />
                    ))
                )}
            </InfiniteScroll>

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
    );
}

const HashtagInfo = styled.span`
  display: ${(props) => (props.load ? "none" : "flex")};
  align-items: center;
  padding: 0 18px;
  margin-bottom: 42px;

  h1 {
    margin: 0;
  }
`;
