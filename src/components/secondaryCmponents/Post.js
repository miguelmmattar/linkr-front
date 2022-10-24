import { SnippetBox } from "../../styles/TimelineStyles.js";
import { Link } from "react-router-dom";
import LikeButton from "./LikeButton.js";
import DeletePost from "./DeletePost.js";
import { ReactTagify } from "react-tagify";

export default function Post({ user, post, loadPosts }) {
  const postUser = post.user;
  const likeOfTheUser = (like) => like.id === user.id;
  const isLiked = post.likedBy.some(likeOfTheUser);
  const isUser = postUser.id === user.id;
  const tagStyle = {
    color: "white",
    fontWeight: 700,
    cursor: "pointer",
  };

  return (
    <div className="post-wrapper">
      <img src={postUser.picture} alt="Profile" />
      <Link to={`/user/${postUser.id}`}>
        <h3>{postUser.name}</h3>
      </Link>
      <ReactTagify tagStyle={tagStyle} tagClicked={(tag) => alert(tag)}>
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
