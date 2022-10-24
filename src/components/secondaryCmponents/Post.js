import { SnippetBox } from "../../styles/TimelineStyles.js";
import styled from "styled-components";
import LikeButton from "./LikeButton.js";
import DeletePost from "./DeletePost.js";
import EditPost from "./EditPost.js";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ReactTagify } from "react-tagify";
import services from "../../services/linkr.js";

export default function Post({ user, post, loadPosts }) {
  const postUser = post.user;
  const [postData, setPostData] = useState(post);
  const [isLoading, setIsLoading] = useState(false);
  const likeOfTheUser = (like) => like.id === user.id;
  const isLiked = post.likedBy.some(likeOfTheUser);
  const isUser = postUser.id === user.id;
  const [editMode, setEditMode] = useState(false);
  const navigate = useNavigate();

  const tagStyle = {
    color: "white",
    fontWeight: 700,
    cursor: "pointer",
  };

  function handleChange(event) {
    setPostData({
      ...postData,
      [event.target.name]: event.target.value,
    });
  }

  function handleKeyboard(event) {
    if (event.keyCode === 27) {
      setEditMode(false);
      setPostData(post);
    }

    if (event.key === "Enter") {
    }
  }

  function saveChanges() {
    if (isLoading) {
      return;
    }

    const body = {
      id: post.id,
      description: postData.description,
    };

    setIsLoading(true);
    services
      .editPost({ token: user.token, body: body })
      .then((response) => {
        setIsLoading(false);
        loadPosts();
      })
      .catch(() => {
        setIsLoading(false);
        alert("Failed to edit");
      });
  }

  return (
    <div className="post-wrapper">
      <img src={postUser.picture} alt="Profile" />
      <Link to={`/user/${postUser.id}`}>
        <h3>{postUser.name}</h3>
      </Link>
      {editMode ? (
        <EditBox
          onChange={handleChange}
          onKeyDown={handleKeyboard}
          type="text"
          name="description"
          rows={3}
          cols={40}
        >
          {postData.description}
        </EditBox>
      ) : (
        <h4>{postData.description}</h4>
      )}
      <LikeButton
        postId={postData.id}
        likes={postData.likedBy}
        isLiked={isLiked}
      />
      <DeletePost isUser={isUser} postId={postData.id} loadPosts={loadPosts} />

      <EditPost
        isUser={isUser}
        postId={post.id}
        loadPosts={loadPosts}
        setPostData={setPostData}
        setEditMode={setEditMode}
        editMode={editMode}
        post={post}
      />

      <a href={postData.link.url} target="_blank" className="snippet">
        <Snippet link={postData.link} />
        <ReactTagify
          tagStyle={tagStyle}
          tagClicked={(tag) => navigate(`/hashtag/${tag.slice(1)}`)}
        >
          <h4>{post.description}</h4>
        </ReactTagify>
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

const EditBox = styled.textarea`
  width: 100%;
  border-radius: 5px;
  border: none;
  padding: 5px 13px;
  border: 1px solid #efefef;
  margin: 15px 0px 10px 0px;
  font-size: 15px;
  background-color: #efefef;
  vertical-align: baseline;
  font-family: "Lato", sans-serif;
`;
