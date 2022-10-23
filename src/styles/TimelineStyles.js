import styled from "styled-components";

const Posts = styled.div`
  width: 40%;
  min-width: 600px;
  margin-top: 150px;
  margin-bottom: 40px;

  h2,
  h3,
  h4,
  h5,
  h6 {
    font-family: "Lato", sans-serif;
    font-weight: 400;
  }

  h1 {
    font-family: "Oswald", sans-serif;
    color: #ffffff;
    font-size: 43px;
    font-weight: 700;
    width: 100%;
    text-align: left;
    line-height: 40px;
    margin-bottom: 43px;
  }

  h2 {
    color: #949494;
    font-size: 20px;
    margin-bottom: 16px;
    font-weight: 300;
  }

  h3,
  h4,
  h5,
  p,
  a {
    color: #ffffff;
    max-width: calc(100% - 170px);
  }

  h3 {
    font-size: 19px !important;
  }

  h4 {
    margin: 12px 0;
    font-size: 17px;
    line-height: 20px;
  }

  h5 {
    font-size: 16px;
    line-height: 20px;
  }

  h6 {
    color: #949494;
    font-size: 24px;
    display: ${(props) => (!props.load ? "center" : "none")};
    text-align: center;
    margin-top: 50px;
  }

  p {
    margin: 5px 0 10px 0;
    line-height: 14px;
  }

  a {
    text-decoration: none;
  }

  .post-wrapper {
    width: 100%;
    min-height: 209px;
    display: flex;
    padding: 18px 18px 18px 86px;
    background-color: #171717;
    border-radius: 16px;
    margin-bottom: 16px;
    position: relative;
    flex-direction: column;
  }
  
  .new-post {
    background-color: #ffffff !important;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    margin-bottom: 30px;
  }

  img {
    border-radius: 50%;
    width: 50px;
    height: 50px;
    position: absolute;
    left: 18px;
    top: 18px;
    object-fit: cover;
  }

  .snippet {
    max-width: 100%;
    text-decoration: none;
  }

  .likeButton-wrapper {
    position: absolute;
    left: 33px;
    cursor: pointer;
    top: 86px;
    width: 20px;
    height: 19px;
    display: flex;
    align-items: center;
    justify-content: center;

    ${(props) => {
      let config = "";

      return config;
    }}
  }

  .likeHeart{
    width: 100%;
    height: 100%;
  }

  @media (max-width: 614px) {
    width: 100%;
    min-width: 0;
    margin: 90px 0 20px 0;

    h3,
    h4,
    h5,
    p,
    a {
      max-width: calc(100% - 105px);
    }

    h1 {
      font-size: 33px;
      margin-bottom: 20px;
      margin-left: 17px;
      width: calc(100% - 17px);
    }

    h2 {
      font-size: 17px;
      margin-bottom: 12px;
    }

    h3 {
      font-size: 17px;
    }

    h4 {
      font-size: 15px;
      margin: 7px 0 13px 0;
    }

    h5 {
      font-size: 11px;
    }

    p,
    a {
      font-size: 9px;
    }

    p {
      margin: 4px 0;
    }

    div {
      min-height: 164px;
      border-radius: 0;
      padding: 10px 18px 15px 69px;
      display: ${(props) => (!props.load ? "center" : "none")};
    }

    .new-post {
      padding: 15px;
      margin-bottom: 16px;
      display: flex;

      img {
        display: none;
      }
    }

    img {
      width: 40px;
      height: 40px;
      left: 15px;
      top: 9px;
    }
  }
`;

const Form = styled.form`
  width: 100%;
  margin-bottom: 35px;

  input,
  textarea {
    width: 100%;
    border-radius: 5px;
    border: none;
    padding: 5px 13px;
    border: 1px solid #efefef;
    height: 30px;
    margin-bottom: 5px;
    font-size: 15px;
    background-color: #efefef;
    vertical-align: baseline;
    font-family: "Lato", sans-serif;
  }

  textarea {
    min-height: 66px;
    height: auto;
    resize: vertical;
    overflow: auto;
  }

  input[type="submit"] {
    height: 31px;
    width: 112px;
    background-color: #1877f2;
    position: absolute;
    right: 22px;
    bottom: 16px;
    color: #ffffff;
    cursor: pointer;
    opacity: ${(props) => (!props.disabled ? "1" : "0.3")};
  }

  input::placeholder,
  textarea::placeholder {
    color: #949494;
    font-size: 15px;
    font-weight: 300;
  }

  @media (max-width: 614px) {
    margin-bottom: 28px;

    textarea {
      min-height: 47px;
    }

    input::placeholder,
    textarea::placeholder {
      font-size: 13px;
    }

    input[type="submit"] {
      right: 15px;
      bottom: 12px;
    }
  }
`;

const SnippetBox = styled.div`
  width: 100%;
  min-height: 155px !important;
  border-radius: 11px;
  border: 1px solid #4d4d4d;
  padding: 24px 0 24px 20px !important;

  p {
    font-size: 11px;
  }

  p:last-child {
    cursor: pointer;
    overflow: hidden;
    text-overflow: ellipsis !important;
    white-space: nowrap;
  }

  img {
    height: 100%;
    width: 150px;
    position: absolute;
    left: calc(100% - 150px);
    top: 0;
    border-radius: 0 11px 11px 0 !important;
  }

  @media (max-width: 614px) {
    border-radius: 11px !important;
    min-height: 115px !important;
    padding: 7px 0 8px 11px;
    margin: 0 !important;

    img {
      height: 100%;
      width: 95px;
      left: calc(100% - 95px);
    }
  }
`;

const Load = styled.span`
  width: 100%;
  height: auto;
  display: ${(props) => (props.load ? "flex" : "none")};
  flex-direction: column;
  align-items: center;
  margin-top: 40px;

  img {
    position: static;
    margin-bottom: 20px;
    width: 20%;
    height: auto;
  }

  h2 {
    color: #ffffff;
  }
`;

export { Posts, Form, SnippetBox, Load };
