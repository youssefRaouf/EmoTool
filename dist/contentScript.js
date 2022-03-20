const script = document.createElement('script')
let tweets = []
let filters = []

const urlReg = RegExp(/(?:https?|ftp):\/\/[\n\S]+/,'g');
                 
// TODO remove this
const httpsReg =  RegExp(/(https?):\/\//,'g');

// Remove numbers
const NumberRegex = RegExp(/\d+[,:]?[\.\d+]*.?/,'g');

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
const debounce = _.debounce(function () {
    classifyTweets().then(labeledTweets => {
        labeledTweets.forEach(tweet => {
            tweets[tweet.id] = { ...tweet, sent: true }
        })
        hideElements()
    })
}, 200);

const classifyTweets = async () => {
    const endpointURL = `http://localhost:8000/server/classifyMultipleTweets`;
    const tweetsToClassify = [...tweets.filter(t => !t.label && !t.sent)]
    tweets = [...tweets.map(t => ({ ...t, sent: true }))]
    if (tweetsToClassify.length === 0) {
        return []
    }
   return [];
    const data = await fetch(endpointURL, {
        method: "POST",
        body: JSON.stringify({
            tweets: tweetsToClassify
        })
    }).then(res => {
        return res.json();
    })
    return data
}

function cleanTweets(spans)
{
    let total_text = "";
    // To avoid taking user name from spans
    let userInfo = 0;
    for (var text of spans) {
        if (userInfo <= 3) {
                userInfo++;
                continue;
            }
                 // Remove hashtag sign 
            text.innerText = text.innerText.replaceAll('#','');

           // remove urls

            text.innerText = text.innerText.replaceAll(urlReg, '');                 
            text.innerText = text.innerText.replaceAll(httpsReg,'');


            // Remove numbers
            text.innerText = text.innerText.replaceAll(NumberRegex,'');
                 

            text.innerText = text.innerText.replaceAll('views','');
            // Thread message and info so break
            if(text.innerText ==="Show this thread")
            {
                break;
            }

            //Tag , spaces , empty or dots
            if(text.innerText[0]==='@'||text.innerHTML===""||text.innerHTML===" "||text.innerHTML==='.')
            {
                continue;
            }
                       
            total_text = total_text.concat(text.innerText);
        
        }
        return total_text;
}
const hideElements = () => {
    const hideElement = document.createElement('div')
    hideElement.style = "font-size:20px;height: 100%;width: 100%;position: absolute;backdrop-filter: blur(8px);display: flex;justify-content: center;align-items: center;"
    const text = document.createElement('span')
    text.innerText = "Hidden By Emotool"
    hideElement.appendChild(text)


    // TODO remove this and keep object of this with every tweet
    const elements = document.getElementsByTagName('article')
    for (const el of elements) {
        const spans = el.getElementsByTagName('span');


        var total_text = cleanTweets(spans);

        var tweet = tweets.find((tweet) => tweet.text === total_text);
        if (tweet&&tweet.label && filters.includes(tweet.label)) {
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
            var total_text = cleanTweets(spans);
            console.log(total_text);
            tweets.push({ text: total_text, label: null, id: tweets.length, sent: false,target_article:el })
        }
        debounce()
        /* MutationObserver callback to add spans when the body changes */
        const callback = async (mutationsList, observer) => {
            let tweetsChanged = false
            for (const mutation of mutationsList) {
                if (mutation.target.tagName === 'ARTICLE' && mutation.attributeName === 'role') {
                    const spans = mutation.target.getElementsByTagName('span');
                   
                    var total_text = cleanTweets(spans);
                    console.log(total_text)
                    hideElements()
                    if (!tweets.find((tweet) => tweet.text === total_text)) {
                        tweets.push({ text: total_text, label: null, id: tweets.length, sent: false ,target_article:mutation.target})
                        tweetsChanged = true
                       
                    }
                }
            }
            if (tweetsChanged) {
                debounce()
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
