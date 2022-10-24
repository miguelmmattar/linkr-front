import { SnippetBox } from "../../styles/TimelineStyles.js";
import { Link, useNavigate } from "react-router-dom";
import LikeButton from "./LikeButton.js";
import date from 'date-and-time';
import styled from "styled-components";
import DeletePost from "./DeletePost.js";
import { ReactTagify } from "react-tagify";

export default function Post({ user, post, loadPosts }) {
  const postUser = post.user;
  const likeOfTheUser = (like) => like.id === user.id;
  const isLiked = post.likedBy.some(likeOfTheUser);
  const isUser = postUser.id === user.id;
  const navigate = useNavigate();

  function formatDate(){
    const time = new Date(post.createdAt).getTime() - 3*3600000;
    const interval = (Date.now() - time) / 3600000;
    const now = new Date(Date.now());
    const isToday =  interval < date.format(now, 'HH');

    if(!isToday) {
      return date.format(new Date(time), 'DD/MM/YYYY');
    }

    return date.format(new Date(time), 'HH:mm');
  }

  const postedAt = formatDate();
 
  const tagStyle = {
    color: "white",
    fontWeight: 700,
    cursor: "pointer",
  };

  return (
    <div className="post-wrapper">
      <img src={postUser.picture} alt="Profile" />
      <Posted>
        <Link to={`/user/${postUser.id}`}>
          <h3>{postUser.name}</h3>
        </Link>
        <p>{postedAt}</p>
      </Posted>  
      
      <h4>{post.description}</h4>

      <ReactTagify
        tagStyle={tagStyle}
        tagClicked={(tag) => navigate(`/hashtag/${tag.slice(1)}`)}
      >
        <h4>{post.description}</h4>
      </ReactTagify>

      <LikeButton postId={post.id} likes={post.likedBy} isLiked={isLiked} />
      <DeletePost isUser={isUser} postId={post.id} loadPosts={loadPosts} />
      <a href={post.link.url} target="_blank" className="snippet">
        <Snippet link={post.link} />
      </a>
    </div>
  );
}

function Snippet({ link }) {
  return (
    <SnippetBox className="post-wrapper">
      <img src={link.image} alt="Featured"></img>
      <h5>{link.title}</h5>
      <p>{link.description}</p>
      <p>{link.url}</p>
    </SnippetBox>
  );
}

const Posted = styled.span`
  width: 100%;
  margin-top: 10px;
  
  p {
    font-size: 12px;
    margin-bottom: 0 !important;
    opacity: 0.3;
  }
`;