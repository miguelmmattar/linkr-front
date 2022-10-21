import services from "../services/linkr.js"
import { useState } from "react";
import { ThreeDots } from 'react-loader-spinner';
import { useContext } from "react";
import UserContext from "../contexts/UserContext.js";
import { useNavigate, Link } from "react-router-dom";
import styled from "styled-components";

function SignIn() {
    // eslint-disable-next-line no-unused-vars
    const { setUser } = useContext(UserContext);
    const [isDisable, setIsDisable] = useState(false);
    const load = (isDisable ? <ThreeDots
        height="80"
        width="80"
        radius="9"
        color="#FFFFFF"
        ariaLabel="three-dots-loading"
        wrapperStyle={{}}
        wrapperClassName=""
        visible={true} />
        : "Entrar");
    const navigate = useNavigate();

    function handleForm(e) {
        e.preventDefault();
        setIsDisable(true);
        const body = {
            email: e.target[0].value,
            password: e.target[1].value
        };
        services.sendLogin(body).then(async (res) => {
            console.log(res.data.name)
            await localStorage.setItem("profile",
                JSON.stringify({ token: res.data.token, name: res.data.name, picture: res.data.userPicture, id: res.data.userId })
            );
            setUser(JSON.parse(localStorage.getItem("profile")));
            return (navigate("/timeline"));

        }).catch((error) => {
            console.error(error);
            alert(`Please verify the insert data`);
            setIsDisable(false);
        });
    }


    return (

        <Wrapper>
            <TopContainer>
                <Title>linkr</Title>
                <Branding>save, share and discover <br></br> the best links on the web</Branding>
            </TopContainer>
            <LoginContainer>
                <Loginform onSubmit={handleForm}>
                    <input type="email"
                        name="email"
                        placeholder="email"
                        disabled={isDisable}
                        required />
                    <input type="password"
                        name="password"
                        placeholder="password"
                        disabled={isDisable}
                        required />
                    <Loginbutton disabled={isDisable} bluur={isDisable}>{load}</Loginbutton>
                    <Link to={`/signup`} >
                        <New>First time? Create an account!</New>
                    </Link>
                </Loginform>
            </LoginContainer>
        </Wrapper>

    );
}

const Wrapper = styled.div`
    height: 100vh;
    width: 100vw;
    height: 100vh;
    z-index: 5;
`
const TopContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 26%;
    width: 100%;
    background-color: #151515;
`
const Title = styled.div`
    font-family: 'Passion One', cursive;    
    font-weight: 700;
    font-size: 76px;
    line-height: 84px;
    letter-spacing: 0.05em;
    color: #FFFFFF;
`;
const Branding = styled.div`
    font-family: 'Oswald', sans-serif;
    font-weight: 700;
    font-size: 23px;
    color: #FFFFFF;
`;
const LoginContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    height: 74%;
    width: 100%;
    margin-top: 8%;
    background-color: #333333;
`
const New = styled.p`
    a{
        text-decoration: none;
    }
    font-family: 'Lato';
    font-style: normal;
    font-weight: 400;
    font-size: 17px;
    line-height: 25px;
    text-decoration-line: underline;
    color: #FFFFFF;
    
`
const Loginform = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    input{
        width: 303px;
        height: 45px;
        margin-bottom: 6px;
        border: solid 1px #D5D5D5;
        font-weight: 400;
        font-size: 20px;
        font-family: 'Raleway', sans-serif;
        padding: 15px;
        border-radius: 6px;
        margin-bottom: 15px;
        ::placeholder {
        color: #9F9F9F;;
        }
    }
`
const Loginbutton = styled.button`
    height: 45px;
    width: 300px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #1877F2;;
    border: none;
    border-radius: 6px;
    font-size: 21px;
    font-family: 'Raleway', sans-serif;
    color: #FFFFFF;
    margin-bottom: 25px;
    opacity: ${props => props.bluur ? 0.5 : 1};
`

export default SignIn;