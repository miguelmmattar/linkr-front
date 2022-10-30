import { IconContext } from "react-icons";
import { AiOutlineComment } from "react-icons/ai";
import styled from "styled-components";

export default function CommentButton({
  isLoading,
  setCommentMode,
  commentMode,
  comments,
}) {
  function clickFunction() {
    if (isLoading) {
      return;
    }

    if (!commentMode) {
      setCommentMode(true);
      return;
    }

    setCommentMode(false);
  }

  return (
    <>
      <IconContext.Provider
        value={{
          color: "white",
          className: "comment-button",
        }}
      >
        <span onClick={clickFunction} className="comment-button-wrapper">
          <AiOutlineComment />
        </span>
        <CommentCount
          style={{ width: "70px" }}
        >{`${comments.length} comments`}</CommentCount>
      </IconContext.Provider>
    </>
  );
}

const CommentCount = styled.span`
  position: absolute;
  top: 158px;
  left: 11px;
  color: white;
  font-size: 10px;
  display: flex;
  height: 13px;
  width: 90px;
  align-items: center;
  justify-content: center;
  width: 50px;

  @media (max-width: 900px) {
    top: 135px;
    left: 2px;
    font-size: 8px;
  }
`;
