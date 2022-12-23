import { Spinner } from 'flowbite-react';
import React, { useEffect } from 'react'
import { auth, db, getChats } from '../../firebase';
import { useDispatch, useSelector } from 'react-redux';
import { addSelectUSer, chatID, groupUsers } from '../../redux/userSlice';
import moment from 'moment'
import ChatMenu from './ChatMenu';
import { IoMdImages } from "react-icons/io";

function MessageList({ blocks }) {

    const dispatch = useDispatch()

    const chats = useSelector(state => state.users.chats)
    const selectUser = useSelector(state => state.users.selectUser)

    const filtered = blocks?.filter((item) => item.user.username === selectUser.username)

    function hidevisible_chat(item) {
        document.getElementById("landing2").style.display = "block";
        document.getElementById("landing1").style.display = "none";
        dispatch(addSelectUSer(item[1].userInfo.user))
        dispatch(groupUsers(item[1].groupPrew))
        dispatch(chatID(item[0]))
    }



    useEffect(() => {
        getChats()
        auth.currentUser.uid && getChats();
    }, [auth.currentUser.uid])


    return (
        <div className='w-full h-5/6 flex flex-col items-center overflow-y-hidden justify-start rounded-bl-xl'>
            <div className='w-full h-full mb-5 overflow-y-hidden'>
                <div className='w-full h-full overflow-y-auto'>
                    {
                        !chats && <Spinner
                            color="dark"
                            aria-label="Info spinner example"
                        />
                    }

                    {
                        chats &&
                        Object.entries(chats)?.sort((a, b) => b[1].date - a[1].date).map((chat) => (
                            <div onClick={() => hidevisible_chat(chat)} key={chat[0]} className='w-full h-20 flex items-center justify-between hoverMessage px-6 border-b-2 border-bgLight2 dark:border-messageListBorder hover:bg-messageHoverLight dark:hover:bg-messageHover hover:cursor-pointer'>
                                <img className='w-14 h-14 object-cover rounded-full shadow-2xl shadow-neutral-900' src={chat[1].userInfo?.user.photoURL} alt="" />
                                <div className='w-full flex flex-col justify-center ml-4'>
                                    <h1 className='text-base tracking-wider mb-1'>{chat[1].userInfo?.user.name}</h1>
                                    <p className='text-sm tracking-wider text-phoneNumber'>
                                        {
                                            chat[1].lastMessage?.text.length >= 45 &&
                                            chat[1].lastMessage?.text.slice(0, 45) + "..."
                                        }
                                    </p>
                                    <p className='flex flex-row text-sm tracking-wider text-phoneNumber'>
                                        {
                                            chat[1].lastMessage?.text.length < 45 &&
                                            chat[1].lastMessage?.text
                                        }
                                        {
                                            chat[1].lastMessage?.text === "" &&
                                            <p className='text-sm tracking-wider text-phoneNumber'>Send a photo</p>
                                        }
                                        {
                                            chat[1].lastMessage?.img === "true" &&

                                            <IoMdImages className="w-6 h-6 pl-2 text-bgDark2 dark:text-loginInfo cursor-pointer" />

                                        }
                                    </p>
                                </div>

                                <div className='flex flex-col text-center w-10'>
                                    <p className='text-xs py-2 tracking-wider text-phoneNumber'>{moment(chat[1].date?.toDate()).format("H:mm")}</p>
                                    <ChatMenu></ChatMenu>
                                </div>
                            </div>
                        ))
                    }
                </div >
            </div >
        </div>
    )
}

export default MessageList