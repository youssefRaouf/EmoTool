import { authentication } from '../AuthHelper/Firebase-config';
import { TwitterAuthProvider, signInWithPopup } from "firebase/auth";
const SignIn = () => {
    
    const provider = new TwitterAuthProvider();
    signInWithPopup(authentication, provider).then((res) => {
         
     
        
        console.log(res['user'].accessToken);
        return (res['user'].accessToken)
        
    }).catch(err => {
        console.log("error", err)
        return ( err);
    })
    
    
}
 
export default SignIn;