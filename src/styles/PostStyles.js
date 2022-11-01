import styled from "styled-components";

const EditBox = styled.textarea`
  width: 100%;
  border-radius: 5px;
  border: none;
  padding: 5px 13px;
  border: 1px solid #efefef;
  margin: 15px 0px 10px 0px;
  font-size: 15px;
  background-color: #efefef;
  vertical-align: baseline;
  font-family: "Lato", sans-serif;

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

const LoadingContainer = styled.span`
  position: absolute;
  top: 85px;
  right: 23px;
  width: 20px;
  height: 20px;
`;
const Posted = styled.span`
  width: 80%;
  margin-top: 10px;

  p {
    font-size: 12px;
    margin-bottom: 0 !important;
    opacity: 0.3;
  }
`;

const RepostBar = styled.div`
  width: 100%;
  height: 30px;
  display: ${(props) => (!props.load ? "flex" : "none")};
  justify-content: flex-start;
  align-items: center;
  background-color: #1e1e1e;
  border-radius: 16px 16px 0 0;
  padding-left: 20px;
  position: absolute;
  top: -30px;
  right: 0px;

  p {
    font-size: 11px !important;
    font-weight: 400;
    color: white;
    font-family: "Lato", sans-serif;
    margin: 0;
  }
  b {
    font-family: "Lato", sans-serif;
    font-size: 11px !important;
    width: auto;
    margin: 0;
    font-weight: 700;
    color: white;
    cursor: pointer;
  }
  ${(props) => {
    if (!props.repost) {
      return `
      display: none;
      `;
    }
  }}
`;

const CommentBox = styled.textarea`
  width: 100%;
  border-radius: 8px;
  border: none;
  padding: 11px 13px;
  margin: 15px 0px 10px 0px;
  font-size: 14px;
  height: 39px;
  color: #acacac;
  background-color: #252525;
  outline: none;
  resize: none;
  font-family: "Lato", sans-serif;

  ::placeholder {
    font-style: italic;
  }

  :focus {
    color: white;
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

const CommentBoxContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 83px;
  width: 100%;

  .send-button-wrapper {
    position: absolute;
    right: 37px;
    bottom: 30px;
    width: 16px;
    height: 16px;
    display: flex;
    align-items: center;
    justify-content: center;

    ${(props) => {
      let config = "";

      if (props.isLoading === true) {
        config += "cursor: wait";
      }

      if (props.isLoading === false) {
        config += "cursor: pointer";
      }

      return config;
    }}
  }

  .send-button {
    width: 100%;
    height: 100%;
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

const Comments = styled.div`
  position: absolute;
  z-index: 0;
  border-radius: 0px 0px 16px 16px;
  left: 0;
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: #1e1e1e;
  justify-content: space-between;
  padding: 0px 20px;

  ${(props) => {
    let config = "";

    if (props.commentsLength !== undefined) {
      config += `bottom: -${props.commentsLength * 73 + 83}px;`;
      config += `height: ${props.commentsLength * 73 + 83}px;`;
    }

    return config;
  }}

  @media (max-width: 900px) {
    border-radius: 0px;
  }
`;

const UserPicture = styled.img`
  width: 39px !important;
  height: 39px !important;
  border-radius: 50%;
  margin: 5px 10px 5px 5px;
`;

const SectionLine = styled.div`
  height: 0px;
  border: 1px solid #353535;
  width: 100%;
`;

export {
  EditBox,
  LoadingContainer,
  Posted,
  RepostBar,
  Comments,
  CommentBox,
  CommentBoxContainer,
  UserPicture,
  SectionLine,
};
