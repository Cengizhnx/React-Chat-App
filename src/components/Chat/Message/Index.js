import React from 'react'
import BioHeader from '../Bio/BioHeader';
import Bio from '../Bio/Bio';
import Chat from "./Chat";
import Header from "./Header";
import Message from "./Message";
import { GetSelectUserBlocks, GetUserBlocks, GetUserFriends } from '../../../firebase';
import { useSelector } from 'react-redux';

function Index() {
    const blocks = GetUserBlocks()
    const friends = GetUserFriends()
    const selectBlocks = GetSelectUserBlocks()

    return (
        <div className='w-full h-full flex flex-row'>
            <div className='w-full h-full flex flex-col text-white'>
                <Header></Header>
                <Chat blocks={blocks}></Chat>
                <Message blocks={blocks} selectBlocks={selectBlocks}></Message>

            </div>
            <div style={{ display: "none" }} className='w-2/3 h-full flex flex-col rounded-r-xl shadow-xl' id="bio">
                <BioHeader></BioHeader>
                <Bio blocks={blocks} friends={friends}></Bio>

            </div>
        </div>
    )
}

export default Index