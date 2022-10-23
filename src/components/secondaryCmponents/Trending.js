import { Link } from "react-router-dom";

export default function TrendingTopics({ hashtag }) {
  
  const showValue = hashtag.slice(1);
  return (
    <Link to={`/hashtag/${showValue}`}>
      <h6>{`# ${showValue}`}</h6>
    </Link>
  );
}
