export default function TrendingTopics({ hashtag }) {
  const showValue = hashtag.slice(1);
  return <h6>{`# ${showValue}`}</h6>;
}
