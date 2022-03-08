import fetch from "node-fetch";

// Beare Token
const token = "AAAAAAAAAAAAAAAAAAAAAEDmZwEAAAAAKprbLSn%2BoS3cqzzFnQ5SFatPSp0%3DiQN4FTV44eE5fLrjxazxZ4hN7Se7RKPFQ4HYestJzKhuDm3yBY";

// UserId
const id = "339933405";


// Number of tweets to fetch
var max_results = 20;

const endpointURL = `https://api.twitter.com/2/users/${id}/tweets?max_results=${max_results}`;

async function getRequest() {
  // These are the parameters for the API request
 

 var to_return ;
 await fetch(endpointURL,{
    method:"GET",

    headers: {
      "User-Agent": "v2TweetsJS",
      authorization: `Bearer ${token}`,
      
    },

  }).then(res =>res.json())
  .then(d => {
    if(d)
    {
      to_return = d;
      //console.log(d);
      
    }
    else {
           throw new Error("Unsuccessful request");}
})


return to_return;
 
}
  


(async  () => {
  try {
    // Make request
    const response = await getRequest();

    console.log(response)
    
  } catch (e) {
    console.log(e);
    process.exit(-1);
  }
  process.exit();
})();

