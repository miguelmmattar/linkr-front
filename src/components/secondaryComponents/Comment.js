import styled from "styled-components";
import { useNavigate } from "react-router-dom";

export default function Comment({ isAuthor, isFollower, user, index, text }) {
    const navigate = useNavigate();
  return (
    <UserAccount key={index}>
      <img
        src={user.picture}
        alt="Profile"
        onClick={() => {
          return navigate(`/user/${user.id}`);
        }}
      />
      <p
        onClick={() => {
          return navigate(`/user/${user.id}`);
        }}
      >
        {user.name}
      </p>
      {isFollower ? (
        <Following>• following</Following>
      ) : isAuthor ? (
        <Following>• post's author</Following>
      ) : (
        ""
      )}
    </UserAccount>
  );
}

const UserAccount = styled.div`
  width: 100%;
  height: 50px;
  margin-bottom: 5px;
  display: flex;
  align-items: center;
  img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    cursor: pointer;
  }
  p {
    margin-left: 15px;
    font-family: "Lato", sans-serif;
    font-style: normal;
    font-weight: 400;
    font-size: 19px;
    line-height: 23px;
    color: #515151;
    cursor: pointer;
  }
`;

const Following = styled.h2`
  margin-left: 10px;
  font-family: "Lato", sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 19px;
  line-height: 23px;
  color: #c5c5c5;
`;
