import { Posts, Load } from "../styles/TimelineStyles.js";
import Post from "./secondaryCmponents/Post.js";
import UserContext from "../contexts/UserContext";
import { useContext, useState, useEffect } from "react";
import services from "../services/linkr.js";
import { useParams } from "react-router-dom";
import styled from "styled-components";

export default function UserPage() {
    const { user } = useContext(UserContext);
    const { id } = useParams();
    const [posts, setPosts] = useState([]);
    const [load, setLoad] = useState(false);
    const [profile, setProfile] = useState({});

    console.log(user.picture)

    function loadPosts() {
        const promise = services.getUserPosts(user.token, id);

        setLoad(true);

        promise.then(answer => {
            setPosts(answer.data);
            setProfile(answer.data[0].user);
            setLoad(false);
        });

        promise.catch(answer => alert("An error occured while trying to fetch the posts, please refresh the page"));
    }

    useEffect(() => {
        loadPosts();
    }, []);

    return (
        <Posts load={load}>
            <UserInfo>
                <img src={profile.picture} alt="Profile" />
                <h1>{`${profile.name}’s posts`}</h1>
            </UserInfo>

            {posts.length === 0 ? (
                <h6>There are no posts yet . . .</h6>
            ) : (
                posts.map((post, index) => (
                <Post
                    key={index}
                    user={user}
                    post={post}
                    loadPosts={loadPosts}
                />
                ))
            )}

            <Load load={load}>
                <img src="https://i.gifer.com/ZZ5H.gif" alt="loading" />
                <h2>Loading</h2>
            </Load>
        </Posts>
    );
}

const UserInfo = styled.span`
    display: flex;
    align-items: center;
    padding: 0 18px;
    margin-bottom: 48px;


    img {
        position: initial;
        margin-right: 18px;
    }

    h1{
        margin: 0;
    }
`;