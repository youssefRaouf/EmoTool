window.addEventListener('load', function () {
    let tweetsSection = document.getElementsByTagName('section')[0]
    setTimeout(() => {
        console.log("Loaded")
        const hideElement = document.createElement('div')
        hideElement.style = "font-size:20px;height: 100%;width: 100%;position: absolute;backdrop-filter: blur(8px);display: flex;justify-content: center;align-items: center;"
        const text = document.createElement('span')
        text.innerText = "Hidden By Emotool"
        hideElement.appendChild(text)
        tweetsSection = document.getElementsByTagName('section')[0]
        const elements = document.getElementsByTagName('article')
        const tweets = []
        for (const el of elements) {
            if (!el.id) {
                el.id = "article_" + tweets.length
            }
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

        /* MutationObserver callback to add spans when the body changes */
        const callback = function (mutationsList, observer) {
            for (const mutation of mutationsList) {
                if (mutation.target.tagName === 'ARTICLE' && mutation.attributeName === 'role') {
                    const parent = document.getElementById('article_0').parentNode
                    parent.appendChild(hideElement)
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
                    if (!tweets.find((tweet) => tweet.text === total_text)) {
                        if (!mutation.target.id) {
                            mutation.target.id = "article_" + tweets.length
                        }
                        tweets.push({ text: total_text, label: null, id: tweets.length })
                        console.log(tweets)
                    }
                }
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
    }, 3000)

});
