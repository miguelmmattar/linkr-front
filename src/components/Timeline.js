import styled from "styled-components";
import UserContext from "../contexts/UserContext";
import { useContext, useState, useEffect } from "react";
import services from "../services/linkr.js"
import { matchRoutes } from "react-router-dom";

export default function Timeline() {
    //const { user } = useContext(UserContext);
    const [posts, setPosts] = useState([]);

    const user = {
        name: "Jake Sully",
        picture: "https://ingresso-a.akamaihd.net/b2b/production/uploads/article/image/520/trailer-avatar-2-capa-2.jpg",
        token: "sdjhbn9fdeufbefjc238484gu23rdnewd"
    }
    
    function loadPosts() {
        const promise = services.getPosts(user.token);
        console.log(promise)
        promise.then(answer => setPosts(answer.data));
        promise.catch(answer => alert(answer.response.data));
    }

    useEffect(() => {
        loadPosts();
    }, []);

    return (
        <Posts>
            <h1>timeline</h1>
            <NewPost user={user} loadPosts={loadPosts} />
            {posts.length === 0 ? (
                <h6>There are no posts yet . . .</h6>
            ) : (
                posts.map((post, index) => (
                <Post
                    key={index}
                    user={post.user}
                    post={post}
                />
                ))
            )}
        </Posts>
    );
}

function NewPost({ user,  loadPosts }) {
    const [form, setForm] = useState({
        url: "",
        description: ""
    });

    console.log(user)

    function handleForm({ name, value }) {
        setForm({ ...form, [name]: value });
    }

    function handleSubmit(e) {
        e.preventDefault();
    
        const promise = services.postUrl(user.token, form);
    
        promise.then((answer) => {
          loadPosts();
        });
    
        promise.catch((answer) => {
          alert(answer.response.data);
        });
      }

    return (
        <div>
            <img src={user.picture} alt="Profile picture" />
            <h2>What are you going to share today?</h2>
            <Form onSubmit={handleSubmit}>
                <input
                    type="url"
                    placeholder="Insert a URL..."
                    name="url"
                    required
                    value={form.url}
                    onChange={(e) =>
                        handleForm({
                          name: e.target.name,
                          value: e.target.value,
                        })
                    }
                />

                <textarea
                    type="text"
                    placeholder="Write a description..."
                    name="description"
                    value={form.description}
                    onChange={(e) =>
                        handleForm({
                          name: e.target.name,
                          value: e.target.value,
                        })
                    }
                />

                <input type="submit" value="Publish" />
            </Form>
        </div>
    );
}

function Post({ user, post }) {

    return (
        <div>
            <img src={user.picture} alt="Profile picture" />
            <h3>{user.name}</h3>
            <h4>{post.description}</h4>
            <Snippet url={post.url} />
        </div>
    );
}

function Snippet({ url }) {
    return (
        <SnippetBox>
            <img src="https://coodesh.com/blog/wp-content/uploads/2021/09/REACT.JS-scaled.jpg" alt="Featured image" ></img>
            <h5>Title</h5>
            <p>Description</p>
            <a hrf="linkvalido" target="_blank">link</a>
        </SnippetBox>
    );
}

const Posts = styled.div`
    width: 40%;
    min-width: 600px;
    height: 100vh;
    margin-top: 150px;
    margin-bottom: 40px;

    h2, h3, h4, h5, h6 {
        font-family: 'Lato', sans-serif;
        font-weight: 400;
    }

    h1 {
        font-family: 'Oswald', sans-serif;
        color: #FFFFFF;
        font-size: 43px;
        font-weight: 700;
        width: 100%;
        text-align: left;
        line-height: 65px;
        margin-bottom: 43px;
    }

    h2 {
        color: #949494;
        font-size: 20px;
        margin-bottom: 16px;
        font-weight: 300;
    }

    h3, h4, h5, p, a {
        color: #FFFFFF;
    }

    h3 {
        font-size: 19px;
    }

    h4 {
        margin: 12px 0;
        font-size: 17px;
    }

    h5 {
        font-size: 16px;
    }

    h6 {
        color: #949494;
        font-size: 24px;
        text-align: center;
        margin-top: 50px;
    }

    p {
        margin: 5px 0 10px 0;
    }

    a, p {
        font-size: 11px;
    }

    a {
        cursor: pointer;
    }

    div {
        width: 100%;
        min-height: 209px;
        display: flex;
        padding: 18px 18px 18px 86px;
        background-color: #171717;
        border-radius: 16px;
        margin-bottom: 16px;
        position: relative;
        flex-direction: column;
    }

    div:nth-child(2) {
        background-color: #FFFFFF !important;
        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
        margin-bottom: 30px;
    }

    img {
        border-radius: 50%;
        width: 50px;
        height: 50px;
        position: absolute;
        left: 18px;
        top: 18px;
        object-fit: cover;
    }

    @media(max-width: 375px) {
        width: 100%;
        min-width: 0;
        margin: 90px 0 20px 0;

        h1 {
            font-size: 33px;
            margin-bottom: 20px;
            margin-left: 17px;
            width: calc(100% - 17px);
        }

        h2 {
            font-size: 17px;
            margin-bottom: 12px;
        }

        h3 {
            font-size: 17px;
        }

        h4 {
            font-size: 15px;
            margin: 7px 0 13px 0;;
        }

        h5 {
            font-size: 11px;
        }

        p, a {
            font-size: 9px;
        }

        p {
            margin: 4px 0;
        }

        div {
            min-height: 164px;
            border-radius: 0;
            padding: 10px 18px 15px 69px;
        }

        div:nth-child(2) {
            padding: 15px;
            margin-bottom: 16px;
            
            img {
                display: none;
            }
        }

        img {
            width: 40px;
            height: 40px;
            left: 15px;
            top: 9px
        }
    }
`;

const Form = styled.form`
    width: 100%;
    margin-bottom: 35px;

    input, textarea {
        width: 100%;
        border-radius: 5px;
        border: none;
        padding: 5px 13px;
        border: 1px solid #EFEFEF;
        height: 30px;
        margin-bottom: 5px;
        font-size: 15px;
        background-color: #EFEFEF;
        vertical-align: baseline;
        font-family: 'Lato', sans-serif;;
    }

    textarea {
        min-height: 66px;
        height: auto;
        resize: vertical;
        overflow: auto;
    }

    input[type='submit'] {
        height: 31px;
        width: 112px;
        background-color: #1877F2;
        position: absolute;
        right: 22px;
        bottom: 16px;
        color: #FFFFFF;
        cursor: pointer;
    }

    input::placeholder,
    textarea::placeholder {
        color: #949494;
        font-size: 15px;
        font-weight: 300;
    }

    @media(max-width: 375px) {
        margin-bottom: 28px;

        textarea {
            min-height: 47px;
        }

        input::placeholder,
        textarea::placeholder {
            font-size: 13px;
        }

        input[type='submit'] {
            right: 15px;
            bottom: 12px;
        }
    }
`;

const SnippetBox = styled.div`
    width: 100%;
    min-height: 155px !important;
    border-radius: 11px;
    border: 1px solid #4D4D4D;
    padding: 24px 0 24px 20px !important;

    img {
        height: 100%;
        width: 150px;
        position: absolute;
        left: calc(100% - 150px);
        top: 0;
        border-radius: 0 16px 16px 0 !important;
    }

    @media(max-width: 375px) {
        border-radius: 11px !important;
        min-height: 115px !important;
        padding: 7px 0 8px 11px;
        margin: 0 !important;

        img {
            height: 100%;
            width: 95px;
            left: calc(100% - 95px);
        }
    }
`;