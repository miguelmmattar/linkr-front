import { SnippetBox } from "../../styles/TimelineStyles.js";
import { Link } from "react-router-dom";
import LikeButton from "./LikeButton.js";
import DeletePost from "./DeletePost.js";
import EditPost from "./EditPost.js";
import { useState } from "react/cjs/react.production.min.js";

export default function Post({ user, post, loadPosts }) {
  const postUser = post.user;
  const [postData, setPostData] = useState(post);
  const likeOfTheUser = (like) => like.id === user.id;
  const isLiked = post.likedBy.some(likeOfTheUser);
  const isUser = postUser.id === user.id;

  return (
    <div className="post-wrapper">
      <img src={postUser.picture} alt="Profile" />
      <Link to={`/user/${postUser.id}`}>
        <h3>{postUser.name}</h3>
      </Link>
      <h4>{postData.description}</h4>
      <LikeButton postId={postData.id} likes={postData.likedBy} isLiked={isLiked} />
      <DeletePost isUser={isUser} postId={postData.id} loadPosts={loadPosts} />
      <EditPost isUser={isUser} postId={postData.id} loadPosts={loadPosts} setPostData={setPostData}/>
      <a href={postData.link.url} target="_blank" className="snippet">
        <Snippet link={postData.link} />
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
