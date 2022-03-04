import { Link } from 'react-router-dom';
import styled from 'styled-components';

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
    return (
        <Container>
            <Label>EmoTool</Label>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <img src={require('../assets/twitter-logo.png')} />
                <LoginMessage>Login Into Your Twitter Account</LoginMessage>
            </div>
            <Wrapper style={{ marginLeft: 110 }}>
                <RowContainer>
                    <InputLabel>Email</InputLabel>
                    <Input type="text" />
                </RowContainer>
                <RowContainer>
                    <InputLabel>Password</InputLabel>
                    <Input type="text" />
                </RowContainer>
            </Wrapper>
            <Link to="/SelectEmotionFilter">
            <Button>Login</Button>
            </Link>
           
        </Container>
    );
}
export default LoginScreen;
