import React, { useState } from 'react'
import styled from 'styled-components'
import { auth, db } from '../firebase/firebase-init';
import { addDoc, collection,getDocs,query,where } from "firebase/firestore";
import validator from 'validator'
import { useAuthState } from 'react-firebase-hooks/auth';

export default function Inputpopup({ setOpen, setNewChat }) {
  const [user] = useAuthState(auth);
  const [email, setEmail] = useState();
  const submitChat = async (e) => {
    if ((!email || !validator.isEmail(email)) || email === user.email) {
      alert('Kindly Enter Valid Email')
      return;
    }
    if (await chatAlreadyExist(email)) {
      alert('chat already exist')
    
      return;
    }
    await addDoc(collection(db, "chats"), {
      users: [user.email, email]
    })
    setNewChat(true);
    setOpen(false);
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

    <InputPopupOuterContainer>
      <InputPopupContainer>
        <p>
          Enter Email Address
        </p>
        <input type="text" onChange={(e) => { setEmail(e.target.value); console.log(email) }} />
        <input type="submit" onClick={(e) => submitChat(e)} />
      </InputPopupContainer>
    </InputPopupOuterContainer>
  )
}
const InputPopupOuterContainer = styled.div`
    position: absolute;
    pointer-events:none;
    display:flex;
    justify-content:center;
    align-items:flex-start;
    left:0;
    top:0;
    height:100vh;
    padding:10vw 10vh;
    width:100vw;
    background-color:rgba(0,0,0,0.8);
    z-index:100;
`

const InputPopupContainer = styled.div`
    height:15rem;
    width:20rem;
    pointer-events:all;
    border-radius:1rem;
    background-color:${({ theme }) => theme.primaryColor};
    padding:2rem;
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:space-between;
    font-size:1.2rem;
    input{
      padding:1rem;
      cursor: pointer;
      font-size:1.2rem;
      background-color:${({ theme }) => theme.secondaryColor};
      box-shadow:${({ theme }) => theme.boxShadow};
      border:none;
      outline:none;
      border-radius:1rem;
    }
`
