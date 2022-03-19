let tweets = []
let filters = []
if (localStorage.getItem('filters')) {
    filters = JSON.parse(localStorage.getItem('filters'))
}
chrome.runtime.onMessage.addListener(
    function (request) {
        filters = request.filters
        hideElements()
        localStorage.setItem('filters', JSON.stringify(filters))
    }
);


const classifyTweets = async (tweets) => {
    const endpointURL = `http://localhost:8000/server/classifyMultipleTweets`;
    const data = await fetch(endpointURL, {
        method: "POST",
        body: JSON.stringify({
            tweets
        })
    }).then(res => {
        return res.json();
    })
    return data
}
const hideElements = () => {
    const hideElement = document.createElement('div')
    hideElement.style = "font-size:20px;height: 100%;width: 100%;position: absolute;backdrop-filter: blur(8px);display: flex;justify-content: center;align-items: center;"
    const text = document.createElement('span')
    text.innerText = "Hidden By Emotool"
    hideElement.appendChild(text)
    const elements = document.getElementsByTagName('article')
    for (const el of elements) {
        const spans = el.getElementsByTagName('span');
        let total_text = "";
        // To avoid taking user name from spans
        let userInfo = 0;
        for (const text of spans) {
            if (userInfo <= 3) {
                userInfo++;
                continue;
            }
            total_text = total_text.concat(text.innerText);
        }
        if (tweets.find(tweet => tweet.text === total_text)?.label && filters.includes(tweets.find(tweet => tweet.text === total_text)?.label)) {
            el.style.display = 'none'
            // TODO
            // const parent = el.parentNode
            // parent.appendChild(hideElement)
        } else {
            el.style.display = 'flex'
        }
    }
}
window.addEventListener('load', async () => {
    setTimeout(async () => {
        let tweetsSection = document.getElementsByClassName('r-1jgb5lz')[0]
        console.log("Loaded")
        const elements = document.getElementsByTagName('article')
        for (const el of elements) {
            const spans = el.getElementsByTagName('span');
            let total_text = "";
            // To avoid taking user name from spans
            let userInfo = 0;
            for (const text of spans) {
                if (userInfo <= 3) {
                    userInfo++;
                    continue;
                }
                total_text = total_text.concat(text.innerText);
            }
            tweets.push({ text: total_text, label: null, id: tweets.length })
        }
        classifyTweets(tweets).then(labeledTweets => {
            labeledTweets.forEach(tweet => {
                tweets[tweet.id] = { ...tweet }
            })
            hideElements()
        })
        /* MutationObserver callback to add spans when the body changes */
        const callback = async (mutationsList, observer) => {
            let tweetsChanged = false
            for (const mutation of mutationsList) {
                if (mutation.target.tagName === 'ARTICLE' && mutation.attributeName === 'role') {
                    const spans = mutation.target.getElementsByTagName('span');
                    let total_text = "";
                    // To avoid taking user name from spans
                    let userInfo = 0;
                    for (const text of spans) {
                        if (userInfo <= 3) {
                            userInfo++;
                            continue;
                        }
                        total_text = total_text.concat(text.innerText);
                    }
                    hideElements()
                    if (!tweets.find((tweet) => tweet.text === total_text)) {
                        tweets.push({ text: total_text, label: null, id: tweets.length })
                        tweetsChanged = true
                    }
                }
            }
            if (tweetsChanged) {
                classifyTweets(tweets).then(labeledTweets => {
                    labeledTweets.forEach(tweet => {
                        tweets[tweet.id] = { ...tweet }
                    })
                    hideElements()
                })
            }
        }
        const observer = new MutationObserver(callback);
        const config = {
            attributes: true,
            subtree: true,
            attributeOldValue: true,
            attributeFilter: ['role']
        };
        observer.observe(tweetsSection, config);
    }, 2000)
});
