export default function TrendingTopics ({hashtag}) {
    const showValue = hashtag.slice(1)
    return (
        <h3>{`# ${showValue}`}</h3>
    )
}
