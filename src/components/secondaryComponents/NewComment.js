import { useState } from "react";
import services from "../../services/linkr.js";
import { IconContext } from "react-icons";
import { FiSend } from "react-icons/fi";
import {
  CommentBox,
  CommentBoxContainer,
  SectionLine,
  UserPicture,
} from "../../styles/PostStyles.js";

export default function NewComment({ user, index, postId }) {
  const [isLoading, setIsLoading] = useState(false);
  const [comment, setComment] = useState("");

  console.log(user);
  function clickFunction() {
    if (isLoading) {
      return;
    }

    saveComment();
  }

  function handleChange(event) {
    setComment(event.target.value);
  }

  function handleKeyboard(event) {
    if (event.key === "Enter") {
      saveComment();
    }
  }

  function saveComment() {
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
        setComment("");
      })
      .catch(() => {
        setIsLoading(false);
        alert("Failed to comment");
      });
  }

  return (
    <IconContext.Provider
      value={{
        color: "#F3F3F3",
        className: "send-button",
      }}
    >
      <SectionLine />
      <CommentBoxContainer
        isLoading={isLoading}
        className="commentBoxContainer"
      >
        <UserPicture
          src={user.picture}
          className="userPicture"
          style={{ position: "static" }}
        />

        <CommentBox
          isLoading={isLoading}
          onChange={handleChange}
          onKeyDown={handleKeyboard}
          value={comment}
          placeholder="write a comment..."
          disabled={isLoading}
        ></CommentBox>
        <span
          className="send-button-wrapper"
          isLoading={isLoading}
          onClick={clickFunction}
        >
          <FiSend />
        </span>
      </CommentBoxContainer>
    </IconContext.Provider>
  );
}
