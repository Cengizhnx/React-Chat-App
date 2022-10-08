import React from 'react'
import Chat from "./Chat";
import Header from "./Header";
import Message from "./Message";

function Index() {
    return (
        <div className='w-full h-full flex flex-col text-white'>
            <Header></Header>
            <Chat></Chat>
            <Message></Message>
        </div>
    )
}

export default Index