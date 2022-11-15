import React from 'react'
import { Dropdown } from "flowbite-react";
import { Link } from 'react-router-dom';
import { AiOutlineDelete } from "react-icons/ai";
import { useSelector } from 'react-redux';
import { deleteDoc, deleteField, doc, updateDoc } from 'firebase/firestore';
import { auth, db } from '../../firebase';

function ChatMenu() {

    const chatId = useSelector(state => state.users.chatId)

    const selectUser = useSelector(state => state.users.selectUser)

    function hidevisible_chat() {
        document.getElementById("landing2").style.display = "none";
        document.getElementById("landing1").style.display = "block";
    }

    const deleteChat = async () => {

        if (window.confirm("Are you sure you want to delete the chat ?")) {

            await deleteDoc(doc(db, "chats", chatId))

            hidevisible_chat()

            const chatRef1 = doc(db, "userChats", auth.currentUser.uid);

            await updateDoc(chatRef1, {
                [chatId]: deleteField()
            });

            const chatRef2 = doc(db, "userChats", selectUser.uid);

            await updateDoc(chatRef2, {
                [chatId]: deleteField()
            });

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