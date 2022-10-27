import { Posts, Load, Trending } from "../styles/TimelineStyles.js";
import Post from "./secondaryComponents/Post.js";
import UserContext from "../contexts/UserContext";
import { useContext, useState, useEffect } from "react";
import services from "../services/linkr.js";
import { useParams, useLocation } from "react-router-dom";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import TrendingTopics from "./secondaryComponents/Trending";

export default function UserPage() {
  const { user, setUser } = useContext(UserContext);
  const { id } = useParams();
  const [posts, setPosts] = useState([]);
  const [load, setLoad] = useState(false);
  const [profile, setProfile] = useState({});
  const [trending, setTrending] = useState([]);
  const [following, setFollowing] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const navigate = useNavigate();
  const path = Number(useLocation().pathname.replace("/user/", ""));

  function loadPosts() {
    const promise = services.getUserPosts(user.token, id);

    setLoad(true);

    promise.then((answer) => {
      setPosts(answer.data.posts);
      setProfile(answer.data.user);
      setFollowing(answer.data.user.followedAt)
      setLoad(false);
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
  }

  function followUser() {
    if (!isDisabled) {

      const body = { id: path }
      setIsDisabled(true);
      if (following) {
        const promise = services.postUnfollow(user.token, body);

        promise.then((res) => {
          setFollowing(false)
          setIsDisabled(false);
        })

        promise.catch((error) => {
          console.log(error);
          setIsDisabled(false);
        })

      } else {
        const promise = services.postFollow(user.token, body);

        promise.then((res) => {
          setFollowing(true)
          setIsDisabled(false);
        })

        promise.catch((error) => {
          console.log(error);
          setIsDisabled(false);
        })
      }
    }
  }

  useEffect(() => {
    if (!user) {
      return navigate("/");
    }
    loadPosts();
    loadTrending();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <>
      <Posts load={load} hasTrending={true}>
        <UserInfo load={load}>
          <img src={profile?.picture} alt="Profile" />
          <h1>{`${profile?.name}’s posts`}</h1>

          {(path !== user.id) ? (
            <FollowButton following={following} onClick={() => { followUser() }}>
              {following ? ("Unfollow") : ("Follow")}
            </FollowButton>) : (<></>)
          }

        </UserInfo>

        {posts.length === 0 ? (
          <h6>There are no posts yet . . .</h6>
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
    </>


  );
}

const UserInfo = styled.span`
  display: ${(props) => (props.load ? "none" : "flex")};
  align-items: center;
  padding: 0 18px;
  margin-bottom: 32px;
  height: auto;
  img {
    position: initial;
    margin-right: 18px;
  }

  h1 {
    margin: 0;
  }
`;

const FollowButton = styled.div`
  position: absolute;
  right: 0px;
  top: 10px;
  width: 112px;
  height: 31px;
  background: ${(props) => (!props.following ? "#1877F2" : "#FFFFFF")};
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: "Lato", sans-serif; 
  font-weight: 700;
  font-size: 14px;
  line-height: 17px;
  color: ${(props) => (!props.following ? "#FFFFFF" : "#1877F2")};
  @media (max-width: 900px) {
    top: -35px;
    left: 50%;
    transform: translate(-50%, 0);
    width: 200px;
  }
  @media (max-width: 614px) {
    top: -35px;
    left: 50%;
    transform: translate(-50%, 0);
    width: 200px;
  }
`;