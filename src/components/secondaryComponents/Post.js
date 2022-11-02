import { SnippetBox } from "../../styles/TimelineStyles.js";
import LikeButton from "./LikeButton.js";
import date from "date-and-time";
import DeletePost from "./DeletePost.js";
import EditPost from "./EditPost.js";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ReactTagify } from "react-tagify";
import services from "../../services/linkr.js";
import { Puff } from "react-loader-spinner";
import { useEffect, useRef } from "react";
import {
  EditBox,
  LoadingContainer,
  Posted,
  RepostBar,
  Comments,
} from "../../styles/PostStyles.js";
import { IconContext } from "react-icons";
import { IoMdRepeat } from "react-icons/io";
import RepostButton from "./RepostButton.js";
import Comment from "../secondaryComponents/Comment.js";
import NewComment from "./NewComment.js";
import CommentButton from "./CommentButton.js";
import styled from "styled-components";

export default function Post({ user, post, loadPosts, load, follows = [], hasTrending }) {
  const postUser = post.user;
  const [postData, setPostData] = useState(post);
  const [isLoading, setIsLoading] = useState(false);
  const likeOfTheUser = (like) => like.id === user.id;
  const isLiked = post.likedBy.some(likeOfTheUser);
  const isUser = postUser.id === user.id;
  const [editMode, setEditMode] = useState(false);
  const [commentMode, setCommentMode] = useState(false);
  const [comments, setComments] = useState(post.comments);
  const navigate = useNavigate();
  const inputFocus = useRef();
  let isRepost = false;
  
  if (post.description === null) {
    post.description = "";
  }

  if(post.repostId) {
    isRepost = true;
  }

  function formatDate() {
    const time = post.createdAt * 1000 - 3 * 3600000;
    const interval = (Date.now() - time) / 3600000;
    const now = new Date(Date.now());
    const isToday = interval < Number(date.format(now, "HH"));

    if (!isToday) {
      return date.format(new Date(time), "DD/MM/YYYY");
    }

    return date.format(new Date(time + 3 * 3600000), "HH:mm");
  }

  const postedAt = formatDate();

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
      saveChanges();
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
        setEditMode(false);
      })
      .catch(() => {
        setIsLoading(false);
        alert("Failed to edit");
      });
  }

  useEffect(() => {
    inputFocus.current?.focus();
  }, [editMode]);

  return (
    <PostContainer load={load} hasTrending={hasTrending} isRepost={isRepost}>
      <RepostBar load={load} repost={post.isRepost}>
        <IconContext.Provider
          value={{ color: "white", className: "repost-icon" }}
        >
          <IoMdRepeat />
          <p>
            Re-posted by{" "}
            <b onClick={()=>{navigate(`/user/${post.repostUserId}`)}}>
              {post.repostUserName === user.name
                ? `You`
                : post.repostUserName}
            </b>
          </p>
        </IconContext.Provider>
      </RepostBar>
      
      <div
        className="post-wrapper"
        style={{
          marginBottom: `${commentMode ? comments.length * 73 + 80 : 0}px`,
        }}
      >
        <img src={postUser.picture} alt="Profile" />
        <Posted>
          <Link to={`/user/${postUser.id}`}>
            <h3>{postUser.name}</h3>
          </Link>
          <p>{postedAt}</p>
        </Posted>

        {editMode ? (
          <EditBox
            onChange={handleChange}
            onKeyDown={handleKeyboard}
            type="text"
            name="description"
            disabled={isLoading}
            rows={3}
            cols={40}
            isLoading={isLoading}
            ref={inputFocus}
          >
            {postData.description === null ? "" : postData.description}
          </EditBox>
        ) : (
          <ReactTagify
            tagStyle={tagStyle}
            tagClicked={(tag) => navigate(`/hashtag/${tag.slice(1)}`)}
          >
            <h4>{postData.description === null ? "" : postData.description}</h4>
          </ReactTagify>
        )}

        <LikeButton
          postId={postData.id}
          likes={postData.likedBy}
          isLiked={isLiked}
        />

        <RepostButton
          isUser={isUser}
          postId={postData.id}
          userId={postData.repostUserId}
          loadPosts={loadPosts}
          count={post.count}
        />

        <DeletePost
          isUser={isUser}
          postId={postData.id}
          loadPosts={loadPosts}
        />

        <CommentButton
          setCommentMode={setCommentMode}
          commentMode={commentMode}
          comments={comments}
        />

<EditPost
          isUser={isUser}
          postId={post.id}
          loadPosts={loadPosts}
          setPostData={setPostData}
          setEditMode={setEditMode}
          editMode={editMode}
          post={post}
        />
        {isLoading && editMode ? (
          <LoadingContainer>
            <Puff
              height="100%"
              width="100%"
              radisu={1}
              color="#333333"
              ariaLabel="puff-loading"
              wrapperStyle={{}}
              wrapperClass="loader"
              visible={true}
            />
          </LoadingContainer>
        ) : undefined}

        <a
          href={postData.link.url}
          rel="noreferrer"
          target="_blank"
          className="snippet"
        >
          <Snippet link={postData.link} />
        </a>
      </div>

      {commentMode ? (
          <Comments className="comments" commentsLength={comments.length}>
            {comments.map((comment, index) => {
              const isAuthor = comment.id === post.user.id;
              const following = follows?.following?.find((follow) => {
                if (follow.followed === comment.id) return true;
              });
              const isFollowing = following !== undefined ? true : false;
              return (
                <Comment
                  isAuthor={isAuthor}
                  isFollowing={isFollowing}
                  comment={comment}
                  index={index}
                />
              );
            })}
            <NewComment
              user={user}
              setComments={setComments}
              comments={comments}
              postId={post.id}
            />
          </Comments>
        ) : undefined}
    </PostContainer>
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

const PostContainer = styled.div`
  position: relative;
  width: ${(props) => (props.hasTrending ? "64%" : "100%")};
  display: ${(props) => (!props.load ? "flex" : "none")};
  //margin-bottom: 16px;
  margin-top: ${props => props.isRepost ? '62px' : '32px'};

  @media (max-width: 900px) {
    width: 100%;
  }
`;