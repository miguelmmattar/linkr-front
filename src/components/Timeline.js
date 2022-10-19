import styled from "styled-components";
import UserContext from "../contexts/UserContext";
import { useContext, useState } from "react";
import urlMetadata from "url-metadata";
import services from "../services/linkr.js"

export default function Timeline() {
    const { user } = useContext(UserContext);

urlMetadata("http://bit.ly/2ePIrDy").then(
  function (metadata) { 
    console.log(metadata)
  },
  function (error) { 
    console.log(error)
  });


    return (
        <Posts>
            <h1>timeline</h1>
            <NewPost user />
            <div></div>
        </Posts>
    );
}

function NewPost({ user }) {
    const [form, setForm] = useState({
        url: "",
        description: ""
    });

    function handleForm({ name, value }) {
        setForm({ ...form, [name]: value });
    }

    function handleSubmit(e) {
        e.preventDefault();
    
        const promise = services.postUrl(user.token, form);
    
        promise.then((answer) => {
          //reload posts
        });
    
        promise.catch((answer) => {
          alert(answer.response.data);
        });
      }

    return (
        <div>
            <img src={user.picture} alt="Profile picture" />
            <h2>{user.name}</h2>
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

                <input
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
            <h5>Title</h5>
            <p>Description</p>
            <a hrf="linkvalido">link</a>
            <img src="" alt="Featured image" ></img>
        </SnippetBox>
    );
}

const Posts = styled.div`
    width: 40%;
    min-width: 600px;
    height: 300px;
    margin-top: 150px;

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

    div {
        width: 100%;
        min-height: 209px;
        display: flex;
        padding: 18px 18px 18px 86px;
        background-color: #171717;
        border-radius: 16px;
        margin-bottom: 16px;
        position: relative;
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
    }
`;

const Form = styled.form`
    width: 100%;

    input {
        width: 100%;
        border-radius: 5px;
        border: none;
        padding: 0 13px;
        border: 1px solid #EFEFEF;
        height: 30px;
        margin-bottom: 5px;
        font-size: 15px;
    }

    input[type="text"] {
        min-height: 66px;
        height: auto;    
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

    input::placeholder {
        color: #949494;
        font-size: 15px;
    }
`;

const SnippetBox = styled.div`
    width: 100%;
    border-radius: 11px;
    border: 1px solid #4D4D4D;
    padding: 24px 0 24px 20px;
`;