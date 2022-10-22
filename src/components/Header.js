import styled from "styled-components";
import UserContext from "../contexts/UserContext";
import { useContext, useState } from "react";
import { IoIosArrowDown } from 'react-icons/io';
import { useLocation, Link, useNavigate } from "react-router-dom";
import services from "../services/linkr.js"

export default function Header() {
    const { user, setUser } = useContext(UserContext);
    const path = useLocation().pathname;
    const [menu, setMenu] = useState(true);
    const navigate = useNavigate();
    function logout() {
        services.deleteLogout(user.token).then(async (res) => {
        }).catch((error) => {
            console.error(error);
        });
        localStorage.clear();
        setUser(null)
        return (navigate("/"));
    }
    return (
        <>
            {path !== "/signup" && path !== "/" && (
                <HeaderBar>
                    <Link to={"/timeline"}>
                        <h1>linkr</h1>
                    </Link>
                    <span>
                        <IoIosArrowDown onClick={() => { setMenu(!menu) }} />
                        <HeaderMenu clicked={menu}>
                            <p onClick={() => { logout() }}>Logout</p>
                        </HeaderMenu>
                        <img src={user.picture} alt="ProfilePicture" />
                    </span>
                </HeaderBar>
            )}
        </>
    );
}

const HeaderBar = styled.div`
    width: 100%;
    height: 72px;
    background-color: #151515;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 28px;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 2;
    a{
        text-decoration: none;
    }

    h1 {
        font-family: 'Passion One', cursive;
        font-size: 49px;
        color: #FFFFFF;
        font-weight: 700;
    }

    img {
        width: 53px;
        height: 53px;
        border-radius: 50%;
        object-fit: cover;
    }

    span {
        display: flex;
        align-items: center;
    }

    svg {
        color: #FFFFFF;
        width: 35px;
        height: 35px;
        margin-right: 17px;
        cursor: pointer;
    }

    @media(max-width: 375px) {
        padding: 12px 14px;

        h1 {
            font-size: 49px;
        }
        
        img {
            width: 44px;
            height: 44px;
        }

        svg {
            width: 25px;
            height: 25px;
            margin-right: 12px;
        }
    }
`;

const HeaderMenu = styled.div`
    width: 150px;
    height: ${props => props.clicked ? "0" : "50px"};
    z-index: 1;
    position: absolute;
    right: 0;
    top: 73px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 0px 0px 20px 20px;
    background-color: #171717;
    p{
        display: ${props => props.clicked ? "none" : "initial"};
        color: #ffffff;
        font-family: 'Lato';
        font-weight: 700;
        font-size: 17px;
        line-height: 20px;
        letter-spacing: 0.05em;
    }
    transition: height 0.5s;
`;