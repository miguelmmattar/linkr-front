import styled from "styled-components";
import { useState } from "react";
import services from "../../services/linkr.js";
import {
  CommentBox,
  CommentBoxContainer,
  UserPicture,
} from "../../styles/PostStyles.js";
import { Comment } from "react-loader-spinner";

export default function NewComment({ user, index, postId }) {
  const [isLoading, setIsLoading] = useState(false);
  const [comment, setComment] = useState(null);

  function clickFunction() {
    if (isLoading) {
      return;
    }
  }

  function handleChange(event) {
    setComment(event.target.value);
  }

  function handleKeyboard(event) {
    if (event.key === "Enter") {
      saveChanges();
    }
  }

  function saveChanges() {
    if (isLoading) {
      return;
    }

    const body = {
      id: postId,
      comment: comment,
    };

    setIsLoading(true);
    services
      .postComment({ token: user.token, body: body })
      .then((response) => {
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
        alert("Failed to comment");
      });
  }

  return (
    <CommentBoxContainer className="commentBoxContainer">
      <UserPicture src={user.picture} className="userPicture" />
      <CommentBox placeholder="write a comment..."></CommentBox>
    </CommentBoxContainer>
  );
}
