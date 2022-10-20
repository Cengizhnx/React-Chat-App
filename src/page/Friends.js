import React from 'react'
import { HiChevronDoubleLeft } from "react-icons/hi";
import FriendsList from '../components/Persons/FriendsList';


function Friends({ friends }) {

    function hidevisible_home() {
        document.getElementById("div_left").style.display = "block";
        document.getElementById("div_friends").style.display = "none";
    }

    return (
        <div className='w-full h-full flex flex-col items-center justify-start'>
            <div className='w-full h-16 p-5 flex flex-row items-center justify-start text-black dark:text-white bg-bgLight2 dark:bg-bgDark2 rounded-tl-xl'>
                <button onClick={hidevisible_home}>
                    <HiChevronDoubleLeft className="h-5 w-5 mr-3 text-black hover:bg-messageHover hover:text-white dark:text-white dark:hover:bg-bgLight2 dark:hover:text-black hover:rounded-2xl hover:cursor-pointer" />
                </button>
                <h1>New Chat</h1>
            </div>
            <div className='w-full h-full flex flex-col items-center justify-center'>
                <FriendsList friends={friends}></FriendsList>
            </div>
        </div>
    )
}

export default Friends