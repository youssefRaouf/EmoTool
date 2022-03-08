const GetTweets = (props) => {

    
    // get Access Token
    const accessToken = props.accessToken;

    // Get User Id
    const userId = props.userId;


    // Max Results
    const max_results = props.max_results;

    
    const endpointURL = `https://api.twitter.com/2/users/${userId}/tweets?max_results=${max_results}`;

    async function getRequest() {
    // These are the parameters for the API request
    

    var to_return = "" ;

    
    
    await fetch(endpointURL,{
        method:"GET",
        
        headers: {
         "Access-Control-Allow-Origin" : '*',
        "User-Agent": "v2TweetsJS",
        authorization: `Bearer ${accessToken}`,
        credentials: 'include',
        "Access-Control-Allow-Credentials": true

        
        }
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


    return (to_return);
    
    }


return (getRequest());
}
 
export default GetTweets;