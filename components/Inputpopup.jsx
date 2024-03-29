import React, { useState } from 'react'
import styled from 'styled-components'
import { auth, db } from '../firebase/firebase-init';
import { addDoc, collection, getDocs,getDoc, query, where } from "firebase/firestore";
import validator from 'validator'
import { useAuthState } from 'react-firebase-hooks/auth';

export default function Inputpopup({ setOpen, setNewChat }) {
  const [user] = useAuthState(auth);
  const [email, setEmail] = useState();
  const submitChat = async (e) => {
    e.target.value='Wait...'
    if ((!email || !validator.isEmail(email)) || email === user.email) {
      e.target.value='Submit'
      alert('Kindly Enter Valid Email')
      return;
    }
    if (await chatAlreadyExist(email)) {
      e.target.value='Submit'
      alert('chat already exist')

      return;
    }
    const recipientId=await getDocs(
      query(
        collection(db,"users"),
        where("email","==",email)
        )
      )
    if(recipientId.docs.length==0){
      e.target.value='Submit'
      alert('No such user exist')
      return;
    }  
    await addDoc(collection(db, "chats"), {
      chatId:user.uid+"_"+recipientId.docs[0].id,
      users: [user.email, email]
    })
    e.target.value='Submit'
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
  const closePopup=()=>{
        setOpen(false);
  }
  return (

    <InputPopupOuterContainer>
      <InputPopupContainer>
        <p>
          Enter Email Address
        </p>
        <input type="text" onChange={(e) => { setEmail(e.target.value); console.log(email) }} />
        <input type="submit" onClick={(e) => submitChat(e)} />
        <div onClick={closePopup}>x</div>
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
    position:relative;
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
    div{
     position: absolute;
     cursor: pointer;
     color:black; 
     font-size:2rem;
      top:1rem;
     right:1rem;
    }
`
