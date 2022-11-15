import { arrayUnion, doc, serverTimestamp, Timestamp, updateDoc } from 'firebase/firestore';
import React, { useState } from 'react'
import { BiMessageRounded } from "react-icons/bi";
import { IoMdImages } from "react-icons/io";
import { BsEmojiWink } from "react-icons/bs";
import { useSelector } from 'react-redux';
import { auth, db } from '../../../firebase';
import { v4 as uuid } from "uuid";
import { RiSendPlaneFill } from "react-icons/ri";

function Message() {

  const [text, setText] = useState("")
  const [img, setImg] = useState("")

  const chatId = useSelector(state => state.users.chatId)
  const selectUser = useSelector(state => state.users.selectUser)

  const handleKey = (e) => {
    e.code === "Enter" && handleSend();
  };

  const handleSend = async () => {
    if (text) {
      await updateDoc(doc(db, "chats", chatId), {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: auth.currentUser.uid,
          date: Timestamp.now()
        })
      })

      await updateDoc(doc(db, "userChats", auth.currentUser.uid), {
        [chatId + ".lastMessage"]: {
          text
        },

        [chatId + ".date"]: serverTimestamp(),
        [chatId + ".id"]: chatId
      })

      await updateDoc(doc(db, "userChats", selectUser.uid), {
        [chatId + ".lastMessage"]: {
          text
        },

        [chatId + ".date"]: serverTimestamp(),
        [chatId + ".id"]: chatId

      })
    }

    setText("")
  }

  return (
    <div id="chat_footer" className='w-full h-20 rounded-br-xl flex items-center bg-bgLight2 dark:bg-bgDark2 border-t-2 border-gray-300 dark:border-chatBorder'>
      <div className='w-full px-3 flex flex-row items-center justify-around' >
        <button >
          <BsEmojiWink className="w-7 h-7 text-bgDark2 dark:text-loginInfo" />
        </button>
        <button>
          <IoMdImages className="w-8 h-8 text-bgDark2 dark:text-loginInfo" />
        </button>
        <div className='flex flex-row justify-start items-center w-5/6 h-12 p-1 rounded-lg bg-bgLight2 dark:bg-bgDark2'>
          <input
            value={text}
            onKeyDown={handleKey}
            onChange={(e) => setText(e.target.value)}
            className='relative w-full rounded-md bg-bgLight1 text-bgDark1 dark:text-bgLight2 dark:bg-bgDarkInput focus:ring-2 focus:ring-white dark:focus:ring-bgDark0'
            style={{ border: "none", fontSize: "14px", letterSpacing: "0.3px", paddingLeft: "45px" }}
            type="text"
            placeholder="Send Message"
          />
          <BiMessageRounded className="h-5 w-5 mx-3 absolute text-phoneNumber" />

        </div>
        <button onClick={handleSend}>
          <RiSendPlaneFill className="w-7 h-7 text-bgDark2 dark:text-loginInfo" />

          {/* <img className='w-8 h-8 object-cover rounded-full shadow-2xl shadow-neutral-900' id='myimg2' alt="" /> */}
        </button>
      </div>

    </div>
  )
}

export default Message