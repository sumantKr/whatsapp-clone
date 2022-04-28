import styled from "styled-components"
import validator from 'validator'
import { Avatar, createChainedFunction, IconButton, TextField } from '@mui/material'
import ChatIcon from '@mui/icons-material/Chat';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SearchIcon from '@mui/icons-material/Search'
import { auth, db } from "../firebase/firebase-init";
import { useAuthState } from "react-firebase-hooks/auth";
import { addDoc, collection, getDoc, doc, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import Chat from "./Chat";
export default function Sidebar() {
  const [user] = useAuthState(auth);
  const [allChats,setAllChats] = useState([]);
  useEffect(() => {
    (async () => {
      const chatSnap = await getDocs(
        query(
          collection(db, "chats"),
          where("users", "array-contains", user.email)
        )
      );
      chatSnap.forEach(doc=>{
        setAllChats(prevChatState=>[...prevChatState,doc.data()])
      })
      console.log(allChats);
    })();
  }, [])
  const createChat = async () => {
    const input = prompt('Enter an Email Address! ');
    if ((!input || !validator.isEmail(input)) || input === user.email) {
      alert('Kindly Enter Valid Email')
      return;
    }
    if (await chatAlreadyExist(input)) {
      alert('chat already exist')
      return;
    }
    await addDoc(collection(db, "chats"), {
      users: [user.email, input]
    })
    alert(input);
    return;
  }
  const chatAlreadyExist = async (recipientEmail) => {

    const userSnap = await getDocs(
      query(
        collection(db, "chats"),
        where("users", "array-contains", user.email, recipientEmail)
      )
    );
    userSnap.forEach(doc => {
      console.log(doc.data().users)
    })
    if (userSnap.size > 0)
      return true;
    return false;

  }

  return (
    <Container>
      <Header>
        <StyledAvatar onClick={() => { auth.signOut() }} />
        <div>
          <IconButton>
            <ChatIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </Header>
      <SidebarContent>
        <SearchContainer>
          <SearchIcon />
          <SideBarInput placeholder="Search Chats" />
        </SearchContainer>
        <StartChatButton onClick={async () => await createChat()}>Start A New Chat</StartChatButton>
      </SidebarContent>
      {
        allChats.map(()=>{

        })
      }
      <Chat/>
    </Container>
  )
}


const Container = styled.div`
    position:relative;
    left:0;
    top:0;
    height: 100vh;
    width:30vw;
    background-color:${({ theme }) => theme.primaryColor};
    padding:20px;
`
const Header = styled.div`
    position:relative;
    left:0;
    top:0;
    height:10vh;
    width:100%;
    display:flex;
    justify-content:space-between;
    align-items:center;
`
const SidebarContent = styled.div`
      div{
        width:100%;
        display:flex;
        justify-content:space-between;
        align-items:center;
      }   
`
const SearchContainer = styled.div`
          background-color:${({ theme }) => theme.secondaryColor};
          padding:10px;
          border-radius:10px;
          overflow:none;

`
const SideBarInput = styled.input`
          border:none;
          outline:none;
          padding:14px;
          border-radius:5px;
          background-color:transparent ;
          width:100%;
          box-shadow: ${({ theme }) => theme.secondaryColor};
          cursor: pointer;
          &:hover,&:focus{
            padding:12px;
            border:2px solid white;
          }
        `

const StartChatButton = styled.button`
          border:none;
          outline:none;
          padding:10px;
          border-radius:5px;
          background-color:#ececec;
          width:100%;
          margin-top:  10px;
          box-shadow:  ${({ theme }) => theme.boxShadow};
          cursor: pointer;
          &:hover{
            padding:8px;
            border:2px solid white;
          }
`
const StyledAvatar = styled(Avatar)`
          cursor:pointer
`