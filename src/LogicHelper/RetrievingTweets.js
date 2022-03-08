const needle = require("needle");
// Beare Token
const token = "AAAAAAAAAAAAAAAAAAAAAEDmZwEAAAAAKprbLSn%2BoS3cqzzFnQ5SFatPSp0%3DiQN4FTV44eE5fLrjxazxZ4hN7Se7RKPFQ4HYestJzKhuDm3yBY";

// UserId
const id = "339933405";


// Number of tweets to fetch
var max_results = 20;

const endpointURL = `https://api.twitter.com/2/users/${id}/tweets`;

async function getRequest() {
  // These are the parameters for the API request
  const params = {
    "tweet.fields": "lang,author_id", // Edit optional query parameters here
    "user.fields": "created_at", // Edit optional query parameters here
    'max_results':max_results
    
  };

  
  // this is the HTTP header that adds bearer token authentication
  const res = await needle("get", endpointURL, params, {
    headers: {
      "User-Agent": "v2TweetsJS",
      authorization: `Bearer ${token}`,
      
    },
  });

  if (res.body) {
    return res.body;
  } else {
    throw new Error("Unsuccessful request");
  }
}


(async  () => {
  try {
    // Make request
    const response = await getRequest();
    console.log(response.data)
  } catch (e) {
    console.log(e);
    process.exit(-1);
  }
  process.exit();
})();

