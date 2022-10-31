import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { SectionLine } from "../../styles/PostStyles";

export default function Comment({ isAuthor, isFollowing, comment, index }) {
  const navigate = useNavigate();
  return (
    <>
      <CommentContainer>
        <UserPicture
          style={{ position: "static" }}
          src={comment.picture}
          alt="Profile"
          onClick={() => {
            return navigate(`/user/${comment.id}`);
          }}
        />

        <CommentContent>
          <Username
            onClick={() => {
              return navigate(`/user/${comment.id}`);
            }}
          >
            {comment.name}
            {isAuthor ? (
              <Following>• post's author</Following>
            ) : isFollowing ? (
              <Following>• following</Following>
            ) : (
              ""
            )}
          </Username>

          <Content>{comment.comment}</Content>
        </CommentContent>
      </CommentContainer>
      <SectionLine />
    </>
  );
}

const Username = styled.span`
  font-family: "Lato", sans-serif;
  font-weight: 700;
  font-size: 14px;
  color: #f3f3f3;
  cursor: pointer;
`;

const Following = styled.span`
  margin-left: 3px;
  font-family: "Lato", sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  color: #c5c5c5;
`;

const CommentContainer = styled.div`
  height: 74px;
  width: 100%;
  padding: 13px 0px 16px 0px;
  display: flex;
`;

const CommentContent = styled.div`
  display: flex;
  flex-direction: column;
`;

const Content = styled.span`
  font-size: 14px;
  color: #acacac;
  line-height: 17px;
  margin-top: 3px;
  overflow-y: scroll;
`;

const UserPicture = styled.img`
  width: 39px !important;
  height: 39px !important;
  border-radius: 50%;
  margin: 0px 18px 0px 5px;
`;
