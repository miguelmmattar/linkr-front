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
        let lastPost;
        
        if(firstLoad === true) {
            lastPost = Date.now() + 3 * 3600000;
            setLoad(true);
            setLoadMore(false);
            loadTrending();
            setPosts([]);
          } else {
            lastPost = posts[posts.length - 1].createdAt;
        }

        const promise = services.getHashtagPosts(user.token, hashtag, lastPost);

        promise.then(answer => {
            setLoad(false);
            if(answer.data.length === 0) {
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

        {posts.length === 0 ? (
          <h6>There are no posts yet . . .</h6>
        ) : (
          <InfiniteScroll
            pageStart={0}
            loadMore={() => loadPosts(false)}
            hasMore={true}
            initialLoad={false}
            loader={<ScrollLoader key={0} rendered={loadMore}><img src="https://i.gifer.com/ZZ5H.gif" alt="loading" /></ScrollLoader>}
          >
              {posts.map((post, index) => (
                <Post key={index} user={user} post={post} loadPosts={loadPosts} />
              ))}
            
          </InfiniteScroll>
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
