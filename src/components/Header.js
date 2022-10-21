import styled from "styled-components";
import UserContext from "../contexts/UserContext";
import { useContext } from "react";
import { IoIosArrowDown } from 'react-icons/io';
import { useLocation } from "react-router-dom";

export default function Header() {
    const { user } = useContext(UserContext);
    const path = useLocation().pathname;
    
    return (
        <>
            {path !== "/signup "&& path !== "/" && (
                <HeaderBar>
                    <h1>linkr</h1>
                    <span>
                        <IoIosArrowDown />
                        <img src={user.picture} alt="Profile picture" />
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
    z-index: 1;

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