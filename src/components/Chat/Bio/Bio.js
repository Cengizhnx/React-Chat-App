import React from 'react'
import { useSelector } from 'react-redux'
import { BiBlock } from "react-icons/bi";
import { FaTrash } from "react-icons/fa";
import { MdOutlineAddReaction, MdOutlineMoodBad } from "react-icons/md";
import { auth, db, userAddFriends, userBlock, userDeblock, userDeleteFriends } from '../../../firebase';
import { Toaster } from 'react-hot-toast';
import { deleteDoc, deleteField, doc, onSnapshot, setDoc, Timestamp, updateDoc } from 'firebase/firestore';
import { useEffect } from 'react';
import { useState } from 'react';

function Bio({ blocks, friends }) {

    const [block, setBlock] = useState(false)

    const chatId = useSelector(state => state.users.chatId)

    const selectUser = useSelector(state => state.users.selectUser)

    let result = selectUser?.phone_number?.substr(0, 3) + " " + selectUser?.phone_number?.substr(3, 3) + " " + selectUser?.phone_number?.substr(6, 3) + " " + selectUser?.phone_number?.substr(9, 2) + " " + selectUser?.phone_number?.substr(11, 2);

    const filtered = blocks?.filter((item) => item.user.username === selectUser.username)

    const friend = friends?.filter((item) => item.user.username === selectUser.username)

    console.log(block);

    const handleBlock = async () => {
        // await userBlock(selectUser)
        await updateDoc(doc(db, "blocks", chatId), {
            [auth.currentUser.uid]: true,
            [selectUser.uid]: true,
            [auth.currentUser.uid + "blockedDate"]: Timestamp.now()
        })
    }

    const handleDeblock = async (item) => {
        // await userDeblock(item)
        await updateDoc(doc(db, "blocks", chatId), {
            [auth.currentUser.uid]: false,
            [auth.currentUser.uid + "blockedDate"]: Timestamp.now()
        })
    }

    const handleAddFriends = async () => {
        await userAddFriends(selectUser)
    }

    const handleDeleteFriends = async (item) => {
        await userDeleteFriends(item)
    }

    function hidevisible_chat() {
        document.getElementById("landing2").style.display = "none";
        document.getElementById("landing1").style.display = "block";
    }

    useEffect(() => {
        const getMessages = () => {

            const response = onSnapshot(doc(db, "chats", chatId), (docx) => {
                docx.exists()

                if (docx.data()[auth.currentUser.uid] === true && docx.data()[selectUser.uid] === true) {
                    deleteDoc(doc(db, "chats", chatId))
                }

            })
            return () => {
                response()
            }
        }

        const getBlocks = () => {

            const response = onSnapshot(doc(db, "blocks", chatId), (doc) => {
                doc.exists() && setBlock(doc.data()[auth.currentUser.uid])
            })
            return () => {
                response()
            }
        }

        chatId && getMessages() && getBlocks()

    }, [chatId, block])

    const deleteChat = async () => {

        if (window.confirm("Are you sure you want to delete the chat ?")) {

            const chatRef0 = doc(db, "chats", chatId);

            await updateDoc(chatRef0, {
                [auth.currentUser.uid]: true,
                [auth.currentUser.uid + "deletedDate"]: Timestamp.now()
            });

            hidevisible_chat()

            const chatRef1 = doc(db, "userChats", auth.currentUser.uid);

            await updateDoc(chatRef1, {
                [chatId]: deleteField()
            });

        }

    }
    return (
        <div className='dark:text-white bg-bgLight1 dark:bg-bgDark1 w-full flex flex-col items-center justify-center'>
            <div className='flex flex-col items-center justify-center my-6'>
                <img className='w-44 h-44 object-cover rounded-full shadow-2xl shadow-neutral-900' src={selectUser.photoURL ? selectUser.photoURL : "https://cdn-icons-png.flaticon.com/512/149/149071.png"} id='myimg' alt="" />
                <h1 className='text-2xl text-black dark:text-white tracking-wide mt-5'>
                    {selectUser.name}
                </h1>
                <p className='text-sm tracking-wider text-loginTextBg dark:text-phoneNumber mt-2'>{result}</p>
            </div>
            <div className='w-5/6 h-20 flex flex-col justify-center px-8 border-y-2 rounded-2xl border-bgLight2 dark:border-bioBorder'>
                <h1 className='text-base text-black dark:text-white tracking-wide'>About Me</h1>
                <p className='text-sm tracking-wider text-loginTextBg dark:text-phoneNumber mt-1'>{selectUser.description}</p>
            </div>

            <div className='w-5/6 flex flex-col justify-center items-center px-8 py-4 my-4 border-y-2 rounded-2xl border-bgLight2 dark:border-bioBorder'>

                {
                    friend?.length > 0 && <div onClick={() => handleDeleteFriends(friend[0])} className='w-full h-8 flex flex-row justify-center items-center text-green-500 dark:text-green-400 rounded-lg hover:bg-messageHoverLight dark:hover:bg-messageHover hover:cursor-pointer'>
                        <div className='flex justify-center items-center mr-5'>
                            <MdOutlineMoodBad className="h-6 w-6" />
                        </div>
                        <p>@{selectUser.username} delete friends</p>
                    </div>
                }
                {
                    friend?.length <= 0 && <div onClick={() => handleAddFriends()} className='w-full h-8 flex flex-row justify-center items-center text-green-500 dark:text-green-400 rounded-lg hover:bg-messageHoverLight dark:hover:bg-messageHover hover:cursor-pointer'>
                        <div className='flex justify-center items-center mr-5'>
                            <MdOutlineAddReaction className="h-6 w-6" />
                        </div>
                        <p>@{selectUser.username} add friends</p>
                    </div>
                }

            </div>

            <div className='w-5/6 flex flex-col justify-center items-center px-8 py-4 border-y-2 rounded-2xl border-bgLight2 dark:border-bioBorder'>
                {
                    block === true && <div onClick={() => handleDeblock(filtered[0])} className='w-full h-8 flex flex-row justify-evenly items-center text-red-600 dark:text-red-400 rounded-lg hover:bg-messageHoverLight dark:hover:bg-messageHover hover:cursor-pointer mb-5'>
                        <div className='flex justify-center items-center'>
                            <BiBlock className="h-6 w-6" />
                        </div>
                        <p>@{selectUser.username} remove block</p>
                    </div>
                }
                {
                    block === false && <div onClick={() => handleBlock()} className='w-full h-8 flex flex-row justify-evenly items-center text-red-600 dark:text-red-400 rounded-lg hover:bg-messageHoverLight dark:hover:bg-messageHover hover:cursor-pointer mb-5'>
                        <div className='flex justify-center items-center'>
                            <BiBlock className="h-6 w-6" />
                        </div>
                        <p>@{selectUser.username} block</p>
                    </div>
                }
                <div onClick={() => deleteChat()} className='w-full h-8 flex flex-row justify-evenly items-center text-red-600 dark:text-red-400 rounded-lg hover:bg-messageHoverLight dark:hover:bg-messageHover hover:cursor-pointer'>
                    <div className='flex justify-center items-center'>
                        <FaTrash className="h-5 w-5" />
                    </div>
                    <p>@{selectUser.username} with delete chat</p>
                </div>

            </div>
            <Toaster position='top-right'></Toaster>
        </div>
    )
}

export default Bio