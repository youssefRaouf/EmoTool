import { useLocation } from "react-router-dom";

const SelectEmotionFilter = () => {
    const location = useLocation()
    const tweets = location.state?.tweets || []
    return (
        <div className="EmotionCheckBox">
            <h1>Select Page</h1>
            {tweets.map((tweet, i) => <div>tweet{i + 1} : {tweet['tweet']} Label {tweet['label']}</div>)}
        </div>
    );
}

export default SelectEmotionFilter;