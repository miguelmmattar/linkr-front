import { SnippetBox } from "../../styles/TimelineStyles.js";
import { Link } from "react-router-dom";

export default function Post({ user, post }) {

    return (
        <div>
            <img src={user.picture} alt="Profile" />
            <Link to={`/user/${user.id}`}><h3>{user.name}</h3></Link>
            <h4>{post.description}</h4>
            <a href={post.link.url} target="_blank" className="snippet"><Snippet link={post.link} /></a>
        </div>
    );
}

function Snippet({ link }) {
    return (
        <SnippetBox>
            <img src={link.image} alt="Featured" ></img>
            <h5>{link.title}</h5>
            <p>{link.description}</p>
            <p>{link.url}</p>
        </SnippetBox>
    );
}