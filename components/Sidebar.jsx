import styled from "styled-components"
import validator from 'validator'
import { Avatar, createChainedFunction, IconButton, TextField } from '@mui/material'
import ChatIcon from '@mui/icons-material/Chat';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SearchIcon from '@mui/icons-material/Search'
export default function Sidebar() {

  const createChat=()=>{
    const input= prompt('Enter an Email Address! ');
    if(!input || !validator.isEmail(input)){
        alert('Kindly Enter Valid Email')
        return;
    }
    alert(input);
    return;

  }
  return (
    <Container>
      <Header>
        <Avatar />
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
        <StartChatButton onClick={()=>createChat()}>Start A New Chat</StartChatButton>
      </SidebarContent>
    </Container>
  )
}


const Container = styled.div`
    position:relative;
    left:0;
    top:0;
    height: 100vh;
    width:30vw;
    background-color:#efd48b;
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
const SearchContainer=styled.div`
          background-color:#ececec;
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
          box-shadow: -2px 4px 39px 1px rgba(0,0,0,0.15);
          cursor: pointer;
          &:hover,&:focus{
            padding:12px;
            border:2px solid white;
          }
        `

const StartChatButton = styled.button `
          border:none;
          outline:none;
          padding:10px;
          border-radius:5px;
          background-color:#ececec;
          width:100%;
          margin-top:  10px;
          box-shadow: -2px 4px 39px 1px rgba(0,0,0,0.15);
          cursor: pointer;
          &:hover{
            padding:8px;
            border:2px solid white;
          }
`