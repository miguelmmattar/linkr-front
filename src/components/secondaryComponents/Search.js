import styled from "styled-components"
import { useContext } from "react";
import { DebounceInput } from 'react-debounce-input';
import UserContext from "../../contexts/UserContext.js";
import { HiMagnifyingGlass } from 'react-icons/hi2';
import services from "../../services/linkr.js";
import { useNavigate } from "react-router-dom";

function Search({ search, setSearch, setMenu }) {
    const { user } = useContext(UserContext);
    const navigate = useNavigate();
    const token = user?.token
    let searchString = "";

    function searchUser(searchString) {
        if (searchString.length > 0) {
            services.getSearch({ token, searchString }).then(async (res) => {
                setSearch(res.data);
            }).catch((error) => {
                console.error(error);
            });
        }
    }

    function handleForm(e) {
        searchString = e.target.value.replace(/^\s+|\s+$/gm, '');

        if (searchString.length === 0) {
            setSearch(null);
        } else if (searchString.length > 2) {
            searchUser(searchString);
        }
    }

    return (
        <>
            <SearcherForm >
                <DebounceInput 
                    minLength={1}
                    debounceTimeout={300}
                    type="text"
                    name="searcher"
                    placeholder="Search for people and friends"
                    onChange={handleForm} 
                    onClick={() => {setMenu(true)}}/>
                <HiMagnifyingGlass onClick={() => { searchUser(searchString) }} />
            </SearcherForm>
            <UserList hasItens={search}>
                {(search) ? (
                    search.map((account, index) => {
                        return (
                            <UserAccount key={index}>
                                <img src={account.url} alt="Profile" onClick={() => {
                                    setSearch(null);
                                    return navigate(`/user/${account.id}`)
                                }} />
                                <p onClick={() => {
                                    setSearch(null);
                                    return navigate(`/user/${account.id}`)
                                }}
                                >{account.name}</p>
                            </UserAccount>
                        )
                    })) : ("")}
            </UserList>
            <InvisibleDiv clicked={!search} onClick={()=> {setSearch(null)}}></InvisibleDiv>
        </>
    )
}

const SearcherForm = styled.form`
    width: calc(100% - 17px);
    height: 45px;
    left: 10px;
    top: 82px;
    background: #FFFFFF;
    border-radius: 8px;
    z-index: 3;
    position: absolute;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px; 
    
    input {
        width: 100%;
        border-radius: 5px;
        border: none;
        padding: 5px;
        height: 30px;
        margin-bottom: 5px;
        font-size: 17px;
        color: #C6C6C6;
        background-color: #FFFFFF;
        vertical-align: baseline;
        font-family: "Lato", sans-serif;
        outline:none;
        overflow:hidden;
        resize: none;
    }
    input:focus{
        color: #5c5656;
    }

    @media (min-width: 614px) {
        width: calc(100% - 300px);
        max-width: 563px;
        position: fixed;
        top: 15px;
        left: 50%;
        transform: translate(-50%, 0);
        z-index:4;
    }
`;

const UserList = styled.div`
    display: ${props => (props.hasItens?.length > 0) ? "initial" : "none"};
    width: calc(100% - 17px);
    height: auto;
    max-height: 180px;
    z-index: 2;
    position: absolute;
    left: 10px;
    top: 87px;
    padding-top: 45px;
    padding-left: 17px;
    border-radius: 5px;
    background-color: #E7E7E7;
    overflow: scroll;
    @media (min-width: 614px) {
        width: calc(100% - 300px);
        max-width: 563px;
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translate(-50%, 0);
        z-index:3;
    }
`;

const UserAccount = styled.div`
    width: 100%;
    height: 50px;
    margin-bottom: 5px;
    display: flex;
    align-items: center;
    img{
        width: 40px;
        height: 40px;
        border-radius: 50%;
    }
    p{
        margin-left: 15px;
        font-family: "Lato", sans-serif;
        font-style: normal;
        font-weight: 400;
        font-size: 19px;
        line-height: 23px;
        color: #515151;
    }
`;

const InvisibleDiv = styled.div`
    width: 100%;
    height:100vh;
    position: fixed;
    z-index: 1;
    display: ${props => props.clicked ? "none" : "initial"};
`;

export default Search;