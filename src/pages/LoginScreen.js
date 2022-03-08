import { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { authentication } from '../AuthHelper/Firebase-config';
import { TwitterAuthProvider, signInWithPopup } from "firebase/auth";
import GetTweets from '../LogicHelper/GetTweets.js';


const Container = styled.div`
display: flex;
flex-direction: column; 
`
const InputLabel = styled.div`
width: 90px;
font-size: 20px;
`
const LoginMessage = styled.div`
font-size: 20px;
margin-top: -20px;
margin-bottom: -20px;
`

const Wrapper = styled.div`
margin-top:20px;
`

const Input = styled.input`
width: 348px;
height: 32px;
border-radius: 10px;
`

const RowContainer = styled.div`
display: flex;
flex-direction: row;
margin-top:25px;
align-items: center;
`

const Button = styled.div`
background-color: #2caae1;
font-size: 20px;
color: white;
width: 119px;
height: 32px;
border-radius: 16px;
margin-right: 10px;
display: flex;
align-items: center;
justify-content: center;
cursor: pointer;
align-self: end;
margin-top: 15px;
padding-bottom:3px;
margin-bottom: 15px;
`
const Label = styled.div`
color: black;
font-size: 20px;
margin-left: 60px;
margin-top: 10px;
margin-bottom: -20px;
`

const LoginScreen = () => {

    const signIn= ()=>
    {
        
    const provider = new TwitterAuthProvider();
    signInWithPopup(authentication, provider).then((res) => {
         
        
       
        console.log(res['user'].accessToken);

        var response = GetTweets({accessToken:"AAAAAAAAAAAAAAAAAAAAAEDmZwEAAAAAKprbLSn%2BoS3cqzzFnQ5SFatPSp0%3DiQN4FTV44eE5fLrjxazxZ4hN7Se7RKPFQ4HYestJzKhuDm3yBY",
        userId: '339933405',
            max_results:20})

        console.log(response)
        return (res['user'].accessToken)
        
    }).catch(err => {
        console.log("error", err)
        return ( err);
    })
    
    }
    
    return (
        <Container>
            <Label>EmoTool</Label>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <img src={require('../assets/twitter-logo.png')} />
                <LoginMessage>Login Into Your Twitter Account</LoginMessage>
            </div>
           
            <Button onClick={signIn}>Login</Button>
        </Container>
    );
}
export default LoginScreen;
