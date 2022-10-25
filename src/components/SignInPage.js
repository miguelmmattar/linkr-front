import { ThreeDots } from 'react-loader-spinner';
import UserContext from "../contexts/UserContext";
import { useContext, useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import services from "../services/linkr.js"
import {
    Wrapper,
    TopContainer,
    Title,
    Branding,
    LoginContainer,
    New,
    Loginform,
    Loginbutton
} from "../styles/AuthenticationStyle.js";

function SignIn() {
    const { user, setUser } = useContext(UserContext);
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
        : "Log In");
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            return (navigate("/timeline"));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    function handleForm(e) {
        e.preventDefault();
        setIsDisable(true);
        const body = {
            email: e.target[0].value,
            password: e.target[1].value
        };
        services.postLogin(body).then(async (res) => {
            await localStorage.setItem("profile",
                JSON.stringify({ token: res.data.token, name: res.data.name, picture: res.data.userPicture, id: res.data.userId })
            );
            setUser(JSON.parse(localStorage.getItem("profile")));
            return (navigate("/timeline"));

        }).catch((error) => {
            console.error(error);
            alert(`Incorrect email or password, please verify the insertet data`);
            setIsDisable(false);
        });
    }

    return (

        <Wrapper>
            <TopContainer>
                <div>
                    <Title>linkr</Title>
                    <Branding>save, share and discover <br></br> the best links on the web</Branding>
                </div>
            </TopContainer>
            <LoginContainer>
                <Loginform onSubmit={handleForm}>
                    <input type="email"
                        name="email"
                        placeholder="e-mail"
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

export default SignIn;