import styled from "styled-components";
import UserContext from "../../contexts/UserContext.js";
import { Puff, ThreeDots } from "react-loader-spinner";
import { IconContext } from "react-icons";
import { MdModeEdit } from "react-icons/md";
import services from "../../services/linkr.js";
import { useContext, useState } from "react";
import { Form } from "../../styles/TimelineStyles.js";

export default function EditPost({
  postId,
  isUser,
  loadPosts,
  setPostData,
  setEditMode,
}) {
  const { user } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);

  function clickFunction() {
    if (isLoading) {
      return;
    }

    setEditMode(true);
  }

  function deletePost() {
    if (isLoading) {
      return;
    }

    setIsLoading(true);
    services
      .deletePost({ token: user.token, postId })
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
    <>
      <IconContext.Provider
        value={{
          color: "white",
          className: "edit-button",
        }}
      >
        <span onClick={clickFunction} className="edit-button-wrapper">
          {isUser ? <MdModeEdit /> : undefined}
        </span>
      </IconContext.Provider>
    </>
  );
}
