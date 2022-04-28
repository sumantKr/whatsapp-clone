import styled from "styled-components"
import Head from "next/head"
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { signInWithPopup } from "firebase/auth";
import { auth,provider } from "../firebase/firebase-init";

export default function Login() {

    const signIn =()=>{
        signInWithPopup(auth,provider).catch(alert);
    }
    return (
        <LoginSection>
            <Head>
                <title>Login | MyConnect</title>
            </Head>
            <LoginContainer>
                <div>
                    <WhatsAppIcon sx={{ color: '#ef4532',fontSize:'72px' }} />
                </div>
                <div>
                    <SignUpWithGoogleButton onClick={signIn}>
                        Sign Up With Google
                    </SignUpWithGoogleButton>
                </div>
            </LoginContainer>
        </LoginSection>
    )
}

const LoginSection = styled.div`
    height: 100vh;
    width: 100vw;
    display:flex;
    justify-content:center;
    align-items:center;
    background-color:${({theme})=>theme.primaryColor};
`
const LoginContainer = styled.div`
    height: 50vh;
    width: 30vw;
    padding:40px;
    display:flex;
    flex-direction:column;
    justify-content:space-evenly;
    align-items:center;
    background-color:#ececec;
    border-radius:10px;
    box-shadow: ${({theme})=>theme.boxShadow};
    
    div{
        height:50%;
        width:100%;
        display:flex;
        justify-content:center;
        align-items:center;
    }
    `

const SignUpWithGoogleButton = styled.button`
    padding:20px 40px;
    background:${({theme})=>theme.primaryColor};
    border:none ;
    font-size:16px;
    text-decoration:none;
    border-radius:5px ;
    box-shadow: ${({theme})=>theme.boxShadow};
    transition: transform 0.5s ease;
    cursor: pointer;
    &:hover{
        transform:translate(0,-1vh);
            padding:20px 40px;
            border:2px solid white;
          }
    `