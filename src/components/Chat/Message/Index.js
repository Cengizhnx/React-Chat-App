import React from 'react'
import BioHeader from '../Bio/BioHeader';
import Bio from '../Bio/Bio';
import Chat from "./Chat";
import Header from "./Header";
import Message from "./Message";
import { GetUserBlocks, GetUserFriends } from '../../../firebase';

function Index() {
    const blocks = GetUserBlocks()
    const friends = GetUserFriends()


    return (
        <div className='w-full h-full flex flex-row'>
            <div className='w-full h-full flex flex-col text-white'>
                <Header></Header>
                <Chat></Chat>
                <Message></Message>

            </div>
            <div style={{ display: "none" }} className='w-2/3 h-full flex flex-col rounded-r-xl ' id="bio">
                <BioHeader></BioHeader>
                <Bio blocks={blocks} friends={friends}></Bio>

            </div>
        </div>
    )
}

export default Index