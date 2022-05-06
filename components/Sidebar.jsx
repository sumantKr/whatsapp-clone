import styled from "styled-components"
import validator from 'validator'
import { Avatar, IconButton } from '@mui/material'
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
  const [allChats, setAllChats] = useState({});
  const [newChat, setNewChat] = useState(false);
  useEffect(() => {
    (async () => {
      const chatSnap = await getDocs(
        query(
          collection(db, "chats"),
          where("users", "array-contains", user.email)
        )
      );
      setAllChats(chatSnap);
    })();
  }, [newChat]);

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
    setNewChat(true);

    return;
  }

  const chatAlreadyExist = async (recipientEmail) => {
    const userSnap = await getDocs(
      query(
        collection(db, "chats"),
        where("users", "array-contains", recipientEmail)
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
    <SidebarContainer>
      <Header>
        <StyledAvatar src={user.photoURL} onClick={() => { auth.signOut() }} />
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
      <ChatContainer>
        {
          allChats?.docs?.length > 0 ?
            allChats.docs.map((doc) => {
              return <Chat key={doc.id} email={
                doc.data().users[1] === user.email?
                doc.data().users[0]:
                doc.data().users[1]
              
              } />
            })
            :
            <div style={{ textAlign: "center" }}>
              No Chats Yet!
            </div>

        }

      </ChatContainer>

    </SidebarContainer>
  )
}


const SidebarContainer = styled.div`
    position:relative;
    left:0;
    top:0;
    height: 100vh;
    width:30vw;
    background-color:${({ theme }) => theme.primaryColor};
    padding:20px;
    @media (max-width:900px){
      font-size:.8rem;
    }
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
          width:40px;
          height:40px;
          border-radius:50%;
          cursor: pointer;
`
const ChatContainer = styled.div`  
          height: fit-content;
          width:100%;
          margin-top:1rem;
          cursor:pointer;
`