import React from 'react'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import Sidebar from '../../components/Sidebar'
import ChatScreen from '../../components/ChatScreen'
export default function chatPage() {
    return (
        <>
            <Sidebar />
            <ChatScreen />
        </>
    )
}
