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
  width: 100%;
  margin-top: 10px;

  p {
    font-size: 12px;
    margin-bottom: 0 !important;
    opacity: 0.3;
  }
`;

export { EditBox, LoadingContainer, Posted };
