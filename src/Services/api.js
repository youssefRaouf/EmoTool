
export const getTweets = async (props) => {
    const userId = props.userId;
    const endpointURL = `http://localhost:8000/server/tweets`;
    const data = await fetch(endpointURL, {
        method: "POST",
        body: JSON.stringify({
            userId
        })
    }).then(res => res.json())
        .then(d => {
            return d.data
        })
    return data
}
