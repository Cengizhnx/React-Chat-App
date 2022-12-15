import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { IoMdClose } from "react-icons/io";
import { deleteGroupPrew, resetGroupPrew, groupUsers } from '../../../redux/userSlice';
import { doc, serverTimestamp, updateDoc } from 'firebase/firestore';
import { db } from '../../../firebase';
import { Button, Modal } from 'flowbite-react';

function ModalList() {

    const groupPrew = useSelector(state => state.users.groupPrew)
    const groupUserss = useSelector(state => state.users.groupUsers)
    const chatId = useSelector(state => state.users.chatId)
    const selectUser = useSelector(state => state.users.selectUser)
    const dispatch = useDispatch()

    const userSearch = () => {
        for (let index = 0; index < groupPrew.length; index++) {
            let filter = groupUserss.find((item) => item.uid === groupPrew[index].uid)
            return filter;
        }
    }

    const tempArray = groupUserss.concat(groupPrew);

    const deleteGroupPrewiew = (item) => {
        dispatch(deleteGroupPrew(item))
    }

    const handleAddUser = async () => {
        const temp = userSearch()

        if (temp === undefined) {
            dispatch(groupUsers(tempArray))
            dispatch(resetGroupPrew())

            for (let index = 0; index < groupUserss.length; index++) {
                await updateDoc(doc(db, "userChats", groupUserss[index].uid), {
                    [chatId]: {
                        id: chatId,
                        date: serverTimestamp(),
                        groupPrew: tempArray,
                    },
                    [chatId + ".userInfo"]: {
                        user: {
                            description: selectUser.description,
                            name: selectUser.name,
                            photoURL: selectUser.photoURL,
                            id: selectUser.id,
                            type: "group",
                        }
                    },
                    [chatId + ".lastMessage"]: {
                        text: "Add User",
                    },
                });
            }

            for (let index = 0; index < groupPrew.length; index++) {
                await updateDoc(doc(db, "userChats", groupPrew[index].uid), {
                    [chatId]: {
                        id: chatId,
                        date: serverTimestamp(),
                        groupPrew: tempArray,
                    },
                    [chatId + ".userInfo"]: {
                        user: {
                            description: selectUser.description,
                            name: selectUser.name,
                            photoURL: selectUser.photoURL,
                            id: selectUser.id,
                            type: "group",
                        }
                    },
                    [chatId + ".lastMessage"]: {
                        text: "You Added",
                    },
                });
                // await setDoc(doc(db, "chats", id), {
                //     messages: [],
                // });
            }
            for (let index = 0; index < groupPrew.length + 1; index++) {
                await updateDoc(doc(db, "chats", chatId), {
                    [groupPrew[index].uid + "deletedDate"]: true,
                    [groupPrew[index].uid]: false,
                    [groupPrew[index].uid + "createdDate"]: serverTimestamp(),
                });
            }

        }
        else {
            alert("User already exists !")
        }

        dispatch(resetGroupPrew())
    }

    return (
        <div className='w-full flex flex-col items-center justify-start rounded-bl-xl'>
            {
                groupPrew.length > 0 &&
                <div className='w-full h-full justify-center items-center overflow-y-auto'>
                    <div className='text-center my-2'>
                        <h1 className='tracking-wider text-gray-500 dark:text-gray-400'>GROUP USERS ({groupPrew.length})</h1>
                    </div>
                    <div className='w-full flex flex-nowrap mb-2'>
                        {
                            groupPrew.map((item, key) => (
                                <div key={key} className='w-64 mx-2 overflow-hidden h-20 flex items-center justify-between hoverMessage px-6 rounded-lg hover:bg-messageHoverLight dark:hover:bg-loginInfo hover:cursor-pointer'>
                                    {
                                        <div className='w-full h-20 flex items-center justify-between hoverMessage'>

                                            <img className='w-14 h-14 object-cover rounded-full shadow-2xl shadow-neutral-900' src={item.photoURL} alt="user" />
                                            <div className='w-full flex flex-col justify-center ml-4'>
                                                <h1 className='text-base tracking-wider mb-1 dark:text-white'>{item.name} <span className='text-xs'> </span></h1>
                                                <p className='text-sm tracking-wider text-phoneNumber dark:text-gray-300'>@{item.username}</p>
                                            </div>
                                            <IoMdClose onClick={() => deleteGroupPrewiew(item)} className="h-6 w-6 text-black hover:bg-messageHover hover:text-white dark:text-white dark:hover:bg-bgLight2 dark:hover:text-black hover:rounded-xl hover:cursor-pointer" />
                                        </div>
                                    }
                                </div>
                            ))
                        }
                    </div>
                    <div>
                        <Modal.Footer>
                            <Button
                                onClick={() => handleAddUser()}
                                color="gray"

                            >
                                Add User
                            </Button>
                        </Modal.Footer>
                    </div>
                </div>
            }
        </div>
    )
}

export default ModalList