import UserContext from "../../contexts/UserContext.js";
import { IconContext } from "react-icons";
import { MdModeEdit } from "react-icons/md";
import { useContext, useState } from "react";

export default function EditPost({
  postId,
  isUser,
  loadPosts,
  setPostData,
  setEditMode,
  editMode,
  post
}) {
  const { user } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);

  function clickFunction() {
    if (isLoading) {
      return;
    }

    if (!editMode) {
      setEditMode(true);
      return
    }

    setEditMode(false)
    setPostData(post)
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
