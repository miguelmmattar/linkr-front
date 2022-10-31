import { IconContext } from "react-icons";
import { MdModeEdit } from "react-icons/md";

export default function EditPost({
  isUser,
  isLoading,
  setPostData,
  setEditMode,
  editMode,
  post,
}) {
  function clickFunction() {
    if (isLoading) {
      return;
    }

    if (!editMode) {
      setEditMode(true);
      return;
    }

    setEditMode(false);
    setPostData(post);
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
