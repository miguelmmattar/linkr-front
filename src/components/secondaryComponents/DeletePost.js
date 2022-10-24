import styled from "styled-components";
import UserContext from "../../contexts/UserContext.js";
import { Puff, ThreeDots } from "react-loader-spinner";
import { IconContext } from "react-icons";
import { FaTrash } from "react-icons/fa";
import services from "../../services/linkr.js";
import { useContext, useState } from "react";
import ReactModal from "react-modal";

ReactModal.defaultStyles.overlay.backgroundColor = "rgba(255, 255, 255, 0.75)";
ReactModal.defaultStyles.content.backgroundColor = "rgba(255, 255, 255, 0.05)";

export default function DeletePost({ postId, isUser, loadPosts }) {
  const { user } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
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
        setShowModal(false);
      })
      .catch(() => {
        setIsLoading(false);
        setShowModal(false);
        alert("Failed to delete");
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
      <IconContext.Provider
        value={{
          color: "white",
          className: "delete-button",
        }}
      >
        <span onClick={clickFunction} className="delete-button-wrapper">
          {isUser ? <FaTrash /> : ""}
        </span>
      </IconContext.Provider>
      <ReactModal
        isOpen={showModal}
        ariaHideApp={false}
        preventScroll={true}
        style={{ overlay: overlayStyle, content: contentStyle }}
      >
        <PopUp isLoading={isLoading}>
          <Text>Are you sure you want to delete this post?</Text>
          <ButtonContainer>
            <Button type="no" onClick={closeModal} isLoading={isLoading}>
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
                "No, go back"
              )}
            </Button>
            <Button type="yes" onClick={deletePost} isLoading={isLoading}>
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
                "Yes, delete it"
              )}
            </Button>
          </ButtonContainer>
        </PopUp>
      </ReactModal>
    </>
  );
}

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
