import services from "../../services/linkr.js";
import { NewPostMessageButtom } from "../../styles/NewPostsMessageStyle.js";
import { useState, useContext, useEffect } from "react";
import UserContext from "../../contexts/UserContext";
import useInterval from "use-interval";
import { useLocation } from "react-router-dom";

function NewPostMessage({ loadPosts, disableMessageButtom }) {
    let path = useLocation().pathname;
    const [initialPostsNumber, setInitialPostsNumber] = useState(0);
    const [newPostsNumber, setNewPostsNumber] = useState(0);
    const [reload, setReload] = useState(true);
    const { user } = useContext(UserContext);
    const token = user.token;
    let filter = "";
    let promise;

    if (path.slice(0, 3) === "/us") {
        filter = `?user=${path.replace(/\D/g, "")}`;
    }
    if (path.slice(0, 3) === "/ha") {
        filter = `?hashtag=${path.replace("/hashtag/", "")}`;
    }

    

    

    useInterval(() => {
        promise = services.getPostNumbers(token, filter);
        promise.then((res) => {
            setNewPostsNumber(res.data);
        }).catch((error) => {
            console.error(error);
        })
    }, 15000);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        promise = services.getPostNumbers(token, filter);
        promise.then((res) => {
            setInitialPostsNumber(res.data);
        }).catch((error) => {
            console.error(error);
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [reload, disableMessageButtom]);

    function handlleClick() {
        setReload(!reload);
        loadPosts(true);
    }    

    return (
        <>
            {(newPostsNumber > initialPostsNumber) ?
                <NewPostMessageButtom onClick={ ()=>{handlleClick()} }>{newPostsNumber - initialPostsNumber} new posts, load more!</NewPostMessageButtom>
                : ""}
        </>
    )
}

export { NewPostMessage };

