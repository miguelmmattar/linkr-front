import services from "../../services/linkr.js";
import { NewPostMessageButtom } from "../../styles/NewPostsMessageStyle.js";
import { useState, useContext, useEffect } from "react";
import UserContext from "../../contexts/UserContext";
import useInterval from "use-interval";
import { useLocation } from "react-router-dom";

function NewPostMessage() {
    let path = useLocation().pathname;
    const [initialPostsNumber, setInitialPostsNumber] = useState(0);
    const [newPostsNumber, setNewPostsNumber] = useState(0);
    const { user, setUser } = useContext(UserContext);
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
    }, 1000); //  15000

    useEffect(() => {
        promise = services.getPostNumbers(token, filter);
        promise.then((res) => {
            setInitialPostsNumber(res.data);
        }).catch((error) => {
            console.error(error);
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    return (
        <>
            {(newPostsNumber > initialPostsNumber) ?
                <NewPostMessageButtom onClick={()=> {console.log("clivou") }}>{newPostsNumber - initialPostsNumber} new posts, load more!</NewPostMessageButtom>
                : ""}
        </>
    )
}

export { NewPostMessage };

