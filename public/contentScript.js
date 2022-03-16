window.addEventListener('load', function () {
    console.log("Loaded ")
    let tweetsSection = document.getElementsByTagName('section')[0]
    setTimeout(() => {
        tweetsSection = document.getElementsByTagName('section')[0]
        const elements = document.getElementsByTagName('article')
        const tweets = []
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
            tweets.push({ text: total_text, label: null })
        }

        /* MutationObserver callback to add spans when the body changes */
        const callback = function (mutationsList, observer) {
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
                    if (!tweets.find((tweet) => tweet.text === total_text)) {
                        tweets.push({ text: total_text, label: null })
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
