import React from 'react'
import {useRouter} from 'next/router'
import styled from 'styled-components'
import Sidebar from './Sidebar'
export default function ChatScreen() {
    const recipientId=useRouter().asPath.slice(6);
    return (
        <ChatInnerScreen>
        {
            console.log(recipientId)
        }
            <Sidebar />
            <ChatContainer>
                <ChatNavBar>
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
    height: 3rem;
    padding:0 1.5rem;
    background-color:${({ theme }) => theme.secondaryColor};
    display:flex;
    justify-content:space-between;
    align-items:center;
`
