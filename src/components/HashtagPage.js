import { Posts, Load, Trending } from "../styles/TimelineStyles.js";
import Post from "./secondaryCmponents/Post.js";
import UserContext from "../contexts/UserContext";
import { useContext, useState, useEffect } from "react";
import services from "../services/linkr.js";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import TrendingTopics from "./secondaryCmponents/Trending";

export default function HashtagPage() {
    const { user } = useContext(UserContext);
    const { hashtag } = useParams();
    const [posts, setPosts] = useState([]);
    const [load, setLoad] = useState(false);
    const [trending, setTrending] = useState([]);
    const navigate = useNavigate("/");

    function loadPosts() {
        const promise = services.getHashtagPosts(user.token, hashtag);

        setLoad(true);

        promise.then(answer => {
            setPosts(answer.data);
            setLoad(false);
        });

        promise.catch(answer => alert("An error occured while trying to fetch the posts, please refresh the page"));
    }

    function loadTrending() {
        const promise = services.getTrending(user.token);
        promise.then((answer) => {
          setTrending(answer.data);
        });
        promise.catch((answer) =>
          alert(
            "An error occured while trying to fetch the trending topics, please refresh the page"
          )
        );
      }

    useEffect(() => {
        if(!user) {
            return navigate("/");
          }
        loadPosts();
        loadTrending();
    }, [hashtag]);

    return (
        <Posts load={load} hasTrending={true}>
            <HashtagInfo load={load}>
                <h1>{`# ${hashtag}`}</h1>
            </HashtagInfo>

            {posts.length === 0 ? (
                <h6>There are no posts yet . . .</h6>
            ) : (
                posts.map((post, index) => (
                <Post
                    key={index}
                    user={post.user}
                    post={post}
                />
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
    );
}

const HashtagInfo = styled.span`
    display: ${props => props.load ? 'none' : 'flex'};
    align-items: center;
    padding: 0 18px;
    margin-bottom: 42px;

    h1{
        margin: 0;
    }
`;