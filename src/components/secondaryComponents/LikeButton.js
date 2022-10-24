import styled from "styled-components";
import UserContext from "../../contexts/UserContext.js";
import { Puff } from "react-loader-spinner";
import { IconContext } from "react-icons";
import { IoHeartSharp, IoHeartOutline } from "react-icons/io5";
import services from "../../services/linkr.js";
import { useContext, useState } from "react";
import ReactTooltip from 'react-tooltip';

export default function LikeButton({ postId, isLiked, likes }) {
  const { user } = useContext(UserContext);
  const CREATED = 201;
  const NO_CONTENT = 204;
  const [liked, setLiked] = useState(isLiked);
  const [likesCount, setLikesCount] = useState(likes.length);
  const [isLoading, setIsLoading] = useState(false);
  const quantityOfLikes = likes.length;
  const TWO_PEOPLE = 2;
  const FIRST_LIKE = 0;
  const SECOND_LIKE = 1;
  const FIRST_NAME = 0;
  const ONE_LIKE = 1;
  const TWO_LIKES = 2;
  let likePlaceholder = null;

  if (quantityOfLikes === ONE_LIKE) {
    likePlaceholder = `${likes[FIRST_LIKE].name.split(" ")[FIRST_NAME]}`;
  }

  if (quantityOfLikes === TWO_LIKES) {
    likePlaceholder = `${likes[FIRST_LIKE].name.split(" ")[FIRST_NAME]} e ${
      likes[SECOND_LIKE].name.split(" ")[FIRST_NAME]
    }`;
  }

  if (quantityOfLikes > TWO_LIKES) {
    likePlaceholder = `${likes[FIRST_LIKE].name.split(" ")[FIRST_NAME]}, ${
      likes[SECOND_LIKE].name.split(" ")[FIRST_NAME]
    } e outras ${quantityOfLikes - TWO_PEOPLE} pessoas`;
  }

  function clickFunction() {
    if (isLoading) {
      return;
    }

    setIsLoading(true);

    services
      .postLike({ token: user.token, postId })
      .then((response) => {
        if (response.status === CREATED) {
          setLiked(true);
          setLikesCount(likesCount + 1);
        }

        if (response.status === NO_CONTENT) {
          setLiked(false);
          setLikesCount(likesCount - 1);
        }
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
  }

  return (
    <IconContext.Provider
      value={{
        color: `${liked ? "#AC0000" : "white"}`,
        className: "likeHeart",
      }}
    >
      <span
        onClick={clickFunction}
        className="likeButton-wrapper"
        data-tip={likes.length !== null ? likePlaceholder : undefined}
      >
        {isLoading ? (
          <Puff
            height="100%"
            width="100%"
            radisu={1}
            color="#fff"
            ariaLabel="puff-loading"
            wrapperStyle={{}}
            wrapperClass="loader"
            visible={true}
          />
        ) : liked ? (
          <IoHeartSharp />
        ) : (
          <IoHeartOutline />
        )}
      </span>
      <LikesCount>{`${likesCount} likes`}</LikesCount>
      <ReactTooltip
        type="light"
        place="bottom"
        textColor="#505050"
        html={true}
      />
    </IconContext.Provider>
  );
}

const LikesCount = styled.span`
  position: absolute;
  top: 110px;
  left: 18px;
  color: white;
  font-size: 11px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
`;
