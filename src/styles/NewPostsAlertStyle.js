import styled from "styled-components";

const Teste = styled.div`
    width: 64%;
    height: 61px;
    background-color: #1877F2;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 16px;
    margin-bottom: 17px;
    display: flex;
    justify-content: center;
    align-items: center;

    font-family: "Lato", sans-serif;
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;
    color: #FFFFFF;

    @media (max-width: 900px) {
        width: 100%;
    }
    @media (max-width: 614px) {
        height: 50px;
        width: 80%;    
        margin: 0 auto 17px auto;
    }
`;


export { Teste };