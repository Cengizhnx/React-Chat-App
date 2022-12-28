import React, { useState } from 'react'
import { Dropdown } from "flowbite-react";
import { Link } from 'react-router-dom';
import { AiOutlineDelete } from "react-icons/ai";
import { useSelector } from 'react-redux';
import { deleteDoc, deleteField, doc, onSnapshot, Timestamp, updateDoc } from 'firebase/firestore';
import { auth, db } from '../../firebase';
import { useEffect } from 'react';

function ChatMenu() {

    const chatId = useSelector(state => state.users.chatId)
    const [users, setUsers] = useState([])

    const selectUser = useSelector(state => state.users.selectUser)
    const groupState = useSelector(state => state.users.groupState)
    const isUser = users.findIndex((item) => item.uid === auth.currentUser.uid) >= 0;

    function hidevisible_chat() {
        document.getElementById("landing2").style.display = "none";
        document.getElementById("landing1").style.display = "block";
    }

    useEffect(() => {
        const getMessages = () => {

            const response = onSnapshot(doc(db, "chats", chatId), (docx) => {
                try {
                    docx.exists()

                    if (docx.data()[auth.currentUser.uid] === true && docx.data()[selectUser.uid] === true) {
                        deleteDoc(doc(db, "chats", chatId))
                    }
                } catch (error) {
                    console.log(error);
                }

            })
            return () => {
                response()
            }
        }

        const getUser = () => {
            if (selectUser.type === "group") {

                const response = onSnapshot(doc(db, "userChats", auth.currentUser.uid), (doc) => {
                    doc.exists() && setUsers(doc.data()[chatId].groupPrew)
                })
                return () => {
                    response()
                }
            }
        }


        chatId && getMessages() && getUser()

    }, [chatId])

    const deleteChat = async () => {

        if (window.confirm("Are you sure you want to delete the chat ?")) {

            const chatRef0 = doc(db, "chats", chatId);

            await updateDoc(chatRef0, {
                [auth.currentUser.uid]: true,
                [auth.currentUser.uid + "deletedDate"]: Timestamp.now()
            });

            hidevisible_chat()

            const chatRef1 = doc(db, "userChats", auth.currentUser.uid);

            if (selectUser.type !== "group") {
                await updateDoc(chatRef1, {
                    [chatId]: deleteField()
                });
            }
            else {
                if (!isUser || !groupState ) {
                    await updateDoc(chatRef1, {
                        [chatId]: deleteField()
                    });
                }
            }


        }

    }

    return (
        <div>
            <Dropdown
                arrowIcon={true}
                inline={true}
            >
                <Link onClick={deleteChat} className="w-full">
                    <Dropdown.Item>
                        <AiOutlineDelete className="h-5 w-5 mr-2 hover:bg-white hover:text-black hover:rounded-2xl hover:cursor-pointer" />
                        Delete Chat
                    </Dropdown.Item>
                </Link>

            </Dropdown>
        </div>
    )
}

export default ChatMenu