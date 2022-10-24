import { useNavigate, Link } from "react-router-dom";
import UserContext from "../contexts/UserContext";
import { useContext, useState, useEffect } from "react";
import { ThreeDots } from 'react-loader-spinner';
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

function SignUp() {
    const [isDisable, setIsDisable] = useState(false);
    const { user } = useContext(UserContext);

    const load = (isDisable ? <ThreeDots
        height="80"
        width="80"
        radius="9"
        color="#FFFFFF"
        ariaLabel="three-dots-loading"
        wrapperStyle={{}}
        wrapperClassName=""
        visible={true} />
        : "Sign Up");
    const navigate = useNavigate();

    useEffect(() => {
        if(user) {
            return (navigate("/timeline"));
          }
      }, []);

    function handleForm(e) {
        e.preventDefault();
        setIsDisable(true);
        const body = {
            email: e.target[0].value,
            password: e.target[1].value,
            name: e.target[2].value,
            userPicture: e.target[3].value
        };

        services.postSignup(body).then(async (res) => {
            return (navigate("/"));
        }).catch((error) => {
            console.error(error);
            if (error.response.status === 422) {
                alert(`Please verify the insert data, ${error.response.data}`);
            } else if (error.response.status === 409) {
                alert(`This e-mail is already registered`);
            }
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
                    <input type="text"
                        name="username"
                        placeholder="username"
                        disabled={isDisable}
                        required />
                    <input type="text"
                        name="url"
                        placeholder="picture url"
                        disabled={isDisable}
                        required />
                    <Loginbutton disabled={isDisable} bluur={isDisable}>{load}</Loginbutton>
                    <Link to={`/`} >
                        <New>Switch back to log in</New>
                    </Link>
                </Loginform>
            </LoginContainer>
        </Wrapper>
    );
}

export default SignUp;