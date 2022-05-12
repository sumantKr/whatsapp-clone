import Head from 'next/head'
import styled from 'styled-components'
import Sidebar from '../components/Sidebar'
import ForumIcon from '@mui/icons-material/Forum';

export default function Home() {
  return (
    <MainPage>
      <Head>
        <title>myConnect</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Sidebar />
      <StartChatScreen>
        <div>
          <ForumIcon sx={{ fontSize: '200px', color: '#ef4532ee' }} />
        </div>
        <p>Start New Chat</p>
      </StartChatScreen>
    </MainPage>

  )
}
const MainPage = styled.div`
    display:flex;
`

const StartChatScreen = styled.div`
    padding:3rem;
    width:70vw;
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:center;
    div{
      padding:3rem;
      border-radius:50%;
      background: linear-gradient(145deg, #e6e6e6, #ffffff);
      box-shadow:  20px 20px 60px #d9d9d9,
             -20px -20px 60px #ffffff;
    }
    p{
      margin-top:1rem;
      font-size:50px;
    }
`
