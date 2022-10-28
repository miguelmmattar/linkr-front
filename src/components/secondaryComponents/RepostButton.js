import styled from "styled-components";
import UserContext from "../../contexts/UserContext.js";
import { ThreeDots } from "react-loader-spinner";
import services from "../../services/linkr.js";
import { IconContext } from "react-icons";
import { IoMdRepeat } from "react-icons/io";
import { useContext, useState } from "react";
import ReactModal from "react-modal";

export default function RepostButton({ postId, isUser, loadPosts, userId }) {
  const { user } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  console.log(postId);
  const body = {
    userId,
    postId,
  };
  const overlayStyle = {
    zIndex: 6,
  };
  const contentStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "0px",
    padding: "0px",
  };

  function clickFunction() {
    if (isLoading) {
      return;
    }

    setShowModal(true);
  }

  function setRepost() {
    if (isLoading) {
      return;
    }

    setIsLoading(true);
    services
      .postRepost(user.token, body)
      .then((response) => {
        setIsLoading(false);
        loadPosts();
        setShowModal(false);
      })
      .catch(() => {
        setIsLoading(false);
        setShowModal(false);
        alert("Failed to re-post");
      });
  }

  function closeModal() {
    if (isLoading) {
      return;
    }

    setShowModal(false);
  }

  return (
    <>
      <RepostsCount>
        <IconContext.Provider
          value={{ color: "white", className: "repost-button" }}
        >
          <IoMdRepeat onClick={clickFunction} />1 re-posts
        </IconContext.Provider>
      </RepostsCount>
      <ReactModal
        isOpen={showModal}
        ariaHideApp={false}
        preventScroll={true}
        style={{ overlay: overlayStyle, content: contentStyle }}
      >
        <PopUp isLoading={isLoading}>
          <Text>Do you want to re-post this link?</Text>
          <ButtonContainer>
            <Button
              type="no"
              onClick={closeModal}
              isLoading={isLoading}
              disabled={isLoading}
            >
              {isLoading ? (
                <ThreeDots
                  height="13"
                  width="51"
                  radius="9"
                  color="#ffffff"
                  ariaLabel="three-dots-loading"
                  wrapperStyle={{}}
                  wrapperClassName=""
                  visible={true}
                />
              ) : (
                "No, cancel"
              )}
            </Button>
            <Button
              type="yes"
              onClick={setRepost}
              isLoading={isLoading}
              disabled={isLoading}
            >
              {isLoading ? (
                <ThreeDots
                  height="13"
                  width="51"
                  radius="9"
                  color="#1877F2"
                  ariaLabel="three-dots-loading"
                  wrapperStyle={{}}
                  wrapperClassName=""
                  visible={true}
                />
              ) : (
                "Yes, share!"
              )}
            </Button>
          </ButtonContainer>
        </PopUp>
      </ReactModal>
    </>
  );
}

const RepostsCount = styled.div`
  font-family: "Lato", sans-serif;
  font-weight: 400;
  width: 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  font-size: 11px;
  top: 135px;
  left: 18px;
  color: white;

  @media (max-width: 900px) {
    top: 130px;
    left: 14px;
  }
`;
const PopUp = styled.div`
  width: 600px;
  height: 262px;
  background-color: #333333;
  border-radius: 50px;
  font-family: "Lato", sans-serif;
  padding: 40px 130px;
  text-align: center;

  @media (max-width: 900px) {
    width: 300px;
    border-radius: 30px;
    padding: 30px 5px 60px 5px;
    height: 300px;
  }

  ${(props) => {
    let config = "";

    if (props.isLoading === true) {
      config += "cursor: wait";
    }

    if (props.isLoading === false) {
      config += "cursor: auto";
    }

    return config;
  }}
`;

const Text = styled.span`
  color: white;
  font-size: 34px;
  font-weight: 700;

  @media (max-width: 900px) {
    font-size: 25px;
    width: 100%;
  }
`;

const Button = styled.span`
  min-width: 134px;
  min-height: 37px;
  border-radius: 5px;
  font-size: 18px;
  font-weight: 700;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  ${(props) => {
    let config = "";

    if (props.type === "yes") {
      config += "background-color: #1877F2; color: white";
    }

    if (props.type === "no") {
      config += "background-color: white; color: #1877F2";
    }

    if (props.isLoading === true) {
      config += "cursor: wait";
    }

    if (props.isLoading === false) {
      config += "cursor: auto";
    }

    return config;
  }}

  @media (max-width: 900px) {
    max-width: 134px;
    max-height: 30px;
    font-size: 15px;
  }
`;
const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0px 20px;
  margin-top: 39px;

  @media (max-width: 900px) {
    padding: 0px 0px;
    height: 70%;
    padding: 10px;
    max-height: 210px;
    flex-direction: column;
    justify-content: space-around;
  }
`;
