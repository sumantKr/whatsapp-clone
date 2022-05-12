import styled from "styled-components"
import { Avatar } from '@mui/material'
import { useEffect } from "react"
import { db, auth } from '../firebase/firebase-init'
import { useCollection } from "react-firebase-hooks/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { collection, query, where } from "firebase/firestore";
import { useRouter } from "next/router";

export default function Chat({id, email }) {
  const [user] = useAuthState(auth)
  const router=useRouter();
  const [recipientSnapshot] = useCollection(
    query(
      collection(db, "users"),
      where("email", '==', email)
    )
  );
  
  const openChat=()=>{
      router.push(`/chat/${id}`)
      }

  return (
    <Container onClick={openChat}>
    {
      recipientSnapshot?.docs?.length>0?
      <Avatar src={recipientSnapshot?.docs[0].data().photoUrl} />
      :
      <Avatar/>
    }
      <NameContainer>
        {email}
      </NameContainer>
    </Container>
  )
}

const Container = styled.div`
      padding: 5px;
      display:flex;
      border-radius:0.8rem;
      height:3.5rem;
      padding:0.5rem;
      display:flex;
      align-items:center;
      width:100%;
      background:black;
      margin-bottom:.5rem;
      background-color: ${({ theme }) => theme.secondaryColor};
      &:hover{
        background:${({ theme }) => theme.secondaryWithOpacity};

      }
      
`
const NameContainer = styled.div`
    padding: 0.5rem;
    text-align:start;
    flex:1;
`
const StyledAvatar = styled.img`
          width:40px;
          height:40px;
          border-radius:50%;
          cursor: pointer;
`