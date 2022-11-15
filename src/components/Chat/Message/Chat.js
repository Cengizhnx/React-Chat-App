import { doc, onSnapshot } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { db } from '../../../firebase'
import SendMessage from './SendMessage'
import "./styles.css"


function Chat() {

  const [messages, setMessages] = useState([])
  const chatId = useSelector(state => state.users.chatId)


  useEffect(() => {
    const getMessages = () => {

      const response = onSnapshot(doc(db, "chats", chatId), (doc) => {
        doc.exists() && setMessages(doc.data().messages)
      })
      return () => {
        response()
      }
    }

    chatId && getMessages()

  }, [chatId])


  return (
    <div className='bg-bgLight2 dark:bg-bgDark2 text-black dark:text-white w-full h-full flex flex-col overflow-y-hidden justify-end'>
      <div className='scrollbarLight dark:hidden overflow-y-auto pt-4 px-7'>
        {messages.length > 5 &&

          <div className='bg-bgLight1 dark:bg-bgDark1 w-2/3 p-2 m-auto text-center rounded-lg'>
            <p className='text-xs tracking-wide text-bgDark2 dark:text-loginInfo'>🔒 Messages are end-to-end encrypted. No one outside of this chat including ChatApp, can read or listen to your messages.</p>
          </div>

        }

        {
          messages.map(m => (
            <SendMessage message={m} key={m.id}></SendMessage>
          ))
        }
      </div>

      <div className='hidden dark:block scrollbarDark overflow-y-auto pt-4 px-7'>
        {messages.length > 5 &&

          <div className='bg-bgLight1 dark:bg-bgDark1 w-2/3 p-2 m-auto text-center rounded-lg'>
            <p className='text-xs tracking-wide text-bgDark2 dark:text-loginInfo'>🔒 Messages are end-to-end encrypted. No one outside of this chat including ChatApp, can read or listen to your messages.</p>
          </div>

        }

        {
          messages.map(m => (
            <SendMessage message={m} key={m.id}></SendMessage>
          ))
        }
      </div>

    </div >
  )
}

export default Chat