import styled from "styled-components";
import UserContext from "../contexts/UserContext";
import { useContext, useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import { useLocation, useNavigate } from "react-router-dom";
import services from "../services/linkr.js"
import Search from "../components/secondaryCmponents/Search.js";


export default function Header() {
    const { user, setUser } = useContext(UserContext);
    const path = useLocation().pathname;
    const [search, setSearch] = useState(null)
    const [menu, setMenu] = useState(true);
    const navigate = useNavigate();
    function logout() {
        services.deleteLogout(user.token).then(async (res) => {
        }).catch((error) => {
            console.error(error);
        });
        localStorage.clear();
        setUser(null);
        setMenu(!menu);
        return (navigate("/"));
    }

    return (
        <>
            <InvisibleDiv clicked={menu} onClick={() => { setMenu(!menu) }}></InvisibleDiv>
            <HeaderMenu clicked={menu}>
                <p onClick={() => { logout() }}>Logout</p>
            </HeaderMenu>
            {path !== "/signup" && path !== "/" && (
                <HeaderBar>
                        <h1 onClick={()=>{
                            setSearch(null)
                            return (navigate("/timeline"));
                        }}>linkr</h1>
                    <span>
                        {menu ? (
                            <IoIosArrowDown onClick={() => { 
                                setSearch(null) 
                                setMenu(!menu) }} />
                        ) : (
                            <IoIosArrowUp onClick={() => { 
                                setSearch(null) 
                                setMenu(!menu) }} />
                        )}
                        <img src={user?.picture} alt="ProfilePicture" onClick={() => { 
                            setSearch(null) 
                            setMenu(!menu) }} />
                    </span>
                </HeaderBar>
            )}
            <Search 
                search={search} 
                setSearch={setSearch} 
                setMenu={setMenu}/>
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
    z-index: 3;
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
    z-index: 5;
    position: fixed;
    right: 0;
    top: 72px;
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
const InvisibleDiv = styled.div`
    width: 100%;
    height:100vh;
    position: fixed;
    z-index: 3;
    display: ${props => props.clicked ? "none" : "initial"};
`;