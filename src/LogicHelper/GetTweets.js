import fetch from "node-fetch";

const GetTweets = (props) => {

    
    // get Access Token
    const accessToken = props.accessToken;

    // Get User Id
    const userId = props.userId;


    // Max Results
    const max_results = props.max_results;

    
    const endpointURL = `https://api.twitter.com/2/users/${userId}/tweets?max_results=${max_results}&expansions=author_id`;

    async function getRequest() {
    // These are the parameters for the API request
    

    var to_return = "I LOVE YOU" ;
    // await fetch(endpointURL,{
    //     method:"GET",

    //     headers: {
    //     "User-Agent": "v2TweetsJS",
    //     authorization: `Bearer ${accessToken}`,
        
    //     },

    // }).then(res =>res.json())
    // .then(d => {
    //     if(d)
    //     {
    //     to_return = d;
    //     //console.log(d);
        
    //     }
    //     else {
    //         throw new Error("Unsuccessful request");}
    // })


    return to_return;
    
    }
return (getRequest());
}
 
export default GetTweets;