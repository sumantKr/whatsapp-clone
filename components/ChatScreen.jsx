import React from 'react'
import { useRouter } from 'next/router'
import { Avatar } from '@mui/material'
import { db, auth } from '../firebase/firebase-init'
import { useCollection, useDocument } from "react-firebase-hooks/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { collection, doc, query, where } from "firebase/firestore";
import styled from 'styled-components'
import Sidebar from './Sidebar'
export default function ChatScreen() {
    const [user] = useAuthState(auth);
    const URLId = useRouter().asPath.slice(6).split('_');
    const chatId = URLId[1] == user.uid ? URLId[0] : URLId[1];
    const recipientDoc = useDocument(doc(db, "users", chatId));
    return (
        <ChatInnerScreen>
            <Sidebar />
            <ChatContainer>
                <ChatNavBar>
                    <RecipientDetails>
                        {
                            recipientDoc[0] ?
                                <Avatar src={recipientDoc[0]?.data().photoUrl} />
                                :
                                <Avatar></Avatar>

                        }
                        <div>
                            <p>
                                {
                                    recipientDoc[0]?.data().email
                                }
                            </p>
                            <p>
                                Last Login: {
                                   (new Date(recipientDoc[0]?.data().lastSeen.toDate())).toLocaleString()

                                }
                            </p>
                        </div>
                    </RecipientDetails>
                </ChatNavBar>
            </ChatContainer>
        </ChatInnerScreen>
    )
}

const ChatInnerScreen = styled.div`
    display:flex;
    width:100vw;
    `
const ChatContainer = styled.div`
    display:flex;
    width:70vw;
`
const ChatNavBar = styled.div`
    width:100%;
    height: 3.5rem;
    padding:0 1.5rem;
    background-color:${({ theme }) => theme.secondaryColor};
    display:flex;
    justify-content:space-between;
    align-items:center;
`
const RecipientDetails = styled.div`
      display:flex;
      align-items:center;
      div{
        display:flex;
        margin-left:.5rem;
        flex-direction:column;
        align-items:start;
        justify-content:space-between;
        p:first-of-type{
            font-size:14px;
        }
        p:last-of-type{
            font-size:12px;
        }
      }

`
